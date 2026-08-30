import Image from "next/image";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export type BlogSource = { label: string; href: string };

type BlogPostLayoutProps = {
  category: string;
  title: string;
  dek: string;
  publishedLabel: string;
  readingTime: string;
  coverImage?: string;
  coverAlt: string;
  coverCaption?: string;
  sources: BlogSource[];
  children: ReactNode;
};

export default function BlogPostLayout({
  category,
  title,
  dek,
  publishedLabel,
  readingTime,
  coverImage,
  coverAlt,
  coverCaption,
  sources,
  children,
}: BlogPostLayoutProps) {
  return (
    <>
      <Nav />
      <main>
        <article>
          <header className="article-header">
            <div className="article-meta">
              <span>{category}</span>
              <span className="article-meta-dot" aria-hidden="true">&middot;</span>
              <span>{publishedLabel}</span>
              <span className="article-meta-dot" aria-hidden="true">&middot;</span>
              <span>{readingTime}</span>
            </div>
            <h1 className="article-title">{title}</h1>
            <p className="article-dek">{dek}</p>
          </header>

          <div className="article-cover">
            {coverImage ? (
              <Image src={coverImage} alt={coverAlt} fill sizes="(max-width: 1100px) 100vw, 1100px" priority />
            ) : (
              <ImagePlaceholder label={coverAlt} />
            )}
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
      <WaFloat />
    </>
  );
}
