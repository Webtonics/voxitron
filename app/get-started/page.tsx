import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";

const WA_CTA_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20to%20get%20started";

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
        <section id="get-started" aria-labelledby="get-started-title" className="page-hero">
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

            <p className="form-note" style={{ marginTop: "var(--space-5)" }}>
              You&apos;ll get a confirmation by email right away. In a hurry?{" "}
              <a href={WA_CTA_HREF} target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp
              </a>{" "}
              instead.
            </p>
          </div>
        </section>

        {/* WHAT HAPPENS NEXT */}
        <Reveal as="section" id="process" aria-labelledby="process-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">WHAT HAPPENS NEXT</span>
              <h2 id="process-title" className="section-title">
                From this form
                <br />
                <span className="accent">to a live agent.</span>
              </h2>
            </div>

            <ol className="steps-list">
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">01</span>
                  <h3 className="step-title">We review your details</h3>
                </div>
                <p className="step-body">Usually within a few hours, sometimes faster.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">We build and configure your agent</h3>
                </div>
                <p className="step-body">Trained on your business, live within 48 hours.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">03</span>
                  <h3 className="step-title">You start capturing every lead</h3>
                </div>
                <p className="step-body">30 days free, no credit card, cancel any time.</p>
              </li>
            </ol>
          </div>
        </Reveal>
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
