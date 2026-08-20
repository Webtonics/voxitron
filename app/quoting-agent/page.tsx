import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Automated Quoting Agent: Professional Quotes on Autopilot | Voxitron",
  description:
    "Voxitron's Automated Quoting Agent collects job details and sends a branded, professional quote via SMS or email, 24/7, without you lifting a finger.",
  openGraph: {
    title: "Automated Quoting Agent: Voxitron",
    description:
      "Turn every enquiry into a professional quote, automatically. Voxitron collects the details and delivers a branded quote before your competitor picks up the phone.",
    images: ["/assets/images/og-image.jpg"],
    url: "https://voxitron.com/quoting-agent",
    type: "website",
  },
  alternates: {
    canonical: "https://voxitron.com/quoting-agent",
  },
};

export default function QuotingAgentPage() {
  return (
    <>
      <Nav activePage="quoting-agent" />

      <main>
        {/* HERO */}
        <section id="hero" aria-labelledby="hero-title">
          <div className="hero-photo" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1758101755915-462eddc23f57?fm=jpg&q=80&w=1920&auto=format&fit=crop"
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
                Live &amp; quoting for trades businesses right now
              </span>

              <span className="hero-kicker">AUTOMATED QUOTING AGENT</span>

              <h1 id="hero-title" className="hero-title">
                Quote sent
                <br />
                while you&apos;re
                <br />
                <span className="accent">on the job.</span>
              </h1>

              <p className="hero-sub">
                Voxitron builds a branded quote and sends it before your competitor calls
                back.
              </p>

              <div className="cta-group">
                <Link href="/get-started?agent=quoting-agent" className="btn btn-primary">Get Started</Link>
                <Link href="/#services" className="btn btn-secondary">See the other agents</Link>
              </div>

              <span className="form-note">No spam. 30 days free. No credit card needed.</span>
            </div>

            <div className="hero-ui" aria-hidden="true">
              <div className="ui-card">
                <div className="ui-call-header">
                  <span className="ui-call-label">New enquiry</span>
                  <span className="ui-call-time">10:14 AM</span>
                </div>
                <p className="ui-caller">+44 7700 900 521</p>
                <div className="ui-call-status">
                  <span className="ui-status-dot"></span>
                  <span>Voxitron qualifying&hellip;</span>
                </div>
              </div>

              <div className="ui-card ui-chat">
                <div>
                  <p className="ui-msg-label">Voxitron</p>
                  <div className="ui-msg ui-msg-ai">
                    Hi! Thanks for reaching out to Griffin Electrical. To give you an accurate
                    quote, what type of work do you need? Consumer unit upgrade, EV charger,
                    or something else?
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="ui-msg-label" style={{ textAlign: "right" }}>Customer</p>
                  <div className="ui-msg ui-msg-customer">
                    EV charger installation at my house, 3-bed semi.
                  </div>
                </div>
                <div>
                  <p className="ui-msg-label">Voxitron</p>
                  <div className="ui-msg ui-msg-ai">
                    Perfect. Your quote is on its way. Check your email in the next 60
                    seconds.
                  </div>
                </div>
              </div>

              <div className="ui-card">
                <div className="ui-booking-status">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" stroke="currentColor" />
                    <path d="M4 7L6.2 9.2L10 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Quote delivered
                </div>
                <p className="ui-booking-title">EV Charger Installation</p>
                <p className="ui-booking-detail">
                  &#163;480 &ndash; &#163;620 &middot; Sent via SMS &amp; email &middot; 10:15 AM
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
              <span>Quotes delivered in under 2 minutes</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>Branded &amp; professional every time</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>30 days free to start</span>
            </li>
          </ul>
        </Reveal>

        {/* STATS */}
        <Reveal className="stats-strip" role="region" aria-label="Quoting statistics">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">60%</span>
              <p className="stat-label">of customers accept the first professional quote they receive</p>
              <span className="stat-source">Salesforce State of Sales</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3+ hrs</span>
              <p className="stat-label">average time small businesses take to send a quote after an enquiry</p>
              <span className="stat-source">GetApp SMB Survey</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">£0</span>
              <p className="stat-label">setup fee, no upfront cost, no hidden charges to get started</p>
              <span className="stat-source">30 days free, then monthly</span>
            </div>
          </div>
        </Reveal>

        {/* THE PAIN */}
        <Reveal as="section" id="pain" aria-labelledby="pain-title">
          <div className="pain-split">
            <div className="pain-split-text">
              <span className="section-label">THE PROBLEM</span>
              <h2 id="pain-title" className="section-title">
                Every delayed quote is money
                <br />
                <span className="accent">someone else is making.</span>
              </h2>
              <div className="section-body">
                <p>
                  You said you&apos;d send the quote tonight. Tonight became tomorrow, and by
                  then they&apos;d already accepted someone else&apos;s.
                </p>
                <p>Voxitron sends it the moment they ask, so tonight never happens.</p>
              </div>
            </div>
            <div className="pain-photo">
              <ImagePlaceholder label="A quote request sitting unanswered at the end of a busy day" />
            </div>
          </div>
        </Reveal>

        {/* FEATURES */}
        <Reveal as="section" id="features" aria-labelledby="features-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto var(--space-2)" }}>
              <span className="section-label">WHAT IT DOES</span>
              <h2 id="features-title" className="section-title">
                From enquiry to professional
                <br />
                <span className="accent">quote, without you.</span>
              </h2>
              <p className="section-body">
                Collects the details, builds the quote, delivers it, on the job or asleep.
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
                  <p className="feature-title">24/7 quote generation</p>
                  <p className="feature-body">Noon or midnight, every request gets a response within minutes.</p>
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
                  <p className="feature-title">Asks the right qualifying questions</p>
                  <p className="feature-body">Job type, location, property details, via SMS or WhatsApp.</p>
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
                  <p className="feature-title">Branded, professional quotes</p>
                  <p className="feature-body">Your logo, pricing, and terms. Polished, not a number in a text.</p>
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
                  <p className="feature-title">Delivered by SMS and email instantly</p>
                  <p className="feature-body">Lands in their inbox and as a text link. No app, no login.</p>
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
                  <p className="feature-title">Automated follow-up if not opened</p>
                  <p className="feature-body">Unopened after 24 hours? One polite nudge, one chance to recover the lead.</p>
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
                  <p className="feature-title">Full quote history &amp; CRM sync</p>
                  <p className="feature-body">Every quote logged and synced to your CRM. Nothing gets lost.</p>
                </div>
              </div>
            </div>

            <div className="feature-callout">
              <div>
                <span className="callout-label">Important</span>
                <p className="callout-title">You stay in control of your pricing</p>
                <p className="callout-body">
                  You define the rate structure. Review each quote before it sends, or let it
                  run fully automatic. Your choice.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* HOW IT WORKS */}
        <Reveal as="section" id="how-it-works" aria-labelledby="how-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              <span className="section-label">HOW IT WORKS</span>
              <h2 id="how-title" className="section-title">
                Set up once.
                <br />
                <span className="accent">Quote every job automatically.</span>
              </h2>
            </div>

            <ol className="steps-list">
              <li className="step">
                <ImagePlaceholder label="Screenshot: pricing and quote template setup" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">01</span>
                  <h3 className="step-title">Tell Voxitron your services and pricing</h3>
                </div>
                <p className="step-body">20 minutes. We configure your rates and build your branded quote template.</p>
              </li>
              <li className="step">
                <ImagePlaceholder label="Screenshot: connected channels" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">Connect your phone or WhatsApp number</h3>
                </div>
                <p className="step-body">Call, text, WhatsApp, or web form. Voxitron picks up all of it. No new number.</p>
              </li>
              <li className="step">
                <ImagePlaceholder label="Screenshot: quote sent to customer" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">03</span>
                  <h3 className="step-title">Every enquiry becomes a quote in minutes</h3>
                </div>
                <p className="step-body">Voxitron delivers it by SMS and email. If they accept, you&apos;re notified to confirm the job.</p>
              </li>
            </ol>
          </div>
        </Reveal>

        {/* TESTIMONIALS */}
        <Reveal as="section" id="testimonials" aria-labelledby="testimonials-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              <span className="section-label">CLIENT RESULTS</span>
              <h2 id="testimonials-title" className="section-title">
                What changed when quoting
                <br />
                <span className="accent">stopped being a bottleneck.</span>
              </h2>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  I used to spend Sunday evenings writing quotes. Now they go out as
                  enquiries come in. My acceptance rate has gone up.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">PW</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">Phil W.</span>
                    <span className="testimonial-role">Roofing Contractor, Bristol, UK</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <p className="testimonial-quote">
                  Every enquiry needs a custom quote. It was killing us to keep up. Now
                  Voxitron sends one within minutes. We look twice the size we are.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">LM</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">Lauren M.</span>
                    <span className="testimonial-role">Heating Engineer, Birmingham, UK</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <p className="testimonial-quote">
                  The follow-up feature sold me. Voxitron chases unopened quotes. I&apos;ve
                  won three jobs this month I&apos;d have written off.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">DO</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">Dan O.</span>
                    <span className="testimonial-role">General Contractor, Denver, CO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal as="section" id="faq" aria-labelledby="faq-title">
          <div className="section-inner">
            <span className="section-label">FAQ</span>
            <h2 id="faq-title" className="section-title">
              Questions about the
              <br />
              Quoting Agent.
            </h2>

            <div className="faq-list" role="list">
              <details className="faq-item" role="listitem">
                <summary>
                  Can it quote accurately without me reviewing every one?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  For standard jobs, yes, using rules you define. Unusual jobs get flagged
                  for your review before sending.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Will the quotes look professional enough to send to clients?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes. Your template is built with your logo and brand colours during setup.
                  You sign off before it goes live.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  What if the customer asks something the agent can&apos;t answer?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  It flags the enquiry with a full transcript, and tells the customer to
                  expect a call. You follow up on the complex ones personally.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Does it work with my existing CRM or job management software?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  It integrates with Tradify, ServiceM8, and others via webhook. We&apos;ll
                  confirm your stack during onboarding. If yours isn&apos;t listed, we&apos;ll
                  work with you directly.
                </p>
              </details>
            </div>
          </div>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              Stop losing jobs
              <br />
              to a faster quote.
            </h2>

            <p className="cta-sub">
              Get started today. 30 days free. Live in 48 hours. No credit card. No
              long-term contract.
            </p>

            <div className="cta-group">
              <Link href="/get-started?agent=quoting-agent" className="btn btn-primary">Get Started</Link>
              <Link href="/#services" className="btn btn-secondary">See the other agents</Link>
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
