import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BLOG_POSTS, blogImage } from "@/lib/blogPosts";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Blog | Voxitron",
  description:
    "Sourced research on WhatsApp automation in Nigeria and missed-call costs for UK and US trades, for owners deciding whether to automate customer response.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <div className="blog-hero">
          <div className="section-inner">
            <span className="section-label">RESEARCH &amp; DATA</span>
            <h1 className="hero-title">The Voxitron Blog</h1>
            <p className="section-body">
              Real numbers on WhatsApp automation in Nigeria and response-speed data for UK and US trades
              businesses, for owners deciding whether to automate customer response.
            </p>
          </div>
        </div>

        <div className="blog-grid">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-image">
                <Image src={blogImage(post, 900)} alt={post.imageAlt} fill sizes="(max-width: 720px) 100vw, 50vw" />
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
