import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PhoneMockup from "@/components/PhoneMockup";
import StepIcon from "@/components/StepIcon";

const WA_CTA_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20to%20see%20the%20WhatsApp%20agent%20in%20action";

export const metadata: Metadata = {
  title: "WhatsApp Agent for Retailers & Shop Owners | Voxitron",
  description:
    "Voxitron answers stock and price questions, takes orders, and stops you retyping the same reply all day, inside WhatsApp, 24/7. Built for Nigerian retailers and market sellers.",
  openGraph: {
    title: "WhatsApp Agent for Retailers: Voxitron",
    description:
      "Every 'is this available' answered instantly. Voxitron checks stock, quotes prices, and takes orders while you serve the customer in front of you.",
    images: ["/assets/images/og-image.jpg"],
    url: "https://voxitron.com/retail",
    type: "website",
  },
  alternates: {
    canonical: "https://voxitron.com/retail",
  },
};

export default function RetailPage() {
  return (
    <>
      <Nav activePage="retail" />

      <main>
        {/* HERO */}
        <section id="hero" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-content">
              <span className="hero-trust-pill">
                <span className="dot" aria-hidden="true"></span>
                Live &amp; taking orders right now
              </span>

              <span className="hero-kicker">WHATSAPP AI FOR RETAILERS</span>

              <h1 id="hero-title" className="hero-title">
                Stop retyping
                <br />
                the same
                <br />
                <span className="accent">price all day.</span>
              </h1>

              <p className="hero-sub">
                Voxitron answers stock and price questions, takes orders, and frees you
                up to actually run the shop.
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
                contactName="Adaeze Fabrics"
                contactInitials="AF"
                messages={[
                  { from: "in", image: { alt: "Photo sent by customer of blue ankara fabric" }, text: "Do you have this blue ankara in stock? How much per yard?", time: "12:41" },
                  { from: "out", text: "Yes, in stock. ₦4,500 per yard. Want me to hold some for you?", time: "12:41" },
                  { from: "in", voicenote: { duration: "0:14" }, time: "12:42" },
                  { from: "out", text: "Held for you, ₦27,000 total. Come by any time today.", time: "12:42" },
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
              <span>Answers stock and price questions instantly</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>Takes orders while you serve the next customer</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>2-week pilot to start</span>
            </li>
          </ul>
        </Reveal>

        {/* STATS */}
        <Reveal className="stats-strip" role="region" aria-label="Retail response statistics">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">2-7%</span>
              <p className="stat-label">of annual revenue lost to inventory inaccuracies from manual stock tracking</p>
              <span className="stat-source">Bumpa Retail Report</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">59%</span>
              <p className="stat-label">of DM enquiries convert to a sale when a seller replies within 30 minutes</p>
              <span className="stat-source">Busnurd Case Study</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20%</span>
              <p className="stat-label">average DM-to-sale conversion for sellers who reply slower than that</p>
              <span className="stat-source">Busnurd Case Study</span>
            </div>
          </div>
        </Reveal>

        {/* THE PAIN */}
        <Reveal as="section" id="pain" aria-labelledby="pain-title">
          <div className="pain-split">
            <div className="pain-split-text">
              <span className="section-label">THE PROBLEM</span>
              <h2 id="pain-title" className="section-title">
                &quot;Is this available?&quot;
                <br />
                <span className="accent">You type it out again.</span>
              </h2>
              <div className="section-body">
                <p>
                  Ten people message about the same dress in an hour. You&apos;re typing the
                  same price and size answer, one customer at a time, while a customer in
                  front of you waits.
                </p>
                <p>By the time you reply, half of them have already bought elsewhere.</p>
              </div>
            </div>
            <div className="pain-photo">
              <ImagePlaceholder label="Photo: a shop owner serving a walk-in customer at the counter" />
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
                <span className="comparison-row-title">Stock questions</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">You check the shelf, then reply</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Answered instantly from your catalog</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Price checks</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Typed out fresh, every single time</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Sent automatically, with photos</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Taking an order</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Scribbled down, sometimes lost</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Logged automatically, nothing missed</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Serving a walk-in</span>
                <div className="comparison-cell is-old" role="cell">
                  <span className="comparison-cell-label">Manual replies</span>
                  <span className="comparison-cell-value">Online customers wait, or get ignored</span>
                </div>
                <div className="comparison-cell is-new" role="cell">
                  <span className="comparison-cell-label">Voxitron WhatsApp Agent</span>
                  <span className="comparison-cell-value">Answered the moment they message</span>
                </div>
              </div>

              <div className="comparison-row" role="row">
                <span className="comparison-row-title">Negotiating or complex asks</span>
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
                Runs inside your WhatsApp Business number. Answers, quotes, and takes
                orders while you run the shop.
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
                  <p className="feature-body">Every &quot;is this available&quot; gets an answer, whether it&apos;s noon or 3am.</p>
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
                  <p className="feature-title">Checks stock before it replies</p>
                  <p className="feature-body">Connected to your real inventory, so it never promises what&apos;s already sold.</p>
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
                  <p className="feature-title">Sends your catalog, not a typed list</p>
                  <p className="feature-body">Photos, prices, and sizes, browsable in the same chat.</p>
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
                  <p className="feature-title">Takes the order and logs it</p>
                  <p className="feature-body">No more orders lost in a scroll of old chats.</p>
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
                  <p className="feature-body">Every order and enquiry saved, so nothing slips through at closing time.</p>
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
                <StepIcon icon="connect" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">01</span>
                  <h3 className="step-title">Connect your WhatsApp Business number</h3>
                </div>
                <p className="step-body">No new number. Customers message the one they already have.</p>
              </li>
              <li className="step">
                <StepIcon icon="catalog" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">We load your catalog and prices</h3>
                </div>
                <p className="step-body">Your products, stock, and pricing, ready in a short setup session.</p>
              </li>
              <li className="step">
                <div className="step-visual step-visual-phone">
                  <PhoneMockup
                    contactName="Adaeze Fabrics"
                    contactInitials="AF"
                    messages={[
                      { from: "in", text: "Do you have size M in stock?", time: "11:20" },
                      { from: "out", text: "Yes, available. ₦18,000. Want me to hold it?", time: "11:20" },
                    ]}
                  />
                </div>
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
              retailers and shop owners.
            </h2>

            <div className="faq-list" role="list">
              <details className="faq-item" role="listitem">
                <summary>
                  Does it know what&apos;s actually in stock?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes. It checks your real inventory before replying, so it never confirms
                  something you&apos;ve already sold out of.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  I sell on Instagram too, does it help there?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  It runs on your WhatsApp Business number. Customers who message you from
                  Instagram or anywhere else still get an instant reply once they&apos;re on
                  WhatsApp.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  What if a customer wants to negotiate the price?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  It flags the chat with full context. You take over for anything that needs
                  a judgment call.
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
              Stop losing sales
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
