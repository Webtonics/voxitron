"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import ConversationThread, { type ThreadMessage } from "@/components/dashboard/ConversationThread";

const POLL_INTERVAL_MS = 4000;

export default function TakeoverThread({
  token,
  contactName,
  contactPhone,
  needsHuman: initialNeedsHuman,
  escalationReason: initialEscalationReason,
  aiPaused: initialAiPaused,
  initialMessages,
}: {
  token: string;
  contactName: string | null;
  contactPhone: string;
  needsHuman: boolean;
  escalationReason: string | null;
  aiPaused: boolean;
  initialMessages: ThreadMessage[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [needsHuman, setNeedsHuman] = useState(initialNeedsHuman);
  const [escalationReason, setEscalationReason] = useState(initialEscalationReason);
  const [aiPaused, setAiPaused] = useState(initialAiPaused);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [givingBack, setGivingBack] = useState(false);
  const [error, setError] = useState("");
  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch(`/api/takeover/${token}/messages`);
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (cancelled) return;
        setMessages(data.messages || []);
        setAiPaused(Boolean(data.aiPaused));
        setNeedsHuman(Boolean(data.needsHuman));
        setEscalationReason(data.escalationReason ?? null);
      } catch {
        // Silent: a transient poll failure just tries again next interval,
        // no need to interrupt someone mid-reply with a network error.
      }
    }

    const interval = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [token]);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = draft.trim();
    if (!message || sending) return;

    setSending(true);
    setError("");

    try {
      const res = await fetch(`/api/takeover/${token}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Couldn't send that message. Try again.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          direction: "outbound",
          body: message,
          sent_at: new Date().toISOString(),
          type: "text",
        },
      ]);
      setAiPaused(true);
      setDraft("");
    } finally {
      setSending(false);
    }
  }

  async function handleGiveBack() {
    setGivingBack(true);
    setError("");
    try {
      const res = await fetch(`/api/takeover/${token}/give-back`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Couldn't give this back to the agent. Try again.");
        return;
      }
      setAiPaused(false);
      setNeedsHuman(false);
    } finally {
      setGivingBack(false);
    }
  }

  return (
    <main className="takeover-page">
      <div className="takeover-card">
        <div className="takeover-header">
          <a href="/" className="login-wordmark" aria-label="Voxitron home">
            VOXITRON
          </a>
          <div className="takeover-header-contact">
            <span className="dashboard-inbox-thread-name">{contactName || contactPhone}</span>
            <span className="dashboard-conversation-row-time mono">{contactPhone}</span>
          </div>
        </div>

        {needsHuman && (
          <div className="dashboard-empty-state" style={{ textAlign: "left" }}>
            <p>Flagged for you: {escalationReason || "needs review"}</p>
          </div>
        )}

        <div className="takeover-thread">
          <ConversationThread messages={messages} escalationReason={null} />
          <div ref={threadEndRef} />
        </div>

        <div className="dashboard-thread-footer">
          <span className="dashboard-thread-footer-status">
            <span
              className="dashboard-thread-footer-dot"
              style={{ background: aiPaused ? "var(--accent)" : "var(--teal)" }}
              aria-hidden="true"
            />
            {aiPaused ? "You're handling this chat" : "AI is handling this chat"}
          </span>
          {aiPaused && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleGiveBack}
              disabled={givingBack}
            >
              {givingBack ? "Giving back..." : "Give back to agent"}
            </button>
          )}
        </div>

        <form className="takeover-composer" onSubmit={handleSend}>
          <input
            type="text"
            className="lead-form-input"
            placeholder="Type a reply..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={sending}
            autoFocus
          />
          <button type="submit" className="btn btn-primary" disabled={sending || !draft.trim()}>
            {sending ? "Sending..." : "Send"}
          </button>
        </form>

        {error && (
          <p className="lead-form-error" role="alert">
            {error}
          </p>
        )}

        <p className="takeover-footnote">
          Replying here pauses your AI agent on this one conversation. Everyone else keeps
          getting instant replies as normal.
        </p>
      </div>
    </main>
  );
}
