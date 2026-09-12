export type MetricCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  tone?: "amber" | "teal";
  sub?: string;
  delta?: { label: string; positive?: boolean };
  isEmpty?: boolean;
};

export default function MetricCard({
  icon,
  value,
  label,
  tone = "amber",
  sub,
  delta,
  isEmpty = false,
}: MetricCardProps) {
  return (
    <div className={`dashboard-metric-card dashboard-metric-card-${tone}${isEmpty ? " is-empty" : ""}`}>
      <span className="dashboard-metric-card-icon" aria-hidden="true">
        {icon}
      </span>
      {delta && (
        <span className={`dashboard-metric-card-delta${delta.positive === false ? " is-flat" : ""}`}>
          {delta.label}
        </span>
      )}
      <span className={`dashboard-metric-card-value mono${isEmpty ? " is-empty" : ""}`}>{value}</span>
      <p className="dashboard-metric-card-label">{label}</p>
      {sub && !isEmpty && <p className="dashboard-metric-card-sub mono">{sub}</p>}
    </div>
  );
}
