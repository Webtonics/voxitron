import Link from "next/link";
import Image from "next/image";

type Industry = {
  name: string;
  href: string;
  image: string;
  alt: string;
};

const INDUSTRIES: Industry[] = [
  {
    name: "Retail",
    href: "/retail",
    image: "https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?fm=jpg&q=80&w=900&auto=format&fit=crop",
    alt: "A stocked supermarket aisle with refrigerated produce and drinks",
  },
  {
    name: "E-commerce",
    href: "/ecommerce",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?fm=jpg&q=80&w=900&auto=format&fit=crop",
    alt: "A delivery package being handed to a customer",
  },
  {
    name: "Real Estate",
    href: "/real-estate",
    image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?fm=jpg&q=80&w=900&auto=format&fit=crop",
    alt: "Aerial view of the Lagos waterfront skyline",
  },
  {
    name: "Diagnostic Centres",
    href: "/diagnostic-centre",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?fm=jpg&q=80&w=900&auto=format&fit=crop",
    alt: "A stethoscope resting on a clinic bed",
  },
];

export default function IndustryShowcase() {
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
        <Link href="/#services" className="industry-showcase-link">
          View all industries
        </Link>
      </div>

      <div className="industry-showcase-row">
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
            <span className="industry-showcase-label">{industry.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
