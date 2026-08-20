import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";

const WA_CTA_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20to%20book%20a%20discovery%20call";

export const metadata: Metadata = {
  title: "Contact Voxitron | Book a Discovery Call",
  description:
    "Reach Voxitron on WhatsApp or by email, or book a free discovery call to scope your WhatsApp AI agent.",
  alternates: {
    canonical: "https://voxitron.com/contact",
  },
};

export default function ContactPage() {
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
            <span className="hero-kicker">LET&apos;S TALK</span>
            <h1 id="hero-title" className="hero-title">
              Book a
              <br />
              <span className="accent">discovery call.</span>
            </h1>
            <p className="hero-sub">
              Tell us about your business. We reply on WhatsApp first, usually within a
              few hours.
            </p>
          </div>
        </section>

        {/* CONTACT METHODS */}
        <Reveal as="section" id="methods" aria-labelledby="methods-title">
          <div className="section-inner">
            <span className="section-label">TWO WAYS TO REACH US</span>
            <h2 id="methods-title" className="section-title">
              Pick whichever
              <br />
              <span className="accent">is faster for you.</span>
            </h2>

            <div className="contact-methods">
              <a href={WA_CTA_HREF} className="contact-method-card" target="_blank" rel="noopener noreferrer">
                <span className="contact-method-tag">Fastest</span>
                <span className="contact-method-title">WhatsApp</span>
                <span className="contact-method-detail">+234 812 090 7050, usually a reply within a few hours</span>
              </a>
              <a href="mailto:hello@voxitron.com" className="contact-method-card">
                <span className="contact-method-tag">Email</span>
                <span className="contact-method-title">hello@voxitron.com</span>
                <span className="contact-method-detail">We reply within one business day</span>
              </a>
            </div>

            <p className="form-note" style={{ marginTop: "var(--space-5)" }}>
              Based in Lagos. Local, named, and accountable team, not a ticket queue.
            </p>
          </div>
        </Reveal>

        {/* LEAD FORM */}
        <Reveal as="section" id="get-started" aria-labelledby="get-started-title">
          <div className="section-inner">
            <span className="section-label">OR TELL US ABOUT YOUR BUSINESS</span>
            <h2 id="get-started-title" className="section-title">
              Start with
              <br />
              a few details.
            </h2>

            <LeadForm variant="discovery-call" defaultAgent="general" submitLabel="Book my call" />
          </div>
        </Reveal>

        {/* PROCESS STEPS */}
        <Reveal as="section" id="process" aria-labelledby="process-title">
          <div className="section-inner-wide">
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              <span className="section-label">WHAT HAPPENS NEXT</span>
              <h2 id="process-title" className="section-title">
                What happens
                <br />
                <span className="accent">after you reach out.</span>
              </h2>
            </div>

            <ol className="steps-list">
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">01</span>
                  <h3 className="step-title">We reply on WhatsApp</h3>
                </div>
                <p className="step-body">Usually within a few hours, sometimes faster.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">02</span>
                  <h3 className="step-title">We schedule a 20-minute call</h3>
                </div>
                <p className="step-body">To understand your business, catalog, and workflow.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">03</span>
                  <h3 className="step-title">You get a fixed quote within 48 hours</h3>
                </div>
                <p className="step-body">Scoped to your actual setup, not a generic range.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number" aria-hidden="true">04</span>
                  <h3 className="step-title">You decide, no pressure</h3>
                </div>
                <p className="step-body">Move forward when you&apos;re ready. No hard sell.</p>
              </li>
            </ol>
          </div>
        </Reveal>

        {/* CLOSING WHATSAPP CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              Or just
              <br />
              message us now.
            </h2>

            <div className="cta-group">
              <a href={WA_CTA_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
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
