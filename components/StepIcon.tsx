type StepIconProps = {
  icon: "connect" | "catalog" | "handoff" | "sync";
  className?: string;
};

const PATHS: Record<StepIconProps["icon"], React.ReactNode> = {
  connect: (
    <>
      <circle cx="8" cy="8" r="2.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.5 8C3.5 5.5 5.5 3.5 8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M1.5 8C1.5 4.41 4.41 1.5 8 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <path d="M12.5 8C12.5 10.49 10.49 12.5 8 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M14.5 8C14.5 11.59 11.59 14.5 8 14.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    </>
  ),
  catalog: (
    <>
      <rect x="2" y="2.5" width="12" height="11" rx="1.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.8 5.5H11.2M4.8 8H11.2M4.8 10.5H8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  handoff: (
    <>
      <path d="M2 12.5V11C2 9.34 3.34 8 5 8H6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="5.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 6.5L11 8.5L14.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  sync: (
    <>
      <path d="M3 6.5C3.5 4.2 5.5 2.5 8 2.5C10.5 2.5 12.5 4.2 13 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M11 4.5L13 6.5L14.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 9.5C12.5 11.8 10.5 13.5 8 13.5C5.5 13.5 3.5 11.8 3 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M5 11.5L3 9.5L1.5 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export default function StepIcon({ icon, className }: StepIconProps) {
  return (
    <div className={`step-icon-card${className ? ` ${className}` : ""}`} aria-hidden="true">
      <span className="step-icon-badge">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          {PATHS[icon]}
        </svg>
      </span>
    </div>
  );
}
