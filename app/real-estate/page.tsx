import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "AI Agents for Real Estate Agents & Brokers | Voxitron",
  description:
    "Voxitron responds to every missed enquiry in under 60 seconds and sends a branded valuation or viewing quote automatically. Built for real estate agents and brokers.",
  openGraph: {
    title: "AI Agents for Real Estate: Voxitron",
    description:
      "Never lose a listing enquiry to a slower agent. Voxitron replies, qualifies, and books viewings, 24/7.",
    images: ["/assets/images/og-image.jpg"],
    url: "https://voxitron.com/real-estate",
    type: "website",
  },
  alternates: {
    canonical: "https://voxitron.com/real-estate",
  },
};

export default function RealEstatePage() {
  return (
    <>
      <Nav activePage="real-estate" ctaHref="/get-started?agent=both" ctaLabel="Get Started" />

      <main>
        {/* HERO */}
        <section id="hero" aria-labelledby="hero-title">
          <div className="hero-photo" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1628133287836-40bd5453bed1?fm=jpg&q=80&w=1920&auto=format&fit=crop"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>

          <div className="hero-inner">
            <div className="hero-content">
              <span className="hero-trust-pill">
                <span className="dot" aria-hidden="true"></span>
                Live &amp; replying for agents right now
              </span>

              <span className="hero-kicker">AI AGENTS FOR REAL ESTATE</span>

              <h1 id="hero-title" className="hero-title">
                They enquired.
                <br />
                No reply.
                <br />
                <span className="accent">Gone cold.</span>
              </h1>

              <p className="hero-sub">
                Voxitron replies to every enquiry in under 60 seconds and sends the
                valuation while you&apos;re still with a client.
              </p>

              <div className="cta-group">
                <Link href="/get-started?agent=both" className="btn btn-primary">
                  Get Started
                </Link>
                <Link href="/#services" className="btn btn-secondary">See all three agents</Link>
              </div>

              <span className="form-note">No spam. 30 days free. No credit card needed.</span>
            </div>

            <div className="hero-ui" aria-hidden="true">
              <div className="ui-card">
                <div className="ui-call-header">
                  <span className="ui-call-label">Missed enquiry</span>
                  <span className="ui-call-time">6:40 PM</span>
                </div>
                <p className="ui-caller">+1 (415) 555-0148</p>
                <div className="ui-call-status">
                  <span className="ui-status-dot"></span>
                  <span>Voxitron responding&hellip;</span>
                </div>
              </div>

              <div className="ui-card ui-chat">
                <div>
                  <p className="ui-msg-label">Voxitron &mdash; 40 seconds later</p>
                  <div className="ui-msg ui-msg-ai">
                    Hi! Thanks for your interest in 214 Maple Ave. Would you like the full
                    listing details or to book a viewing?
                  </div>
                </div>
                <div className="ui-msg-group is-reply">
                  <p className="ui-msg-label">Buyer</p>
                  <div className="ui-msg ui-msg-customer">
                    A viewing please, this weekend if possible.
                  </div>
                </div>
                <div>
                  <p className="ui-msg-label">Voxitron</p>
                  <div className="ui-msg ui-msg-ai">
                    I have Saturday 11am or Sunday 2pm open. Which works for you?
                  </div>
                </div>
              </div>

              <div className="ui-card">
                <div className="ui-booking-status">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" stroke="currentColor" />
                    <path d="M4 7L6.2 9.2L10 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Viewing confirmed
                </div>
                <p className="ui-booking-title">214 Maple Ave</p>
                <p className="ui-booking-detail">
                  Saturday, 11:00 AM &middot; Response: 40 sec
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF STRIP */}
        <Reveal className="proof-strip" role="region" aria-label="Key facts">
          <ul className="proof-list">
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>Replies to every enquiry in under 60 seconds</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>Sends valuations and listing details automatically</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>30 days free to start</span>
            </li>
          </ul>
        </Reveal>

        {/* STATS */}
        <Reveal className="stats-strip" role="region" aria-label="Real estate lead response statistics">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">78%</span>
              <p className="stat-label">of buyers go with the first agent who responds to their enquiry</p>
              <span className="stat-source">Harvard Business Review</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">80%</span>
              <p className="stat-label">drop in lead conversion after just 5 minutes of not responding</p>
              <span className="stat-source">Lead Response Management Study</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">7+ hrs</span>
              <p className="stat-label">the average time an agency takes to respond to a new enquiry</p>
              <span className="stat-source">InsideSales.com</span>
            </div>
          </div>
        </Reveal>

        {/* THE PAIN */}
        <Reveal as="section" id="pain" aria-labelledby="pain-title">
          <div className="pain-split">
            <div className="pain-split-text">
              <span className="section-label">THE PROBLEM</span>
              <h2 id="pain-title" className="section-title">
                You were mid-viewing.
                <br />
                <span className="accent">They called the next listing.</span>
              </h2>
              <div className="section-body">
                <p>
                  A buyer messages about a listing while you&apos;re showing another property.
                  By the time you&apos;re free, they&apos;ve booked with someone else.
                </p>
                <p>Voxitron replies before they even put the phone down.</p>
              </div>
            </div>
            <div className="pain-photo">
              <ImagePlaceholder label="Photo: a property listing sign outside a home for sale" />
            </div>
          </div>
        </Reveal>

        {/* FEATURES */}
        <Reveal as="section" id="features" aria-labelledby="features-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">WHAT IT DOES</span>
              <h2 id="features-title" className="section-title">
                From enquiry to
                <br />
                <span className="accent">booked viewing, automatically.</span>
              </h2>
              <p className="section-body">
                Runs inside your WhatsApp Business number. Replies, qualifies, and books
                while you&apos;re with a client.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="feature-text">
                  <p className="feature-title">Responds in under 60 seconds</p>
                  <p className="feature-body">Every missed call or web enquiry fires a reply, instantly.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 2.5H13V11.5H3V2.5Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 5.5H11M5 8H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="feature-text">
                  <p className="feature-title">Sends listing details and valuations</p>
                  <p className="feature-body">A branded quote or property pack, delivered while you&apos;re still on-site.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4C2 3.45 2.45 3 3 3H13C13.55 3 14 3.45 14 4V11C14 11.55 13.55 12 13 12H3C2.45 12 2 11.55 2 11V4Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M2 5L8 8.5L14 5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <div className="feature-text">
                  <p className="feature-title">Qualifies the buyer automatically</p>
                  <p className="feature-body">Budget, timeline, financing status, asked before you call back.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 5L8 10L5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <div className="feature-text">
                  <p className="feature-title">Books viewings straight into your calendar</p>
                  <p className="feature-body">Confirms a slot in the conversation. No back-and-forth.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M2 6H14M6 2V6M10 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M5 9.5H8M5 11.5H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="feature-text">
                  <p className="feature-title">Runs on your existing WhatsApp number</p>
                  <p className="feature-body">No new app to learn, no number for buyers to save. It&apos;s the one they already message.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4C3 3.45 3.45 3 4 3H8.5L12 6.5V12C12 12.55 11.55 13 11 13H4C3.45 13 3 12.55 3 12V4Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M8 3V7H12" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5.5 9.5H9.5M5.5 11H8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="feature-text">
                  <p className="feature-title">Full lead log in your dashboard</p>
                  <p className="feature-body">Every enquiry and outcome logged, so nothing slips between agents.</p>
                </div>
              </div>
            </div>

            <div className="feature-callout">
              <div>
                <span className="callout-label">Always on</span>
                <p className="callout-title">Works while you&apos;re showing another property</p>
                <p className="callout-body">
                  Open houses, weekends, evenings, Voxitron answers the moment a buyer
                  reaches out. No overtime, no missed listings.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* HOW IT WORKS */}
        <Reveal as="section" id="how-it-works" aria-labelledby="how-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">HOW IT WORKS</span>
              <h2 id="how-title" className="section-title">
                Set it up once.
                <br />
                <span className="accent">Never miss a buyer again.</span>
              </h2>
            </div>

            <ol className="steps-list">
              <li className="step">
                <ImagePlaceholder label="Screenshot: listing and pricing setup" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">01</span>
                  <h3 className="step-title">We configure your agent</h3>
                </div>
                <p className="step-body">We load your listings and pricing so responses sound like you.</p>
              </li>
              <li className="step">
                <ImagePlaceholder label="Screenshot: channel connection" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">Connect your number and calendar</h3>
                </div>
                <p className="step-body">Your existing line and booking calendar. No new hardware.</p>
              </li>
              <li className="step">
                <ImagePlaceholder label="Screenshot: enquiry converted to viewing" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">03</span>
                  <h3 className="step-title">Every enquiry becomes a booked viewing</h3>
                </div>
                <p className="step-body">You step in only when a buyer needs you directly.</p>
              </li>
            </ol>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal as="section" id="faq" aria-labelledby="faq-title">
          <div className="section-inner">
            <span className="section-label">FAQ</span>
            <h2 id="faq-title" className="section-title">
              Questions from real
              <br />
              estate agents and brokers.
            </h2>

            <div className="faq-list" role="list">
              <details className="faq-item" role="listitem">
                <summary>
                  Can it handle enquiries about multiple listings at once?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes. It matches each enquiry to the right listing and responds with the
                  correct details automatically.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Does it work with my existing CRM?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  We connect to your existing calendar and lead tracking, so nothing falls
                  through the cracks.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  What if a buyer wants to negotiate on price?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  It flags the conversation with full context. You take over for anything
                  that needs a human judgment call.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Do I need a new phone number?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  No. It runs on your existing number, the one buyers already have.
                </p>
              </details>
            </div>
          </div>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              Stop losing buyers
              <br />
              to a slower reply.
            </h2>

            <p className="cta-sub">
              Get started today. 30 days free. Live in 48 hours. No credit card. No
              long-term contract.
            </p>

            <div className="cta-group">
              <Link href="/get-started?agent=both" className="btn btn-primary">Get Started</Link>
              <Link href="/#services" className="btn btn-secondary">See all three agents</Link>
            </div>

            <span className="form-note">No spam. No long-term contract. Cancel any time.</span>
          </div>
        </Reveal>
      </main>

      <Footer />
      <WaFloat />
    </>
  );
}
