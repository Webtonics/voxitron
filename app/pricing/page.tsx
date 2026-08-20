import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import PricingCards from "@/components/PricingCards";

const WA_CTA_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20a%20pricing%20quote";

export const metadata: Metadata = {
  title: "Pricing | Voxitron",
  description:
    "Transparent Voxitron pricing: a one-time setup fee and a simple monthly retainer. No hidden platform fees, no per-seat pricing, on infrastructure you own.",
  alternates: {
    canonical: "https://voxitron.com/pricing",
  },
};

export default function PricingPage() {
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
            <span className="hero-kicker">NO HIDDEN PLANS OR LOCKED FEATURES</span>
            <h1 id="hero-title" className="hero-title">
              Simple pricing.
              <br />
              <span className="accent">You own the result.</span>
            </h1>
            <p className="hero-sub">
              A one-time setup fee, then a simple monthly retainer. No platform markup, no
              per-seat pricing, no surprise line items.
            </p>
          </div>
        </section>

        {/* PRICING CARDS */}
        <Reveal as="section" id="pricing-cards" aria-labelledby="pricing-cards-title">
          <div className="section-inner">
            <span className="section-label">PRICING</span>
            <h2 id="pricing-cards-title" className="section-title">
              Two line items.
              <br />
              <span className="accent">That&apos;s the whole invoice.</span>
            </h2>

            <PricingCards />

            <div className="pricing-disclaimer">
              <strong>These are indicative ranges</strong>, not a fixed quote. Actual price
              depends on catalog size, languages, and how many booking or ordering flows you
              need. <Link href="/contact" style={{ textDecoration: "underline" }}>Get a clear quote</Link> after a free discovery call.
            </div>
          </div>
        </Reveal>

        {/* WHAT DETERMINES YOUR PRICE */}
        <Reveal as="section" id="what-determines-price" aria-labelledby="what-determines-price-title">
          <div className="section-inner">
            <span className="section-label">WHAT DETERMINES YOUR PRICE</span>
            <h2 id="what-determines-price-title" className="section-title">
              Every business is
              <br />
              <span className="accent">scoped individually.</span>
            </h2>
            <div className="section-body">
              <p>
                Catalog size, number of languages, and whether you need booking, ordering,
                or both all shift the number.
              </p>
            </div>
            <div className="cta-group">
              <Link href="/contact" className="btn btn-primary">Get a clear quote</Link>
            </div>
          </div>
        </Reveal>

        {/* BUYING VS NOT BUYING */}
        <Reveal as="section" id="buying" aria-labelledby="buying-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              <span className="section-label">WHAT YOU&apos;RE ACTUALLY BUYING</span>
              <h2 id="buying-title" className="section-title">
                Own it, don&apos;t
                <br />
                <span className="accent">rent a seat on it.</span>
              </h2>
            </div>

            <div className="buy-columns">
              <div className="buy-column">
                <h3 className="buy-column-title">What you&apos;re buying</h3>
                <ul className="buy-column-list">
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>Self-hosted agent infrastructure you control</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>Qualification logic built for your business</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>Full conversation and customer data, kept by you</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>Monthly tuning as your business changes</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>A named, reachable team, not a ticket queue</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>Meta API fees passed through at cost</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>The right to walk away with your setup intact</span></li>
                </ul>
              </div>

              <div className="buy-column is-not">
                <h3 className="buy-column-title">What you&apos;re not buying</h3>
                <ul className="buy-column-list">
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>A rented seat on someone else&apos;s platform</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>A generic chatbot template with your logo on it</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>Per-message or per-seat markup on top of Meta&apos;s fees</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>A locked contract with no way out</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>Data held hostage on a platform that isn&apos;t yours</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>A one-time build with no ongoing support</span></li>
                  <li><span className="buy-column-bullet" aria-hidden="true">&#9679;</span><span>Vague promises about &quot;AI&quot; with no working agent</span></li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* HOW IT WORKS: pricing variant */}
        <Reveal as="section" id="how-it-works" aria-labelledby="how-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              <span className="section-label">HOW IT WORKS</span>
              <h2 id="how-title" className="section-title">
                From discovery call
                <br />
                <span className="accent">to live agent.</span>
              </h2>
            </div>

            <ol className="steps-list">
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">W1</span>
                  <h3 className="step-title">Discovery &amp; scoping</h3>
                </div>
                <p className="step-body">
                  We map your catalog, languages, and workflow. This is where your fixed
                  quote comes from.
                </p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">W2-3</span>
                  <h3 className="step-title">Build &amp; configure</h3>
                </div>
                <p className="step-body">
                  Your agent is trained on your business and connected to your WhatsApp
                  number.
                </p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">W3-4</span>
                  <h3 className="step-title">Pilot launch</h3>
                </div>
                <p className="step-body">
                  Live on real conversations, monitored closely before full rollout.
                </p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">&#8734;</span>
                  <h3 className="step-title">Ongoing: monthly retainer</h3>
                </div>
                <p className="step-body">
                  Tuning, monitoring, and support continue for as long as you stay on.
                </p>
              </li>
            </ol>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal as="section" id="faq" aria-labelledby="faq-title">
          <div className="section-inner">
            <span className="section-label">FAQ</span>
            <h2 id="faq-title" className="section-title">
              Questions about
              <br />
              how pricing works.
            </h2>

            <div className="faq-list" role="list">
              <details className="faq-item" role="listitem">
                <summary>
                  Why a range and not a fixed price upfront?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Catalog size and language count change the build significantly. You get a
                  fixed number after a free discovery call, not before.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Can I cancel the retainer?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes, any time. There&apos;s no long-term lock-in, and your infrastructure
                  stays yours either way.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Are there any hidden fees?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  No. Meta&apos;s WhatsApp API usage fees are passed through at cost, with no
                  markup added by us.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Do you offer payment plans on the setup fee?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  We can discuss a split payment for larger setups. Bring it up on your
                  discovery call.
                </p>
              </details>
            </div>
          </div>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              Ready to own
              <br />
              your lead response system?
            </h2>

            <p className="cta-sub">
              Book a free discovery call, or message us on WhatsApp for a quick answer.
            </p>

            <div className="cta-group">
              <Link href="/contact" className="btn btn-primary">Book a discovery call</Link>
              <a href={WA_CTA_HREF} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
      <WaFloat />
    </>
  );
}
