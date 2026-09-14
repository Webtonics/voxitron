"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type Industry = {
  name: string;
  href: string;
  image: string;
  alt: string;
  description: string;
  solutions: string[];
};

const INDUSTRIES: Industry[] = [
  {
    name: "Retail",
    href: "/retail",
    image: "https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?fm=jpg&q=80&w=900&auto=format&fit=crop",
    alt: "A stocked supermarket aisle with refrigerated produce and drinks",
    description: "Answers stock and price questions, takes orders, and frees you up to run the shop.",
    solutions: ["Stock and price answers", "Order taking", "Runs on your own number"],
  },
  {
    name: "E-commerce",
    href: "/ecommerce",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?fm=jpg&q=80&w=900&auto=format&fit=crop",
    alt: "A delivery package being handed to a customer",
    description: "Confirms orders the moment payment lands and kills \"where is my order\" tickets.",
    solutions: ["Order confirmation", "Tracking questions", "Abandoned cart nudges"],
  },
  {
    name: "Real Estate",
    href: "/real-estate",
    image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?fm=jpg&q=80&w=900&auto=format&fit=crop",
    alt: "Aerial view of the Lagos waterfront skyline",
    description: "Replies to every enquiry in under 60 seconds and books viewings straight into your calendar.",
    solutions: ["Instant enquiry replies", "Viewing bookings", "Diaspora time-zone follow-up"],
  },
  {
    name: "Diagnostic Centres",
    href: "/diagnostic-centre",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?fm=jpg&q=80&w=900&auto=format&fit=crop",
    alt: "A stethoscope resting on a clinic bed",
    description: "Books tests, answers pricing questions, and follows up on results, day and night.",
    solutions: ["Test bookings", "Pricing answers", "Result follow-up"],
  },
];

export default function IndustryShowcase() {
  const rowRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    rowRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  }

  return (
    <div className="industry-showcase-inner">
      <div className="industry-showcase-header">
        <div>
          <h2 id="industry-showcase-heading" className="industry-showcase-title">
            One agent, tuned to
            <br />
            <span className="accent">how your industry works.</span>
          </h2>
          <p className="industry-showcase-sub">
            Every industry has its own conversation patterns. Voxitron is already trained
            on the questions, booking flows, and order processes specific to your field.
          </p>
        </div>
        <div className="industry-showcase-controls">
          <Link href="/contact" className="industry-showcase-link">
            Other business? We&apos;ll scope it with you
          </Link>
          <div className="industry-showcase-arrows">
            <button
              type="button"
              className="industry-showcase-arrow"
              aria-label="Scroll industries left"
              onClick={() => scrollByCard(-1)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="industry-showcase-arrow"
              aria-label="Scroll industries right"
              onClick={() => scrollByCard(1)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="industry-showcase-row" ref={rowRef}>
        {INDUSTRIES.map((industry) => (
          <Link
            key={industry.name}
            href={industry.href}
            className="industry-showcase-card"
            aria-label={`See how Voxitron works for ${industry.name}`}
          >
            <Image
              src={industry.image}
              alt={industry.alt}
              fill
              sizes="(max-width: 760px) 45vw, 22vw"
              className="industry-showcase-photo"
            />
            <span className="industry-showcase-scrim" aria-hidden="true"></span>
            <span className="industry-showcase-content">
              <span className="industry-showcase-label">{industry.name}</span>
              <span className="industry-showcase-description">{industry.description}</span>
              <span className="industry-showcase-solutions">
                {industry.solutions.map((solution) => (
                  <span key={solution} className="industry-showcase-pill">{solution}</span>
                ))}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
