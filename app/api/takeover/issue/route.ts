import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateTakeoverToken, hashTakeoverToken, TAKEOVER_TOKEN_TTL_HOURS } from "@/lib/dashboard/takeoverTokens";

// Called by n8n's "Notify Business Owner" step (not a browser), so this is
// protected by a shared secret header rather than a Supabase session --
// there is no logged-in user on this request at all. Mints a fresh,
// single-conversation token and returns the full link to send on WhatsApp/
// email. See supabase/migrations/024_conversation_takeover.sql.
export async function POST(request: Request) {
  const secret = request.headers.get("x-voxitron-n8n-secret");
  if (!secret || secret !== process.env.VOXITRON_N8N_SHARED_SECRET) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { conversationId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const conversationId = typeof body.conversationId === "string" ? body.conversationId : "";
  if (!conversationId) {
    return NextResponse.json({ error: "conversationId is required." }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: conversation, error: conversationError } = await admin
    .from("conversations")
    .select("id")
    .eq("id", conversationId)
    .single();

  if (conversationError || !conversation) {
    return NextResponse.json({ error: "No conversation found with that id." }, { status: 404 });
  }

  const token = generateTakeoverToken();
  const expiresAt = new Date(Date.now() + TAKEOVER_TOKEN_TTL_HOURS * 60 * 60 * 1000).toISOString();

  const { error: insertError } = await admin.from("conversation_takeover_tokens").insert({
    conversation_id: conversationId,
    token_hash: hashTakeoverToken(token),
    expires_at: expiresAt,
  });

  if (insertError) {
    console.error("Failed to create a takeover token:", insertError);
    return NextResponse.json({ error: "Couldn't create a takeover link. Try again." }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  return NextResponse.json({
    url: `${siteUrl}/takeover/${token}`,
    expiresAt,
  });
}
