type WhatIconProps = {
  icon: "clock" | "chat" | "calendar" | "envelope" | "message" | "document";
};

const PATHS: Record<WhatIconProps["icon"], React.ReactNode> = {
  clock: (
    <>
      <circle cx="8" cy="8" r="6.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 4.8V8L10.2 9.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  chat: (
    <>
      <path
        d="M2 8.2C2 5.05 4.69 2.5 8 2.5C11.31 2.5 14 5.05 14 8.2C14 11.35 11.31 13.9 8 13.9C7.02 13.9 6.1 13.68 5.29 13.28L2.5 14L3.3 11.6C2.48 10.68 2 9.49 2 8.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  calendar: (
    <>
      <rect x="2" y="3" width="12" height="11" rx="1.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 6.3H14" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 1.7V4.3M11 1.7V4.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M4.8 9H6.3M9.7 9H11.2M4.8 11.5H6.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  envelope: (
    <>
      <rect x="2" y="4" width="12" height="8.5" rx="1.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.6 4.9L8 8.7L13.4 4.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  message: (
    <>
      <rect x="2" y="3" width="12" height="10" rx="1.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.8 6H11.2M4.8 8.5H9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9.8 13V15L12 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  document: (
    <>
      <path d="M4 2H9.5L12.5 5V14H4V2Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 2V5H12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 8H10.5M6 10.3H10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
};

export default function WhatIcon({ icon }: WhatIconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {PATHS[icon]}
    </svg>
  );
}
