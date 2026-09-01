"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ConversationList, { type ConversationListItem } from "@/components/dashboard/ConversationList";
import ConversationThread, { type ThreadMessage } from "@/components/dashboard/ConversationThread";

export default function Inbox({
  conversations,
}: {
  conversations: ConversationListItem[];
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
      <div className="dashboard-empty-state">
        <p>No conversations yet. Once your WhatsApp agent is live, conversations will show up here.</p>
        <p style={{ marginTop: "var(--space-3)" }}>
          <Link href="/dashboard/knowledge-base" className="dashboard-empty-state-link">
            Add to your knowledge base
          </Link>{" "}
          so your agent is ready to answer questions.
        </p>
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
              <ConversationThread messages={messages} />
            )}
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
