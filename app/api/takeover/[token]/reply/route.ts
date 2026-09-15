import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateTakeoverToken } from "@/lib/dashboard/takeoverAuth";

// Sends an owner's reply straight to the customer on WhatsApp, from the
// no-login /takeover/[token] page. Calls Meta's Graph API directly (same
// approach n8n uses) rather than routing through n8n, so a reply doesn't
// depend on n8n being reachable. See supabase/migrations/024_conversation_takeover.sql
// and project memory "project_takeover_flow" for why this exists.
export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const validation = await validateTakeoverToken(token);

  if (!validation.ok) {
    return NextResponse.json({ error: "This link is no longer valid." }, { status: 401 });
  }

  let body: { message?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "A message is required." }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: conversation, error: conversationError } = await admin
    .from("conversations")
    .select("id, contact_phone, whatsapp_number_id, customer_whatsapp_numbers(whatsapp_number)")
    .eq("id", validation.conversationId)
    .single();

  if (conversationError || !conversation) {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }

  const phoneNumberId = (
    conversation.customer_whatsapp_numbers as unknown as { whatsapp_number: string } | null
  )?.whatsapp_number;

  if (!phoneNumberId) {
    return NextResponse.json(
      { error: "This conversation has no connected WhatsApp number to reply from." },
      { status: 500 }
    );
  }

  const metaResponse = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: conversation.contact_phone,
      type: "text",
      text: { body: message },
    }),
  });

  if (!metaResponse.ok) {
    const errorBody = await metaResponse.text();
    console.error("Failed to send a takeover reply via WhatsApp:", errorBody);

    await admin.from("messages").insert({
      conversation_id: conversation.id,
      direction: "outbound",
      body: `[DELIVERY FAILED] ${message}`,
    });

    return NextResponse.json({ error: "Couldn't send that message. Try again." }, { status: 502 });
  }

  await admin.from("messages").insert({
    conversation_id: conversation.id,
    direction: "outbound",
    body: message,
  });

  // Pausing on every owner reply, not just the first, keeps this correct
  // even if the AI is somehow already unpaused mid-conversation (e.g. a
  // "Give back to agent" fired right before this request landed).
  await admin
    .from("conversations")
    .update({ ai_paused: true, ai_paused_at: new Date().toISOString() })
    .eq("id", conversation.id);

  return NextResponse.json({ ok: true });
}
