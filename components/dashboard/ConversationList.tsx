export type ConversationListItem = {
  id: string;
  contact_name: string | null;
  contact_phone: string;
  needs_human: boolean;
  latest_message_body: string | null;
  latest_message_at: string | null;
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function initialsFor(name: string | null, phone: string) {
  if (name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
  }
  return phone.slice(-2);
}

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: ConversationListItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="dashboard-conversation-list">
      {conversations.map((c) => (
        <li key={c.id}>
          <button
            type="button"
            onClick={() => onSelect(c.id)}
            className={`dashboard-conversation-row${c.needs_human ? " needs-human" : ""}${c.id === selectedId ? " is-selected" : ""}`}
          >
            <div className="dashboard-conversation-row-main">
              <span className="dashboard-conversation-avatar" aria-hidden="true">
                {initialsFor(c.contact_name, c.contact_phone)}
              </span>
              <span className="dashboard-conversation-row-name">
                {c.contact_name || c.contact_phone}
              </span>
              {c.needs_human && <span className="dashboard-badge-needs-you">Needs you</span>}
            </div>
            {c.latest_message_body && (
              <p className="dashboard-conversation-row-preview">{c.latest_message_body}</p>
            )}
            {c.latest_message_at && (
              <span className="dashboard-conversation-row-time">{timeAgo(c.latest_message_at)}</span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
