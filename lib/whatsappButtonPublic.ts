// Server-only helpers for the two public, unauthenticated WhatsApp button
// routes (app/api/whatsapp-button/[id]/*). They're called from customers'
// own websites, so every response allows any origin.

export const PUBLIC_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Reject malformed ids before they reach Postgres, which would error on a non-uuid. */
export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}
