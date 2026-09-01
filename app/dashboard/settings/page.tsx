import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";
import SettingsForm from "@/components/dashboard/SettingsForm";

export const metadata: Metadata = { title: "Settings | Voxitron" };

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string }>;
}) {
  const { customer: customerParam } = await searchParams;
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const customers = await getUserCustomers(supabase, user.id);
  const active = resolveActiveCustomer(customers, customerParam);

  const { data: numbers } = await supabase
    .from("customer_whatsapp_numbers")
    .select("id, label, whatsapp_number")
    .eq("customer_id", active.id);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">Settings</h1>
      </div>

      <div className="dashboard-settings-info">
        <span className="dashboard-lead-row-agent">Industry</span>
        <p>{active.industry || "Not set. Contact Voxitron to update this."}</p>
      </div>

      <SettingsForm
        customerId={active.id}
        initialBusinessName={active.business_name}
        numbers={numbers || []}
      />

      <p className="lead-form-hint" style={{ marginTop: "var(--space-6)" }}>
        Need to change your industry, pricing tier, or how your agent behaves? Contact
        Voxitron, those are configured on your behalf.
      </p>
    </div>
  );
}
