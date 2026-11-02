import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot,
// Google-Extended and the rest) fall under "*" on purpose: being cited in
// AI answers is part of how Voxitron gets found, so nothing public is blocked.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api/", "/takeover/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
