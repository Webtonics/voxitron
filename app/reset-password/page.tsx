import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Set New Password | Voxitron",
  description: "Set a new password for your Voxitron dashboard.",
};

export default function ResetPasswordPage() {
  return (
    <main className="login-page">
      <Reveal as="div" className="login-card">
        <a href="/" className="login-wordmark" aria-label="Voxitron home">
          VOXITRON
        </a>
        <h1 className="login-title">Set a new password.</h1>
        <p className="login-sub">
          Choose a new password for your Voxitron dashboard.
        </p>

        <ResetPasswordForm />
      </Reveal>
    </main>
  );
}
