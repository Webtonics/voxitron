import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { BlockError } from "@/lib/blocks/types";

// Customer API keys in customer_tools.credentials are encrypted with a key that
// only lives in Vercel, so a database leak alone doesn't expose them. Generate
// it once with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

function encryptionKey(): Buffer {
  const key = Buffer.from(process.env.TOOL_CREDENTIALS_KEY || "", "base64");
  if (key.length !== 32) {
    throw new BlockError("TOOL_CREDENTIALS_KEY isn't set on the server, so API keys can't be stored or read.");
  }
  return key;
}

export function encryptSecret(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), encrypted].map((part) => part.toString("base64")).join(".");
}

export function decryptSecret(stored: string): string {
  const key = encryptionKey();
  const [iv, tag, encrypted] = stored.split(".").map((part) => Buffer.from(part, "base64"));
  try {
    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
  } catch {
    throw new BlockError("This API key can't be read. Enter it again on the Build screen.");
  }
}
