"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/CookieConsent";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="footer-link-button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      Cookie settings
    </button>
  );
}
