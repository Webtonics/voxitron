import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";

// Updates one of the session's own WhatsApp numbers: is_active and/or
// label. Separate from /api/dashboard/settings (the business-name form
// save) since these are immediate per-row actions, not part of a form
// submit. Never touches whatsapp_number/display_number: those are set by
// Voxitron at Meta-side provisioning time (see
// supabase/onboarding-template.sql), not customer-editable. Deactivating
// only affects whether the dashboard treats the number as currently live,
// see supabase/migrations/023_whatsapp_number_active.sql.
export async function POST(request: Request) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  let body: { customerId?: string; numberId?: string; isActive?: boolean; label?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const numberId = body.numberId;
  const hasIsActive = typeof body.isActive === "boolean";
  const hasLabel = typeof body.label === "string";

  if (!numberId || (!hasIsActive && !hasLabel)) {
    return NextResponse.json({ error: "A number and a change to make are required." }, { status: 400 });
  }

  const customers = await getUserCustomers(supabase, user.id);
  const active = resolveActiveCustomer(customers, body.customerId);

  const patch: { is_active?: boolean; label?: string | null } = {};
  if (hasIsActive) patch.is_active = body.isActive;
  if (hasLabel) patch.label = body.label!.trim() || null;

  const { data, error } = await supabase
    .from("customer_whatsapp_numbers")
    .update(patch)
    .eq("id", numberId)
    .eq("customer_id", active.id)
    .select("id")
    .single();

  if (error || !data) {
    console.error("Failed to update WhatsApp number:", error);
    return NextResponse.json({ error: "Couldn't update that number. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
