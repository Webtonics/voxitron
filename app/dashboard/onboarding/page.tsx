import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers } from "@/lib/dashboard/activeCustomer";
import { VOXITRON_CUSTOMER_ID } from "@/lib/dashboard/voxitron";
import OnboardingForm from "@/components/OnboardingForm";

export const metadata: Metadata = { title: "Onboarding | Voxitron" };

export default async function OnboardingPage() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!VOXITRON_CUSTOMER_ID) {
    notFound();
  }

  const customers = await getUserCustomers(supabase, user.id);
  const isVoxitronTeam = customers.some((c) => c.id === VOXITRON_CUSTOMER_ID);

  if (!isVoxitronTeam) {
    notFound();
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">Onboarding</h1>
        <p className="dashboard-page-subtitle">
          Set a customer&apos;s industry and AI agent config: tone, qualification
          questions, booking flow, and escalation triggers.
        </p>
      </div>

      <OnboardingForm />
    </div>
  );
}
