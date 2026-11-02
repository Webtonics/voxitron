"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GoogleAnalytics from "@/components/GoogleAnalytics";

type Consent = "granted" | "denied";

const STORAGE_KEY = "vx-analytics-consent";

// CookieSettingsButton in the footer fires this to reopen the banner, so
// withdrawing consent is as easy as giving it.
export const OPEN_COOKIE_SETTINGS_EVENT = "vx:open-cookie-settings";

// No banner and no GA where the URL itself is private: /takeover/<token> is a
// 48-hour bearer link, /reset-password arrives with a one-time code, and
// dashboard URLs carry customer conversation ids. GA records the full page
// URL. Those pages are always reached by a full page load (a WhatsApp link,
// an email link, window.location after login), so GA is never already running.
const PRIVATE_PATH_PREFIXES = ["/dashboard", "/takeover", "/login", "/forgot-password", "/reset-password"];

// Fallback when storage is blocked (private mode): the choice then holds for
// this visit only.
let memoryConsent: Consent | null = null;
const listeners = new Set<() => void>();

function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    // Storage blocked, fall through to this visit's in-memory choice.
  }
  return memoryConsent;
}

function saveConsent(value: Consent) {
  memoryConsent = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked, memoryConsent above still covers this visit.
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
}

// undefined on the server and during hydration: the choice lives in the
// browser, so the server render shows nothing and the banner can't flash
// for someone who already chose.
const getServerConsent = () => undefined;

/** Expires GA's own cookies (_ga, _ga_<id>) on both the host and the parent domain GA writes to. */
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const parentDomain = `.${host.split(".").slice(-2).join(".")}`;

  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name.startsWith("_ga"))
    .forEach((name) => {
      for (const domain of ["", `; domain=${host}`, `; domain=${parentDomain}`]) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
      }
    });
}

export default function CookieConsent() {
  const pathname = usePathname();
  const consent = useSyncExternalStore<Consent | null | undefined>(subscribe, readConsent, getServerConsent);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const open = consent === null || reopened;

  function choose(value: Consent) {
    const withdrawing = consent === "granted" && value === "denied";
    saveConsent(value);
    setReopened(false);

    // GA is already running on this page, and the only way to stop it is to
    // clear its cookies and load the page again without it.
    if (withdrawing) {
      clearAnalyticsCookies();
      window.location.reload();
    }
  }

  if (consent === undefined) return null;
  if (PRIVATE_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  return (
    <>
      {consent === "granted" && <GoogleAnalytics />}
      {open && (
        <div className="cookie-banner" role="region" aria-label="Cookie preferences">
          <p className="cookie-banner-text">
            Can we use Google Analytics cookies to see which pages help? No ads, nothing
            sold. <Link href="/privacy">Privacy Policy</Link>
          </p>
          <div className="cookie-banner-actions">
            <button type="button" className="btn btn-primary" onClick={() => choose("granted")}>
              Allow
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => choose("denied")}>
              No thanks
            </button>
          </div>
        </div>
      )}
    </>
  );
}
