import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Get Started | Voxitron",
  description:
    "Tell us about your business and we'll set up your Voxitron agent within 48 hours.",
};

const VALID_AGENTS = ["speed-to-lead", "quoting-agent", "both"] as const;

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ agent?: string }>;
}) {
  const { agent } = await searchParams;
  const defaultAgent = (VALID_AGENTS as readonly string[]).includes(agent || "")
    ? (agent as (typeof VALID_AGENTS)[number])
    : undefined;

  return (
    <>
      <Nav />
      <main>
        <section
          id="get-started"
          aria-labelledby="get-started-title"
          className="page-hero is-full-page"
        >
          <div className="section-inner">
            <span className="section-label">GET STARTED</span>
            <h1 id="get-started-title" className="section-title">
              Tell us about your business.
            </h1>
            <div className="section-body" style={{ marginBottom: "var(--space-7)" }}>
              <p>
                We&apos;ll set up your agent within 48 hours. 30 days free, no credit card
                needed.
              </p>
            </div>

            <LeadForm defaultAgent={defaultAgent} />
          </div>
        </section>
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
