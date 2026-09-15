import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateTakeoverToken } from "@/lib/dashboard/takeoverAuth";

// "Give back to agent" from the no-login takeover page: clears ai_paused
// so n8n's AI Agent Reply resumes on this conversation. Does not revoke
// the token itself -- the owner may want to take over again later from the
// same link, within its normal expiry.
export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const validation = await validateTakeoverToken(token);

  if (!validation.ok) {
    return NextResponse.json({ error: "This link is no longer valid." }, { status: 401 });
  }

  const admin = createAdminClient();

  const { error } = await admin
    .from("conversations")
    .update({ ai_paused: false, ai_paused_at: null, needs_human: false })
    .eq("id", validation.conversationId);

  if (error) {
    console.error("Failed to give a conversation back to the agent:", error);
    return NextResponse.json({ error: "Couldn't update this conversation. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
