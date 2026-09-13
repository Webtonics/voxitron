function formatReplyTime(seconds: number | null) {
  if (seconds === null) return "Not tracked yet";
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export default function InboxCalmState({
  handledThisWeek,
  leadsCaptured,
  avgReplySeconds,
}: {
  handledThisWeek: number;
  leadsCaptured: number;
  avgReplySeconds: number | null;
}) {
  return (
    <div className="dashboard-inbox-calm">
      <div className="dashboard-inbox-calm-halo" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>
      <h2>Nothing needs you right now</h2>
      <p>
        Your agent is handling every open conversation and nothing is waiting on a person. We&apos;ll
        move a chat here the moment one needs you.
      </p>
      <div className="dashboard-inbox-calm-stats">
        <div className="dashboard-inbox-calm-stat">
          <div className="dashboard-inbox-calm-stat-value">{handledThisWeek}</div>
          <div className="dashboard-inbox-calm-stat-label">handled this week</div>
        </div>
        <div className="dashboard-inbox-calm-stat">
          <div className="dashboard-inbox-calm-stat-value">{leadsCaptured}</div>
          <div className="dashboard-inbox-calm-stat-label">leads captured</div>
        </div>
        <div className="dashboard-inbox-calm-stat">
          <div className="dashboard-inbox-calm-stat-value">{formatReplyTime(avgReplySeconds)}</div>
          <div className="dashboard-inbox-calm-stat-label">avg reply</div>
        </div>
      </div>
    </div>
  );
}
