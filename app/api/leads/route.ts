import { after, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendLeadConfirmationEmail } from "@/lib/email";

// Caps on the confirmation email, so the form can't be used to send our
// branded email to one address over and over, or to a long list of strangers.
const EMAIL_REPEAT_WINDOW_MS = 24 * 60 * 60 * 1000;
const EMAILS_PER_HOUR = 20;

/**
 * Whether a just-saved lead should get a confirmation email: not if the same
 * address already submitted in the last 24 hours, and not once the site as a
 * whole passes EMAILS_PER_HOUR (a flood like that is a bot, not visitors).
 * Runs after the insert, so both counts include the new row. Fails closed:
 * if the check can't run, no email goes out. The lead is saved either way.
 */
async function shouldSendConfirmation(email: string): Promise<boolean> {
  try {
    const admin = createAdminClient();
    const now = Date.now();

    const [sameAddress, lastHour] = await Promise.all([
      admin
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("email", email)
        .gte("created_at", new Date(now - EMAIL_REPEAT_WINDOW_MS).toISOString()),
      admin
        .from("leads")
        .select("id", { count: "exact", head: true })
        .not("email", "is", null)
        .gte("created_at", new Date(now - 60 * 60 * 1000).toISOString()),
    ]);

    if (sameAddress.error || lastHour.error) throw sameAddress.error || lastHour.error;

    if ((lastHour.count || 0) > EMAILS_PER_HOUR) {
      console.warn(`More than ${EMAILS_PER_HOUR} lead emails in the last hour, skipping confirmation email.`);
      return false;
    }

    return (sameAddress.count || 0) <= 1;
  } catch (err) {
    console.error("Couldn't check lead email limits, skipping confirmation email:", err);
    return false;
  }
}

const VALID_AGENTS = [
  "speed-to-lead",
  "quoting-agent",
  "both",
  "whatsapp-agent",
  "real-estate",
  "diagnostic-centre",
  "retail",
  "ecommerce",
  "general",
] as const;
type Agent = (typeof VALID_AGENTS)[number];

function isValidAgent(value: unknown): value is Agent {
  return typeof value === "string" && (VALID_AGENTS as readonly string[]).includes(value);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, businessName, email, phone, interestedAgent, businessType, monthlyWhatsappLeads, notes, minimal, website } =
    body as Record<string, unknown>;

  // Honeypot (see SpamTrap in components/LeadForm.tsx): people never see this
  // field, so anything in it came from a bot. Answer like a success so it
  // doesn't retry, but save nothing and send nothing.
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const isMinimal = minimal === true;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!isMinimal && (typeof businessName !== "string" || businessName.trim().length === 0)) {
    return NextResponse.json({ error: "Business name is required." }, { status: 400 });
  }
  if (!isMinimal && (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (isMinimal && (typeof phone !== "string" || phone.trim().length === 0)) {
    return NextResponse.json({ error: "A WhatsApp number is required." }, { status: 400 });
  }
  if (phone !== undefined && phone !== null && phone !== "" && typeof phone !== "string") {
    return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
  }
  if (!isValidAgent(interestedAgent)) {
    return NextResponse.json({ error: "Please select which agent you're interested in." }, { status: 400 });
  }
  for (const [field, value] of [
    ["businessType", businessType],
    ["monthlyWhatsappLeads", monthlyWhatsappLeads],
    ["notes", notes],
  ] as const) {
    if (value !== undefined && value !== null && value !== "" && typeof value !== "string") {
      return NextResponse.json({ error: `Invalid ${field}.` }, { status: 400 });
    }
  }

  const supabase = await createServerClient();

  const trimmedEmail = typeof email === "string" && email.trim().length > 0 ? email.trim() : null;
  const trimmedBusinessName =
    typeof businessName === "string" && businessName.trim().length > 0 ? businessName.trim() : null;

  const { error } = await supabase.from("leads").insert({
    name: name.trim(),
    business_name: trimmedBusinessName,
    email: trimmedEmail,
    phone: typeof phone === "string" && phone.trim().length > 0 ? phone.trim() : null,
    interested_agent: interestedAgent,
    business_type: typeof businessType === "string" && businessType.trim().length > 0 ? businessType.trim() : null,
    monthly_whatsapp_leads:
      typeof monthlyWhatsappLeads === "string" && monthlyWhatsappLeads.trim().length > 0
        ? monthlyWhatsappLeads.trim()
        : null,
    notes: typeof notes === "string" && notes.trim().length > 0 ? notes.trim() : null,
  });

  if (error) {
    console.error("Failed to insert lead:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again or email hello@voxitron.com." },
      { status: 500 }
    );
  }

  // Runs after the response is sent: the lead is already saved, so a slow or
  // failed email shouldn't hold up or fail the visitor's submission. after()
  // keeps the function alive until it finishes, a bare unawaited promise can
  // be frozen mid-send on Vercel. No email on file for a minimal submission,
  // nothing to send.
  if (trimmedEmail) {
    const leadName = name.trim();
    after(async () => {
      try {
        if (await shouldSendConfirmation(trimmedEmail)) {
          await sendLeadConfirmationEmail({ to: trimmedEmail, name: leadName });
        }
      } catch (err) {
        console.error("Unexpected error sending lead confirmation email:", err);
      }
    });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
