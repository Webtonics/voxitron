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
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ConversationThread({ messages }: { messages: ThreadMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="dashboard-empty-state">
        <p>No messages logged for this conversation yet.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-thread">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`dashboard-thread-group${m.direction === "inbound" ? " is-inbound" : ""}`}
        >
          <span className="ui-msg-label mono">
            {m.direction === "inbound" ? "Customer" : "Voxitron"} &middot; {formatTime(m.sent_at)}
            {m.direction === "outbound" && <Tick className="dashboard-thread-tick" />}
          </span>
          <div className={`ui-msg ${m.direction === "inbound" ? "ui-msg-customer" : "ui-msg-ai"}`}>
            {m.body}
          </div>
        </div>
      ))}
    </div>
  );
}
