import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import BuiltOnStrip from "@/components/BuiltOnStrip";

export const metadata: Metadata = {
  title: "Voxitron: AI Agents for Speed to Lead & Quoting",
  description:
    "Voxitron builds three AI agents for service and retail businesses: Speed to Lead, an Automated Quoting Agent, and a WhatsApp Business Agent for Lagos businesses that replies, books, and sells around the clock.",
  openGraph: {
    title: "Voxitron: AI Agents That Never Let a Customer Go Cold",
    description:
      "Speed to Lead responds to every missed call in under 60 seconds. The Quoting Agent sends a professional quote before you've finished the job. Both run 24/7.",
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
          <div className="hero-inner">
            <div className="hero-content">
              <span className="hero-kicker">AI AGENTS FOR SERVICE BUSINESSES</span>

              <h1 id="hero-title" className="hero-title">
                They called.
                <br />
                No answer.
                <br />
                <span className="accent">Job&apos;s gone.</span>
              </h1>

              <p className="hero-sub">
                Voxitron texts them back and sends the quote while you&apos;re still mid-job.
              </p>

              <div className="cta-group">
                <Link href="/get-started" className="btn btn-primary">
                  Get Started
                </Link>
                <a href="#services" className="btn btn-secondary">
                  See all three agents
                </a>
              </div>

              <span className="form-note">No spam. 30 days free. No credit card needed.</span>
            </div>

            <div className="hero-ui" aria-hidden="true">
              <div className="ui-card">
                <div className="ui-call-header">
                  <span className="ui-call-label">Incoming call</span>
                  <span className="ui-call-time">09:47 AM</span>
                </div>
                <p className="ui-caller">+44 7700 900 142</p>
                <div className="ui-call-status">
                  <span className="ui-status-dot"></span>
                  <span>Voxitron answering&hellip;</span>
                </div>
              </div>

              <div className="ui-card ui-chat">
                <div>
                  <p className="ui-msg-label">Voxitron</p>
                  <div className="ui-msg ui-msg-ai">
                    Hi, thanks for calling Henderson&apos;s Plumbing. How can I help you today?
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="ui-msg-label" style={{ textAlign: "right" }}>
                    Caller
                  </p>
                  <div className="ui-msg ui-msg-customer">
                    I need to book a boiler service for next week.
                  </div>
                </div>
                <div>
                  <p className="ui-msg-label">Voxitron</p>
                  <div className="ui-msg ui-msg-ai">
                    Of course. I have availability Tuesday at 10am or Thursday at 2pm, which
                    works best for you?
                  </div>
                </div>
              </div>

              <div className="ui-card">
                <div className="ui-booking-status">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" stroke="currentColor" />
                    <path d="M4 7L6.2 9.2L10 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Appointment confirmed
                </div>
                <p className="ui-booking-title">Boiler Service</p>
                <p className="ui-booking-detail">
                  Tuesday, 4 Mar &middot; 10:00 AM &middot; Henderson&apos;s Plumbing
                </p>
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
                "Plumbers",
                "Electricians",
                "Salons & Spas",
                "HVAC & Heating",
                "Medical Clinics",
                "Law Firms",
                "Restaurants",
                "Property Agents",
                "Home Services",
                "Retail & E-commerce",
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
              <span>Live &amp; serving trades businesses globally</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>Up and running in 48 hours</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>30 days free to start</span>
            </li>
          </ul>
        </Reveal>

        {/* STATS */}
        <Reveal className="stats-strip" role="region" aria-label="Lead response statistics">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">78%</span>
              <p className="stat-label">of customers hire the first business that responds to their enquiry</p>
              <span className="stat-source">Harvard Business Review</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">7+ hrs</span>
              <p className="stat-label">the average time a local business takes to respond to a new enquiry</p>
              <span className="stat-source">InsideSales.com</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">80%</span>
              <p className="stat-label">drop in lead conversion rate after just 5 minutes of not responding</p>
              <span className="stat-source">Lead Response Management Study</span>
            </div>
          </div>
        </Reveal>

        {/* THE PAIN */}
        <Reveal as="section" id="pain" aria-labelledby="pain-title">
          <div className="section-inner">
            <span className="section-label">THE PROBLEM</span>
            <h2 id="pain-title" className="section-title">
              You didn&apos;t lose the job
              <br />
              on price. You lost it <span className="accent">on speed.</span>
            </h2>
            <div className="section-body">
              <p>
                Your hands are covered in grease and your phone&apos;s buzzing in your pocket.
                By the time you check it, they&apos;ve called the next name on the list.
              </p>
              <p>Voxitron answers before they even finish dialing.</p>
            </div>
          </div>
        </Reveal>

        {/* SERVICES */}
        <Reveal as="section" id="services" aria-labelledby="services-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto var(--space-2)" }}>
              <span className="section-label">WHAT VOXITRON DOES</span>
              <h2 id="services-title" className="section-title">
                Three agents.
                <br />
                <span className="accent">One job: don&apos;t lose the customer.</span>
              </h2>
              <p className="section-body">
                Pick one, or run them together. Trained on your business, working quietly in
                the background.
              </p>
            </div>

            <div className="services-grid">
              <article className="service-card">
                <span className="service-kicker">01 &middot; SPEED TO LEAD AGENT</span>
                <h3 className="service-title">Never let a missed call go cold.</h3>
                <p className="service-body">
                  A text goes out in under 60 seconds, before your competitor calls back.
                </p>
                <ul className="service-list">
                  <li>Responds to every missed call in under 60 seconds</li>
                  <li>Qualifies the lead automatically, before you call back</li>
                  <li>Books the appointment straight into your calendar</li>
                  <li>Works across SMS, WhatsApp and email</li>
                </ul>
                <Link href="/speed-to-lead" className="service-link">See how it works</Link>
              </article>

              <article className="service-card">
                <span className="service-kicker">02 &middot; AUTOMATED QUOTING AGENT</span>
                <h3 className="service-title">Send the quote while the job is still fresh.</h3>
                <p className="service-body">
                  A branded quote lands in their inbox before you&apos;ve finished the job
                  you&apos;re on.
                </p>
                <ul className="service-list">
                  <li>Builds a branded, professional quote in minutes</li>
                  <li>Asks the right questions to get pricing right first time</li>
                  <li>Delivers instantly by SMS and email</li>
                  <li>Syncs with your CRM, so nothing falls through the cracks</li>
                </ul>
                <Link href="/quoting-agent" className="service-link">See how it works</Link>
              </article>

              <article className="service-card">
                <span className="service-kicker">03 &middot; WHATSAPP BUSINESS AGENT</span>
                <h3 className="service-title">Never leave a customer on read.</h3>
                <p className="service-body">
                  Replies, checks stock, books, and sells, right inside WhatsApp, day and
                  night.
                </p>
                <ul className="service-list">
                  <li>Replies to every message in seconds, 24/7</li>
                  <li>Checks stock and pricing in real time</li>
                  <li>Books appointments and reservations in chat</li>
                  <li>Takes orders and confirms sales</li>
                </ul>
                <Link href="/whatsapp-agent" className="service-link">See how it works</Link>
              </article>
            </div>
          </div>
        </Reveal>

        {/* HOW IT WORKS */}
        <Reveal as="section" id="how-it-works" aria-labelledby="how-title">
          <div className="section-inner">
            <span className="section-label">HOW IT WORKS</span>
            <h2 id="how-title" className="section-title">
              Set it up once.
              <br />
              <span className="accent">It handles everything else.</span>
            </h2>

            <ol className="steps-list">
              <li className="step">
                <span className="step-number" aria-hidden="true">01</span>
                <div>
                  <h3 className="step-title">We audit your lead response (free)</h3>
                  <p className="step-body">
                    We find where leads are slipping through, and which agent fixes it.
                  </p>
                </div>
              </li>
              <li className="step">
                <span className="step-number" aria-hidden="true">02</span>
                <div>
                  <h3 className="step-title">We build and configure your agent</h3>
                  <p className="step-body">
                    In under 48 hours. Connected to your existing number and calendar. No new
                    hardware.
                  </p>
                </div>
              </li>
              <li className="step">
                <span className="step-number" aria-hidden="true">03</span>
                <div>
                  <h3 className="step-title">You start capturing every lead</h3>
                  <p className="step-body">
                    Every missed call and every enquiry, handled automatically. You&apos;re
                    notified only when needed.
                  </p>
                </div>
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
                What business owners
                <br />
                <span className="accent">say about us.</span>
              </h2>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  I used to lose the first two hours of every morning returning missed calls.
                  Now I come home to booked appointments, not a list to ring back.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">DR</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">Dave R.</span>
                    <span className="testimonial-role">Electrician, Sheffield, UK</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <p className="testimonial-quote">
                  My salon gets enquiries at all hours. Voxitron answers instantly.
                  Customers think we have a whole front desk team.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">MC</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">Maria C.</span>
                    <span className="testimonial-role">Salon Owner, Bristol, UK</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <p className="testimonial-quote">
                  We&apos;re a 4-person HVAC crew. Calls used to go to voicemail during
                  installs. Now bookings go straight into our calendar. We look twice the size
                  we are.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">TH</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">Tom H.</span>
                    <span className="testimonial-role">HVAC Contractor, Phoenix, AZ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* EARLY ACCESS OFFER */}
        <Reveal as="section" id="offer" aria-labelledby="offer-title">
          <div className="section-inner">
            <span className="section-label">GET STARTED</span>
            <h2 id="offer-title" className="section-title">
              Everything included
              <br />
              <span className="accent">from day one.</span>
            </h2>

            <div className="section-body">
              <p>Fully managed. We handle setup and training. You just start capturing leads.</p>
            </div>

            <ul className="offer-list" aria-label="Service benefits">
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span><strong>30 days free.</strong> No card, no contract.</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span><strong>Done-for-you onboarding.</strong> 20 minutes, no code.</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span><strong>Live in 48 hours.</strong> Real conversations, fast.</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span><strong>Ongoing support.</strong> A dedicated contact, not a ticket queue.</span>
              </li>
            </ul>

            <p className="offer-scarcity">
              Limited new clients each month, so every setup gets proper attention.
            </p>
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
                  Will it actually sound like my business, not a generic AI?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes. Voxitron is trained on your services, pricing, and tone during
                  onboarding. It answers as your business, not a generic bot.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Does it work with my existing phone number?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes. It connects to your current mobile or landline. No new number, no new
                  hardware.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  What if a caller has a complex question it can&apos;t answer?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  It takes their details and notifies you with a full transcript. You follow
                  up when you&apos;re free. The customer never feels ignored.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  When do I get charged?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Not until your 30-day trial ends, and we&apos;ll remind you first. No
                  surprise charges.
                </p>
              </details>
            </div>
          </div>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              How many customers
              <br />
              did you lose <span className="accent">this week?</span>
            </h2>

            <p className="cta-sub">
              Get started in minutes. 30 days free. No credit card. No long-term contract.
              Cancel any time.
            </p>

            <div className="cta-group">
              <Link href="/get-started" className="btn btn-primary">Get Started</Link>
              <a href="#services" className="btn btn-secondary">See all three agents</a>
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
