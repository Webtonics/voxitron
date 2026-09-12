export type ChecklistItem = { label: string; done: boolean };

export default function EmptyState({
  icon,
  title,
  body,
  checklist,
  primaryAction,
  secondaryAction,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  checklist?: ChecklistItem[];
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}) {
  return (
    <div className="dashboard-empty-hero">
      <div className="dashboard-empty-hero-halo" aria-hidden="true">
        {icon}
      </div>
      <p className="dashboard-empty-hero-title">{title}</p>
      <p className="dashboard-empty-hero-body">{body}</p>

      {checklist && checklist.length > 0 && (
        <ul className="dashboard-empty-checklist">
          {checklist.map((item) => (
            <li
              key={item.label}
              className={`dashboard-empty-checklist-item${item.done ? " is-done" : ""}`}
            >
              <span className={`tick${item.done ? " is-done" : ""}`} aria-hidden="true">
                &#10003;&#10003;
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      )}

      {(primaryAction || secondaryAction) && (
        <div className="dashboard-empty-hero-cta">
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
