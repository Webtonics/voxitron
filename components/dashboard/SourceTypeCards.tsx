"use client";

export type SourceTypeOption = {
  value: string;
  label: string;
  hint: string;
};

function SourceTypeIcon({ value }: { value: string }) {
  const paths: Record<string, React.ReactNode> = {
    paste: (
      <>
        <path d="M8 4h8a1 1 0 011 1v1h-10V5a1 1 0 011-1z" />
        <rect x="5" y="6" width="14" height="15" rx="1.5" />
        <path d="M9 11h6M9 14h6M9 17h3.5" />
      </>
    ),
    website: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.5 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.5-3.6-8.5S9.6 5.9 12 3.5z" />
      </>
    ),
    file: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4" />
        <path d="M10 13h4M10 16h4" />
      </>
    ),
    sheet: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="1.5" />
        <path d="M4 9.5h16M9.5 4v16" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[value] || paths.file}
    </svg>
  );
}

export default function SourceTypeCards({
  name,
  options,
  value,
  onChange,
}: {
  name?: string;
  options: SourceTypeOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="dashboard-source-cards" role="radiogroup" aria-label="Where it comes from">
      {name && <input type="hidden" name={name} value={value} />}
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          className={`dashboard-source-card${option.value === value ? " is-selected" : ""}`}
          onClick={() => onChange(option.value)}
        >
          <span className="dashboard-source-card-icon" aria-hidden="true">
            <SourceTypeIcon value={option.value} />
          </span>
          <span className="dashboard-source-card-body">
            <span className="dashboard-source-card-label">{option.label}</span>
            <span className="dashboard-source-card-hint">{option.hint}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
