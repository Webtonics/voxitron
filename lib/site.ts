import type { Metadata } from "next";

// One place for how Voxitron describes itself to search engines and AI
// crawlers. Page metadata, JSON-LD, the sitemap and llms.txt all read from
// here, so the facts can't drift apart between them.

export const SITE_URL = "https://voxitron.com";
export const SITE_NAME = "Voxitron";
export const CONTACT_EMAIL = "hello@voxitron.com";
export const WHATSAPP_NUMBER = "+2348120907050";
export const WHATSAPP_URL = "https://wa.me/2348120907050";
export const FOUNDER_NAME = "Emmanuel Ezema";
export const SITE_SUMMARY =
  "Voxitron builds AI agents that reply, book, quote, and sell for busy service businesses, 24/7, on the WhatsApp number and phone line they already use.";

// Served by app/opengraph-image.tsx.
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Voxitron: never leave a customer on read",
};

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

type PageSeo = {
  title: string;
  description: string;
  path: string;
  // Link previews (WhatsApp, LinkedIn, X) can carry punchier copy than the SERP.
  socialTitle?: string;
  socialDescription?: string;
  image?: string;
  article?: { publishedTime: string; modifiedTime: string; section: string };
};

export function pageMetadata({
  title,
  description,
  path,
  socialTitle = title,
  socialDescription = description,
  image,
  article,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image, alt: socialTitle }] : [DEFAULT_OG_IMAGE];
  const shared = {
    title: socialTitle,
    description: socialDescription,
    url,
    siteName: SITE_NAME,
    images,
  };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: article
      ? {
          ...shared,
          type: "article",
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          section: article.section,
        }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images,
    },
  };
}

export const NOINDEX: Metadata["robots"] = { index: false, follow: false };

type SitePage = { path: string; name: string; summary: string };

// Every public, indexable page outside /blog/* and /compare/* (those list
// themselves from lib/blogPosts.ts and lib/compareData.ts). The sitemap and
// llms.txt both read this, so a new marketing page needs one entry here.
export const SITE_SECTIONS: { title: string; pages: SitePage[] }[] = [
  {
    title: "Agents",
    pages: [
      {
        path: "/whatsapp-agent",
        name: "WhatsApp Business Agent",
        summary:
          "Replies to customers, checks stock and prices, books appointments, and takes orders inside WhatsApp, 24/7. Built for Nigerian businesses.",
      },
      {
        path: "/speed-to-lead",
        name: "Speed to Lead Agent",
        summary:
          "Texts back every missed call in under 60 seconds, 24/7, qualifies the lead, and books the appointment. Built for UK and US trades businesses.",
      },
      {
        path: "/quoting-agent",
        name: "Automated Quoting Agent",
        summary:
          "Collects job details and sends a branded, professional quote by SMS or email, 24/7. Built for UK and US trades businesses.",
      },
    ],
  },
  {
    title: "Industries",
    pages: [
      {
        path: "/real-estate",
        name: "Real estate agents and brokers",
        summary:
          "Answers every missed listing enquiry in under 60 seconds, qualifies the buyer, and books viewings.",
      },
      {
        path: "/diagnostic-centre",
        name: "Diagnostic centres and labs",
        summary:
          "Books tests, answers pricing questions, and tells patients when results are ready, inside WhatsApp.",
      },
      {
        path: "/retail",
        name: "Retailers and shop owners",
        summary:
          "Answers stock and price questions and takes orders inside WhatsApp, so staff stop retyping the same reply.",
      },
      {
        path: "/ecommerce",
        name: "E-commerce brands",
        summary:
          "Confirms orders, answers 'where is my order' automatically, and recovers abandoned carts inside WhatsApp.",
      },
    ],
  },
  {
    title: "Company",
    pages: [
      { path: "/", name: "Home", summary: "Overview of Voxitron and its three AI agents." },
      {
        path: "/about",
        name: "About Voxitron",
        summary: `Lagos-based team founded by ${FOUNDER_NAME}. Data isolated per business, built with Nigeria's NDPA 2023 in mind.`,
      },
      {
        path: "/get-started",
        name: "Get started",
        summary:
          "Message Voxitron on WhatsApp and watch the agent reply live. Try it for 2 weeks and only pay the next month if it books.",
      },
      {
        path: "/contact",
        name: "Contact",
        summary: `Reach Voxitron on WhatsApp (${WHATSAPP_NUMBER}) or at ${CONTACT_EMAIL}, or book a free discovery call.`,
      },
      {
        path: "/compare",
        name: "Compare Voxitron",
        summary:
          "Honest comparisons against hiring a receptionist, a DIY n8n build, generic chatbot SaaS, and GoHighLevel-reseller agencies.",
      },
      {
        path: "/tools/missed-lead-calculator",
        name: "Missed lead calculator",
        summary:
          "Estimates what slow WhatsApp replies cost a business, and what a reply under 60 seconds could realistically recover.",
      },
      { path: "/blog", name: "Blog", summary: "Sourced research on WhatsApp automation in Nigeria and missed-call costs for trades." },
      {
        path: "/privacy",
        name: "Privacy policy",
        summary: "How Voxitron collects, stores, and protects data, including WhatsApp messages its agents process.",
      },
    ],
  },
];
