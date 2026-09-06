import Tick from "@/components/Tick";

export type PhoneMockupMessage = {
  from: "in" | "out";
  text: string;
  time: string;
};

type PhoneMockupProps = {
  contactName: string;
  contactInitials: string;
  status?: string;
  messages: PhoneMockupMessage[];
};

export default function PhoneMockup({
  contactName,
  contactInitials,
  status = "online",
  messages,
}: PhoneMockupProps) {
  return (
    <div className="phone-frame" aria-hidden="true">
      <div className="phone-notch"></div>
      <div className="phone-screen">
        <div className="wa-header">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 3.5L6 9L11.5 14.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="wa-avatar">{contactInitials}</span>
          <span className="wa-header-info">
            <span className="wa-header-name">{contactName}</span>
            <span className="wa-header-status">{status}</span>
          </span>
          <span className="wa-header-icons">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4.5C2 3.67 2.67 3 3.5 3H9.5C10.33 3 11 3.67 11 4.5V11.5C11 12.33 10.33 13 9.5 13H3.5C2.67 13 2 12.33 2 11.5V4.5Z" stroke="#FFFFFF" strokeWidth="1.1" />
              <path d="M11 6.5L14.5 4.5V11.5L11 9.5" stroke="#FFFFFF" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3.5C2 2.95 2.45 2.5 3 2.5H4.4C4.87 2.5 5.28 2.83 5.38 3.29L5.86 5.5C5.95 5.92 5.79 6.36 5.44 6.61L4.4 7.36C5.09 8.94 6.06 9.91 7.64 10.6L8.39 9.56C8.64 9.21 9.08 9.05 9.5 9.14L11.71 9.62C12.17 9.72 12.5 10.13 12.5 10.6V12C12.5 12.55 12.05 13 11.5 13C6.25 13 2 8.75 2 3.5Z" stroke="#FFFFFF" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <div className="wa-body wa-body-mockup">
          <div className="thread-body">
            {messages.map((m, i) => (
              <div key={i} className={`thread-msg thread-msg-mockup ${m.from === "in" ? "thread-msg-in" : "thread-msg-out"}`}>
                {m.text}
                <span className="thread-msg-time mono">
                  {m.time}
                  {m.from === "out" && <Tick />}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="wa-input-bar">
          <span className="wa-input-pill">Message</span>
          <span className="wa-send-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="#0B0F19" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
      <div className="phone-home-indicator"></div>
    </div>
  );
}
