import { after, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { providerById } from "@/lib/blocks/registry";
import { connectionFrom, problemMessage, recordHealth, TOOL_COLUMNS, type ToolRow } from "@/lib/blocks/store";
import type { BlockId, Connection, Provider } from "@/lib/blocks/types";

// What the WhatsApp agent's tools call (n8n's "Check Stock", "Find Booking
// Slots", "Book Slot" and "Save Contact" nodes), so it's protected by a shared
// secret rather than a Supabase session, same as /api/takeover/issue.
// customerId and phone are fixed by n8n from the incoming message, never chosen
// by the AI, so nothing a customer types can reach another business's tools.
//
// Answers are written for the AI to act on, so problems come back as a 200 with
// a sentence it can relay. It must never guess because a tool failed.

type Fields = Record<string, string>;

const TOOLS: Record<
  string,
  { block: BlockId; notConnected: string; trouble: string; run(provider: Provider, connection: Connection, fields: Fields): Promise<string> | null }
> = {
  "check-stock": {
    block: "stock",
    notConnected: "No live stock source is connected for this business. Use the knowledge base instead.",
    trouble: "Can't check live stock right now. Don't guess: say the team will confirm.",
    run: (provider, connection, fields) =>
      provider.block === "stock" ? provider.search(connection, fields.query) : null,
  },
  "find-slots": {
    block: "bookings",
    notConnected: "No calendar is connected for this business. Collect their details and say the team will confirm.",
    trouble: "Can't check the calendar right now. Collect their details and say the team will confirm.",
    run: (provider, connection, fields) =>
      provider.block === "bookings" ? provider.findSlots(connection, { from: fields.from, to: fields.to }) : null,
  },
  "book-slot": {
    block: "bookings",
    notConnected: "Not booked: no calendar is connected for this business. Collect their details and say the team will confirm.",
    trouble: "Not booked: the calendar isn't working right now. Collect their details and say the team will confirm.",
    run: (provider, connection, fields) =>
      provider.block === "bookings"
        ? provider.bookSlot(connection, {
            date: fields.date,
            time: fields.time,
            name: fields.name,
            phone: fields.phone,
            note: fields.note,
          })
        : null,
  },
  "save-contact": {
    block: "crm",
    notConnected: "No customer records system is connected for this business. Carry on, nothing else is needed.",
    trouble: "Couldn't save this customer's details. Carry on with the conversation, don't mention it.",
    run: (provider, connection, fields) =>
      provider.block === "crm"
        ? provider.saveContact(connection, {
            name: fields.name,
            phone: fields.phone,
            email: fields.email,
            note: fields.note,
          })
        : null,
  },
};

export async function POST(request: Request, { params }: { params: Promise<{ tool: string }> }) {
  const secret = request.headers.get("x-voxitron-n8n-secret");
  if (!secret || secret !== process.env.VOXITRON_N8N_SHARED_SECRET) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { tool: toolName } = await params;
  const tool = TOOLS[toolName];
  if (!tool) {
    return NextResponse.json({ error: "Unknown tool." }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const customerId = typeof body.customerId === "string" ? body.customerId : "";
  if (!customerId) {
    return NextResponse.json({ error: "customerId is required." }, { status: 400 });
  }

  const fields: Fields = Object.fromEntries(
    ["query", "from", "to", "date", "time", "name", "profileName", "phone", "email", "note"].map((key) => [
      key,
      typeof body[key] === "string" ? (body[key] as string).trim() : "",
    ])
  );
  // WhatsApp sends numbers as bare digits, and the name the customer gave beats their profile name.
  fields.phone = fields.phone.replace(/^(?=\d)/, "+");
  fields.name = fields.name || fields.profileName;

  const { data: row, error } = await createAdminClient()
    .from("customer_tools")
    .select(TOOL_COLUMNS)
    .eq("customer_id", customerId)
    .eq("block", tool.block)
    .neq("status", "disconnected")
    .maybeSingle<ToolRow>();

  if (error) {
    console.error("Failed to load a customer's tool connection:", error);
    return NextResponse.json({ ok: false, message: tool.trouble });
  }

  const provider = row ? providerById(row.tool_name) : undefined;
  if (!row || !provider) {
    return NextResponse.json({ ok: false, message: tool.notConnected });
  }

  try {
    const message = await tool.run(provider, connectionFrom(row), fields);
    if (message === null) {
      return NextResponse.json({ ok: false, message: tool.notConnected });
    }

    // Only a repair needs writing. The nightly check keeps last_checked_at fresh.
    if (row.status === "error") after(() => recordHealth(row.id, null));
    return NextResponse.json({ ok: true, message });
  } catch (toolError) {
    const problem = problemMessage(toolError);
    after(() => recordHealth(row.id, problem));
    return NextResponse.json({ ok: false, message: tool.trouble });
  }
}
