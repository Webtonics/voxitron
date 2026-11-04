import { createSign } from "crypto";
import { BlockError } from "@/lib/blocks/types";

// Every Google block logs in as one Voxitron service account: a robot Google
// account customers share their sheet or calendar with, the way they'd share
// with a colleague. No customer passwords, no logins that expire, no Google app
// review. GOOGLE_SERVICE_ACCOUNT_JSON holds the whole key file Google gives you.

const TOKEN_URL = "https://oauth2.googleapis.com/token";

type ServiceAccount = { client_email: string; private_key: string };

function loadServiceAccount(): ServiceAccount | null {
  try {
    const parsed = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "");
    return parsed.client_email && parsed.private_key ? parsed : null;
  } catch {
    return null;
  }
}

/** The address customers share things with, or null if the service account isn't set up yet. */
export function serviceAccountEmail(): string | null {
  return loadServiceAccount()?.client_email ?? null;
}

const tokenCache = new Map<string, { token: string; expiresAt: number }>();

async function accessToken(scope: string): Promise<string> {
  const cached = tokenCache.get(scope);
  if (cached && cached.expiresAt > Date.now()) return cached.token;

  const account = loadServiceAccount();
  if (!account) {
    throw new BlockError("Google isn't set up yet: GOOGLE_SERVICE_ACCOUNT_JSON is missing or isn't a valid key file.");
  }

  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const issuedAt = Math.floor(Date.now() / 1000);
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({
    iss: account.client_email,
    scope,
    aud: TOKEN_URL,
    iat: issuedAt,
    exp: issuedAt + 3600,
  })}`;

  let signature: string;
  try {
    signature = createSign("RSA-SHA256").update(unsigned).sign(account.private_key, "base64url");
  } catch {
    throw new BlockError("Google isn't set up yet: the private key in GOOGLE_SERVICE_ACCOUNT_JSON can't be read.");
  }

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });

  if (!response.ok) {
    console.error("Google rejected the service account login:", await response.text());
    throw new BlockError("Google rejected Voxitron's service account. Check the key in GOOGLE_SERVICE_ACCOUNT_JSON is still active.");
  }

  const data: { access_token: string; expires_in: number } = await response.json();
  // A minute early, so a token never expires halfway through a request.
  tokenCache.set(scope, { token: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 });
  return data.access_token;
}

/** A fetch logged in as the service account. Throws BlockError if that Google API is switched off. */
export async function googleFetch(scope: string, url: string, init: RequestInit = {}): Promise<Response> {
  const token = await accessToken(scope);
  const response = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });

  if (response.status === 403) {
    const body = await response.clone().text();
    if (body.includes("SERVICE_DISABLED") || body.includes("has not been used in project")) {
      throw new BlockError("This Google API is switched off. Enable it in the service account's Google Cloud project.");
    }
  }

  return response;
}
