import { Fragment } from "react";

export type ConversationListItem = {
  id: string;
  contact_name: string | null;
  contact_phone: string;
  needs_human: boolean;
  is_lead?: boolean;
  resolved?: boolean;
  ai_paused?: boolean;
  latest_message_body: string | null;
  latest_message_at: string | null;
  latest_message_type?: "text" | "voice" | "photo";
};

function bucketFor(iso: string | null, now: number) {
  if (!iso) return "Older";
  const date = new Date(iso);
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const today = startOfDay(new Date(now));
  const day = startOfDay(date);
  const diffDays = Math.round((today - day) / 86400000);

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "This week";
  return "Older";
}

const BUCKET_ORDER = ["Today", "Yesterday", "This week", "Older"];

function groupByBucket(conversations: ConversationListItem[]) {
  const now = Date.now();
  const groups = new Map<string, ConversationListItem[]>();

  for (const c of conversations) {
    if (c.needs_human) continue;
    const bucket = bucketFor(c.latest_message_at, now);
    if (!groups.has(bucket)) groups.set(bucket, []);
    groups.get(bucket)!.push(c);
  }

  return BUCKET_ORDER.filter((b) => groups.has(b)).map((b) => ({ bucket: b, items: groups.get(b)! }));
}

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

function ConversationRow({
  c,
  selectedId,
  onSelect,
}: {
  c: ConversationListItem;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(c.id)}
        className={`dashboard-conversation-row${c.needs_human ? " needs-human" : ""}${c.id === selectedId ? " is-selected" : ""}`}
      >
        <div className="dashboard-conversation-row-main">
          <span className="dashboard-conversation-avatar" aria-hidden="true">
            {initialsFor(c.contact_name, c.contact_phone)}
          </span>
          <span className="dashboard-conversation-row-name">{c.contact_name || c.contact_phone}</span>
          {c.needs_human && <span className="dashboard-badge-needs-you">Needs you</span>}
        </div>
        {c.latest_message_body && (
          <p className="dashboard-conversation-row-preview">{c.latest_message_body}</p>
        )}
        {c.latest_message_at && (
          <span className="dashboard-conversation-row-time">
            {timeAgo(c.latest_message_at)}
            {c.latest_message_type === "voice" && (
              <span className="dashboard-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3z" />
                  <path d="M5 11a7 7 0 0014 0M12 18v3" />
                </svg>
                voice
              </span>
            )}
            {c.latest_message_type === "photo" && (
              <span className="dashboard-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="9" cy="11" r="2" />
                  <path d="M21 17l-5-5-8 7" />
                </svg>
                photo
              </span>
            )}
          </span>
        )}
      </button>
    </li>
  );
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
  const needsYou = conversations.filter((c) => c.needs_human);
  const buckets = groupByBucket(conversations);

  return (
    <ul className="dashboard-conversation-list">
      {needsYou.length > 0 && (
        <>
          <li className="dashboard-conversation-bucket" aria-hidden="true">
            Needs you
          </li>
          {needsYou.map((c) => (
            <ConversationRow key={c.id} c={c} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </>
      )}
      {buckets.map(({ bucket, items }) => (
        <Fragment key={bucket}>
          <li className="dashboard-conversation-bucket" aria-hidden="true">
            {bucket}
          </li>
          {items.map((c) => (
            <ConversationRow key={c.id} c={c} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </Fragment>
      ))}
    </ul>
  );
}
