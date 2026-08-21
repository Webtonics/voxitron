import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";

export const metadata: Metadata = {
  title: "Blog | Voxitron",
  description:
    "Research and data on WhatsApp automation, Lagos real estate, diagnostic centres, and Nigeria's data protection law, for businesses deciding whether to automate customer response.",
  alternates: { canonical: "https://voxitron.com/blog" },
};

const POSTS = [
  {
    slug: "how-much-slow-whatsapp-replies-cost-lagos-business",
    category: "WhatsApp Automation",
    title: "How Much Are Slow WhatsApp Replies Costing Your Lagos Business? (2026 Data)",
    excerpt:
      "Nigeria has over 50 million WhatsApp users. Most businesses still reply in hours. Here's what that gap actually costs, with real 2026 pricing data.",
    image: "https://images.unsplash.com/photo-1643917567366-5afb8cf4bac9?fm=jpg&q=80&w=800",
    readingTime: "9 min read",
  },
  {
    slug: "lagos-real-estate-diaspora-buyers-time-zones",
    category: "Real Estate",
    title: "Real Estate Agents in Lagos Are Losing Diaspora Buyers to Time Zones, Not Bad Listings",
    excerpt:
      "Diaspora remittances into Nigerian real estate are projected to hit $23 billion in 2026. Most of that money is being lost to slow replies across time zones.",
    image: "https://images.unsplash.com/photo-1643297550841-1386b3a10612?fm=jpg&q=80&w=800",
    readingTime: "10 min read",
  },
  {
    slug: "ndpa-2023-whatsapp-business-lagos-smes",
    category: "Compliance",
    title: "NDPA 2023 and Your WhatsApp Business Number: What Lagos SMEs Actually Need to Do",
    excerpt:
      "The NDPC has already collected over ₦7.2 billion in penalties. Here's what the law actually requires if you're automating customer conversations.",
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?fm=jpg&q=80&w=800",
    readingTime: "11 min read",
  },
  {
    slug: "nigerian-diagnostic-centres-manual-whatsapp-booking",
    category: "Diagnostic Centres",
    title: "Why Nigerian Diagnostic Centres Still Book Tests by Manual WhatsApp Message",
    excerpt:
      "Africa's no-show rate for medical appointments runs as high as 43%. Manual WhatsApp booking is part of why, and part of the fix.",
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?fm=jpg&q=80&w=800",
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
            Real numbers on WhatsApp automation, Lagos real estate, diagnostic centres, and Nigeria&apos;s
            data protection law, for businesses deciding whether to automate customer response.
          </p>
        </div>

        <div className="blog-grid">
          {POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-image">
                <Image src={post.image} alt="" fill sizes="(max-width: 720px) 100vw, 50vw" />
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
      <WaFloat />
    </>
  );
}
