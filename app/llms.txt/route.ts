import { BLOG_POSTS, blogPath } from "@/lib/blogPosts";
import { COMPETITORS } from "@/lib/compareData";
import {
  absoluteUrl,
  CONTACT_EMAIL,
  FOUNDER_NAME,
  SITE_SECTIONS,
  SITE_SUMMARY,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
} from "@/lib/site";

// llms.txt (https://llmstxt.org): a plain-markdown map of the site for AI
// assistants, built from the same registries as the sitemap so it can't go stale.
export const dynamic = "force-static";

const link = (name: string, path: string, note: string) => `- [${name}](${absoluteUrl(path)}): ${note}`;

export function GET() {
  const body = [
    "# Voxitron",
    "",
    `> ${SITE_SUMMARY}`,
    "",
    "Key facts:",
    "",
    `- Based in Lagos, Nigeria. Founded by ${FOUNDER_NAME}. A product by Digitalwebtonics.`,
    "- Three agents: a WhatsApp Business Agent for Nigerian businesses, plus a Speed to Lead Agent and an Automated Quoting Agent for UK and US trades businesses.",
    "- Works on the business's existing WhatsApp Business number. No new number for customers to learn.",
    "- When a chat needs a human, the agent flags it with the full conversation and the owner takes over.",
    "- Each business's data is isolated and private, exportable any time. Built with Nigeria's NDPA 2023 in mind. No lock-in.",
    "- Pricing model: try it for 2 weeks, only pay the next month if it books. Voxitron builds and connects the agent, live in about a week.",
    `- Contact: ${CONTACT_EMAIL}, or WhatsApp ${WHATSAPP_NUMBER} (${WHATSAPP_URL}), where the agent replies live.`,
    "",
    ...SITE_SECTIONS.flatMap((section) => [
      `## ${section.title}`,
      "",
      ...section.pages.map((page) => link(page.name, page.path, page.summary)),
      "",
    ]),
    "## Comparisons",
    "",
    ...COMPETITORS.map((c) => link(`Voxitron vs ${c.name}`, `/compare/${c.slug}`, c.intro)),
    "",
    "## Research",
    "",
    ...BLOG_POSTS.map((post) => link(post.title, blogPath(post), `${post.description} (${post.dateModified})`)),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
