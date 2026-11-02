import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { COMPETITORS, getCompetitor } from "@/lib/compareData";
import { pageMetadata } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structuredData";

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};

  return pageMetadata({
    title: `Voxitron vs ${competitor.name} | Voxitron`,
    description: competitor.intro,
    path: `/compare/${competitor.slug}`,
  });
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) notFound();

  const waHref = `https://wa.me/2348120907050?text=${encodeURIComponent(competitor.waMessage)}`;

  const faq = [
    {
      question: `Should I just go with ${competitor.shortName} instead?`,
      answer: `If ${competitor.goodAt[0].toLowerCase()} is what matters most to you, it might be the better fit. Voxitron is built for businesses that want to own their infrastructure and qualification logic long-term.`,
    },
    {
      question: "Can I use both?",
      answer:
        "Some businesses do, at least during a transition. We're happy to talk through how that would work for you.",
    },
    {
      question: "What if I'm still not sure?",
      answer:
        "Book a free discovery call. We'll tell you honestly if Voxitron isn't the right fit for your business.",
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: `Voxitron vs ${competitor.name}`, path: `/compare/${competitor.slug}` },
        ])}
      />
      <Nav />

      <main>
        <section id="hero" aria-labelledby="hero-title" className="page-hero">
          <div className="section-inner">
            <span className="hero-kicker">Voxitron vs {competitor.name}</span>
            <h1 id="hero-title" className="hero-title">
              {competitor.heroTension[0]} {competitor.heroTension[1]} <span className="accent">
                {competitor.heroTension[2]} {competitor.heroTension[3]}
              </span>
            </h1>
            <p className="hero-sub">{competitor.intro}</p>
            <div className="cta-group">
              <Link href="/contact" className="btn btn-primary">Book a call</Link>
              <a href={waHref} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* TWO-COLUMN HONEST ASSESSMENT */}
        <Reveal as="section" id="assessment" aria-labelledby="assessment-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">AN HONEST LOOK</span>
              <h2 id="assessment-title" className="section-title">
                Where {competitor.shortName} <span className="accent">helps, and where it doesn&apos;t.</span>
              </h2>
            </div>

            <div className="assessment-columns">
              <div className="assessment-column">
                <h3 className="assessment-column-title">What {competitor.shortName} is good at</h3>
                <ul className="assessment-column-list">
                  {competitor.goodAt.map((item) => (
                    <li key={item}>
                      <span className="assessment-column-bullet" style={{ color: "var(--accent)" }} aria-hidden="true">&#9679;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="assessment-column">
                <h3 className="assessment-column-title">Where it falls short for this buyer</h3>
                <ul className="assessment-column-list">
                  {competitor.fallsShort.map((item) => (
                    <li key={item}>
                      <span className="assessment-column-bullet" style={{ color: "var(--muted)" }} aria-hidden="true">&#9679;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* WHY VOXITRON INSTEAD */}
        <Reveal as="section" id="why-voxitron" aria-labelledby="why-voxitron-title">
          <div className="section-inner">
            <span className="section-label">WHY CHOOSE VOXITRON INSTEAD</span>
            <h2 id="why-voxitron-title" className="section-title">
              Built for your <span className="accent">business, owned by you.</span>
            </h2>

            <ul className="offer-list" aria-label="Reasons to choose Voxitron">
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span><strong>Data isolated and private.</strong> Your data never lives on a rented platform.</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span><strong>Bespoke qualification logic.</strong> Built around your business, not a generic template.</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span><strong>NDPA-aligned by design.</strong> Data handling considered from the start, not bolted on.</span>
              </li>
              <li className="offer-item">
                <span className="offer-bullet" aria-hidden="true">&#9679;</span>
                <span><strong>Monthly tuning included.</strong> Your agent improves as your business changes.</span>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* FEATURE-BY-FEATURE TABLE */}
        <Reveal as="section" id="table" aria-labelledby="table-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">FEATURE BY FEATURE</span>
              <h2 id="table-title" className="section-title">
                Voxitron vs <span className="accent">{competitor.shortName}.</span>
              </h2>
            </div>

            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" className="is-voxitron">Voxitron</th>
                    <th scope="col">{competitor.shortName}</th>
                  </tr>
                </thead>
                <tbody>
                  {competitor.rows.map((row) => (
                    <tr key={row.label}>
                      <td className="is-row-title">{row.label}</td>
                      <td className="is-voxitron">{row.voxitron}</td>
                      <td>{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="compare-caption">
              An indicative comparison, not a formal audit. A starting point subject to
              review as offerings change.
            </p>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal as="section" id="faq" aria-labelledby="faq-title">
          <div className="section-inner">
            <span className="section-label">FAQ</span>
            <h2 id="faq-title" className="section-title">
              Still deciding?
            </h2>

            <FaqList items={faq} />
          </div>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal as="section" id="cta" aria-labelledby="cta-title-final">
          <div className="section-inner">
            <h2 id="cta-title-final" className="section-title">
              Ready to compare this with your actual workflow?
            </h2>

            <p className="cta-sub">
              Book a free discovery call, or message us on WhatsApp for a quick answer.
            </p>

            <div className="cta-group">
              <Link href="/contact" className="btn btn-primary">Book a call</Link>
              <a href={waHref} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
