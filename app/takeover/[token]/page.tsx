import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateTakeoverToken } from "@/lib/dashboard/takeoverAuth";
import TakeoverThread from "@/components/TakeoverThread";
import type { ThreadMessage } from "@/components/dashboard/ConversationThread";

export const metadata: Metadata = {
  title: "Take Over Conversation | Voxitron",
  robots: { index: false, follow: false },
};

export default async function TakeoverPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const validation = await validateTakeoverToken(token);

  if (!validation.ok) {
    const reason =
      validation.reason === "expired"
        ? "This link has expired."
        : validation.reason === "revoked"
          ? "This link has been closed out."
          : "This link isn't valid.";

    return (
      <main className="login-page">
        <div className="login-card">
          <a href="/" className="login-wordmark" aria-label="Voxitron home">
            VOXITRON
          </a>
          <h1 className="login-title">{reason}</h1>
          <p className="login-sub">
            Takeover links expire after a while for security. Ask for a fresh one, or log in
            to the dashboard to see this conversation.
          </p>
        </div>
      </main>
    );
  }

  const admin = createAdminClient();

  const { data: conversation } = await admin
    .from("conversations")
    .select("id, contact_name, contact_phone, needs_human, escalation_reason, ai_paused")
    .eq("id", validation.conversationId)
    .single();

  const { data: messages } = await admin
    .from("messages")
    .select("id, direction, body, sent_at, type")
    .eq("conversation_id", validation.conversationId)
    .order("sent_at", { ascending: true })
    .returns<ThreadMessage[]>();

  if (!conversation) {
    return (
      <main className="login-page">
        <div className="login-card">
          <a href="/" className="login-wordmark" aria-label="Voxitron home">
            VOXITRON
          </a>
          <h1 className="login-title">Conversation not found.</h1>
        </div>
      </main>
    );
  }

  return (
    <TakeoverThread
      token={token}
      contactName={conversation.contact_name}
      contactPhone={conversation.contact_phone}
      needsHuman={conversation.needs_human}
      escalationReason={conversation.escalation_reason}
      aiPaused={conversation.ai_paused}
      initialMessages={messages || []}
    />
  );
}
