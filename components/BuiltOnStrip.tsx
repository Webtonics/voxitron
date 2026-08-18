const INFRA = [
  { name: "WhatsApp Business Platform" },
  { name: "Meta Cloud API" },
  { name: "OpenAI" },
] as const;

export default function BuiltOnStrip() {
  return (
    <div className="built-on-strip" aria-label="Infrastructure Voxitron's agents run on">
      <div className="built-on-inner">
        <span className="built-on-label">Built on</span>
        <div className="built-on-items">
          {INFRA.map((item) => (
            <span key={item.name} className="built-on-item">
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
