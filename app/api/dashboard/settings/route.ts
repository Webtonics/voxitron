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
    ownerWhatsappNumber?: string;
    ownerEmail?: string;
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

  // Both optional, independently: a customer can set one, both, or neither,
  // same as the columns themselves (see 013_owner_whatsapp_number.sql).
  // Empty string clears the column back to null rather than being rejected,
  // so a customer can remove a number/email they no longer want alerts on.
  const ownerWhatsappNumber = (body.ownerWhatsappNumber || "").trim();
  if (ownerWhatsappNumber && !/^\+?[0-9\s()-]{7,20}$/.test(ownerWhatsappNumber)) {
    return NextResponse.json({ error: "That doesn't look like a valid phone number." }, { status: 400 });
  }

  const ownerEmail = (body.ownerEmail || "").trim();
  if (ownerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail)) {
    return NextResponse.json({ error: "That doesn't look like a valid email address." }, { status: 400 });
  }

  const { error: customerError } = await supabase
    .from("customers")
    .update({
      business_name: businessName,
      owner_whatsapp_number: ownerWhatsappNumber || null,
      owner_email: ownerEmail || null,
    })
    .eq("id", active.id);

  if (customerError) {
    console.error("Failed to update customer settings:", customerError);
    return NextResponse.json({ error: "Couldn't save your changes. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
