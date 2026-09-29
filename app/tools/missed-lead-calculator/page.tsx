import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CalculatorTool from "@/components/CalculatorTool";

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
      {/* Teal outline nav CTA here: the calculator's own WhatsApp button is
          this page's one amber action. */}
      <Nav ctaVariant="outline" />

      <main>
        <section id="hero" aria-labelledby="hero-title" className="page-hero">
          <div className="section-inner">
            <span className="hero-kicker">Free tool, no signup required</span>
            <h1 id="hero-title" className="hero-title">
              What are slow <span className="accent">replies costing you?</span>
            </h1>
            <p className="hero-sub">
              Fill in four numbers about your business. See an honest estimate, with the
              math shown, not hidden.
            </p>
          </div>
        </section>

        {/* CALCULATOR */}
        <Reveal as="section" id="calculator" aria-labelledby="calculator-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <h2 id="calculator-title" className="section-title">
                Your numbers, not ours.
              </h2>
            </div>

            <CalculatorTool />
          </div>
        </Reveal>

        {/* WHAT YOUR RESULTS MEAN */}
        <Reveal as="section" id="results-meaning" aria-labelledby="results-meaning-title">
          <div className="section-inner">
            <h2 id="results-meaning-title" className="section-title">
              An estimate, not a promise.
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

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              Ready to stop losing that revenue?
            </h2>

            <p className="cta-sub">
              Message us on WhatsApp, or book a call.
            </p>

            <div className="cta-group" data-wa-float-hide="">
              <a href={WA_CTA_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
              <Link href="/contact" className="btn btn-outline">Book a call</Link>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
