type Stat = { number: string; label: string };

export default function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="stats-grid dashboard-stats-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-item">
          <span className="stat-number">{stat.number}</span>
          <p className="stat-label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
