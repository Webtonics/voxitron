import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { toWaDigits, isHexColor, DEFAULT_BRAND_COLOR } from "@/lib/whatsappButton";
import { PUBLIC_CORS_HEADERS, isUuid } from "@/lib/whatsappButtonPublic";

// Public: read by public/wa-button.js on a customer's website. Returns only
// what the button needs to render. A disabled button, an inactive number or
// a number without a usable international format all return 404, and the
// script then renders nothing rather than a broken button.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const notFound = () =>
    NextResponse.json(
      { error: "Not found" },
      { status: 404, headers: { ...PUBLIC_CORS_HEADERS, "Cache-Control": "public, s-maxage=60" } }
    );

  if (!isUuid(id)) return notFound();

  const supabase = createAdminClient();

  const { data: button } = await supabase
    .from("whatsapp_buttons")
    .select("id, whatsapp_number_id, greeting, tooltip, position, color_mode, brand_color, is_enabled")
    .eq("id", id)
    .maybeSingle();

  if (!button || !button.is_enabled || !button.whatsapp_number_id) return notFound();

  const { data: number } = await supabase
    .from("customer_whatsapp_numbers")
    .select("display_number, is_active")
    .eq("id", button.whatsapp_number_id)
    .maybeSingle();

  const digits = number?.is_active ? toWaDigits(number.display_number) : null;
  if (!digits) return notFound();

  const color =
    button.color_mode === "brand" && button.brand_color && isHexColor(button.brand_color)
      ? button.brand_color
      : button.color_mode === "brand"
        ? DEFAULT_BRAND_COLOR
        : null;

  return NextResponse.json(
    {
      number: digits,
      greeting: button.greeting,
      tooltip: button.tooltip,
      position: button.position,
      color,
    },
    {
      headers: {
        ...PUBLIC_CORS_HEADERS,
        // Short edge cache: a dashboard change shows up on the customer's
        // site within about a minute, without hitting Supabase per page view.
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: PUBLIC_CORS_HEADERS });
}
