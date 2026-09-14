import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | Voxitron",
  description: "Reset the password for your Voxitron dashboard.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="login-page">
      <Reveal as="div" className="login-card">
        <a href="/" className="login-wordmark" aria-label="Voxitron home">
          VOXITRON
        </a>
        <h1 className="login-title">Reset your password.</h1>
        <p className="login-sub">
          Enter the email on your account and we&apos;ll send a link to set a new password.
        </p>

        <ForgotPasswordForm />

        <a href="/login" className="login-back-link">
          Back to log in
        </a>
      </Reveal>
    </main>
  );
}
