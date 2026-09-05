"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ConversationList, { type ConversationListItem } from "@/components/dashboard/ConversationList";
import ConversationThread, { type ThreadMessage } from "@/components/dashboard/ConversationThread";

export type ExtendedConversationListItem = ConversationListItem & {
  escalation_reason: string | null;
};

export default function Inbox({
  conversations,
  numberConnected,
  knowledgeBaseLoaded,
  agentConfigured,
}: {
  conversations: ExtendedConversationListItem[];
  numberConnected: boolean;
  knowledgeBaseLoaded: boolean;
  agentConfigured: boolean;
}) {
  const searchParams = useSearchParams();
  const openParam = searchParams.get("open");
  const initialId =
    (openParam && conversations.some((c) => c.id === openParam) ? openParam : null) ||
    conversations[0]?.id ||
    null;

  const [selectedId, setSelectedId] = useState<string | null>(initialId);
  const [messages, setMessages] = useState<ThreadMessage[]>([]);
  // Which conversation `messages` actually belongs to. Comparing this to
  // selectedId (instead of a separate imperative `loading` boolean flipped
  // at the top of the effect) avoids a synchronous setState at effect start.
  const [loadedForId, setLoadedForId] = useState<string | null>(null);

  const selected = conversations.find((c) => c.id === selectedId) || null;
  const loading = selectedId !== null && selectedId !== loadedForId;

  useEffect(() => {
    if (!selectedId) return;

    let cancelled = false;

    async function loadMessages() {
      const supabase = createClient();
      const { data } = await supabase
        .from("messages")
        .select("id, direction, body, sent_at")
        .eq("conversation_id", selectedId)
        .order("sent_at", { ascending: true });

      if (!cancelled) {
        setMessages(data || []);
        setLoadedForId(selectedId);
      }
    }

    loadMessages();
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  if (conversations.length === 0) {
    return (
      <div className="dashboard-empty-hero">
        <p className="dashboard-empty-hero-title">Your agent is live</p>
        <p className="dashboard-empty-hero-body">
          It&apos;s watching your WhatsApp number for messages, day and night. Conversations
          will show up here the moment the first one comes in.
        </p>
        <p className="dashboard-empty-hero-nudge">
          Send a message to your own WhatsApp Business number now to see it reply.
        </p>
        <ul className="dashboard-empty-checklist">
          <li className={`dashboard-empty-checklist-item${numberConnected ? " is-done" : ""}`}>
            <span className={`tick${numberConnected ? " is-done" : ""}`} aria-hidden="true">
              &#10003;&#10003;
            </span>
            Number connected
          </li>
          <li className={`dashboard-empty-checklist-item${knowledgeBaseLoaded ? " is-done" : ""}`}>
            <span className={`tick${knowledgeBaseLoaded ? " is-done" : ""}`} aria-hidden="true">
              &#10003;&#10003;
            </span>
            Knowledge base loaded
          </li>
          <li className={`dashboard-empty-checklist-item${agentConfigured ? " is-done" : ""}`}>
            <span className={`tick${agentConfigured ? " is-done" : ""}`} aria-hidden="true">
              &#10003;&#10003;
            </span>
            Agent trained on your business
          </li>
        </ul>
        {!knowledgeBaseLoaded && (
          <p style={{ marginTop: "var(--space-5)" }}>
            <Link href="/dashboard/knowledge-base" className="dashboard-empty-state-link">
              Add to your knowledge base
            </Link>{" "}
            so your agent is ready to answer questions.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="dashboard-inbox">
      <div className="dashboard-inbox-list">
        <ConversationList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      <div className="dashboard-inbox-thread">
        {selected ? (
          <>
            <div className="dashboard-inbox-thread-header">
              <span className="dashboard-inbox-thread-name">
                {selected.contact_name || selected.contact_phone}
              </span>
              {selected.needs_human && <span className="dashboard-badge-needs-you">Needs you</span>}
            </div>
            {loading ? (
              <div className="dashboard-empty-state dashboard-inbox-thread-loading">
                <p>Loading...</p>
              </div>
            ) : (
              <ConversationThread messages={messages} escalationReason={selected.escalation_reason} />
            )}
            <div className="dashboard-thread-footer">
              <span className="dashboard-thread-footer-status">
                <span className="dashboard-thread-footer-dot" aria-hidden="true" />
                AI is handling this chat
              </span>
              <button type="button" className="btn btn-outline">
                Take over
              </button>
            </div>
          </>
        ) : (
          <div className="dashboard-empty-state dashboard-inbox-thread-loading">
            <p>Select a conversation to see its messages.</p>
          </div>
        )}
      </div>
    </div>
  );
}
