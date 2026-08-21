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
  title: "WhatsApp Agent for E-commerce Brands | Voxitron",
  description:
    "Voxitron confirms orders, answers 'where is my order' automatically, and recovers abandoned carts, inside WhatsApp, 24/7. Built for Nigerian e-commerce brands.",
  openGraph: {
    title: "WhatsApp Agent for E-commerce Brands: Voxitron",
    description:
      "Confirm every order, kill WISMO tickets, and win back abandoned carts. Voxitron runs it all inside WhatsApp.",
    images: ["/assets/images/og-image.jpg"],
    url: "https://voxitron.com/ecommerce",
    type: "website",
  },
  alternates: {
    canonical: "https://voxitron.com/ecommerce",
  },
};

export default function EcommercePage() {
  return (
    <>
      <Nav
        activePage="ecommerce"
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
              src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?fm=jpg&q=80&w=1920&auto=format&fit=crop"
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
                Live &amp; confirming orders right now
              </span>

              <span className="hero-kicker">WHATSAPP AI FOR E-COMMERCE BRANDS</span>

              <h1 id="hero-title" className="hero-title">
                They paid.
                <br />
                Then they
                <br />
                <span className="accent">
                  stopped
                  <br />
                  trusting
                  <br />
                  you.
                </span>
              </h1>

              <p className="hero-sub">
                Voxitron confirms every order instantly, kills &quot;where is my order&quot;
                tickets, and wins back abandoned carts, automatically.
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
                    <span className="wa-avatar">LS</span>
                    <span className="wa-header-info">
                      <span className="wa-header-name">Lumo Store</span>
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

                  <div className="wa-body wa-body-placeholder">
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
              <span>Confirms orders the moment they&apos;re placed</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>Answers &quot;where is my order&quot; automatically</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>30 days free to start</span>
            </li>
          </ul>
        </Reveal>

        {/* STATS */}
        <Reveal className="stats-strip" role="region" aria-label="E-commerce support statistics">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">40-60%</span>
              <p className="stat-label">of support tickets are just &quot;where is my order,&quot; information that already exists</p>
              <span className="stat-source">WISMO Industry Benchmarks</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">70%+</span>
              <p className="stat-label">of online shopping carts get abandoned before checkout completes</p>
              <span className="stat-source">Email Vendor Selection, 2026</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20-30%</span>
              <p className="stat-label">reduction in cart abandonment reported by brands using WhatsApp AI in Nigeria</p>
              <span className="stat-source">Creative Tech Africa</span>
            </div>
          </div>
        </Reveal>

        {/* THE PAIN */}
        <Reveal as="section" id="pain" aria-labelledby="pain-title">
          <div className="pain-split">
            <div className="pain-split-text">
              <span className="section-label">THE PROBLEM</span>
              <h2 id="pain-title" className="section-title">
                They paid you.
                <br />
                <span className="accent">Then silence.</span>
              </h2>
              <div className="section-body">
                <p>
                  A customer pays and hears nothing back for hours. In a market where
                  &quot;paid and never received&quot; is a common scam story, that silence
                  reads as a red flag, not a delay.
                </p>
                <p>They message asking if it&apos;s real. You&apos;re buried in ten other &quot;where is my order&quot; messages.</p>
              </div>
            </div>
            <div className="pain-photo">
              <Image
                src="https://images.unsplash.com/photo-1595349785606-5982d59ef635?fm=jpg&q=80&w=800&auto=format&fit=crop"
                alt="A customer checking their phone, waiting on order confirmation after paying"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
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
                <span className="comparison-row-title">Order confirmation</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Sent whenever you get to it</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Sent the instant payment lands</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">&quot;Where is my order&quot;</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">You check the courier, then reply</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Answered instantly from tracking data</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Abandoned carts</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Nobody follows up, the sale is gone</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">A WhatsApp nudge brings buyers back</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Delivery updates</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Customer has to ask first</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Sent automatically: packed, dispatched, delivered</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Complaints or returns</span>
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
                Runs inside your WhatsApp Business number. Confirms, tracks, and recovers
                while you run the brand.
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
                  <p className="feature-title">Confirms orders instantly</p>
                  <p className="feature-body">A reference number and clear next steps, the moment payment lands.</p>
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
                  <p className="feature-title">Kills &quot;where is my order&quot; tickets</p>
                  <p className="feature-body">Answers tracking questions from real courier data, not guesswork.</p>
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
                  <p className="feature-title">Recovers abandoned carts</p>
                  <p className="feature-body">A timely WhatsApp nudge brings hesitant buyers back to check out.</p>
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
                  <p className="feature-title">Sends delivery updates automatically</p>
                  <p className="feature-body">Packed, dispatched, out for delivery, no need for the customer to ask.</p>
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
                  <p className="feature-body">No new app to learn, no number for customers to save. It&apos;s the one they already message.</p>
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
                  <p className="feature-title">Full order log in your dashboard</p>
                  <p className="feature-body">Every order, enquiry, and outcome saved, nothing slips through.</p>
                </div>
              </div>
            </div>

            <div className="feature-callout">
              <div>
                <span className="callout-label">Important</span>
                <p className="callout-title">Sounds like a real person, not a chatbot</p>
                <p className="callout-body">
                  Trained on how your customers actually message: short texts, common
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
                <ImagePlaceholder label="Screenshot: WhatsApp number connected" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">01</span>
                  <h3 className="step-title">Connect your WhatsApp Business number</h3>
                </div>
                <p className="step-body">No new number. Customers message the one they already have.</p>
              </li>
              <li className="step">
                <ImagePlaceholder label="Screenshot: store and courier connection" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">We connect your store and courier data</h3>
                </div>
                <p className="step-body">Order status and tracking, pulled automatically, no manual lookups.</p>
              </li>
              <li className="step">
                <ImagePlaceholder label="Screenshot: live WhatsApp conversation" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">03</span>
                  <h3 className="step-title">It goes live, answering every message</h3>
                </div>
                <p className="step-body">You step in only when a customer needs you directly.</p>
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
              e-commerce brands.
            </h2>

            <div className="faq-list" role="list">
              <details className="faq-item" role="listitem">
                <summary>
                  Does it connect to my store and courier?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes. It pulls real order and tracking data, so &quot;where is my order&quot;
                  gets answered from facts, not guesses.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  How does cart recovery actually work?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  When a customer leaves items unpaid for, it sends a timely, non-pushy
                  WhatsApp reminder with a direct link back to checkout.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  What if a customer has a complaint or wants a refund?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  It flags the chat with full order context. You take over for anything that
                  needs a judgment call.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Do I need a new phone number?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  No. It runs on your existing number, the one customers already have saved.
                </p>
              </details>
            </div>
          </div>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              Stop losing orders
              <br />
              to silence and doubt.
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
