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
        <div>
          <h1 className="dashboard-page-title">Settings</h1>
          <p className="dashboard-page-subtitle">Your business details and how your agent behaves</p>
        </div>
      </div>

      <div className="dashboard-settings-section">
        <span className="dashboard-settings-section-title">Business profile</span>
        <p className="dashboard-settings-section-note" style={{ textTransform: "none", letterSpacing: 0 }}>
          Shown to customers and used by the agent when it introduces itself.
        </p>
        <div className="dashboard-settings-info">
          <span className="dashboard-settings-field-label">Industry</span>
          <p>{active.industry || "Not set. Contact Voxitron to update this."}</p>
        </div>
        <SettingsForm
          customerId={active.id}
          initialBusinessName={active.business_name}
          numbers={numbers || []}
        />
      </div>

      <div className="dashboard-settings-section">
        <div className="dashboard-settings-section-heading">
          <span className="dashboard-settings-section-title">How your agent behaves</span>
          <span className="dashboard-badge-managed">Managed by Voxitron</span>
        </div>

        <div>
          <span className="dashboard-settings-field-label">
            Tone <span className="dashboard-settings-field-hint">How it speaks to your customers</span>
          </span>
          <p className="dashboard-settings-readonly-value" style={{ marginTop: "var(--space-2)" }}>
            {config.tone_notes || "Not set yet. Contact Voxitron to configure your agent's tone."}
          </p>
        </div>

        {config.escalation_triggers && config.escalation_triggers.length > 0 && (
          <div>
            <span className="dashboard-settings-field-label">
              When it passes to you <span className="dashboard-settings-field-hint">Escalation triggers</span>
            </span>
            <ul className="dashboard-settings-tag-list" style={{ marginTop: "var(--space-2)" }}>
              {config.escalation_triggers.map((trigger) => (
                <li key={trigger} className="dashboard-settings-tag">{trigger}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="dashboard-settings-contact-note">
          Want to change any of these? <a href="mailto:hello@voxitron.com">Message your Voxitron contact</a> and we
          will update it for you.
        </p>
      </div>
    </div>
  );
}
