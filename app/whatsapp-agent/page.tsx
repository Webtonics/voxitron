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
  title: "WhatsApp Business Agent for Nigerian Businesses | Voxitron",
  description:
    "Voxitron's WhatsApp Business Agent replies to customers, checks stock, books appointments, and takes orders inside WhatsApp, 24/7. Built for Nigerian businesses, from Lagos to Abuja and beyond.",
  openGraph: {
    title: "WhatsApp Business Agent: Voxitron",
    description:
      "Never leave a customer on read. Voxitron replies, checks stock, and takes orders inside WhatsApp, day and night.",
    images: ["/assets/images/og-image.jpg"],
    url: "https://voxitron.com/whatsapp-agent",
    type: "website",
  },
  alternates: {
    canonical: "https://voxitron.com/whatsapp-agent",
  },
};

export default function WhatsAppAgentPage() {
  return (
    <>
      <Nav
        activePage="whatsapp-agent"
        ctaHref={WA_CTA_HREF}
        ctaLabel="Chat on WhatsApp"
        ctaExternal
      />

      <main>
        {/* HERO */}
        <section id="hero" aria-labelledby="hero-title">
          <div className="hero-photo" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1585540083814-ea6ee8af9e4f?fm=jpg&q=80&w=1920&auto=format&fit=crop"
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
                Live &amp; replying on WhatsApp right now
              </span>

              <span className="hero-kicker">WHATSAPP AI FOR NIGERIAN BUSINESSES</span>

              <h1 id="hero-title" className="hero-title">
                Never leave
                <br />
                a customer
                <br />
                <span className="accent">on read.</span>
              </h1>

              <p className="hero-sub">
                Voxitron replies, checks stock, books, and sells inside WhatsApp, day and
                night.
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
                    <span className="wa-avatar">AF</span>
                    <span className="wa-header-info">
                      <span className="wa-header-name">Adaeze Fabrics</span>
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

                  <div className="wa-body">
                    <video
                      className="wa-chat-video"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/assets/images/whatsapp-demo-poster.png"
                      aria-hidden="true"
                    >
                      <source src="/assets/video/whatsapp-demo.mp4" type="video/mp4" />
                    </video>
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
              <span>Checks stock before you do</span>
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
              <p className="stat-label">of customers prefer messaging a business over calling or emailing</p>
              <span className="stat-source">Meta Business Messaging Report</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">82%</span>
              <p className="stat-label">of customers expect a reply within 24 hours, day or night</p>
              <span className="stat-source">WhatsApp Business Platform</span>
            </div>
          </div>
        </Reveal>

        {/* THE PAIN */}
        <Reveal as="section" id="pain" aria-labelledby="pain-title">
          <div className="section-inner">
            <span className="section-label">THE PROBLEM</span>
            <h2 id="pain-title" className="section-title">
              You were busy.
              <br />
              <span className="accent">They messaged someone else.</span>
            </h2>
            <div className="section-body">
              <p>
                A customer messages asking if the blue fabric&apos;s still available.
                You&apos;re serving someone else, or it&apos;s 1am and you&apos;re asleep.
              </p>
              <p>They don&apos;t wait. They message the next seller and buy from them instead.</p>
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

            <div className="comparison-table" role="table" aria-label="Manual replies compared to the WhatsApp Business Agent">
              <div className="comparison-header" role="row">
                <span className="comparison-header-cell" role="columnheader"></span>
                <span className="comparison-header-cell is-old" role="columnheader">Manual replies</span>
                <span className="comparison-header-cell is-new" role="columnheader">Voxitron WhatsApp Agent</span>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Reply time</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Minutes to hours, faster only while you&apos;re free</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Seconds, day or night</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Overnight messages</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Sit unread until morning</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Answered the moment they arrive</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Repeat questions</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">You type the same price and stock answer, every time</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Answered automatically, you never retype it</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">When you&apos;re mid-job</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Customer waits, or messages someone else</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Order taken, you see it once you&apos;re free</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Complex requests</span>
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
                Runs inside your WhatsApp Business number. Replies, checks stock, and takes
                orders while you work.
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
                  <p className="feature-title">Answers the questions customers actually ask</p>
                  <p className="feature-body">Price, availability, delivery, location, answered instantly.</p>
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
                  <p className="feature-title">Checks your real stock levels</p>
                  <p className="feature-body">Confirms what&apos;s available before promising anything.</p>
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
                  <p className="feature-title">Books appointments and reservations</p>
                  <p className="feature-body">Confirms a time slot right inside the chat.</p>
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
                  <p className="feature-title">Takes orders and confirms sales</p>
                  <p className="feature-body">Collects the order details and confirms the total.</p>
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
                  <p className="feature-body">Every conversation saved. Complex requests come straight to you.</p>
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

        {/* PRODUCT FRAME: dashboard/chat showcase */}
        <Reveal as="section" id="product-frame" aria-labelledby="product-frame-title">
          <div className="product-frame-inner">
            <div className="product-frame-visual">
              <ImagePlaceholder label="Product screenshot: live chat view coming soon" />
            </div>

            <div>
              <span className="section-label">SEE IT WORKING</span>
              <h2 id="product-frame-title" className="section-title">
                Every conversation,
                <br />
                <span className="accent">in one place.</span>
              </h2>
              <p className="section-body">
                Watch replies go out in real time. Nothing gets buried in your phone&apos;s
                regular WhatsApp inbox.
              </p>

              <ul className="product-frame-list">
                <li>
                  <span className="product-frame-bullet" aria-hidden="true">&#9679;</span>
                  <span><strong>Live message log</strong>, every reply the agent sends, timestamped</span>
                </li>
                <li>
                  <span className="product-frame-bullet" aria-hidden="true">&#9679;</span>
                  <span><strong>Order and stock checks</strong>, visible as they happen, not after the fact</span>
                </li>
                <li>
                  <span className="product-frame-bullet" aria-hidden="true">&#9679;</span>
                  <span><strong>Handoff flags</strong>, so you know exactly which chats need you</span>
                </li>
              </ul>
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
                <p className="step-body">No new number. Customers message the one they already have.</p>
              </li>
              <li className="step">
                <ImagePlaceholder label="Screenshot: catalog and pricing setup" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">We train it on your catalog and prices</h3>
                </div>
                <p className="step-body">Your products, services, and pricing, ready in a short setup session.</p>
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

        {/* TESTIMONIALS */}
        <Reveal as="section" id="testimonials" aria-labelledby="testimonials-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              <span className="section-label">CLIENT RESULTS</span>
              <h2 id="testimonials-title" className="section-title">
                What changed for Nigerian
                <br />
                <span className="accent">businesses on WhatsApp.</span>
              </h2>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  I used to lose orders overnight. Now Voxitron replies before I even wake
                  up, and half of them are already paid for.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">CA</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">Chidinma A.</span>
                    <span className="testimonial-role">Fashion Retailer, Lagos</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <p className="testimonial-quote">
                  Customers used to message and wait hours for a reply. Now orders come in
                  mid-service, and nothing gets missed.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">TO</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">Tunde O.</span>
                    <span className="testimonial-role">Restaurant Owner, Abuja</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <p className="testimonial-quote">
                  My customers just want a quick answer on price and stock. Voxitron gives it
                  instantly, so they don&apos;t move to the next seller.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">IK</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">Ifeoma K.</span>
                    <span className="testimonial-role">Phone Accessories Seller, Port Harcourt</span>
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
              WhatsApp Business Agent.
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
                  Do I need a new phone number?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  No. It runs on your existing WhatsApp Business number, the one your
                  customers already message.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Can it actually see my real stock levels?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes, once connected to your inventory. You decide how much it checks
                  automatically versus flags for you.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  What if a customer wants to negotiate or asks something complex?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  It flags the chat with the full conversation. You take over, and the
                  customer never feels ignored.
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
