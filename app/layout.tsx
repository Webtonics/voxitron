import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Space_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/JsonLd";
import WaFloat from "@/components/WaFloat";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { siteJsonLd } from "@/lib/structuredData";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-4MHZ2D7DDF";

// Display face per voxitron-brand-foundation section 4. Headings/section
// titles reference var(--font-display) throughout globals.css, so this is the
// one place that lever gets pulled.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Voxitron: AI Agents for Service Businesses",
  description:
    "Voxitron builds AI agents that respond to leads in seconds, send quotes automatically, and reply on WhatsApp 24/7.",
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${hanken.variable} ${spaceMono.variable}`}>
      <body>
        <JsonLd data={siteJsonLd()} />
        {children}
        <WaFloat />
        <Analytics />
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
      </body>
    </html>
  );
}
