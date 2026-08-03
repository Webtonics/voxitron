import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

const VALID_AGENTS = ["speed-to-lead", "quoting-agent", "both"] as const;
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

  const { name, businessName, email, phone, interestedAgent } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof businessName !== "string" || businessName.trim().length === 0) {
    return NextResponse.json({ error: "Business name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (phone !== undefined && phone !== null && phone !== "" && typeof phone !== "string") {
    return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
  }
  if (!isValidAgent(interestedAgent)) {
    return NextResponse.json({ error: "Please select which agent you're interested in." }, { status: 400 });
  }

  const supabase = createServerClient();

  const { error } = await supabase.from("leads").insert({
    name: name.trim(),
    business_name: businessName.trim(),
    email: email.trim(),
    phone: typeof phone === "string" && phone.trim().length > 0 ? phone.trim() : null,
    interested_agent: interestedAgent,
  });

  if (error) {
    console.error("Failed to insert lead:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again or email hello@voxitron.com." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
