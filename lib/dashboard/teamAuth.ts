import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers } from "@/lib/dashboard/activeCustomer";
import { VOXITRON_CUSTOMER_ID } from "@/lib/dashboard/voxitron";

/** For API routes only Voxitron's own team can use. On failure, return `response` as is. */
export async function requireVoxitronTeam() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, response: NextResponse.json({ error: "Not logged in." }, { status: 401 }) };
  }

  if (!VOXITRON_CUSTOMER_ID) {
    return { ok: false as const, response: NextResponse.json({ error: "Not available yet." }, { status: 403 }) };
  }

  const customers = await getUserCustomers(supabase, user.id);
  const isVoxitronTeam = customers.some((c) => c.id === VOXITRON_CUSTOMER_ID);

  if (!isVoxitronTeam) {
    return { ok: false as const, response: NextResponse.json({ error: "Not available yet." }, { status: 403 }) };
  }

  return { ok: true as const, userId: user.id };
}
