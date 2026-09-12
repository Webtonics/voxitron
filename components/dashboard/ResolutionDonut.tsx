export default function ResolutionDonut({
  agentCount,
  humanCount,
}: {
  agentCount: number;
  humanCount: number;
}) {
  const total = agentCount + humanCount;

  if (total === 0) {
    return (
      <div className="dashboard-empty-state" style={{ textAlign: "left" }}>
        <p>Nothing to hand over yet.</p>
      </div>
    );
  }

  const agentShare = agentCount / total;
  const agentPercent = Math.round(agentShare * 100);
  const circumference = 100;
  const agentDash = agentShare * circumference;
  const humanDash = circumference - agentDash;

  return (
    <div className="dashboard-donut-wrap">
      <div className="dashboard-donut" role="img" aria-label={`${agentPercent}% of conversations handled by the agent on its own`}>
        <svg viewBox="0 0 42 42" width="150" height="150">
          <circle cx="21" cy="21" r="15.9" fill="none" stroke="#E7E3DA" strokeWidth="6" />
          <circle
            cx="21"
            cy="21"
            r="15.9"
            fill="none"
            stroke="#0E7C6B"
            strokeWidth="6"
            strokeDasharray={`${agentDash} ${humanDash}`}
            strokeDashoffset="25"
            strokeLinecap="round"
          />
          <circle
            cx="21"
            cy="21"
            r="15.9"
            fill="none"
            stroke="#E8890C"
            strokeWidth="6"
            strokeDasharray={`${humanDash} ${agentDash}`}
            strokeDashoffset={25 - agentDash}
            strokeLinecap="round"
          />
        </svg>
        <div className="dashboard-donut-mid">
          <span className="dashboard-donut-mid-pct mono">{agentPercent}%</span>
          <span className="dashboard-donut-mid-label">by the agent</span>
        </div>
      </div>
      <div className="dashboard-donut-list">
        <div className="dashboard-donut-row">
          <span className="dashboard-donut-key">
            <span className="dashboard-donut-swatch" style={{ background: "var(--teal)" }} />
            Agent, on its own
          </span>
          <span className="dashboard-donut-value mono">{agentCount}</span>
        </div>
        <div className="dashboard-donut-row">
          <span className="dashboard-donut-key">
            <span className="dashboard-donut-swatch" style={{ background: "var(--amber)" }} />
            Passed to you
          </span>
          <span className="dashboard-donut-value mono">{humanCount}</span>
        </div>
      </div>
    </div>
  );
}
