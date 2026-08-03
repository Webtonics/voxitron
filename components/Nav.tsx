import Link from "next/link";

const NAV_LINKS = [
  { href: "/speed-to-lead", label: "Speed to Lead", key: "speed-to-lead" },
  { href: "/quoting-agent", label: "Quoting Agent", key: "quoting-agent" },
  { href: "/whatsapp-agent", label: "WhatsApp Agent", key: "whatsapp-agent" },
] as const;

type NavProps = {
  activePage?: (typeof NAV_LINKS)[number]["key"];
  ctaHref?: string;
  ctaLabel?: string;
  ctaExternal?: boolean;
};

export default function Nav({
  activePage,
  ctaHref = "/get-started",
  ctaLabel = "Get Started",
  ctaExternal = false,
}: NavProps) {
  return (
    <nav className="site-nav" aria-label="Site navigation">
      <Link href="/" className="nav-brand" aria-label="Voxitron home">
        VOXITRON
      </Link>
      <div className="nav-links">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={`nav-link${activePage === link.key ? " is-active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {ctaExternal ? (
        <a
          href={ctaHref}
          className="nav-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {ctaLabel}
        </a>
      ) : (
        <Link href={ctaHref} className="nav-cta">
          {ctaLabel}
        </Link>
      )}
    </nav>
  );
}
