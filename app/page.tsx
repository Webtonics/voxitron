import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Reveal from "@/components/Reveal";
import BuiltOnStrip from "@/components/BuiltOnStrip";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Tick from "@/components/Tick";
import RepliedThread from "@/components/RepliedThread";

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

              <span className="form-note mono">
                Replied <Tick /> in seconds. Message us and see it happen.
              </span>
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

        {/* NIGHT: merged pain + before/after comparison, dark section */}
        <Reveal as="section" id="night" className="night" aria-labelledby="night-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">WHILE YOU SLEEP</span>
              <h2 id="night-title" className="section-title">
                Your messages don&apos;t stop
                <br />
                at closing time.
              </h2>
              <p className="section-body">
                The enquiries that decide your month land at 11pm and 3am. The only
                question is whether they get answered, or the customer buys from the next
                seller instead.
              </p>
            </div>

            <div className="compare" role="table" aria-label="Without an agent compared to with Voxitron">
              <div className="night-col" role="rowgroup">
                <h3>Without an agent</h3>
                <div className="night-row">
                  <span className="night-time mono">23:47</span>
                  <div className="night-body">
                    <span className="q">&quot;Is the blue one still in stock?&quot;</span>
                    <span className="r">Sits unread till morning</span>
                  </div>
                </div>
                <div className="night-row">
                  <span className="night-time mono">01:04</span>
                  <div className="night-body">
                    <span className="q">&quot;Are you open tomorrow?&quot;</span>
                    <span className="r">Sits unread till morning</span>
                  </div>
                </div>
                <div className="night-row">
                  <span className="night-time mono">03:22</span>
                  <div className="night-body">
                    <span className="q">&quot;Can I book for 9am?&quot;</span>
                    <span className="r">Already booked elsewhere by 8am</span>
                  </div>
                </div>
                <div className="night-verdict mono">3 enquiries in &middot; 0 booked</div>
              </div>

              <div className="night-col is-you" role="rowgroup">
                <h3>With Voxitron</h3>
                <div className="night-row">
                  <span className="night-time mono">23:47</span>
                  <div className="night-body">
                    <span className="q">&quot;Is the blue one still in stock?&quot;</span>
                    <span className="r">
                      Priced and confirmed <Tick /> <span className="mono">23:47</span>
                    </span>
                  </div>
                </div>
                <div className="night-row">
                  <span className="night-time mono">01:04</span>
                  <div className="night-body">
                    <span className="q">&quot;Are you open tomorrow?&quot;</span>
                    <span className="r">
                      Booked for 9am <Tick /> <span className="mono">01:04</span>
                    </span>
                  </div>
                </div>
                <div className="night-row">
                  <span className="night-time mono">03:22</span>
                  <div className="night-body">
                    <span className="q">&quot;Can I book for 9am?&quot;</span>
                    <span className="r">
                      Booked, confirmed <Tick /> <span className="mono">03:22</span>
                    </span>
                  </div>
                </div>
                <div className="night-verdict mono">3 enquiries in &middot; 3 booked</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* WHAT VOXITRON DOES: asymmetric capability grid */}
        <Reveal as="section" id="what" aria-labelledby="what-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <h2 id="what-title" className="section-title">
                It does the front-desk work,
                <br />
                <span className="accent">in the chat.</span>
              </h2>
              <p className="section-body">
                Not a menu of buttons. One agent that reads what the customer actually
                wrote and takes it all the way to a booking or a sale.
              </p>
            </div>

            <div className="caps">
              <div className="cap is-lead">
                <div>
                  <div className="cap-badge" aria-hidden="true"><Tick /></div>
                  <h3>Books the appointment or the sale</h3>
                  <p>
                    Confirms a real time slot or order inside the conversation, sends the
                    details, and logs it. No back and forth, no phone tag.
                  </p>
                </div>
                <div className="cap-lead-demo">
                  <div className="mini-msg in">Can I get this Saturday morning?</div>
                  <div className="mini-msg out">
                    Saturday 10:30am is open. Shall I hold it?
                    <span className="t mono">sent</span>
                  </div>
                  <div className="mini-msg in">Yes please</div>
                  <div className="mini-msg out">
                    Booked. 10:30am Saturday.
                    <span className="t mono"><Tick /> confirmed</span>
                  </div>
                </div>
              </div>
              <div className="cap">
                <div className="cap-badge" aria-hidden="true">&#8358;</div>
                <h3>Answers prices instantly</h3>
                <p>Quotes the right price, every time, without you retyping it.</p>
              </div>
              <div className="cap">
                <div className="cap-badge" aria-hidden="true">&#9203;</div>
                <h3>Replies in seconds</h3>
                <p>Noon or 3am, every message gets a real answer.</p>
              </div>
              <div className="cap">
                <div className="cap-badge" aria-hidden="true">&#9873;</div>
                <h3>Flags the tricky ones</h3>
                <p>Anything sensitive comes to you with the full chat, so nothing is missed.</p>
              </div>
              <div className="cap">
                <div className="cap-badge" aria-hidden="true">&#9989;</div>
                <h3>Sounds like a person</h3>
                <p>Trained on how your customers actually message. Never robotic.</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* MULTIMODAL: voice notes + photos */}
        <Reveal as="section" id="multimodal" className="mm" aria-labelledby="mm-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <h2 id="mm-title" className="section-title">
                Most customers don&apos;t type.
                <br />
                <span className="accent">They talk, or they snap a photo.</span>
              </h2>
              <p className="section-body">
                Voxitron listens to voice notes and reads photos, then does the same job it
                does with text. It quotes, it books, it confirms. No &quot;please type your
                message.&quot;
              </p>
            </div>

            <div className="mm-grid">
              <div className="mm-card">
                <span className="mm-tag"><span className="ic" aria-hidden="true">&#9673;</span> Voice note</span>
                <div className="mm-thread">
                  <div className="voice">
                    <span className="play" aria-hidden="true">&#9654;</span>
                    <span className="wave" aria-hidden="true">
                      <span style={{ height: "5px" }}></span>
                      <span style={{ height: "9px" }}></span>
                      <span style={{ height: "14px" }}></span>
                      <span style={{ height: "7px" }}></span>
                      <span style={{ height: "19px" }}></span>
                      <span style={{ height: "11px" }}></span>
                      <span style={{ height: "21px" }}></span>
                      <span style={{ height: "8px" }}></span>
                      <span style={{ height: "14px" }}></span>
                      <span style={{ height: "6px" }}></span>
                    </span>
                    <span className="dur mono">0:11</span>
                  </div>
                  <div className="form-time mono">received 09:12</div>
                  <div className="heard">
                    <b>Agent heard</b>
                    &quot;Abeg, how much for the blue one, and una dey deliver today?&quot;
                  </div>
                  <div className="mm-reply">
                    The blue one is &#8358;12,000. Yes, we deliver today if you order
                    before 3pm.
                    <span className="t">
                      09:12 <Tick />
                    </span>
                  </div>
                </div>
              </div>

              <div className="mm-card">
                <span className="mm-tag"><span className="ic" aria-hidden="true">&#9635;</span> Photo</span>
                <div className="mm-thread">
                  <div className="imgmsg">
                    <div className="form-card">
                      <div className="form-top"><span>PRODUCT PHOTO</span><span aria-hidden="true">&#9993;</span></div>
                      <div className="form-body">
                        <div className="form-line" style={{ width: "72%" }}></div>
                        <div className="form-line q" style={{ width: "54%" }}></div>
                        <div className="form-line q" style={{ width: "62%" }}></div>
                        <div className="form-line" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="form-time mono">received 16:40</div>
                  <div className="heard">
                    <b>Agent read</b>
                    Customer sent a photo of the item they want, asking if it&apos;s
                    available.
                  </div>
                  <div className="mm-reply">
                    Yes, that one&apos;s available in stock. &#8358;9,500. Want me to hold
                    it for you?
                    <span className="t">
                      16:40 <Tick />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* HOW IT WORKS */}
        <Reveal as="section" id="how-it-works" aria-labelledby="how-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <h2 id="how-title" className="section-title">
                Live on your existing number
                <br />
                <span className="accent">in a week.</span>
              </h2>
            </div>

            <ol className="steps-list">
              <li className="step">
                <div className="step-heading">
                  <span className="step-number mono" aria-hidden="true">DAY 01</span>
                  <h3 className="step-title">Connect your WhatsApp Business number</h3>
                </div>
                <p className="step-body">No new number. Customers message the one they already have.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number mono" aria-hidden="true">DAY 02-03</span>
                  <h3 className="step-title">We train it on your catalog and prices</h3>
                </div>
                <p className="step-body">Your products, services, and pricing, ready in a short setup session.</p>
              </li>
              <li className="step">
                <div className="step-heading">
                  <span className="step-number mono" aria-hidden="true">DAY 04</span>
                  <h3 className="step-title">It goes live, answering every message</h3>
                </div>
                <p className="step-body">You step in only when a customer needs you directly.</p>
              </li>
            </ol>
          </div>
        </Reveal>

        {/* REPLIED: second orchestrated Replied moment */}
        <Reveal as="section" id="replied" aria-labelledby="replied-title">
          <div className="section-inner-wide">
            <div className="two-col-split">
              <div>
                <h2 id="replied-title" className="section-title">
                  Watch it happen
                  <br />
                  <span className="accent">before you finish reading this.</span>
                </h2>
                <p className="section-body">
                  Every conversation gets a real answer, not a queue. The reply lands the
                  same minute the question does, whatever time it is.
                </p>
                <p className="form-note mono">
                  Replied <Tick /> zero gap between question and answer.
                </p>
              </div>
              <RepliedThread />
            </div>
          </div>
        </Reveal>

        {/* STATS */}
        <Reveal className="stats-strip" role="region" aria-label="WhatsApp and Nigeria market statistics">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number mono">96.5%</span>
              <p className="stat-label">of Nigerian internet users are active on WhatsApp, one of the highest rates in Africa</p>
              <span className="stat-source mono">DataReportal</span>
            </div>
            <div className="stat-item">
              <span className="stat-number mono">20M+</span>
              <p className="stat-label">daily business message senders on WhatsApp in Nigeria, a first for the country</p>
              <span className="stat-source mono">Meta</span>
            </div>
            <div className="stat-item">
              <span className="stat-number mono">00:03</span>
              <p className="stat-label">typical time for the agent to answer a new message, at any hour</p>
              <span className="stat-source mono">Measured, Voxitron</span>
            </div>
          </div>
        </Reveal>

        {/* INDUSTRIES: four vertical cards. id="services" kept for backward-compat: every
            other page's "See the other agents" CTA links to /#services */}
        <Reveal as="section" id="services" aria-labelledby="industries-title">
          <div className="section-inner-wide">
            <div className="section-inner-wide-header">
              <span className="section-label">BUILT FOR YOUR INDUSTRY</span>
              <h2 id="industries-title" className="section-title">
                Four industries,
                <br />
                <span className="accent">purpose-built agents.</span>
              </h2>
            </div>

            <div className="services-grid services-grid-4col">
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

              <article className="service-card">
                <span className="service-kicker">RETAILERS</span>
                <h3 className="service-title">Stop retyping the same price all day.</h3>
                <p className="service-body">
                  Answers stock and price questions, takes orders, and frees you up to
                  actually run the shop.
                </p>
                <ul className="service-list">
                  <li>Checks real stock before it replies</li>
                  <li>Sends your catalog with photos and prices</li>
                  <li>Takes and logs the order automatically</li>
                  <li>Runs on your existing WhatsApp number</li>
                </ul>
                <Link href="/retail" className="service-link">See how it works</Link>
              </article>

              <article className="service-card">
                <span className="service-kicker">E-COMMERCE BRANDS</span>
                <h3 className="service-title">Confirm orders. Kill WISMO tickets.</h3>
                <p className="service-body">
                  Confirms orders instantly, answers &quot;where is my order,&quot; and
                  recovers abandoned carts automatically.
                </p>
                <ul className="service-list">
                  <li>Confirms orders the moment payment lands</li>
                  <li>Answers tracking questions from real courier data</li>
                  <li>Sends a nudge to recover abandoned carts</li>
                  <li>Sends delivery updates without being asked</li>
                </ul>
                <Link href="/ecommerce" className="service-link">See how it works</Link>
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
              Stop losing customers
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

            <span className="form-note mono">
              No forms. Just message us, and watch it reply <Tick /> before you finish typing.
            </span>
          </div>
        </Reveal>
      </main>

      <Footer />
      <WaFloat />
    </>
  );
}
