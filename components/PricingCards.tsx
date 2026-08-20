type PricingCardsProps = {
  compact?: boolean;
};

export default function PricingCards({ compact = false }: PricingCardsProps) {
  return (
    <div className="pricing-cards">
      <div className="pricing-card">
        <span className="pricing-card-kicker">ONE-TIME</span>
        <h3 className="pricing-card-title">Setup</h3>
        <span className="pricing-card-range">&#8358;150k &ndash; &#8358;600k</span>
        <p className="pricing-card-note">
          Scoped to your business during a free discovery call. Simple catalogs cost less,
          multi-language or multi-location setups cost more.
        </p>
        {!compact && (
          <ul className="pricing-card-list">
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Discovery call and workflow mapping</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Your WhatsApp Business number connected</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Agent trained on your catalog and pricing</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Qualification logic built for your business</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Self-hosted infrastructure, set up under your control</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Booking or ordering flow configured</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Human handoff rules defined</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Pilot period before full go-live</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Staff walkthrough of the finished agent</span></li>
          </ul>
        )}
      </div>

      <div className="pricing-card is-featured">
        <span className="pricing-card-kicker">MONTHLY</span>
        <h3 className="pricing-card-title">Retainer</h3>
        <span className="pricing-card-range">&#8358;50k &ndash; &#8358;120k<span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>/mo</span></span>
        <p className="pricing-card-note">
          Meta&apos;s WhatsApp API fees are passed through at cost. No markup added on top.
        </p>
        {!compact && (
          <ul className="pricing-card-list">
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Hosting and infrastructure upkeep</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Monthly tuning as your catalog or prices change</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Conversation monitoring and quality checks</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Meta WhatsApp API fees, passed through at cost</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Direct support from your account contact</span></li>
            <li><span className="pricing-card-bullet" aria-hidden="true">&#9679;</span><span>Cancel any time, no long-term lock-in</span></li>
          </ul>
        )}
      </div>
    </div>
  );
}
