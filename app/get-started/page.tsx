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
    "Message Voxitron on WhatsApp and see the agent reply live. Try it 2 weeks, only pay next month if it books. We build and connect it for you, live on your existing number in about a week.",
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
              Message us and watch it reply.
            </h1>
            <div className="section-body" style={{ marginBottom: "var(--space-6)" }}>
              <p>
                Try it 2 weeks. Only pay next month if it books. We build and connect it
                for you, live on your existing number in about a week.
              </p>
            </div>

            <div className="cta-group">
              <a href={WA_CTA_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>

            <p className="form-note" style={{ marginTop: "var(--space-6)" }}>
              Prefer we message you first? Leave your name and WhatsApp number below.
            </p>

            <LeadForm variant="minimal" defaultAgent={defaultAgent} submitLabel="Message me instead" />
          </div>
        </section>

        {/* WHAT HAPPENS NEXT */}
        <Reveal as="section" id="process" aria-labelledby="process-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">WHAT HAPPENS NEXT</span>
              <h2 id="process-title" className="section-title">
                From this message
                <br />
                <span className="accent">to a live agent.</span>
              </h2>
            </div>

            <ol className="steps-list">
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">01</span>
                  <h3 className="step-title">We talk on WhatsApp</h3>
                </div>
                <p className="step-body">Tell us about your business, usually within a few hours.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">We build and configure your agent</h3>
                </div>
                <p className="step-body">Trained on your business, live on your existing number in about a week.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">03</span>
                  <h3 className="step-title">You start your 2-week pilot</h3>
                </div>
                <p className="step-body">₦50,000 to start. Only pay next month if it books.</p>
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
