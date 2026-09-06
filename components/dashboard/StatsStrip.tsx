export type Stat = {
  number: string;
  label: string;
  icon: "conversations" | "messages" | "reply-time" | "escalations";
  isEmpty?: boolean;
};

function StatIcon({ name }: { name: Stat["icon"] }) {
  const paths: Record<Stat["icon"], React.ReactNode> = {
    conversations: (
      <path
        d="M3 8L5 3H15L17 8M3 8V15C3 15.55 3.45 16 4 16H16C16.55 16 17 15.55 17 15V8M3 8H7.5C7.5 9.38 8.62 10.5 10 10.5C11.38 10.5 12.5 9.38 12.5 8H17"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    ),
    messages: (
      <path
        d="M17 10.5C17 13.54 13.87 16 10 16C9.28 16 8.58 15.92 7.94 15.76L4 17L5.1 13.87C3.81 12.75 3 11.19 3 9.5C3 6.46 6.13 4 10 4C13.87 4 17 6.46 17 9.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
    "reply-time": (
      <>
        <circle cx="10" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M10 7V10.5L12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 3.5H12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
    escalations: (
      <path
        d="M10 3L17 16H3L10 3Z M10 8.5V11.5 M10 13.5V13.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  };

  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="stats-grid dashboard-stats-grid">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`dashboard-metric-tile${stat.isEmpty ? " is-empty" : ""}`}
        >
          <span className="dashboard-metric-tile-icon">
            <StatIcon name={stat.icon} />
          </span>
          <span className="dashboard-metric-tile-number mono">{stat.number}</span>
          <p className="dashboard-metric-tile-label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
