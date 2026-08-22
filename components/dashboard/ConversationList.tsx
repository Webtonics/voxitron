import Link from "next/link";

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

export default function ConversationList({
  conversations,
  customerQuery,
}: {
  conversations: ConversationListItem[];
  customerQuery: string;
}) {
  if (conversations.length === 0) {
    return (
      <div className="dashboard-empty-state">
        <p>No conversations yet. Once your WhatsApp agent is live, conversations will show up here.</p>
      </div>
    );
  }

  return (
    <ul className="dashboard-conversation-list">
      {conversations.map((c) => (
        <li key={c.id}>
          <Link
            href={`/dashboard/conversations/${c.id}${customerQuery}`}
            className={`dashboard-conversation-row${c.needs_human ? " needs-human" : ""}`}
          >
            <div className="dashboard-conversation-row-main">
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
          </Link>
        </li>
      ))}
    </ul>
  );
}
