import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";

export const metadata: Metadata = {
  title: "Privacy Policy | Voxitron",
  description: "How Voxitron collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ padding: "calc(56px + var(--space-9)) var(--gutter) var(--space-9)" }}>
          <div className="section-inner">
            <span className="section-label">PRIVACY POLICY</span>
            <h1 className="section-title">How we handle your information.</h1>
            <div className="section-body">
              <p>
                Voxitron collects only the information you give us directly: your name,
                business, and contact details, when you get in touch to learn about our
                agents.
              </p>
              <p>
                We use it to respond to your enquiry and set up your agent. We never sell
                your data, and you can ask us to delete it at any time by emailing{" "}
                <a href="mailto:hello@voxitron.com" style={{ textDecoration: "underline" }}>
                  hello@voxitron.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
