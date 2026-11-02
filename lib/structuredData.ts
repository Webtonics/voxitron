import {
  absoluteUrl,
  CONTACT_EMAIL,
  FOUNDER_NAME,
  SITE_NAME,
  SITE_SUMMARY,
  SITE_URL,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
} from "@/lib/site";

// schema.org builders. Every node points back to the one Organization by @id,
// so Google and AI engines read the whole site as a single entity.

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const ORGANIZATION_REF = { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL };

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/assets/images/voxitron_logo.png"),
        },
        description: SITE_SUMMARY,
        email: CONTACT_EMAIL,
        founder: { "@type": "Person", name: FOUNDER_NAME },
        address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: WHATSAPP_NUMBER,
          email: CONTACT_EMAIL,
          url: WHATSAPP_URL,
          availableLanguage: "English",
        },
        parentOrganization: {
          "@type": "Organization",
          name: "Digitalwebtonics",
          url: "https://digitalwebtonics.com",
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_SUMMARY,
        inLanguage: "en",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

type ServiceSeo = {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  // Only set where the page itself names the market.
  areaServed?: string;
};

export function serviceJsonLd({ name, description, path, serviceType, areaServed }: ServiceSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: ORGANIZATION_REF,
    ...(areaServed && { areaServed: { "@type": "Country", name: areaServed } }),
  };
}

export type FaqItem = { question: string; answer: string };

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

type ArticleSeo = {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified: string;
  section: string;
};

export function articleJsonLd({ title, description, path, image, datePublished, dateModified, section }: ArticleSeo) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    image,
    datePublished,
    dateModified,
    articleSection: section,
    inLanguage: "en",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": WEBSITE_ID },
    author: ORGANIZATION_REF,
    publisher: {
      ...ORGANIZATION_REF,
      logo: { "@type": "ImageObject", url: absoluteUrl("/assets/images/voxitron_logo.png") },
    },
  };
}
