import Image from "next/image";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { blogImage, blogPostJsonLd, type BlogPost } from "@/lib/blogPosts";

export type BlogSource = { label: string; href: string };

type BlogPostLayoutProps = {
  post: BlogPost;
  dek: string;
  coverCaption?: string;
  sources: BlogSource[];
  children: ReactNode;
};

function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPostLayout({
  post,
  dek,
  coverCaption,
  sources,
  children,
}: BlogPostLayoutProps) {
  return (
    <>
      <JsonLd data={blogPostJsonLd(post)} />
      <Nav />
      <main>
        <article>
          <header className="article-header">
            <div className="article-meta">
              <span>{post.category}</span>
              <span className="article-meta-dot" aria-hidden="true">&middot;</span>
              <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              <span className="article-meta-dot" aria-hidden="true">&middot;</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
            <p className="article-dek">{dek}</p>
          </header>

          <div className="article-cover">
            <Image
              src={blogImage(post, 1600)}
              alt={post.imageAlt}
              fill
              sizes="(max-width: 1100px) 100vw, 1100px"
              priority
            />
          </div>
          {coverCaption && <p className="article-cover-caption">{coverCaption}</p>}

          <div className="article-body">{children}</div>

          {sources.length > 0 && (
            <div className="article-sources">
              <p className="article-sources-title">Sources</p>
              <ol>
                {sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noopener noreferrer">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
