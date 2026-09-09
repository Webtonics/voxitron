import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import StepIcon from "@/components/StepIcon";
import CalculatorTool from "@/components/CalculatorTool";
import PhoneMockup from "@/components/PhoneMockup";

const WA_CTA_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20to%20see%20the%20WhatsApp%20agent%20in%20action";

export const metadata: Metadata = {
  title: "WhatsApp Agent for Diagnostic Centres & Labs | Voxitron",
  description:
    "Voxitron books tests, answers pricing questions, and lets patients know when results are ready, inside WhatsApp, 24/7. Built for Nigerian diagnostic centres and labs.",
  openGraph: {
    title: "WhatsApp Agent for Diagnostic Centres: Voxitron",
    description:
      "Your front desk never closes. Voxitron books tests, answers pricing questions, and follows up on results.",
    images: ["/assets/images/og-image.jpg"],
    url: "https://voxitron.com/diagnostic-centre",
    type: "website",
  },
  alternates: {
    canonical: "https://voxitron.com/diagnostic-centre",
  },
};

export default function DiagnosticCentrePage() {
  return (
    <>
      <Nav activePage="diagnostic-centre" />

      <main>
        {/* HERO */}
        <section id="hero" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-content">
              <span className="hero-trust-pill">
                <span className="dot" aria-hidden="true"></span>
                Live &amp; booking tests right now
              </span>

              <span className="hero-kicker">WHATSAPP AI FOR DIAGNOSTIC CENTRES</span>

              <h1 id="hero-title" className="hero-title">
                Your front desk
                <br />
                never
                <br />
                <span className="accent">closes.</span>
              </h1>

              <p className="hero-sub">
                Voxitron books tests, answers pricing questions, and follows up on results,
                inside WhatsApp, day and night.
              </p>

              <div className="cta-group">
                <a href={WA_CTA_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
                <Link href="/#services" className="btn btn-secondary">See the other agents</Link>
              </div>

              <span className="form-note">Message us directly. See the agent reply in real time.</span>
            </div>

            <div className="hero-ui">
              <PhoneMockup
                contactName="Lifeline Diagnostics"
                contactInitials="LC"
                messages={[
                  { from: "in", voicenote: { duration: "0:11" }, time: "09:14" },
                  { from: "out", text: "Yes, FBC is ₦8,500. Want me to book a slot for you today?", time: "09:14" },
                  { from: "in", text: "Yes please, this afternoon if possible", time: "09:15" },
                  { from: "out", image: { alt: "Booking confirmation card for 2pm appointment", caption: "Booking confirmed" }, text: "Booked for 2pm. Come fasted, we'll text when your results are ready.", time: "09:15" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* PROOF STRIP */}
        <Reveal className="proof-strip" role="region" aria-label="Key facts">
          <ul className="proof-list">
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>Replies day and night, in seconds</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>Books tests before your front desk opens</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>2-week pilot to start</span>
            </li>
          </ul>
        </Reveal>

        {/* STATS */}
        <Reveal className="stats-strip" role="region" aria-label="WhatsApp business statistics">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">95%+</span>
              <p className="stat-label">of Nigerian internet users are on WhatsApp every month</p>
              <span className="stat-source">DataReportal</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">67%</span>
              <p className="stat-label">of customers prefer messaging over calling to book an appointment</p>
              <span className="stat-source">Meta Business Messaging Report</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">82%</span>
              <p className="stat-label">of customers expect a reply within 24 hours, day or night</p>
              <span className="stat-source">WhatsApp Business Platform</span>
            </div>
          </div>
        </Reveal>

        {/* CALCULATOR TEASER */}
        <Reveal as="section" id="calculator-teaser" aria-labelledby="calculator-teaser-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">CALCULATE</span>
              <h2 id="calculator-teaser-title" className="section-title">
                What would slow
                <br />
                <span className="accent">replies cost you?</span>
              </h2>
            </div>
            <CalculatorTool compact />
            <Link href="/tools/missed-lead-calculator" className="service-link" style={{ marginTop: "var(--space-5)" }}>
              See the full breakdown
            </Link>
          </div>
        </Reveal>

        {/* THE PAIN */}
        <Reveal as="section" id="pain" aria-labelledby="pain-title">
          <div className="pain-split">
            <div className="pain-split-text">
              <span className="section-label">THE PROBLEM</span>
              <h2 id="pain-title" className="section-title">
                A patient asked about a test.
                <br />
                <span className="accent">Your front desk was closed.</span>
              </h2>
              <div className="section-body">
                <p>
                  A patient messages asking how much a scan costs and whether they need to
                  fast beforehand. It&apos;s past closing time, or your one receptionist is
                  on a call.
                </p>
                <p>They don&apos;t wait. They book at the lab down the road instead.</p>
              </div>
            </div>
            <div className="pain-photo">
              <ImagePlaceholder label="Photo: a diagnostic centre reception desk, closed for the night" />
            </div>
          </div>
        </Reveal>

        {/* COMPARISON: old way vs new way */}
        <Reveal as="section" id="comparison" aria-labelledby="comparison-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">BEFORE AND AFTER</span>
              <h2 id="comparison-title" className="section-title">
                What changes when
                <br />
                <span className="accent">WhatsApp runs itself.</span>
              </h2>
            </div>

            <div className="comparison-table" role="table" aria-label="Manual replies compared to the WhatsApp Agent">
              <div className="comparison-header" role="row">
                <span className="comparison-header-cell" role="columnheader"></span>
                <span className="comparison-header-cell is-old" role="columnheader">Manual replies</span>
                <span className="comparison-header-cell is-new" role="columnheader">Voxitron WhatsApp Agent</span>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Booking a test</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Only during front desk hours</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Booked in seconds, day or night</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Pricing questions</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">You repeat the same price list all day</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Answered automatically, every time</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Prep instructions</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Patients forget, or never got told</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Sent automatically with the booking</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Result follow-up</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Patients call in repeatedly to check</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Patients get notified when results are ready</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Sensitive questions</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">You handle everything yourself</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Flagged with full context, you step in only when needed</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* FEATURES */}
        <Reveal as="section" id="features" aria-labelledby="features-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">WHAT IT DOES</span>
              <h2 id="features-title" className="section-title">
                Every message answered,
                <br />
                <span className="accent">every time, automatically.</span>
              </h2>
              <p className="section-body">
                Runs inside your WhatsApp Business number. Books tests, answers questions,
                and follows up on results while you work.
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
                  <p className="feature-title">Replies in seconds, 24/7</p>
                  <p className="feature-body">Every message gets an answer, whether it&apos;s noon or 3am.</p>
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
                  <p className="feature-title">Answers the questions patients actually ask</p>
                  <p className="feature-body">Price, prep instructions, location, turnaround time, answered instantly.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4C3 3.45 3.45 3 4 3H13C13.55 3 14 3.45 14 4V11C14 11.55 13.55 12 13 12H3C2.45 12 2 11.55 2 11V4Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M2 5L8 8.5L14 5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <div className="feature-text">
                  <p className="feature-title">Books tests straight into your schedule</p>
                  <p className="feature-body">Confirms a slot and sends prep instructions in the same chat.</p>
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
                  <p className="feature-title">Lets patients know when results are ready</p>
                  <p className="feature-body">No more repeat calls just to check. Patients are notified automatically.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4C2 3.45 2.45 3 3 3H13C13.55 3 14 3.45 14 4V11C14 11.55 13.55 12 13 12H3C2.45 12 2 11.55 2 11V4Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 6.5H11M5 9H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="feature-text">
                  <p className="feature-title">Sends test packages and pricing</p>
                  <p className="feature-body">Full panels, single tests, or corporate packages, quoted instantly.</p>
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
                  <p className="feature-title">Full chat log, handed to you when needed</p>
                  <p className="feature-body">Every conversation saved. Sensitive requests come straight to you.</p>
                </div>
              </div>
            </div>

            <div className="feature-callout">
              <div>
                <span className="callout-label">Important</span>
                <p className="callout-title">Sounds like a real person, not a chatbot</p>
                <p className="callout-body">
                  Trained on how your patients actually message: short texts, common
                  phrasing, straight to the point. Professional, never robotic.
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
                Set up once.
                <br />
                <span className="accent">Answer every message automatically.</span>
              </h2>
            </div>

            <ol className="steps-list">
              <li className="step">
                <StepIcon icon="connect" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">01</span>
                  <h3 className="step-title">Connect your WhatsApp Business number</h3>
                </div>
                <p className="step-body">No new number. Patients message the one they already have.</p>
              </li>
              <li className="step">
                <StepIcon icon="catalog" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">We train it on your tests and prices</h3>
                </div>
                <p className="step-body">Your test panels, prep instructions, and pricing, ready in a short setup session.</p>
              </li>
              <li className="step">
                <StepIcon icon="handoff" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">03</span>
                  <h3 className="step-title">It goes live, answering every message</h3>
                </div>
                <p className="step-body">You step in only when a patient needs you directly.</p>
              </li>
            </ol>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal as="section" id="faq" aria-labelledby="faq-title">
          <div className="section-inner">
            <span className="section-label">FAQ</span>
            <h2 id="faq-title" className="section-title">
              Questions about the
              <br />
              WhatsApp Agent for labs.
            </h2>

            <div className="faq-list" role="list">
              <details className="faq-item" role="listitem">
                <summary>
                  Does this work with the regular WhatsApp Business app?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes. It connects to WhatsApp Business, the app you already use. No need to
                  switch to anything unfamiliar.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Can it send sensitive results over WhatsApp?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  It notifies patients that results are ready and directs them to collect or
                  view them securely. It doesn&apos;t send clinical results directly in chat.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Can it handle multiple test packages and pricing tiers?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes. Load your full test catalog and it quotes the right package
                  automatically, including corporate or bundled panels.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  What if a patient asks something clinical or complex?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  It flags the chat with the full conversation. You or your clinical team
                  take over, and the patient never feels ignored.
                </p>
              </details>
            </div>
          </div>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              Stop losing patients
              <br />
              to a slow reply.
            </h2>

            <p className="cta-sub">
              Message us on WhatsApp and see the agent reply live. Try it 2 weeks, only
              pay next month if it books.
            </p>

            <div className="cta-group">
              <a href={WA_CTA_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
              <Link href="/#services" className="btn btn-secondary">See the other agents</Link>
            </div>

            <span className="form-note">No forms. No waiting. Just message us.</span>
          </div>
        </Reveal>
      </main>

      <Footer />
      <WaFloat />
    </>
  );
}
