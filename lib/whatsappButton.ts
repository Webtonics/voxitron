// Shared rules for the embeddable WhatsApp button (see
// supabase/migrations/025_whatsapp_button.sql). Used by the dashboard save
// route, the public config route, and the dashboard page, so the three can't
// disagree on what counts as a valid number, colour or greeting.

export type ButtonPosition = "right" | "left";
export type ButtonColorMode = "whatsapp" | "brand";

export type WhatsappButtonRow = {
  id: string;
  customer_id: string;
  whatsapp_number_id: string | null;
  greeting: string;
  tooltip: string | null;
  position: ButtonPosition;
  color_mode: ButtonColorMode;
  brand_color: string | null;
  is_enabled: boolean;
};

export const GREETING_MAX = 200;
export const TOOLTIP_MAX = 40;
export const DEFAULT_GREETING = "Hi, I found you on your website.";
export const DEFAULT_BRAND_COLOR = "#0E7C6B";

/**
 * Digits-only international number for a wa.me link, or null if the stored
 * display_number can't be used safely. wa.me needs the country code; a
 * local-format number ("0812...") would silently open a chat with the wrong
 * person or nobody, so it's rejected rather than guessed at.
 */
export function toWaDigits(displayNumber: string | null | undefined): string | null {
  if (!displayNumber) return null;
  const trimmed = displayNumber.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  if (!trimmed.startsWith("+") && digits.startsWith("0")) return null;
  return digits;
}

export function isHexColor(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}

export function waLink(digits: string, greeting: string): string {
  const text = greeting.trim();
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
}
