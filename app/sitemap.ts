import type { MetadataRoute } from "next";
import { BLOG_POSTS, blogPath } from "@/lib/blogPosts";
import { COMPETITORS } from "@/lib/compareData";
import { absoluteUrl, SITE_SECTIONS } from "@/lib/site";

// lastModified is only set where we know the real date (blog posts). Stamping
// every page with the build time teaches Google to ignore the field.
export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = BLOG_POSTS.map((p) => p.dateModified).sort().at(-1);

  return [
    ...SITE_SECTIONS.flatMap((section) => section.pages).map((page) => ({
      url: absoluteUrl(page.path),
      ...(page.path === "/blog" && latestPost && { lastModified: latestPost }),
    })),
    ...COMPETITORS.map((c) => ({ url: absoluteUrl(`/compare/${c.slug}`) })),
    ...BLOG_POSTS.map((post) => ({
      url: absoluteUrl(blogPath(post)),
      lastModified: post.dateModified,
    })),
  ];
}
