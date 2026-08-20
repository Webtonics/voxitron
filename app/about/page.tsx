import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";

const WA_CTA_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20to%20know%20more%20about%20the%20team";

export const metadata: Metadata = {
  title: "About Voxitron | Lagos-Based AI Agency",
  description:
    "Voxitron is a Lagos-based team building self-hosted WhatsApp AI agents for Nigerian businesses. Founded by Emmanuel Ezema.",
  alternates: {
    canonical: "https://voxitron.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <main>
        <section
          id="hero"
          aria-labelledby="hero-title"
          style={{ padding: "calc(56px + var(--space-9)) var(--gutter) var(--space-8)" }}
        >
          <div className="section-inner">
            <span className="hero-kicker">LAGOS-BASED</span>
            <h1 id="hero-title" className="hero-title">
              Not an agency
              <br />
              <span className="accent">with a Lagos page.</span>
            </h1>
            <p className="hero-sub">
              Voxitron is built and run in Lagos, by a founder who saw slow WhatsApp
              replies costing businesses real money every day.
            </p>
          </div>
        </section>

        {/* NARRATIVE */}
        <Reveal as="section" id="story" aria-labelledby="story-title">
          <div className="section-inner">
            <span className="section-label">WHY OWNED INFRASTRUCTURE BEATS RENTED SAAS</span>
            <h2 id="story-title" className="section-title">
              Founded by
              <br />
              <span className="accent">Emmanuel Ezema.</span>
            </h2>
            <div className="section-body">
              <p>
                Emmanuel Ezema started Voxitron after watching Lagos businesses lose
                customers to a problem that had nothing to do with their product: a reply
                that came too late.
              </p>
              <p>
                Most fixes on offer were rented chatbot seats on foreign platforms, with no
                real ownership and no fluency in how Nigerians actually message. Voxitron
                was built as the alternative: self-hosted, bespoke, and accountable to the
                business that owns it.
              </p>
            </div>
          </div>
        </Reveal>

        {/* WHAT WE BELIEVE */}
        <Reveal as="section" id="beliefs" aria-labelledby="beliefs-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              <span className="section-label">WHAT WE BELIEVE</span>
              <h2 id="beliefs-title" className="section-title">
                Three things we
                <br />
                <span className="accent">won&apos;t compromise on.</span>
              </h2>
            </div>

            <div className="about-grid">
              <div className="about-card">
                <p className="about-card-title">Owned beats rented</p>
                <p className="about-card-body">
                  A business should own the infrastructure its customers depend on, not
                  lease it from a platform that can change the rules.
                </p>
              </div>
              <div className="about-card">
                <p className="about-card-title">NDPA is a real constraint</p>
                <p className="about-card-body">
                  Nigeria&apos;s data protection law isn&apos;t a buzzword to gesture at. We
                  build with it in mind from day one.
                </p>
              </div>
              <div className="about-card">
                <p className="about-card-title">Bespoke logic, not templates</p>
                <p className="about-card-body">
                  Your qualification logic should match how your business actually works,
                  not a generic flow with your logo pasted on.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* WHAT WE WON'T DO */}
        <Reveal as="section" id="wont-do" aria-labelledby="wont-do-title">
          <div className="section-inner">
            <span className="section-label">WHAT WE WON&apos;T DO</span>
            <h2 id="wont-do-title" className="section-title">
              Some lines
              <br />
              <span className="accent">we don&apos;t cross.</span>
            </h2>

            <ul className="offer-list" aria-label="What Voxitron won't do">
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span>Quote borrowed stats as if they were our own results</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span>Sell you a rented SaaS seat and call it ownership</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span>Build a generic template and skip the real scoping work</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span>Hide pricing behind a &quot;book a call to find out&quot; wall</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span>Operate as an offshore agency pretending to be local</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span>Gesture vaguely at compliance instead of naming the law</span>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* HOW WE WORK WITH YOU */}
        <Reveal as="section" id="how-we-work" aria-labelledby="how-we-work-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              <span className="section-label">HOW WE WORK WITH YOU</span>
              <h2 id="how-we-work-title" className="section-title">
                No black box.
                <br />
                <span className="accent">You see everything.</span>
              </h2>
            </div>

            <div className="about-grid">
              <div className="about-card">
                <p className="about-card-title">We map your process first</p>
                <p className="about-card-body">A discovery call before any build starts, so the agent fits how you actually work.</p>
              </div>
              <div className="about-card">
                <p className="about-card-title">You see everything we build</p>
                <p className="about-card-body">No hidden logic. You know exactly what your agent does and why.</p>
              </div>
              <div className="about-card">
                <p className="about-card-title">We pilot before you commit</p>
                <p className="about-card-body">A pilot period on real conversations, before full rollout.</p>
              </div>
              <div className="about-card">
                <p className="about-card-title">We tune monthly, not set-and-forget</p>
                <p className="about-card-body">Your agent keeps improving as your catalog, prices, or process change.</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* COMMITMENTS */}
        <Reveal as="section" id="commitments" aria-labelledby="commitments-title">
          <div className="section-inner">
            <span className="section-label">OUR COMMITMENTS TO YOU</span>
            <h2 id="commitments-title" className="section-title">
              What you can
              <br />
              <span className="accent">hold us to.</span>
            </h2>

            <ul className="commitments-list">
              <li><span className="commitments-bullet" aria-hidden="true">&#9679;</span><span>Response time under 60 seconds, tested regularly</span></li>
              <li><span className="commitments-bullet" aria-hidden="true">&#9679;</span><span>Full ownership of your infrastructure, always</span></li>
              <li><span className="commitments-bullet" aria-hidden="true">&#9679;</span><span>Bespoke logic, never a copy-pasted template</span></li>
              <li><span className="commitments-bullet" aria-hidden="true">&#9679;</span><span>NDPA named explicitly, not gestured at</span></li>
              <li><span className="commitments-bullet" aria-hidden="true">&#9679;</span><span>Transparent pricing, no hidden line items</span></li>
              <li><span className="commitments-bullet" aria-hidden="true">&#9679;</span><span>A local team you can actually reach</span></li>
              <li><span className="commitments-bullet" aria-hidden="true">&#9679;</span><span>Monthly tuning, not a one-off build</span></li>
              <li><span className="commitments-bullet" aria-hidden="true">&#9679;</span><span>Honesty about fit, even if the answer is no</span></li>
            </ul>
          </div>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              Want to meet
              <br />
              the team?
            </h2>

            <p className="cta-sub">
              Book a free discovery call, or message us on WhatsApp.
            </p>

            <div className="cta-group">
              <Link href="/contact" className="btn btn-primary">Book a discovery call</Link>
              <a href={WA_CTA_HREF} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
      <WaFloat />
    </>
  );
}
