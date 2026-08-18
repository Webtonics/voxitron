"use client";

import Link from "next/link";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Nav />
      <main>
        <section style={{ padding: "calc(56px + var(--space-9)) var(--gutter) var(--space-9)" }}>
          <div className="section-inner" style={{ textAlign: "center" }}>
            <span className="section-label">SOMETHING WENT WRONG</span>
            <h1 className="section-title">
              That didn&apos;t <span className="accent">load right.</span>
            </h1>
            <p className="section-body" style={{ margin: "0 auto var(--space-6)", maxWidth: "480px" }}>
              An unexpected error happened on our end. Try again, or head back to the
              homepage.
            </p>

            <div className="cta-group" style={{ justifyContent: "center" }}>
              <button type="button" onClick={() => reset()} className="btn btn-primary">
                Try again
              </button>
              <Link href="/" className="btn btn-secondary">Back to home</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
