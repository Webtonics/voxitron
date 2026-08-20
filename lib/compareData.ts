export type CompareRow = {
  label: string;
  voxitron: string;
  competitor: string;
};

export type CompetitorConfig = {
  slug: string;
  name: string;
  shortName: string;
  heroTension: string[];
  intro: string;
  goodAt: string[];
  fallsShort: string[];
  rows: CompareRow[];
  waMessage: string;
};

export const COMPETITORS: readonly CompetitorConfig[] = [
  {
    slug: "receptionist",
    name: "Hiring a Receptionist",
    shortName: "Receptionist",
    heroTension: ["A person can", "only answer", "one chat", "at a time."],
    intro:
      "A receptionist brings real judgment and a human voice. They also sleep, take breaks, and can only handle one conversation at once.",
    goodAt: [
      "Human judgment on nuanced or sensitive questions",
      "A warm, familiar voice for walk-in customers",
      "Flexible, can pick up tasks beyond messaging",
    ],
    fallsShort: [
      "Off the clock nights, weekends, and holidays",
      "One conversation at a time, everyone else waits",
      "Salary cost scales linearly with hours covered",
    ],
    rows: [
      { label: "24/7 instant response", voxitron: "Yes", competitor: "No" },
      { label: "Bespoke qualification logic", voxitron: "Yes", competitor: "Yes, human judgment" },
      { label: "You own the infrastructure", voxitron: "Yes", competitor: "N/A" },
      { label: "Nigerian-language fluency", voxitron: "Yes", competitor: "Depends on staff" },
      { label: "Human escalation", voxitron: "Yes", competitor: "Yes, is human" },
      { label: "NDPA-aligned by design", voxitron: "Yes", competitor: "N/A" },
      { label: "No platform lock-in", voxitron: "Yes", competitor: "N/A" },
      { label: "Monthly tuning included", voxitron: "Yes", competitor: "N/A" },
    ],
    waMessage: "Hi Voxitron, I'm comparing you to hiring a receptionist. Can we talk?",
  },
  {
    slug: "diy-n8n-freelancer",
    name: "A DIY n8n Freelancer or Template",
    shortName: "DIY n8n",
    heroTension: ["A one-off", "build breaks", "the moment", "prices shift."],
    intro:
      "A freelance n8n build or a downloaded template can get a basic flow running fast. Keeping it running, and tuned to your business, is the part that gets skipped.",
    goodAt: [
      "Cheap to get a first version running",
      "Full technical control if you can maintain it",
      "No recurring platform subscription",
    ],
    fallsShort: [
      "No ongoing tuning once the freelancer moves on",
      "Breaks quietly when your catalog or prices change",
      "NDPA and data-handling considerations are rarely built in",
    ],
    rows: [
      { label: "24/7 instant response", voxitron: "Yes", competitor: "Partial, if maintained" },
      { label: "Bespoke qualification logic", voxitron: "Yes", competitor: "Partial, one-off build" },
      { label: "You own the infrastructure", voxitron: "Yes", competitor: "Yes" },
      { label: "Nigerian-language fluency", voxitron: "Yes", competitor: "Depends on build" },
      { label: "Human escalation", voxitron: "Yes", competitor: "No" },
      { label: "NDPA-aligned by design", voxitron: "Yes", competitor: "No, unless built in" },
      { label: "No platform lock-in", voxitron: "Yes", competitor: "Yes" },
      { label: "Monthly tuning included", voxitron: "Yes", competitor: "No" },
    ],
    waMessage: "Hi Voxitron, I'm comparing you to a DIY n8n build. Can we talk?",
  },
  {
    slug: "botify",
    name: "Botify (Generic WhatsApp Chatbot SaaS)",
    shortName: "Botify",
    heroTension: ["A generic", "bot answers.", "Your agent", "should sell."],
    intro:
      "Generic chatbot SaaS platforms answer FAQs well. They're rented, not owned, and rarely built to qualify a lead the way your business actually needs.",
    goodAt: [
      "Fast to sign up, no build time needed",
      "Handles simple, repetitive FAQ-style questions",
      "Predictable monthly subscription pricing",
    ],
    fallsShort: [
      "Generic flows, not built around your qualification logic",
      "Your data lives on their platform, not yours",
      "No real handoff to a human when a chat gets complex",
    ],
    rows: [
      { label: "24/7 instant response", voxitron: "Yes", competitor: "Yes" },
      { label: "Bespoke qualification logic", voxitron: "Yes", competitor: "No" },
      { label: "You own the infrastructure", voxitron: "Yes", competitor: "No" },
      { label: "Nigerian-language fluency", voxitron: "Yes", competitor: "No" },
      { label: "Human escalation", voxitron: "Yes", competitor: "Limited" },
      { label: "NDPA-aligned by design", voxitron: "Yes", competitor: "No" },
      { label: "No platform lock-in", voxitron: "Yes", competitor: "No" },
      { label: "Monthly tuning included", voxitron: "Yes", competitor: "No" },
    ],
    waMessage: "Hi Voxitron, I'm comparing you to a generic WhatsApp chatbot SaaS. Can we talk?",
  },
  {
    slug: "gohighlevel",
    name: "GoHighLevel-Reseller Agencies",
    shortName: "GHL Reseller",
    heroTension: ["A resold", "platform seat", "isn't", "an asset."],
    intro:
      "GoHighLevel-reseller agencies package a shared platform under their own brand. It can look bespoke on the surface while you're still renting someone else's seat.",
    goodAt: [
      "Broad marketing feature set beyond just messaging",
      "Fast to launch since the platform already exists",
      "Familiar CRM-style dashboard for the agency to manage",
    ],
    fallsShort: [
      "You're a tenant on GHL's platform, not an owner",
      "Qualification logic is templated, not built for you",
      "If the reseller agency closes, your setup goes with it",
    ],
    rows: [
      { label: "24/7 instant response", voxitron: "Yes", competitor: "Yes" },
      { label: "Bespoke qualification logic", voxitron: "Yes", competitor: "Partial" },
      { label: "You own the infrastructure", voxitron: "Yes", competitor: "No" },
      { label: "Nigerian-language fluency", voxitron: "Yes", competitor: "No" },
      { label: "Human escalation", voxitron: "Yes", competitor: "Partial" },
      { label: "NDPA-aligned by design", voxitron: "Yes", competitor: "No" },
      { label: "No platform lock-in", voxitron: "Yes", competitor: "No, GHL-dependent" },
      { label: "Monthly tuning included", voxitron: "Yes", competitor: "Varies by agency" },
    ],
    waMessage: "Hi Voxitron, I'm comparing you to a GoHighLevel-reseller agency. Can we talk?",
  },
] as const;

export function getCompetitor(slug: string): CompetitorConfig | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
