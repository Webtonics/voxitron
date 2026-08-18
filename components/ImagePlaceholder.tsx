type ImagePlaceholderProps = {
  label: string;
  className?: string;
};

export default function ImagePlaceholder({ label, className }: ImagePlaceholderProps) {
  return (
    <div className={`img-placeholder${className ? ` ${className}` : ""}`} role="img" aria-label={label}>
      <span className="img-placeholder-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="3.5" width="15" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="6.8" cy="7.5" r="1.3" stroke="currentColor" strokeWidth="1.3" />
          <path d="M2.5 13.5L7 9.5L10.5 12.5L13.5 9.5L17.5 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="img-placeholder-label">{label}</span>
    </div>
  );
}
