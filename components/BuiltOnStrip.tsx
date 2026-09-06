type Infra = { name: string; icon: React.ReactNode };

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 2C6.48 2 2 6.48 2 12c0 1.87.51 3.63 1.4 5.13L2 22l5.03-1.32A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.4 8.2c.15-.4.55-.4.85-.4h.55c.3 0 .4.15.55.4l.6 1.3c.15.3 0 .6-.15.75l-.55.55c.6 1.2 1.5 2.1 2.7 2.7l.55-.55c.15-.15.45-.3.75-.15l1.3.6c.25.15.4.3.4.55v.55c0 .3-.15.7-.4.85-.6.4-1.3.55-2 .4-2.4-.55-4.3-2.45-4.85-4.85-.15-.7 0-1.4.4-2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MetaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6.5 4.5C4 4.5 2 8.2 2 12.7c0 3 1.2 4.8 2.8 4.8 1.7 0 2.7-1.6 4.4-4.6.5-.9 1-1.9 1.5-2.8.5.9 1 1.9 1.5 2.8 1.7 3 2.7 4.6 4.4 4.6 1.6 0 2.8-1.8 2.8-4.8 0-4.5-2-8.2-4.5-8.2-1.6 0-2.7 1.4-4.2 3.9-1.5-2.5-2.6-3.9-4.2-3.9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OpenAIIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M13.5 3.5c1.9-.7 4 .1 5 1.9.6 1 .7 2.1.5 3.2 1 .6 1.7 1.6 1.9 2.8.3 1.9-.6 3.8-2.3 4.8.3 1.9-.6 3.9-2.4 4.8-1.9.9-4.1.5-5.5-.9-1 .7-2.3.9-3.5.5-1.9-.6-3.2-2.3-3.3-4.2-1-.6-1.7-1.6-1.9-2.8-.3-1.9.6-3.8 2.3-4.8-.3-1.9.6-3.9 2.4-4.8 1.9-.9 4.1-.5 5.5.9.4-.3.9-.6 1.3-.8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

const INFRA: Infra[] = [
  { name: "WhatsApp Business Platform", icon: <WhatsAppIcon /> },
  { name: "Meta Cloud API", icon: <MetaIcon /> },
  { name: "OpenAI", icon: <OpenAIIcon /> },
];

export default function BuiltOnStrip() {
  return (
    <div className="built-on-strip" aria-label="Infrastructure Voxitron's agents run on">
      <div className="built-on-inner">
        <span className="built-on-label">Built on</span>
        <div className="built-on-items">
          {INFRA.map((item) => (
            <span key={item.name} className="built-on-item">
              <span className="built-on-item-icon">{item.icon}</span>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
