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

  const { data: customerConfig } = await supabase
    .from("customers")
    .select("config")
    .eq("id", active.id)
    .single();

  const config = (customerConfig?.config || {}) as {
    tone_notes?: string;
    escalation_triggers?: string[];
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">Settings</h1>
      </div>

      <div className="dashboard-settings-section">
        <span className="dashboard-settings-section-title">Business</span>
        <div className="dashboard-settings-info">
          <span className="dashboard-lead-row-agent">Industry</span>
          <p>{active.industry || "Not set. Contact Voxitron to update this."}</p>
        </div>
        <SettingsForm
          customerId={active.id}
          initialBusinessName={active.business_name}
          numbers={numbers || []}
        />
      </div>

      <div className="dashboard-settings-section">
        <span className="dashboard-settings-section-title">How your agent behaves</span>
        <span className="dashboard-settings-section-note">
          Set by Voxitron at onboarding. Contact us to change these.
        </span>

        <div>
          <span className="dashboard-lead-row-agent">Tone</span>
          <p className="dashboard-settings-readonly-value" style={{ marginTop: "var(--space-2)" }}>
            {config.tone_notes || "Not set yet. Contact Voxitron to configure your agent's tone."}
          </p>
        </div>

        {config.escalation_triggers && config.escalation_triggers.length > 0 && (
          <div>
            <span className="dashboard-lead-row-agent">Escalates to you when</span>
            <ul className="dashboard-settings-tag-list" style={{ marginTop: "var(--space-2)" }}>
              {config.escalation_triggers.map((trigger) => (
                <li key={trigger} className="dashboard-settings-tag">{trigger}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
