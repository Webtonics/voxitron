import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ padding: "calc(56px + var(--space-9)) var(--gutter) var(--space-9)" }}>
          <div className="section-inner" style={{ textAlign: "center" }}>
            <span className="section-label">404</span>
            <h1 className="section-title">
              This page went <span className="accent">missing.</span>
            </h1>
            <p className="section-body" style={{ margin: "0 auto var(--space-6)", maxWidth: "480px" }}>
              The page you&apos;re looking for doesn&apos;t exist, or it moved. Let&apos;s get
              you back on track.
            </p>

            <div className="cta-group" style={{ justifyContent: "center" }}>
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
