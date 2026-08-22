import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers } from "@/lib/dashboard/activeCustomer";
import { VOXITRON_CUSTOMER_ID } from "@/lib/dashboard/voxitron";

export const metadata: Metadata = { title: "Leads | Voxitron" };

export default async function LeadsPage() {
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

  const { data: leads } = await supabase
    .from("leads")
    .select("id, name, business_name, email, phone, interested_agent, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">Leads</h1>
      </div>

      {(leads || []).length === 0 ? (
        <div className="dashboard-empty-state">
          <p>No leads submitted yet.</p>
        </div>
      ) : (
        <ul className="dashboard-lead-list">
          {(leads || []).map((lead) => (
            <li key={lead.id} className="dashboard-lead-row">
              <div className="dashboard-lead-row-main">
                <span className="dashboard-lead-row-name">{lead.name}</span>
                <span className="dashboard-lead-row-business">{lead.business_name}</span>
              </div>
              <div className="dashboard-lead-row-details">
                <a href={`mailto:${lead.email}`}>{lead.email}</a>
                {lead.phone && <span>{lead.phone}</span>}
                <span className="dashboard-lead-row-agent">{lead.interested_agent}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
