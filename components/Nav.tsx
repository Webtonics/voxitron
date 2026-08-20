"use client";

import { useState } from "react";
import Link from "next/link";

const WA_NAV_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20to%20know%20more";

const SOLUTIONS = [
  {
    href: "/whatsapp-agent",
    key: "whatsapp-agent",
    title: "WhatsApp Sales",
    description: "Replies, checks stock, and takes orders inside WhatsApp.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2a6 6 0 0 0-5.15 9.05L2 14l3.06-.8A6 6 0 1 0 8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M5.8 5.9c.1-.3.4-.3.6-.3h.4c.2 0 .3.1.4.3l.4.9c.1.2 0 .4-.1.5l-.4.4c.4.8 1 1.4 1.8 1.8l.4-.4c.1-.1.3-.2.5-.1l.9.4c.2.1.3.2.3.4v.4c0 .2-.1.5-.3.6-.4.3-.9.4-1.4.3-1.6-.4-2.9-1.7-3.3-3.3-.1-.5 0-1 .3-1.4Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "/speed-to-lead",
    key: "speed-to-lead",
    title: "Never Miss a Call",
    description: "Texts back every missed call in under 60 seconds, 24/7.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 2.5C3 2.22 3.22 2 3.5 2H5.5C5.75 2 5.96 2.18 6 2.42L6.6 5.5C6.63 5.68 6.57 5.86 6.44 5.99L4.9 7.53C5.71 9.28 7.22 10.79 8.97 11.6L10.51 10.06C10.64 9.93 10.82 9.87 11 9.9L14.08 10.5C14.32 10.54 14.5 10.75 14.5 11V13C14.5 13.28 14.28 13.5 14 13.5C7.65 13.5 2.5 8.35 2.5 2C2.5 2 3 2.5 3 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/quoting-agent",
    key: "quoting-agent",
    title: "Instant Quotes",
    description: "Collects job details and sends a branded quote automatically.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2h6l2.5 2.5V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M10 2v2.5h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M5 8.5h6M5 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

const INDUSTRIES = [
  {
    href: "/real-estate",
    key: "real-estate",
    title: "Real Estate",
    description: "Replies to enquiries and books viewings automatically.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 7.5L8 3L13.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 6.5V13H12V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M6.5 13V9.5H9.5V13" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/diagnostic-centre",
    key: "diagnostic-centre",
    title: "Diagnostic Centres",
    description: "Books tests and follows up on results, inside WhatsApp.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 2H9.5V5.2L12.5 10.2C13 11.05 12.38 12 11.4 12H4.6C3.62 12 3 11.05 3.5 10.2L6.5 5.2V2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M5.5 2H10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M5.8 9H10.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

type ActivePage = (typeof SOLUTIONS)[number]["key"] | (typeof INDUSTRIES)[number]["key"];

type NavProps = {
  activePage?: ActivePage;
  ctaHref?: string;
  ctaLabel?: string;
  ctaExternal?: boolean;
  /** Hide the secondary "WhatsApp Us" nav CTA, for pages whose primary CTA is already a wa.me link. */
  showWhatsAppCta?: boolean;
};

export default function Nav({
  activePage,
  ctaHref = "/get-started",
  ctaLabel = "Free Trial",
  ctaExternal = false,
  showWhatsAppCta = true,
}: NavProps) {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const isSolutionsActive = SOLUTIONS.some((item) => item.key === activePage);
  const isIndustriesActive = INDUSTRIES.some((item) => item.key === activePage);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSolutionsOpen(false);
    setMobileIndustriesOpen(false);
  };

  return (
    <nav className="site-nav" aria-label="Site navigation">
      <Link href="/" className="nav-brand" aria-label="Voxitron home" onClick={closeMobile}>
        VOXITRON
      </Link>
      <div className="nav-links">
        <div
          className={`nav-dropdown${solutionsOpen ? " is-open" : ""}`}
          onMouseLeave={() => setSolutionsOpen(false)}
        >
          <button
            type="button"
            className="nav-dropdown-trigger"
            aria-expanded={solutionsOpen}
            aria-haspopup="true"
            onClick={() => setSolutionsOpen((v) => !v)}
            onMouseEnter={() => setSolutionsOpen(true)}
          >
            <span className={isSolutionsActive ? "is-active" : undefined}>Solutions</span>
            <svg className="nav-dropdown-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="nav-dropdown-panel" role="menu">
            {SOLUTIONS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`nav-dropdown-item${activePage === item.key ? " is-active" : ""}`}
                role="menuitem"
                onClick={() => setSolutionsOpen(false)}
              >
                <span className="nav-dropdown-icon" aria-hidden="true">{item.icon}</span>
                <span>
                  <span className="nav-dropdown-item-title">{item.title}</span>
                  <span className="nav-dropdown-item-desc">{item.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div
          className={`nav-dropdown${industriesOpen ? " is-open" : ""}`}
          onMouseLeave={() => setIndustriesOpen(false)}
        >
          <button
            type="button"
            className="nav-dropdown-trigger"
            aria-expanded={industriesOpen}
            aria-haspopup="true"
            onClick={() => setIndustriesOpen((v) => !v)}
            onMouseEnter={() => setIndustriesOpen(true)}
          >
            <span className={isIndustriesActive ? "is-active" : undefined}>Industries</span>
            <svg className="nav-dropdown-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="nav-dropdown-panel" role="menu">
            {INDUSTRIES.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`nav-dropdown-item${activePage === item.key ? " is-active" : ""}`}
                role="menuitem"
                onClick={() => setIndustriesOpen(false)}
              >
                <span className="nav-dropdown-icon" aria-hidden="true">{item.icon}</span>
                <span>
                  <span className="nav-dropdown-item-title">{item.title}</span>
                  <span className="nav-dropdown-item-desc">{item.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <Link href="/pricing" className="nav-link">Pricing</Link>
        <Link href="/blog" className="nav-link">Blog</Link>
      </div>
      <div className="nav-cta-group">
        {showWhatsAppCta && (
          <a
            href={WA_NAV_HREF}
            className="nav-cta nav-cta-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
        )}
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
        <button
          type="button"
          className="nav-mobile-toggle"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M3 5H15M3 9H15M3 13H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="nav-mobile-panel" role="menu">
          <button
            type="button"
            className="nav-mobile-group-trigger"
            aria-expanded={mobileSolutionsOpen}
            onClick={() => setMobileSolutionsOpen((v) => !v)}
          >
            <span className={isSolutionsActive ? "is-active" : undefined}>Solutions</span>
            <svg
              className={`nav-dropdown-chevron${mobileSolutionsOpen ? " is-open" : ""}`}
              width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
            >
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {mobileSolutionsOpen && (
            <div className="nav-mobile-sublist">
              {SOLUTIONS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`nav-mobile-sublink${activePage === item.key ? " is-active" : ""}`}
                  role="menuitem"
                  onClick={closeMobile}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          <button
            type="button"
            className="nav-mobile-group-trigger"
            aria-expanded={mobileIndustriesOpen}
            onClick={() => setMobileIndustriesOpen((v) => !v)}
          >
            <span className={isIndustriesActive ? "is-active" : undefined}>Industries</span>
            <svg
              className={`nav-dropdown-chevron${mobileIndustriesOpen ? " is-open" : ""}`}
              width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
            >
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {mobileIndustriesOpen && (
            <div className="nav-mobile-sublist">
              {INDUSTRIES.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`nav-mobile-sublink${activePage === item.key ? " is-active" : ""}`}
                  role="menuitem"
                  onClick={closeMobile}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          <Link href="/pricing" className="nav-mobile-link" role="menuitem" onClick={closeMobile}>Pricing</Link>
          <Link href="/blog" className="nav-mobile-link" role="menuitem" onClick={closeMobile}>Blog</Link>

          {showWhatsAppCta && (
            <a
              href={WA_NAV_HREF}
              className="nav-mobile-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
            >
              WhatsApp Us
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
