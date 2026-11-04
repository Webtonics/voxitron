import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireVoxitronTeam } from "@/lib/dashboard/teamAuth";
import { INDUSTRY_OPTIONS, templateForIndustry, type Industry } from "@/lib/dashboard/industryTemplates";

/** The auth user for this email, created if new. They set their password with "Forgot password" on /login. */
async function loginUserId(admin: ReturnType<typeof createAdminClient>, email: string): Promise<string | null> {
  const { data: created, error } = await admin.auth.admin.createUser({ email, email_confirm: true });
  if (created?.user) return created.user.id;

  if (error?.code === "email_exists") {
    const { data: page } = await admin.auth.admin.listUsers({ perPage: 1000 });
    return page?.users.find((user) => user.email?.toLowerCase() === email.toLowerCase())?.id ?? null;
  }

  console.error("Failed to create a customer's login:", error);
  return null;
}

// The Build screen's "Add a customer": what supabase/onboarding-template.sql
// does by hand. The customer row comes first and everything else hangs off it,
// so a later step failing keeps the customer and reports what's left to do.
export async function POST(request: Request) {
  const auth = await requireVoxitronTeam();
  if (!auth.ok) return auth.response;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const text = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");
  const businessName = text("businessName");
  const industry = text("industry");
  const ownerWhatsappNumber = text("ownerWhatsappNumber");
  const loginEmail = text("loginEmail");
  const phoneNumberId = text("phoneNumberId");
  const displayNumber = text("displayNumber");

  if (!businessName) {
    return NextResponse.json({ error: "Business name is required." }, { status: 400 });
  }
  if (!(INDUSTRY_OPTIONS as readonly string[]).includes(industry)) {
    return NextResponse.json({ error: "Choose an industry." }, { status: 400 });
  }
  if (loginEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
    return NextResponse.json({ error: "That doesn't look like a valid email address." }, { status: 400 });
  }
  if (phoneNumberId && !/^\d+$/.test(phoneNumberId)) {
    return NextResponse.json(
      { error: "The Meta phone number ID is digits only, and isn't the phone number itself." },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  const { data: customer, error: customerError } = await admin
    .from("customers")
    .insert({
      business_name: businessName,
      industry,
      config: templateForIndustry(industry as Industry),
      owner_whatsapp_number: ownerWhatsappNumber || null,
    })
    .select("id")
    .single();

  if (customerError || !customer) {
    console.error("Failed to create a customer:", customerError);
    return NextResponse.json({ error: "Couldn't create the customer. Try again." }, { status: 500 });
  }

  const unfinished: string[] = [];

  // The team member building this gets access too, so they can open the customer's dashboard.
  const members = [auth.userId];
  if (loginEmail) {
    const ownerId = await loginUserId(admin, loginEmail);
    if (ownerId) members.push(ownerId);
    else unfinished.push(`the login for ${loginEmail}`);
  }

  const { error: membersError } = await admin
    .from("customer_members")
    .insert(members.map((authUserId) => ({ customer_id: customer.id, auth_user_id: authUserId })));

  if (membersError) {
    console.error("Failed to add customer members:", membersError);
    unfinished.push("dashboard access");
  }

  if (phoneNumberId) {
    const { error: numberError } = await admin.from("customer_whatsapp_numbers").insert({
      customer_id: customer.id,
      whatsapp_number: phoneNumberId,
      display_number: displayNumber || null,
    });

    if (numberError) {
      console.error("Failed to add a customer's WhatsApp number:", numberError);
      unfinished.push(numberError.code === "23505" ? "the WhatsApp number (another customer already has it)" : "the WhatsApp number");
    }
  }

  return NextResponse.json({ ok: true, customerId: customer.id, unfinished });
}
