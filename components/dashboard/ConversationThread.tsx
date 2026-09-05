import Tick from "@/components/Tick";

export type ThreadMessage = {
  id: string;
  direction: "inbound" | "outbound";
  body: string;
  sent_at: string;
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
