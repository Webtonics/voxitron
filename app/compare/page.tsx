import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import { COMPETITORS } from "@/lib/compareData";

const WA_CTA_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20to%20talk%20through%20my%20options";

export const metadata: Metadata = {
  title: "Compare Voxitron | Voxitron",
  description:
    "Honest comparisons: Voxitron versus hiring a receptionist, a DIY n8n build, generic chatbot SaaS, and GoHighLevel-reseller agencies.",
  alternates: {
    canonical: "https://voxitron.com/compare",
  },
};

export default function ComparePage() {
  return (
    <>
      <Nav />

      <main>
        <section id="hero" aria-labelledby="hero-title" className="page-hero">
          <div className="section-inner">
            <span className="hero-kicker">HONEST COMPARISONS</span>
            <h1 id="hero-title" className="hero-title">
              Compared
              <br />
              <span className="accent">honestly.</span>
            </h1>
            <p className="hero-sub">
              Four common alternatives, compared honestly. No strawmen, just what each one
              is actually good at and where it falls short.
            </p>
          </div>
        </section>

        {/* COMPARE CARDS */}
        <Reveal as="section" id="compare-cards" aria-labelledby="compare-cards-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">PICK YOUR COMPARISON</span>
              <h2 id="compare-cards-title" className="section-title">
                Four alternatives,
                <br />
                <span className="accent">one honest look at each.</span>
              </h2>
            </div>

            <div className="compare-cards">
              {COMPETITORS.map((c) => (
                <Link key={c.slug} href={`/compare/${c.slug}`} className="compare-card">
                  <span className="compare-card-title">Voxitron vs {c.name}</span>
                  <p className="compare-card-row">
                    <strong>Good at:</strong> {c.goodAt[0]}
                  </p>
                  <p className="compare-card-row">
                    <strong>Falls short:</strong> {c.fallsShort[0]}
                  </p>
                  <span className="compare-card-link">See the full comparison</span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* AT A GLANCE TABLE */}
        <Reveal as="section" id="at-a-glance" aria-labelledby="at-a-glance-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">AT A GLANCE</span>
              <h2 id="at-a-glance-title" className="section-title">
                Every option,
                <br />
                <span className="accent">side by side.</span>
              </h2>
            </div>

            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" className="is-voxitron">Voxitron</th>
                    {COMPETITORS.map((c) => (
                      <th scope="col" key={c.slug}>{c.shortName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS[0].rows.map((row, i) => (
                    <tr key={row.label}>
                      <td className="is-row-title">{row.label}</td>
                      <td className="is-voxitron">{row.voxitron}</td>
                      {COMPETITORS.map((c) => (
                        <td key={c.slug}>{c.rows[i].competitor}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="compare-caption">
              These are indicative comparisons based on how each option typically works, not
              a formal audit of every provider. They&apos;re a starting point, subject to
              review as offerings change. Tell us if something looks off.
            </p>
          </div>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title">
          <div className="section-inner">
            <h2 id="cta-title" className="section-title">
              Want to see what
              <br />
              ownership looks like for your business?
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
