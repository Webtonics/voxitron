import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";

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
    businessName?: string;
    numberLabels?: Record<string, string>;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const customers = await getUserCustomers(supabase, user.id);
  const active = resolveActiveCustomer(customers, body.customerId);

  const businessName = (body.businessName || "").trim();
  if (!businessName) {
    return NextResponse.json({ error: "Business name is required." }, { status: 400 });
  }

  const { error: customerError } = await supabase
    .from("customers")
    .update({ business_name: businessName })
    .eq("id", active.id);

  if (customerError) {
    console.error("Failed to update customer business name:", customerError);
    return NextResponse.json({ error: "Couldn't save your business name. Try again." }, { status: 500 });
  }

  const numberLabels = body.numberLabels || {};
  for (const [numberId, label] of Object.entries(numberLabels)) {
    const { error: numberError } = await supabase
      .from("customer_whatsapp_numbers")
      .update({ label: label.trim() || null })
      .eq("id", numberId)
      .eq("customer_id", active.id);

    if (numberError) {
      console.error("Failed to update WhatsApp number label:", numberError);
      return NextResponse.json({ error: "Couldn't save one of your number labels. Try again." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
