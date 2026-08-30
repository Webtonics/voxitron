import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers } from "@/lib/dashboard/activeCustomer";
import { VOXITRON_CUSTOMER_ID } from "@/lib/dashboard/voxitron";
import KnowledgeBaseForm from "@/components/KnowledgeBaseForm";

export const metadata: Metadata = { title: "Knowledge Base | Voxitron" };

export default async function KnowledgeBasePage() {
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
        <h1 className="dashboard-page-title">Knowledge Base</h1>
        <p className="dashboard-page-subtitle">
          Add a customer&apos;s product, pricing, or policy info so their WhatsApp agent
          can answer from it instead of guessing.
        </p>
      </div>

      <KnowledgeBaseForm />
    </div>
  );
}
