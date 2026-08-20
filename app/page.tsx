import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import BuiltOnStrip from "@/components/BuiltOnStrip";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const WA_CTA_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20to%20see%20the%20WhatsApp%20agent%20in%20action";

export const metadata: Metadata = {
  title: "Voxitron: WhatsApp AI Agents for Lagos Businesses",
  description:
    "Voxitron builds WhatsApp AI agents that reply, book, and sell for Lagos businesses, real estate agencies, and diagnostic centres, 24/7. Self-hosted, NDPA-compliant, you own everything.",
  openGraph: {
    title: "Voxitron: WhatsApp AI Agents for Lagos Businesses",
    description:
      "Every WhatsApp message answered in seconds, day and night. Built for Nigerian businesses. You own the data and the infrastructure.",
    images: ["/assets/images/og-image.jpg"],
    url: "https://voxitron.com",
    type: "website",
  },
  alternates: {
    canonical: "https://voxitron.com",
  },
};

export default function Home() {
  return (
    <>
      <Nav />

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

              <span className="hero-kicker">WHATSAPP AI FOR LAGOS BUSINESSES</span>

              <h1 id="hero-title" className="hero-title">
                Never leave
                <br />
                a customer
                <br />
                <span className="accent">on read.</span>
              </h1>

              <p className="hero-sub">
                Voxitron replies, books, and sells inside WhatsApp, day and night. You own
                the data and the infrastructure it runs on.
              </p>

              <div className="cta-group">
                <a href={WA_CTA_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
                <Link href="#services" className="btn btn-secondary">See all solutions</Link>
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

        {/* INDUSTRY STRIP */}
        <div className="industry-strip" aria-label="Industries served">
          <div className="industry-inner">
            <span className="industry-label">Built for:</span>
            <div className="industry-items">
              {[
                "Fashion Retailers",
                "Real Estate Agencies",
                "Diagnostic Centres",
                "Restaurants",
                "Electronics Sellers",
                "Salons & Spas",
                "Clinics",
                "Logistics",
              ].map((item, i, arr) => (
                <span key={item} style={{ display: "contents" }}>
                  <span className="industry-item">{item}</span>
                  {i < arr.length - 1 && (
                    <span className="industry-sep" aria-hidden="true">
                      &middot;
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <BuiltOnStrip />

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
              <span>Self-hosted. You own the data</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>30 days free to start</span>
            </li>
          </ul>
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

            <div className="comparison-table" role="table" aria-label="Manual replies compared to a Voxitron agent">
              <div className="comparison-header" role="row">
                <span className="comparison-header-cell" role="columnheader"></span>
                <span className="comparison-header-cell is-old" role="columnheader">Manual replies</span>
                <span className="comparison-header-cell is-new" role="columnheader">Voxitron Agent</span>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Reply time</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Minutes to hours, faster only while you&apos;re free</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron Agent</span>
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
                  <span className="comparison-cell-label">Voxitron Agent</span>
                  <span className="comparison-cell-value">Answered the moment they arrive</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Data and infrastructure</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Scattered across staff phones</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron Agent</span>
                  <span className="comparison-cell-value">Self-hosted, logged, and owned by you</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Repeat questions</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">You type the same price and stock answer, every time</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron Agent</span>
                  <span className="comparison-cell-value">Answered automatically, you never retype it</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Complex requests</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">You handle everything yourself</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron Agent</span>
                  <span className="comparison-cell-value">Flagged with full context, you step in only when needed</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* FEATURES: six things it does */}
        <Reveal as="section" id="features" aria-labelledby="features-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto var(--space-2)" }}>
              <span className="section-label">WHAT VOXITRON DOES</span>
              <h2 id="features-title" className="section-title">
                Six things,
                <br />
                <span className="accent">running while you work.</span>
              </h2>
              <p className="section-body">
                One agent, trained on your business. Runs inside the WhatsApp number your
                customers already have.
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
                  <p className="feature-title">Checks stock and pricing in real time</p>
                  <p className="feature-body">Confirms what&apos;s available before promising anything.</p>
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
                  <p className="feature-title">Books appointments and viewings</p>
                  <p className="feature-body">Confirms a time slot right inside the chat, no back and forth.</p>
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
                  <p className="feature-body">Collects the order details and confirms the total, in chat.</p>
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
                  <p className="feature-title">Runs on your existing number</p>
                  <p className="feature-body">No new hardware. Customers message the number they already have saved.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2L9.8 5.6L14 6.2L11 9.1L11.7 13.2L8 11.3L4.3 13.2L5 9.1L2 6.2L6.2 5.6L8 2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="feature-text">
                  <p className="feature-title">Self-hosted, NDPA-aware infrastructure</p>
                  <p className="feature-body">Your conversations and customer data stay yours, not locked in a third-party platform.</p>
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

        {/* STATS */}
        <Reveal className="stats-strip" role="region" aria-label="WhatsApp and Nigeria market statistics">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">96.5%</span>
              <p className="stat-label">of Nigerian internet users are active on WhatsApp, one of the highest rates in Africa</p>
              <span className="stat-source">DataReportal</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20M+</span>
              <p className="stat-label">daily business message senders on WhatsApp in Nigeria, a first for the country</p>
              <span className="stat-source">Meta</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">₦7.2B</span>
              <p className="stat-label">already collected in NDPC data-privacy penalties, why self-hosted infrastructure matters</p>
              <span className="stat-source">Nigeria Data Protection Commission</span>
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

        {/* INDUSTRIES: two vertical cards. id="services" kept for backward-compat: every
            other page's "See the other agents" CTA links to /#services */}
        <Reveal as="section" id="services" aria-labelledby="industries-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto var(--space-2)" }}>
              <span className="section-label">BUILT FOR YOUR INDUSTRY</span>
              <h2 id="industries-title" className="section-title">
                Two industries,
                <br />
                <span className="accent">purpose-built agents.</span>
              </h2>
            </div>

            <div className="services-grid services-grid-2col">
              <article className="service-card">
                <span className="service-kicker">REAL ESTATE</span>
                <h3 className="service-title">Never lose a buyer to a slower reply.</h3>
                <p className="service-body">
                  Replies to listing enquiries, books viewings, and follows up with diaspora
                  buyers across time zones.
                </p>
                <ul className="service-list">
                  <li>Responds to every enquiry in under 60 seconds</li>
                  <li>Sends listing details and valuations automatically</li>
                  <li>Books viewings straight into your calendar</li>
                  <li>Works across time zones for diaspora buyers</li>
                </ul>
                <Link href="/real-estate" className="service-link">See how it works</Link>
              </article>

              <article className="service-card">
                <span className="service-kicker">DIAGNOSTIC CENTRES</span>
                <h3 className="service-title">Book tests before your front desk opens.</h3>
                <p className="service-body">
                  Answers pricing questions, books tests, and lets patients know when results
                  are ready, all inside WhatsApp.
                </p>
                <ul className="service-list">
                  <li>Books tests in seconds, day or night</li>
                  <li>Answers pricing and prep questions automatically</li>
                  <li>Sends prep instructions with every booking</li>
                  <li>Notifies patients when results are ready</li>
                </ul>
                <Link href="/diagnostic-centre" className="service-link">See how it works</Link>
              </article>
            </div>
          </div>
        </Reveal>

        {/* WHAT IS THIS: explainer */}
        <Reveal as="section" id="what-is-this" aria-labelledby="what-is-this-title">
          <div className="product-frame-inner">
            <div className="product-frame-visual">
              <ImagePlaceholder label="Product screenshot: live chat view coming soon" />
            </div>

            <div>
              <span className="section-label">WHAT IS VOXITRON</span>
              <h2 id="what-is-this-title" className="section-title">
                A WhatsApp agent,
                <br />
                <span className="accent">not a chatbot plugin.</span>
              </h2>
              <p className="section-body">
                Voxitron is a self-hosted AI agent built for your business, not a rented
                seat on someone else&apos;s platform.
              </p>

              <ul className="product-frame-list">
                <li>
                  <span className="product-frame-bullet" aria-hidden="true">&#9679;</span>
                  <span><strong>Trained on your catalog</strong>, prices, and how your customers actually talk</span>
                </li>
                <li>
                  <span className="product-frame-bullet" aria-hidden="true">&#9679;</span>
                  <span><strong>You own the data</strong>, conversations and customer records stay on infrastructure you control</span>
                </li>
                <li>
                  <span className="product-frame-bullet" aria-hidden="true">&#9679;</span>
                  <span><strong>Handoff built in</strong>, complex or sensitive chats come straight to you</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal as="section" id="faq" aria-labelledby="faq-title">
          <div className="section-inner">
            <span className="section-label">FAQ</span>
            <h2 id="faq-title" className="section-title">
              Questions people ask
              <br />
              before they sign up.
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
                  Who owns the data and conversation history?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  You do. Voxitron runs on self-hosted infrastructure, not a third-party
                  platform that holds your customer data hostage.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Is this compliant with Nigeria&apos;s data protection law?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  We build with NDPA 2023 in mind: data minimisation, clear consent, and
                  infrastructure you control rather than a foreign platform's black box.
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

        {/* PRICING TEASER */}
        <Reveal as="section" id="pricing-teaser" aria-labelledby="pricing-teaser-title">
          <div className="section-inner">
            <span className="section-label">PRICING</span>
            <h2 id="pricing-teaser-title" className="section-title">
              A setup fee,
              <br />
              <span className="accent">then a simple retainer.</span>
            </h2>
            <div className="section-body">
              <p>No hidden platform fees. No per-seat pricing. You know the cost upfront.</p>
            </div>
            <div className="cta-group">
              <Link href="/pricing" className="btn btn-primary">See pricing</Link>
              <Link href="/compare" className="btn btn-secondary">Compare your options</Link>
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
              <Link href="/contact" className="btn btn-secondary">Book a call</Link>
            </div>

            <span className="form-note">No forms required. Just message us.</span>
          </div>
        </Reveal>
      </main>

      <Footer />
      <WaFloat />
    </>
  );
}
