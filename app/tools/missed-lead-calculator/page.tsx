import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import CalculatorTool from "@/components/CalculatorTool";
import LeadForm from "@/components/LeadForm";

const WA_CTA_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%20just%20used%20the%20missed%20lead%20calculator";

export const metadata: Metadata = {
  title: "Missed Lead Calculator | Voxitron",
  description:
    "See what slow WhatsApp replies could be costing your business, and what's realistically recoverable with a response time under 60 seconds.",
  alternates: {
    canonical: "https://voxitron.com/tools/missed-lead-calculator",
  },
};

export default function MissedLeadCalculatorPage() {
  return (
    <>
      <Nav />

      <main>
        <section
          id="hero"
          aria-labelledby="hero-title"
          style={{ padding: "calc(56px + var(--space-9)) var(--gutter) var(--space-8)" }}
        >
          <div className="section-inner">
            <span className="hero-kicker">FREE TOOL, NO SIGNUP REQUIRED</span>
            <h1 id="hero-title" className="section-title">
              How much are slow
              <br />
              <span className="accent">WhatsApp replies costing you?</span>
            </h1>
            <p className="section-body">
              Fill in four numbers about your business. See an honest estimate, with the
              math shown, not hidden.
            </p>
          </div>
        </section>

        {/* CALCULATOR */}
        <Reveal as="section" id="calculator" aria-labelledby="calculator-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              <span className="section-label">CALCULATE</span>
              <h2 id="calculator-title" className="section-title">
                Your numbers,
                <br />
                <span className="accent">not ours.</span>
              </h2>
            </div>

            <CalculatorTool />
          </div>
        </Reveal>

        {/* HOW TO USE */}
        <Reveal as="section" id="how-to-use" aria-labelledby="how-to-use-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              <span className="section-label">HOW TO USE THIS CALCULATOR</span>
              <h2 id="how-to-use-title" className="section-title">
                Four numbers.
                <br />
                <span className="accent">Be honest, not hopeful.</span>
              </h2>
            </div>

            <ol className="steps-list">
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">01</span>
                  <h3 className="step-title">Monthly WhatsApp inquiries</h3>
                </div>
                <p className="step-body">Count new customer messages, not repeat chats with existing customers.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">Typical response time</h3>
                </div>
                <p className="step-body">Your real average, including nights and weekends, not your best day.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">03</span>
                  <h3 className="step-title">Average deal value</h3>
                </div>
                <p className="step-body">What a typical order, booking, or job is worth once it closes.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">04</span>
                  <h3 className="step-title">Current close rate</h3>
                </div>
                <p className="step-body">Of the people who get a reply, roughly what share actually buy.</p>
              </li>
            </ol>
          </div>
        </Reveal>

        {/* WHAT YOUR RESULTS MEAN */}
        <Reveal as="section" id="results-meaning" aria-labelledby="results-meaning-title">
          <div className="section-inner">
            <span className="section-label">WHAT YOUR RESULTS MEAN</span>
            <h2 id="results-meaning-title" className="section-title">
              An estimate,
              <br />
              <span className="accent">not a promise.</span>
            </h2>

            <ul className="offer-list" aria-label="What the calculator does and does not do">
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span><strong>The revenue-lost number</strong> is what your current response time is likely costing you every month, based on your own inputs.</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span><strong>The recovery number</strong> is a conservative estimate of what&apos;s realistically recoverable, not the full lost amount.</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span><strong>What this doesn&apos;t do:</strong> account for seasonality, product quality, or pricing. It only isolates response speed.</span>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* LEAD CAPTURE */}
        <Reveal as="section" id="get-started" aria-labelledby="get-started-title">
          <div className="section-inner">
            <span className="section-label">WANT TO STOP LOSING IT?</span>
            <h2 id="get-started-title" className="section-title">
              Tell us about
              <br />
              your business.
            </h2>
            <div className="section-body">
              <p>We reply on WhatsApp first, usually within a few hours.</p>
            </div>

            <LeadForm variant="discovery-call" defaultAgent="general" submitLabel="Get my quote" />
          </div>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              Ready to stop
              <br />
              losing that revenue?
            </h2>

            <p className="cta-sub">
              Message us on WhatsApp, or book a free discovery call.
            </p>

            <div className="cta-group">
              <a href={WA_CTA_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
              <Link href="/contact" className="btn btn-secondary">Book a discovery call</Link>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
      <WaFloat />
    </>
  );
}
