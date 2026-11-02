import { pageMetadata } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structuredData";

// Every blog post, in the order the blog index shows them. The index, each
// post's metadata and JSON-LD, the sitemap and llms.txt all read this list, so
// a new post needs an entry here before its page will build.

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  // Meta description: keep it under ~155 characters so Google shows all of it.
  description: string;
  // Blog index card copy.
  excerpt: string;
  // Unsplash photo URL without params; blogImage() sizes it per use.
  photo: string;
  imageAlt: string;
  readingTime: string;
  datePublished: string;
  dateModified: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-much-slow-whatsapp-replies-cost-lagos-business",
    category: "WhatsApp Automation",
    title: "How Much Are Slow WhatsApp Replies Costing Your Lagos Business? (2026 Data)",
    description:
      "Nigeria has over 50 million WhatsApp users, but most Lagos businesses still reply in hours. Here's what that delay costs, with real 2026 data.",
    excerpt:
      "Nigeria has over 50 million WhatsApp users. Most businesses still reply in hours. Here's what that gap actually costs, with real 2026 pricing data.",
    photo: "https://images.unsplash.com/photo-1643917567366-5afb8cf4bac9",
    imageAlt: "A smartphone home screen showing the WhatsApp app icon among other messaging apps",
    readingTime: "9 min read",
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
  },
  {
    slug: "lagos-real-estate-diaspora-buyers-time-zones",
    category: "Real Estate",
    title: "Real Estate Agents in Lagos Are Losing Diaspora Buyers to Time Zones, Not Bad Listings",
    description:
      "Nigerian diaspora remittances into real estate are projected to hit $23 billion in 2026. Most agencies lose it to slow replies across time zones.",
    excerpt:
      "Diaspora remittances into Nigerian real estate are projected to hit $23 billion in 2026. Most of that money is being lost to slow replies across time zones.",
    photo: "https://images.unsplash.com/photo-1521791055366-0d553872125f",
    imageAlt: "A modern high-end residential property exterior at dusk",
    readingTime: "10 min read",
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
  },
  {
    slug: "ndpa-2023-whatsapp-business-lagos-smes",
    category: "Compliance",
    title: "NDPA 2023 and Your WhatsApp Business Number: What Lagos SMEs Actually Need to Do",
    description:
      "Nigeria's data protection regulator has collected over ₦7.2 billion in penalties. What NDPA 2023 requires if you automate WhatsApp conversations.",
    excerpt:
      "The NDPC has already collected over ₦7.2 billion in penalties. Here's what the law actually requires if you're automating customer conversations.",
    photo: "https://images.unsplash.com/photo-1643297550841-1386b3a10612",
    imageAlt: "A person signing a compliance document at a desk",
    readingTime: "11 min read",
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
  },
  {
    slug: "nigerian-diagnostic-centres-manual-whatsapp-booking",
    category: "Diagnostic Centres",
    title: "Why Nigerian Diagnostic Centres Still Book Tests by Manual WhatsApp Message",
    description:
      "Major Nigerian diagnostic labs book tests through manual WhatsApp numbers. Where that breaks, and what Africa's 43% no-show rate has to do with it.",
    excerpt:
      "Africa's no-show rate for medical appointments runs as high as 43%. Manual WhatsApp booking is part of why, and part of the fix.",
    photo: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b",
    imageAlt: "A lab technician in gloves using a pipette with sample vials in a diagnostic laboratory",
    readingTime: "10 min read",
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
  },
  {
    slug: "whatsapp-business-messaging-nigeria-statistics",
    category: "WhatsApp Automation",
    title: "Why WhatsApp Is Now the Default Way Nigerians Do Business (Not Just Chat With Friends)",
    description:
      "92% of Nigerians have messaged a business on WhatsApp. New WhatsApp business messaging statistics for Nigeria show it's the default channel, not a backup.",
    excerpt:
      "92% of Nigerians have already messaged a business on WhatsApp. New data shows the channel Nigerian SMEs still treat as secondary is the one customers made primary years ago.",
    photo: "https://images.unsplash.com/photo-1719204718581-5c95889c8ec9",
    imageAlt: "A hand holding a smartphone open to the WhatsApp app inbox",
    readingTime: "9 min read",
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  {
    slug: "whatsapp-catalog-business-nigeria",
    category: "WhatsApp Automation",
    title: "WhatsApp Commerce in Nigeria: What 96% Platform Adoption Means for Retailers Still Taking Orders by DM",
    description:
      "96.5% of Nigerian internet users are on WhatsApp, yet most retailers still take orders by DM. What a real WhatsApp catalog fixes for Nigerian businesses.",
    excerpt:
      "96.5% of Nigerian internet users are on WhatsApp, yet most retailers still take orders by DM, screenshots and all. Here's what a real catalog and automation on top of it actually fixes.",
    photo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    imageAlt:
      "A retail shop attendant taking a customer's order and payment at a checkout counter with a phone in view",
    readingTime: "10 min read",
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  {
    slug: "whatsapp-business-api-pricing-changes-2026",
    category: "WhatsApp Automation",
    title: "WhatsApp Business Pricing Is Changing Again: What It Means for Your Business in 2026",
    description:
      "WhatsApp Business API pricing changes in 2026 bill utility and service messages that used to be free. What changes from October 1, and how to prepare.",
    excerpt:
      "Meta has quietly rebuilt WhatsApp Business Platform pricing twice in fifteen months, and a bigger change lands October 1, 2026 when free service and utility messages start being billed.",
    photo: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
    imageAlt: "A laptop showing business analytics on a desk, set up for reviewing costs and reports",
    readingTime: "9 min read",
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  {
    slug: "cost-of-missed-calls-plumbing-business",
    category: "Home Services",
    title: "The Real Cost of a Missed Call for Plumbers and Electricians in 2026",
    description:
      "The real cost of missed calls for plumbing business owners: 62.2% of calls go unanswered while 78% of customers hire whoever answers first.",
    excerpt:
      "62.2% of business calls go unanswered, and 78% of customers hire whoever responds first. Here's what missed calls actually cost a plumbing or electrical business.",
    photo: "https://images.unsplash.com/photo-1503789146722-cf137a3c0fea",
    imageAlt: "Two pipe wrenches, the tools of a plumbing trade, laid out against a dark background",
    readingTime: "10 min read",
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  {
    slug: "contractor-labor-shortage-response-time",
    category: "Home Services",
    title: "Why Your Plumbing or Electrical Business Can't Answer the Phone Anymore",
    description:
      "92% of contractors can't find qualified workers. 97% of homeowners say response speed decides who they hire. The labor shortage is costing you jobs.",
    excerpt:
      "92% of contractors can't find qualified workers, and 97% of homeowners say response speed decides who they hire. The labor shortage, not laziness, is behind slow response times.",
    photo: "https://images.unsplash.com/photo-1621905251918-48416bd8575a",
    imageAlt: "An electrician working alone on an electrical panel",
    readingTime: "10 min read",
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
];

export function getPost(slug: string): BlogPost {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error(`No blog post registered for "${slug}" in lib/blogPosts.ts`);
  return post;
}

export function blogImage(post: BlogPost, width: number): string {
  return `${post.photo}?fm=jpg&q=80&w=${width}`;
}

export function blogPath(post: BlogPost): string {
  return `/blog/${post.slug}`;
}

// No "| Voxitron" suffix: post titles already run past what Google shows, and
// the site name comes from the WebSite schema instead.
export function blogPostMetadata(post: BlogPost) {
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: blogPath(post),
    image: blogImage(post, 1200),
    article: {
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      section: post.category,
    },
  });
}

export function blogPostJsonLd(post: BlogPost) {
  return [
    articleJsonLd({
      title: post.title,
      description: post.description,
      path: blogPath(post),
      image: blogImage(post, 1200),
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      section: post.category,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: blogPath(post) },
    ]),
  ];
}
