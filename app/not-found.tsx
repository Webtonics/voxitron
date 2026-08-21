import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className="page-hero is-full-page">
          <div className="section-inner empty-state">
            <span className="section-label">404</span>
            <h1 className="section-title">
              This page went <span className="accent">missing.</span>
            </h1>
            <p className="section-body">
              The page you&apos;re looking for doesn&apos;t exist, or it moved. Let&apos;s get
              you back on track.
            </p>

            <div className="cta-group">
              <Link href="/" className="btn btn-primary">Back to home</Link>
              <Link href="/#services" className="btn btn-secondary">See all agents</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
