export type BarItem = { label: string; count: number; tag?: string };

export default function MessageTypeBars({ items }: { items: BarItem[] }) {
  const max = Math.max(1, ...items.map((i) => i.count));

  return (
    <div className="dashboard-hbars">
      {items.map((item) => (
        <div className="dashboard-hbar" key={item.label}>
          <div className="dashboard-hbar-top">
            <span>
              {item.label}
              {item.tag && <span className="dashboard-tag-mini mono">{item.tag}</span>}
            </span>
            <span className="dashboard-hbar-value mono">{item.count}</span>
          </div>
          <div className="dashboard-track">
            <div
              className={`dashboard-fill${item.tag ? " is-amber" : ""}`}
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
