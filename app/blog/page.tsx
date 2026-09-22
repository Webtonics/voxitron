import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog | Voxitron",
  description:
    "Research and data on WhatsApp automation in Nigeria and missed-call costs for UK/US trades businesses, for owners deciding whether to automate customer response.",
  alternates: { canonical: "https://voxitron.com/blog" },
};

const POSTS = [
  {
    slug: "how-much-slow-whatsapp-replies-cost-lagos-business",
    category: "WhatsApp Automation",
    title: "How Much Are Slow WhatsApp Replies Costing Your Lagos Business? (2026 Data)",
    excerpt:
      "Nigeria has over 50 million WhatsApp users. Most businesses still reply in hours. Here's what that gap actually costs, with real 2026 pricing data.",
    image: "https://images.unsplash.com/photo-1643917567366-5afb8cf4bac9?fm=jpg&q=80&w=900&auto=format&fit=crop",
    imageAlt: "A smartphone home screen showing the WhatsApp app icon among other messaging apps",
    readingTime: "9 min read",
  },
  {
    slug: "lagos-real-estate-diaspora-buyers-time-zones",
    category: "Real Estate",
    title: "Real Estate Agents in Lagos Are Losing Diaspora Buyers to Time Zones, Not Bad Listings",
    excerpt:
      "Diaspora remittances into Nigerian real estate are projected to hit $23 billion in 2026. Most of that money is being lost to slow replies across time zones.",
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?fm=jpg&q=80&w=900&auto=format&fit=crop",
    imageAlt: "A modern high-end residential property exterior at dusk",
    readingTime: "10 min read",
  },
  {
    slug: "ndpa-2023-whatsapp-business-lagos-smes",
    category: "Compliance",
    title: "NDPA 2023 and Your WhatsApp Business Number: What Lagos SMEs Actually Need to Do",
    excerpt:
      "The NDPC has already collected over ₦7.2 billion in penalties. Here's what the law actually requires if you're automating customer conversations.",
    image: "https://images.unsplash.com/photo-1643297550841-1386b3a10612?fm=jpg&q=80&w=900&auto=format&fit=crop",
    imageAlt: "A person signing a compliance document at a desk",
    readingTime: "11 min read",
  },
  {
    slug: "nigerian-diagnostic-centres-manual-whatsapp-booking",
    category: "Diagnostic Centres",
    title: "Why Nigerian Diagnostic Centres Still Book Tests by Manual WhatsApp Message",
    excerpt:
      "Africa's no-show rate for medical appointments runs as high as 43%. Manual WhatsApp booking is part of why, and part of the fix.",
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?fm=jpg&q=80&w=900&auto=format&fit=crop",
    imageAlt: "A lab technician in gloves using a pipette with sample vials in a diagnostic laboratory",
    readingTime: "10 min read",
  },
  {
    slug: "whatsapp-business-messaging-nigeria-statistics",
    category: "WhatsApp Automation",
    title: "Why WhatsApp Is Now the Default Way Nigerians Do Business (Not Just Chat With Friends)",
    excerpt:
      "92% of Nigerians have already messaged a business on WhatsApp. New data shows the channel Nigerian SMEs still treat as secondary is the one customers made primary years ago.",
    image: "https://images.unsplash.com/photo-1719204718581-5c95889c8ec9?fm=jpg&q=80&w=900&auto=format&fit=crop",
    imageAlt: "A hand holding a smartphone open to the WhatsApp app inbox",
    readingTime: "9 min read",
  },
  {
    slug: "whatsapp-catalog-business-nigeria",
    category: "WhatsApp Automation",
    title: "WhatsApp Commerce in Nigeria: What 96% Platform Adoption Means for Retailers Still Taking Orders by DM",
    excerpt:
      "96.5% of Nigerian internet users are on WhatsApp, yet most retailers still take orders by DM, screenshots and all. Here's what a real catalog and automation on top of it actually fixes.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?fm=jpg&q=80&w=900&auto=format&fit=crop",
    imageAlt: "A retail shop attendant taking a customer's order and payment at a checkout counter with a phone in view",
    readingTime: "10 min read",
  },
  {
    slug: "whatsapp-business-api-pricing-changes-2026",
    category: "WhatsApp Automation",
    title: "WhatsApp Business Pricing Is Changing Again: What It Means for Your Business in 2026",
    excerpt:
      "Meta has quietly rebuilt WhatsApp Business Platform pricing twice in fifteen months, and a bigger change lands October 1, 2026 when free service and utility messages start being billed.",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?fm=jpg&q=80&w=900&auto=format&fit=crop",
    imageAlt: "A laptop showing business analytics on a desk, set up for reviewing costs and reports",
    readingTime: "9 min read",
  },
  {
    slug: "cost-of-missed-calls-plumbing-business",
    category: "Home Services",
    title: "The Real Cost of a Missed Call for Plumbers and Electricians in 2026",
    excerpt:
      "62.2% of business calls go unanswered, and 78% of customers hire whoever responds first. Here's what missed calls actually cost a plumbing or electrical business.",
    image: "https://images.unsplash.com/photo-1503789146722-cf137a3c0fea?fm=jpg&q=80&w=900&auto=format&fit=crop",
    imageAlt: "Two pipe wrenches, the tools of a plumbing trade, laid out against a dark background",
    readingTime: "10 min read",
  },
  {
    slug: "contractor-labor-shortage-response-time",
    category: "Home Services",
    title: "Why Your Plumbing or Electrical Business Can't Answer the Phone Anymore",
    excerpt:
      "92% of contractors can't find qualified workers, and 97% of homeowners say response speed decides who they hire. The labor shortage, not laziness, is behind slow response times.",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?fm=jpg&q=80&w=900&auto=format&fit=crop",
    imageAlt: "An electrician working alone on an electrical panel",
    readingTime: "10 min read",
  },
] as const;

export default function BlogIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <div className="blog-hero">
          <span className="section-label">RESEARCH &amp; DATA</span>
          <h1 className="hero-title">The Voxitron Blog</h1>
          <p className="section-body">
            Real numbers on WhatsApp automation in Nigeria and response-speed data for UK and US trades
            businesses, for owners deciding whether to automate customer response.
          </p>
        </div>

        <div className="blog-grid">
          {POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-image">
                <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 720px) 100vw, 50vw" />
              </div>
              <div className="blog-card-body">
                <span className="blog-card-meta">{post.category} &middot; {post.readingTime}</span>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
