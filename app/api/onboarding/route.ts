import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireVoxitronTeam } from "@/lib/dashboard/teamAuth";
import { INDUSTRY_OPTIONS } from "@/lib/dashboard/industryTemplates";

export async function GET() {
  const auth = await requireVoxitronTeam();
  if (!auth.ok) return auth.response;

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("customers")
    .select("id, business_name, industry, config")
    .order("business_name", { ascending: true });

  if (error) {
    console.error("Failed to load customers for onboarding:", error);
    return NextResponse.json({ error: "Couldn't load customers." }, { status: 500 });
  }

  return NextResponse.json({ customers: data });
}

export async function POST(request: Request) {
  const auth = await requireVoxitronTeam();
  if (!auth.ok) return auth.response;

  let body: { customerId?: string; industry?: string; config?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { customerId, industry, config } = body;

  if (!customerId || typeof customerId !== "string") {
    return NextResponse.json({ error: "customerId is required." }, { status: 400 });
  }

  if (!industry || !(INDUSTRY_OPTIONS as readonly string[]).includes(industry)) {
    return NextResponse.json({ error: "industry must be one of: " + INDUSTRY_OPTIONS.join(", ") }, { status: 400 });
  }

  if (typeof config !== "object" || config === null) {
    return NextResponse.json({ error: "config must be a JSON object." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("customers")
    .update({ industry, config })
    .eq("id", customerId);

  if (error) {
    console.error("Failed to save onboarding config:", error);
    return NextResponse.json({ error: "Couldn't save. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
