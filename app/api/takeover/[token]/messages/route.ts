import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateTakeoverToken } from "@/lib/dashboard/takeoverAuth";

// Lets the takeover page poll for new messages without a Supabase session
// (the browser client + RLS isn't available here, there's no logged-in
// user). Token-scoped to exactly the one conversation it was issued for.
export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const validation = await validateTakeoverToken(token);

  if (!validation.ok) {
    return NextResponse.json({ error: "This link is no longer valid." }, { status: 401 });
  }

  const admin = createAdminClient();

  const [{ data: messages }, { data: conversation }] = await Promise.all([
    admin
      .from("messages")
      .select("id, direction, body, sent_at, type")
      .eq("conversation_id", validation.conversationId)
      .order("sent_at", { ascending: true }),
    admin
      .from("conversations")
      .select("ai_paused, needs_human, escalation_reason")
      .eq("id", validation.conversationId)
      .single(),
  ]);

  return NextResponse.json({
    messages: messages || [],
    aiPaused: conversation?.ai_paused ?? false,
    needsHuman: conversation?.needs_human ?? false,
    escalationReason: conversation?.escalation_reason ?? null,
  });
}
