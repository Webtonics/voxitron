import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import WaFloat from "@/components/WaFloat";
import "./globals.css";

// Editorial display face: replaces Bricolage Grotesque per
// voxitron-maturity-revamp.md section 2 ("the strongest single signal away
// from AI template"). Headings/section titles reference var(--font-display)
// throughout globals.css, so this is the one place that lever gets pulled.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
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
  metadataBase: new URL("https://voxitron.com"),
  title: "Voxitron: AI Agents for Service Businesses",
  description:
    "Voxitron builds AI agents that respond to leads in seconds, send quotes automatically, and reply on WhatsApp 24/7.",
  robots: "index, follow",
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
    <html lang="en" className={`${fraunces.variable} ${hanken.variable} ${spaceMono.variable}`}>
      <body>
        {children}
        <WaFloat />
        <Analytics />
      </body>
    </html>
  );
}
