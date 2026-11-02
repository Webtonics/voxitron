"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-4MHZ2D7DDF";

// GA records the full page URL, so it never loads where the URL itself is
// private: /takeover/<token> is a 48-hour bearer link, /reset-password arrives
// with a one-time code, and dashboard URLs carry customer conversation ids.
// Those pages are always reached by a full page load (a WhatsApp link, an
// email link, window.location after login), so GA is never already running.
const PRIVATE_PATH_PREFIXES = ["/dashboard", "/takeover", "/login", "/forgot-password", "/reset-password"];

export default function GoogleAnalytics() {
  const pathname = usePathname();

  if (PRIVATE_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
