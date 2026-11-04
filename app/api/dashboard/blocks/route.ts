import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireVoxitronTeam } from "@/lib/dashboard/teamAuth";
import { providerById } from "@/lib/blocks/registry";
import { encryptSecret } from "@/lib/blocks/secrets";
import { connectionFrom, problemMessage, TOOL_COLUMNS, type ToolRow } from "@/lib/blocks/store";

// The Build screen's "Test and save". A customer_tools row is a live, working
// connection (see 014_customer_tools.sql), so a connection that fails its test
// is never saved: the team sees why, right there, with the customer on the call.
export async function POST(request: Request) {
  const auth = await requireVoxitronTeam();
  if (!auth.ok) return auth.response;

  let body: { customerId?: unknown; provider?: unknown; fields?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const customerId = typeof body.customerId === "string" ? body.customerId : "";
  const provider = typeof body.provider === "string" ? providerById(body.provider) : undefined;
  const fields = (typeof body.fields === "object" && body.fields ? body.fields : {}) as Record<string, string>;

  if (!customerId || !provider) {
    return NextResponse.json({ error: "A customer and a tool are required." }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: existing } = await admin
    .from("customer_tools")
    .select(TOOL_COLUMNS)
    .eq("customer_id", customerId)
    .eq("block", provider.block)
    .maybeSingle<ToolRow>();

  let config: Record<string, string>;
  let credentials: ToolRow["credentials"];

  try {
    config = provider.parseConfig(fields);

    // Left empty on an existing connection, a secret field keeps what's stored.
    const secretField = provider.fields.find((field) => field.secret);
    const typedSecret = secretField ? (fields[secretField.key] || "").trim() : "";
    if (typedSecret) {
      credentials = { secret: encryptSecret(typedSecret) };
    } else {
      credentials = existing?.tool_name === provider.id ? existing.credentials : {};
    }

    await provider.check(connectionFrom({ config, credentials }));
  } catch (error) {
    return NextResponse.json({ error: problemMessage(error) }, { status: 400 });
  }

  const now = new Date().toISOString();
  const { error: saveError } = await admin.from("customer_tools").upsert(
    {
      customer_id: customerId,
      block: provider.block,
      tool_name: provider.id,
      config,
      credentials,
      status: "connected",
      last_error: null,
      last_checked_at: now,
      updated_at: now,
    },
    { onConflict: "customer_id,block" }
  );

  if (saveError) {
    console.error("Failed to save a tool connection:", saveError);
    return NextResponse.json({ error: "It works, but couldn't be saved. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const auth = await requireVoxitronTeam();
  if (!auth.ok) return auth.response;

  let body: { customerId?: unknown; block?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body.customerId !== "string" || typeof body.block !== "string") {
    return NextResponse.json({ error: "A customer and a block are required." }, { status: 400 });
  }

  const { error } = await createAdminClient()
    .from("customer_tools")
    .delete()
    .eq("customer_id", body.customerId)
    .eq("block", body.block);

  if (error) {
    console.error("Failed to remove a tool connection:", error);
    return NextResponse.json({ error: "Couldn't remove it. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
