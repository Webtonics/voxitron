import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const WA_CTA_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20to%20see%20the%20WhatsApp%20agent%20in%20action";

export const metadata: Metadata = {
  title: "WhatsApp Agent for Diagnostic Centres & Labs | Voxitron",
  description:
    "Voxitron books tests, answers pricing questions, and lets patients know when results are ready, inside WhatsApp, 24/7. Built for Nigerian diagnostic centres and labs.",
  openGraph: {
    title: "WhatsApp Agent for Diagnostic Centres: Voxitron",
    description:
      "Never leave a patient on read. Voxitron books tests, answers pricing questions, and follows up on results.",
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
      <Nav
        activePage="diagnostic-centre"
        ctaHref={WA_CTA_HREF}
        ctaLabel="Chat on WhatsApp"
        ctaExternal
        showWhatsAppCta={false}
      />

      <main>
        {/* HERO */}
        <section id="hero" aria-labelledby="hero-title">
          <div className="hero-photo" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1614935151651-0bea6508db6b?fm=jpg&q=80&w=1920&auto=format&fit=crop"
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
                Live &amp; booking tests right now
              </span>

              <span className="hero-kicker">WHATSAPP AI FOR DIAGNOSTIC CENTRES</span>

              <h1 id="hero-title" className="hero-title">
                Never leave
                <br />
                a patient
                <br />
                <span className="accent">on read.</span>
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

            <div className="hero-ui" aria-hidden="true">
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <div className="wa-header">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.5 3.5L6 9L11.5 14.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="wa-avatar">LC</span>
                    <span className="wa-header-info">
                      <span className="wa-header-name">Lifeline Diagnostics</span>
                      <span className="wa-header-status">online</span>
                    </span>
                    <span className="wa-header-icons">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4.5C2 3.67 2.67 3 3.5 3H9.5C10.33 3 11 3.67 11 4.5V11.5C11 12.33 10.33 13 9.5 13H3.5C2.67 13 2 12.33 2 11.5V4.5Z" stroke="#FFFFFF" strokeWidth="1.1" />
                        <path d="M11 6.5L14.5 4.5V11.5L11 9.5" stroke="#FFFFFF" strokeWidth="1.1" strokeLinejoin="round" />
                      </svg>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3.5C2 2.95 2.45 2.5 3 2.5H4.4C4.87 2.5 5.28 2.83 5.38 3.29L5.86 5.5C5.95 5.92 5.79 6.36 5.44 6.61L4.4 7.36C5.09 8.94 6.06 9.91 7.64 10.6L8.39 9.56C8.64 9.21 9.08 9.05 9.5 9.14L11.71 9.62C12.17 9.72 12.5 10.13 12.5 10.6V12C12.5 12.55 12.05 13 11.5 13C6.25 13 2 8.75 2 3.5Z" stroke="#FFFFFF" strokeWidth="1.1" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>

                  <div className="wa-body" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-3)" }}>
                    <ImagePlaceholder label="Demo video: WhatsApp conversation" />
                  </div>

                  <div className="wa-input-bar">
                    <span className="wa-input-pill">Message</span>
                    <span className="wa-send-btn">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="#0B0F19" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="phone-home-indicator"></div>
              </div>
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
              <span>30 days free to start</span>
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
              <p className="stat-label">of patients prefer messaging over calling to book an appointment</p>
              <span className="stat-source">Meta Business Messaging Report</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">82%</span>
              <p className="stat-label">of patients expect a reply within 24 hours, day or night</p>
              <span className="stat-source">WhatsApp Business Platform</span>
            </div>
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
              <ImagePlaceholder label="A patient's booking question left unanswered after hours" />
            </div>
          </div>
        </Reveal>

        {/* COMPARISON: old way vs new way */}
        <Reveal as="section" id="comparison" aria-labelledby="comparison-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
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
            <div style={{ maxWidth: "var(--container)", margin: "0 auto var(--space-2)" }}>
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
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              <span className="section-label">HOW IT WORKS</span>
              <h2 id="how-title" className="section-title">
                Set up once.
                <br />
                <span className="accent">Answer every message automatically.</span>
              </h2>
            </div>

            <ol className="steps-list">
              <li className="step">
                <ImagePlaceholder label="Screenshot: WhatsApp number connected" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">01</span>
                  <h3 className="step-title">Connect your WhatsApp Business number</h3>
                </div>
                <p className="step-body">No new number. Patients message the one they already have.</p>
              </li>
              <li className="step">
                <ImagePlaceholder label="Screenshot: test catalog and pricing setup" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">We train it on your tests and prices</h3>
                </div>
                <p className="step-body">Your test panels, prep instructions, and pricing, ready in a short setup session.</p>
              </li>
              <li className="step">
                <ImagePlaceholder label="Screenshot: live WhatsApp conversation" className="step-visual" />
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
              Message us on WhatsApp and see the agent reply live. 30 days free after that.
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
