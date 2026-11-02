import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import LoginForm from "@/components/LoginForm";
import { NOINDEX } from "@/lib/site";

export const metadata: Metadata = {
  robots: NOINDEX,
  title: "Log In | Voxitron",
  description: "Log in to your Voxitron dashboard.",
};

export default function LoginPage() {
  return (
    <main className="login-page">
      <Reveal as="div" className="login-card">
        <a href="/" className="login-wordmark" aria-label="Voxitron home">
          VOXITRON
        </a>
        <h1 className="login-title">Log in to your dashboard.</h1>
        <p className="login-sub">
          Access is set up by Voxitron when your agent goes live. If you don&apos;t have an
          account yet, message us on WhatsApp.
        </p>

        <LoginForm />
      </Reveal>
    </main>
  );
}
