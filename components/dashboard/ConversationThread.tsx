import Tick from "@/components/Tick";

export type ThreadMessage = {
  id: string;
  direction: "inbound" | "outbound";
  body: string;
  sent_at: string;
  type?: "text" | "voice" | "photo";
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function VoiceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3z" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M21 17l-5-5-8 7" />
    </svg>
  );
}

export default function ConversationThread({
  messages,
  escalationReason,
}: {
  messages: ThreadMessage[];
  escalationReason?: string | null;
}) {
  if (messages.length === 0) {
    return (
      <div className="dashboard-empty-state">
        <p>No messages logged for this conversation yet.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-thread">
      {escalationReason && (
        <div className="dashboard-empty-state" style={{ textAlign: "left" }}>
          <p>Flagged for you: {escalationReason}</p>
        </div>
      )}
      {messages.map((m) => (
        <div
          key={m.id}
          className={`dashboard-thread-group${m.direction === "inbound" ? " is-inbound" : ""}`}
        >
          {m.type === "voice" && (
            <span className="dashboard-thread-caption">
              <VoiceIcon /> Voice note, transcribed
            </span>
          )}
          {m.type === "photo" && (
            <span className="dashboard-thread-caption">
              <PhotoIcon /> Photo read
            </span>
          )}
          <div className={`thread-msg ${m.direction === "inbound" ? "thread-msg-in" : "thread-msg-out"}`}>
            {m.body}
            <span className="thread-msg-time mono">
              {formatTime(m.sent_at)}
              {m.direction === "outbound" && <Tick />}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
