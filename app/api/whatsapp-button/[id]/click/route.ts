import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PUBLIC_CORS_HEADERS, isUuid } from "@/lib/whatsappButtonPublic";

// Max clicks counted per visitor per button in any one-minute window. Stops a
// refresh-and-click loop from inflating the dashboard's numbers; a real
// visitor never clicks the button more than a couple of times a minute.
const CLICKS_PER_MINUTE = 3;

/** Host + path of the page the click came from, query and hash stripped. */
function toPagePath(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return `${url.host}${url.pathname}`.slice(0, 300);
  } catch {
    return null;
  }
}

/**
 * Daily-rotating, non-reversible visitor fingerprint for rate limiting only.
 * Keyed with the service role key (already a server-only secret) so the hash
 * can't be recomputed by anyone without it.
 */
function visitorHash(request: Request): string {
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  const userAgent = request.headers.get("user-agent") || "";
  const day = new Date().toISOString().slice(0, 10);
  return createHmac("sha256", process.env.SUPABASE_SERVICE_ROLE_KEY || "")
    .update(`${ip}|${userAgent}|${day}`)
    .digest("hex");
}

// Public: called by public/wa-button.js via navigator.sendBeacon when a
// visitor clicks the button. Always answers 204 so the script never has
// anything to handle; failures are logged here instead.
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const done = () => new NextResponse(null, { status: 204, headers: PUBLIC_CORS_HEADERS });

  if (!isUuid(id)) return done();

  const supabase = createAdminClient();

  const { data: button } = await supabase
    .from("whatsapp_buttons")
    .select("id, is_enabled")
    .eq("id", id)
    .maybeSingle();

  if (!button || !button.is_enabled) return done();

  const hash = visitorHash(request);
  const since = new Date(Date.now() - 60_000).toISOString();

  const { count } = await supabase
    .from("whatsapp_button_clicks")
    .select("id", { count: "exact", head: true })
    .eq("button_id", id)
    .eq("visitor_hash", hash)
    .gte("clicked_at", since);

  if ((count || 0) >= CLICKS_PER_MINUTE) return done();

  let pagePath: string | null = null;
  try {
    pagePath = toPagePath(await request.text());
  } catch {
    pagePath = null;
  }

  const { error } = await supabase
    .from("whatsapp_button_clicks")
    .insert({ button_id: id, page_path: pagePath, visitor_hash: hash });

  if (error) {
    console.error("Failed to record WhatsApp button click:", error);
  }

  return done();
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: PUBLIC_CORS_HEADERS });
}
