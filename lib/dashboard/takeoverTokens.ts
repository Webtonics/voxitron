import { randomBytes, createHash } from "crypto";

// Tokens are 256 bits of entropy, url-safe. Only the SHA-256 hash is ever
// persisted (see supabase/migrations/024_conversation_takeover.sql) -- the
// raw token exists only in the WhatsApp/email message and in the URL the
// owner clicks, never at rest in the database.
export function generateTakeoverToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashTakeoverToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export const TAKEOVER_TOKEN_TTL_HOURS = 48;
