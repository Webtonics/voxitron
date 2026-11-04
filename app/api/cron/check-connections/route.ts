import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { providerById } from "@/lib/blocks/registry";
import { connectionFrom, problemMessage, recordHealth, TOOL_COLUMNS, type ToolRow } from "@/lib/blocks/store";
import { sendConnectionAlertEmail } from "@/lib/email";

// Vercel Cron runs this every night (see vercel.json), sending CRON_SECRET as a
// bearer token. A customer unsharing their sheet shouldn't first show up as
// their agent giving worse answers, so every connection gets tested, and the
// team hears about any that just broke.
export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET;
  if (!expected || request.headers.get("authorization") !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { data: rows, error } = await createAdminClient()
    .from("customer_tools")
    .select(`${TOOL_COLUMNS}, customers(business_name)`)
    .neq("status", "disconnected")
    .returns<(ToolRow & { customers: { business_name: string } | null })[]>();

  if (error) {
    console.error("Failed to load tool connections to check:", error);
    return NextResponse.json({ error: "Couldn't load connections." }, { status: 500 });
  }

  const newlyBroken: { businessName: string; tool: string; problem: string }[] = [];

  for (const row of rows || []) {
    const provider = providerById(row.tool_name);
    if (!provider) continue;

    let problem: string | null = null;
    try {
      await provider.check(connectionFrom(row));
    } catch (checkError) {
      problem = problemMessage(checkError);
    }

    await recordHealth(row.id, problem);

    if (problem && row.status !== "error") {
      newlyBroken.push({ businessName: row.customers?.business_name || row.customer_id, tool: provider.label, problem });
    }
  }

  if (newlyBroken.length > 0) await sendConnectionAlertEmail(newlyBroken);

  return NextResponse.json({ ok: true, checked: rows?.length || 0, newlyBroken: newlyBroken.length });
}
