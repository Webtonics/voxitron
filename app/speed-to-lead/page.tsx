import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Speed to Lead Agent: Respond in Under 60 Seconds | Voxitron",
  description:
    "Voxitron's Speed to Lead Agent responds to every missed call with a personalised text in under 60 seconds, 24/7. The first business to respond wins the job.",
  openGraph: {
    title: "Speed to Lead Agent: Voxitron",
    description:
      "Never lose a lead to a slower competitor. Voxitron texts back every missed call in under 60 seconds, automatically.",
    images: ["/assets/images/og-image.jpg"],
    url: "https://voxitron.com/speed-to-lead",
    type: "website",
  },
  alternates: {
    canonical: "https://voxitron.com/speed-to-lead",
  },
};

export default function SpeedToLeadPage() {
  return (
    <>
      <Nav activePage="speed-to-lead" />

      <main>
        {/* HERO */}
        <section id="hero" aria-labelledby="hero-title">
          <div className="hero-photo" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1676210134188-4c05dd172f89?fm=jpg&q=80&w=1920&auto=format&fit=crop"
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
                Live &amp; answering for trades businesses right now
              </span>

              <span className="hero-kicker">SPEED TO LEAD AGENT</span>

              <h1 id="hero-title" className="hero-title">
                Respond
                <br />
                first.
                <br />
                <span className="accent">Win the job.</span>
              </h1>

              <p className="hero-sub">
                Voxitron texts back every missed call in under 60 seconds, 24/7.
              </p>

              <div className="cta-group">
                <Link href="/get-started?agent=speed-to-lead" className="btn btn-primary">Get Started</Link>
                <Link href="/#services" className="btn btn-secondary">See the other agents</Link>
              </div>

              <span className="form-note">No spam. 30 days free. No credit card needed.</span>
            </div>

            <div className="hero-ui" aria-hidden="true">
              <div className="ui-card">
                <div className="ui-call-header">
                  <span className="ui-call-label">Missed call</span>
                  <span className="ui-call-time">14:22 PM</span>
                </div>
                <p className="ui-caller">+44 7700 900 773</p>
                <div className="ui-call-status">
                  <span className="ui-status-dot"></span>
                  <span>Voxitron responding&hellip;</span>
                </div>
              </div>

              <div className="ui-card ui-chat">
                <div>
                  <p className="ui-msg-label">Voxitron &mdash; 23 seconds later</p>
                  <div className="ui-msg ui-msg-ai">
                    Hi! Sorry we missed your call. This is Clarke Roofing. Can I help with
                    something? We can usually get back to you within the hour.
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="ui-msg-label" style={{ textAlign: "right" }}>Customer</p>
                  <div className="ui-msg ui-msg-customer">
                    Yes please, I need someone to look at a leak above my back bedroom.
                  </div>
                </div>
                <div>
                  <p className="ui-msg-label">Voxitron</p>
                  <div className="ui-msg ui-msg-ai">
                    Got it. I can book an inspection for tomorrow morning or Thursday
                    afternoon, which works for you?
                  </div>
                </div>
              </div>

              <div className="ui-card">
                <div className="ui-booking-status">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" stroke="currentColor" />
                    <path d="M4 7L6.2 9.2L10 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Lead captured
                </div>
                <p className="ui-booking-title">Roof Leak Inspection</p>
                <p className="ui-booking-detail">
                  Tomorrow, 9:00 AM &middot; Clarke Roofing &middot; Response: 23 sec
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
              <span>Responds in under 60 seconds</span>
            </li>
            <li className="proof-divider" role="separator" aria-hidden="true"></li>
            <li className="proof-item">
              <span className="proof-dot" aria-hidden="true">&#9679;</span>
              <span>Works on calls, SMS &amp; web leads</span>
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
              <span className="stat-number">80%</span>
              <p className="stat-label">drop in lead conversion rate after just 5 minutes of not responding</p>
              <span className="stat-source">Lead Response Management Study</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">7+ hrs</span>
              <p className="stat-label">the average time a local business takes to respond to a new enquiry</p>
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
                You missed the call.
                <br />
                <span className="accent">You probably missed the job.</span>
              </h2>
              <div className="section-body">
                <p>
                  The phone rang out while you were up a ladder or under a car. They scrolled
                  to the next name and called instead.
                </p>
                <p>Voxitron replies before they&apos;ve even finished scrolling.</p>
              </div>
            </div>
            <div className="pain-photo">
              <ImagePlaceholder label="A phone ringing unanswered while a tradesperson is mid-job" />
            </div>
          </div>
        </Reveal>

        {/* FEATURES */}
        <Reveal as="section" id="features" aria-labelledby="features-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto var(--space-2)" }}>
              <span className="section-label">WHAT IT DOES</span>
              <h2 id="features-title" className="section-title">
                From missed call to
                <br />
                <span className="accent">live conversation, in seconds.</span>
              </h2>
              <p className="section-body">
                Runs silently in the background. When a call goes unanswered, it acts
                instantly.
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
                  <p className="feature-body">A missed call fires a text, every time, without exception.</p>
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
                  <p className="feature-title">Personalised messages, not templates</p>
                  <p className="feature-body">Sounds like your business wrote it. No one mistakes it for a bot.</p>
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
                  <p className="feature-title">Works on calls, SMS &amp; web leads</p>
                  <p className="feature-body">Missed call or unanswered form. Every source, covered.</p>
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
                  <p className="feature-title">Qualifies the lead automatically</p>
                  <p className="feature-body">Asks the right questions, so you know the job before you call.</p>
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
                  <p className="feature-title">Books appointments from the conversation</p>
                  <p className="feature-body">Checks your calendar and confirms the slot, right in the text thread.</p>
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
                  <p className="feature-body">Every lead and outcome logged. What needs your attention, at a glance.</p>
                </div>
              </div>
            </div>

            <div className="feature-callout">
              <div>
                <span className="callout-label">Always on</span>
                <p className="callout-title">Works at 2am just as well as 2pm</p>
                <p className="callout-body">
                  A Sunday-night lead is as real as a Tuesday one. Voxitron answers both. No
                  overtime, no extra cost.
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
                <span className="accent">Never miss a lead again.</span>
              </h2>
            </div>

            <ol className="steps-list">
              <li className="step">
                <ImagePlaceholder label="Screenshot: agent configuration" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">01</span>
                  <h3 className="step-title">We configure your agent</h3>
                </div>
                <p className="step-body">15 minutes. We train it on your business so messages sound like you.</p>
              </li>
              <li className="step">
                <ImagePlaceholder label="Screenshot: number connection" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">Connect your phone number</h3>
                </div>
                <p className="step-body">Your existing number. No new SIM, no new hardware.</p>
              </li>
              <li className="step">
                <ImagePlaceholder label="Screenshot: missed call converted to booking" className="step-visual" />
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">03</span>
                  <h3 className="step-title">Every missed call becomes a conversation</h3>
                </div>
                <p className="step-body">It qualifies the lead and books the appointment. You step in only when needed.</p>
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
                What changed for businesses
                <br />
                <span className="accent">that stopped missing leads.</span>
              </h2>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  I was losing two or three jobs a week to unanswered calls. Now half of them
                  book before I&apos;ve even seen the notification.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">JK</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">James K.</span>
                    <span className="testimonial-role">Plumber, Manchester, UK</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <p className="testimonial-quote">
                  My team is on-site most of the day. We were losing work to unanswered
                  calls. Now customers comment on how fast we respond.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">SB</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">Sarah B.</span>
                    <span className="testimonial-role">Electrical Contractor, Leeds, UK</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <p className="testimonial-quote">
                  The speed is what gets me. Most customers think I personally texted them
                  back straight away.
                </p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">RC</div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">Ryan C.</span>
                    <span className="testimonial-role">HVAC Engineer, Austin, TX</span>
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
              Speed to Lead Agent.
            </h2>

            <div className="faq-list" role="list">
              <details className="faq-item" role="listitem">
                <summary>
                  Will the text actually sound like it came from me?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes. We write and test the messages together during setup until they match
                  your voice.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  What if the customer replies?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Voxitron qualifies the lead and books an appointment if you&apos;re
                  available. You&apos;re notified when it&apos;s done, or when it needs you.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  Does it work with my existing phone number?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Yes. It connects to your existing mobile or landline. No new device, no
                  setup.
                </p>
              </details>

              <details className="faq-item" role="listitem">
                <summary>
                  How is this different from a voicemail or auto-reply?
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">
                  Voicemail waits for a message most people won&apos;t leave. Voxitron
                  proactively texts, qualifies the lead, and can book the job automatically.
                </p>
              </details>
            </div>
          </div>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              Stop letting leads go
              <br />
              to the competition.
            </h2>

            <p className="cta-sub">
              Get started today. 30 days free. Live in 48 hours. No credit card. No
              long-term contract.
            </p>

            <div className="cta-group">
              <Link href="/get-started?agent=speed-to-lead" className="btn btn-primary">Get Started</Link>
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
