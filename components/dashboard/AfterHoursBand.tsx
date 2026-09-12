export type HourBucket = { hour: number; count: number; afterHours: boolean };

const HOUR_LABELS = ["6a", "9a", "12p", "3p", "6p", "9p", "12a"];

export default function AfterHoursBand({
  afterHoursCount,
  totalLeads,
  busiestWindow,
  hours,
  usingAssumedHours,
}: {
  afterHoursCount: number;
  totalLeads: number;
  busiestWindow: string | null;
  hours: HourBucket[];
  usingAssumedHours: boolean;
}) {
  if (totalLeads === 0) {
    return null;
  }

  const max = Math.max(1, ...hours.map((h) => h.count));

  return (
    <div className="dashboard-band">
      <div className="dashboard-band-copy">
        <span className="dashboard-band-eyebrow mono">The messages you would have missed</span>
        <h2 className="dashboard-band-headline">
          <b>{afterHoursCount} of {totalLeads}</b> leads came in after you closed. The agent
          booked them anyway.
        </h2>
        <p className="dashboard-band-sub">
          {busiestWindow
            ? `Busiest window was ${busiestWindow}. No one was at the desk. Every one got a reply in seconds.`
            : "No one was at the desk. Every one got a reply in seconds."}
          {usingAssumedHours && " Business hours assumed as 8am to 6pm until you set yours in Settings."}
        </p>
      </div>
      <div>
        <div className="dashboard-hours-chart">
          {hours.map((h) => (
            <div
              key={h.hour}
              className={`dashboard-hours-bar${h.afterHours ? " is-off" : ""}`}
              style={{ height: `${Math.max(5, (h.count / max) * 100)}%` }}
              data-value={h.count}
            />
          ))}
        </div>
        <div className="dashboard-hours-axis mono">
          {HOUR_LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
