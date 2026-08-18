"use client";

import { useState } from "react";
import Link from "next/link";

const SOLUTIONS = [
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
] as const;

type NavProps = {
  activePage?: (typeof SOLUTIONS)[number]["key"];
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
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Site navigation">
      <Link href="/" className="nav-brand" aria-label="Voxitron home">
        VOXITRON
      </Link>
      <div className="nav-links">
        <div
          className={`nav-dropdown${open ? " is-open" : ""}`}
          onMouseLeave={() => setOpen(false)}
        >
          <button
            type="button"
            className="nav-dropdown-trigger"
            aria-expanded={open}
            aria-haspopup="true"
            onClick={() => setOpen((v) => !v)}
            onMouseEnter={() => setOpen(true)}
          >
            <span className={activePage ? "is-active" : undefined}>Solutions</span>
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
                onClick={() => setOpen(false)}
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
        <Link href="/#how-it-works" className="nav-link">How It Works</Link>
        <Link href="/#faq" className="nav-link">FAQ</Link>
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
