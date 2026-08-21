import Link from "next/link";

const WA_CTA_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20a%20pricing%20quote";

type PricingCardsProps = {
  compact?: boolean;
};

export default function PricingCards({ compact = false }: PricingCardsProps) {
  return (
    <div className="pricing-cards">
      <div className="pricing-card">
        <span className="pricing-card-kicker">STARTER</span>
        <h3 className="pricing-card-title">For one WhatsApp number, one workflow</h3>
        <span className="pricing-card-range">&#8358;350k <span className="pricing-card-range-unit">setup</span></span>
        <span className="pricing-card-range pricing-card-range-secondary">
          &#8358;80k<span className="pricing-card-range-unit">/mo</span>
        </span>
        <p className="pricing-card-note">
          A single catalog, one language, one booking or ordering flow. Right-sized for a
          single shop, clinic, or agency office.
        </p>
        {!compact && (
          <ul className="pricing-card-list">
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Discovery call and workflow mapping</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Your WhatsApp Business number connected</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Agent trained on your catalog and pricing</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Self-hosted infrastructure, under your control</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Monthly tuning and quality checks</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Cancel any time, no lock-in</span></li>
          </ul>
        )}
        {!compact && (
          <Link href="/contact" className="pricing-card-cta">Get started</Link>
        )}
      </div>

      <div className="pricing-card is-featured">
        <span className="pricing-card-kicker">GROWTH</span>
        <span className="pricing-card-badge">Most businesses choose this</span>
        <h3 className="pricing-card-title">For multi-language or multi-location businesses</h3>
        <span className="pricing-card-range">&#8358;750k <span className="pricing-card-range-unit">setup</span></span>
        <span className="pricing-card-range pricing-card-range-secondary">
          &#8358;150k<span className="pricing-card-range-unit">/mo</span>
        </span>
        <p className="pricing-card-note">
          Multiple languages, more than one WhatsApp number, or both booking and ordering
          in the same agent.
        </p>
        {!compact && (
          <ul className="pricing-card-list">
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Everything in Starter</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Multiple languages, trained on how your customers actually message</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Multiple WhatsApp numbers or locations, one agent</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Booking and ordering flows combined</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>CRM or inventory system integration</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Priority tuning turnaround</span></li>
          </ul>
        )}
        {!compact && (
          <Link href="/contact" className="pricing-card-cta pricing-card-cta-primary">Get started</Link>
        )}
      </div>

      <div className="pricing-card">
        <span className="pricing-card-kicker">ENTERPRISE</span>
        <h3 className="pricing-card-title">For chains, franchises, and high-volume operations</h3>
        <span className="pricing-card-range">Custom quote</span>
        <p className="pricing-card-note">
          Priced around your real volume and complexity, not a fixed range. Built for
          businesses running dozens of locations or thousands of conversations a month.
        </p>
        {!compact && (
          <ul className="pricing-card-list">
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Everything in Growth</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Unlimited WhatsApp numbers and locations</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Fully bespoke qualification logic and booking flow, tuned to how your business actually works</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Dedicated account manager, not a ticket queue</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Custom CRM, ERP, or payment integrations</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Response-time SLA in writing</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Dedicated infrastructure, isolated from other clients</span></li>
          </ul>
        )}
        {!compact && (
          <a href={WA_CTA_HREF} className="pricing-card-cta" target="_blank" rel="noopener noreferrer">
            Talk to us
          </a>
        )}
      </div>
    </div>
  );
}
