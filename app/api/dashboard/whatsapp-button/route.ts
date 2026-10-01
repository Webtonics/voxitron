import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";
import { GREETING_MAX, TOOLTIP_MAX, isHexColor, toWaDigits } from "@/lib/whatsappButton";

export async function POST(request: Request) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  let body: {
    customerId?: string;
    whatsappNumberId?: string;
    greeting?: string;
    tooltip?: string;
    position?: string;
    colorMode?: string;
    brandColor?: string;
    isEnabled?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const customers = await getUserCustomers(supabase, user.id);
  const active = resolveActiveCustomer(customers, body.customerId);

  // The number must be one of this customer's own active numbers with a
  // usable international display_number, otherwise the button would link to
  // a chat that can't reach the agent.
  const { data: number } = await supabase
    .from("customer_whatsapp_numbers")
    .select("id, display_number, is_active")
    .eq("id", body.whatsappNumberId || "")
    .eq("customer_id", active.id)
    .maybeSingle();

  if (!number || !number.is_active) {
    return NextResponse.json({ error: "Pick one of your active WhatsApp numbers." }, { status: 400 });
  }
  if (!toWaDigits(number.display_number)) {
    return NextResponse.json(
      { error: "That number isn't stored in international format yet. Contact Voxitron to fix it." },
      { status: 400 }
    );
  }

  const greeting = (body.greeting || "").trim();
  if (!greeting) {
    return NextResponse.json({ error: "Add a greeting message." }, { status: 400 });
  }
  if (greeting.length > GREETING_MAX) {
    return NextResponse.json({ error: `Keep the greeting under ${GREETING_MAX} characters.` }, { status: 400 });
  }

  const tooltip = (body.tooltip || "").trim();
  if (tooltip.length > TOOLTIP_MAX) {
    return NextResponse.json({ error: `Keep the label under ${TOOLTIP_MAX} characters.` }, { status: 400 });
  }

  const position = body.position === "left" ? "left" : "right";
  const colorMode = body.colorMode === "brand" ? "brand" : "whatsapp";
  const brandColor = (body.brandColor || "").trim();
  if (colorMode === "brand" && !isHexColor(brandColor)) {
    return NextResponse.json({ error: "Brand colour must be a hex code like #0E7C6B." }, { status: 400 });
  }

  const { data: saved, error } = await supabase
    .from("whatsapp_buttons")
    .upsert(
      {
        customer_id: active.id,
        whatsapp_number_id: number.id,
        greeting,
        tooltip: tooltip || null,
        position,
        color_mode: colorMode,
        brand_color: colorMode === "brand" ? brandColor.toUpperCase() : null,
        is_enabled: body.isEnabled !== false,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "customer_id" }
    )
    .select("id")
    .single();

  if (error || !saved) {
    console.error("Failed to save WhatsApp button:", error);
    return NextResponse.json({ error: "Couldn't save your button. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: saved.id });
}
