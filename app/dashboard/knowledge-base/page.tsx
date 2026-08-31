import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";
import KnowledgeBaseForm from "@/components/KnowledgeBaseForm";

export const metadata: Metadata = { title: "Knowledge Base | Voxitron" };

const STATUS_LABELS: Record<string, string> = {
  processing: "Processing",
  success: "Done",
  failed: "Failed",
};

export default async function KnowledgeBasePage({
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

  const { data: jobs } = await supabase
    .from("kb_ingest_jobs")
    .select("id, document_title, operation, status, chunk_count, error_message, created_at")
    .eq("customer_id", active.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">Knowledge Base</h1>
      </div>

      <p className="lead-form-hint" style={{ marginBottom: "var(--space-5)" }}>
        Add your product, pricing, or policy info so your WhatsApp agent can answer from
        it instead of guessing.
      </p>

      <KnowledgeBaseForm customerId={active.id} />

      <div className="dashboard-page-header" style={{ marginTop: "var(--space-8)" }}>
        <h2 className="dashboard-page-title" style={{ fontSize: "var(--text-base)" }}>
          Recent updates
        </h2>
      </div>

      {(jobs || []).length === 0 ? (
        <div className="dashboard-empty-state">
          <p>No updates yet. Anything you add above will show up here.</p>
        </div>
      ) : (
        <ul className="dashboard-lead-list">
          {(jobs || []).map((job) => (
            <li key={job.id} className="dashboard-lead-row">
              <div className="dashboard-lead-row-main">
                <span className="dashboard-lead-row-name">{job.document_title}</span>
                <span className={`dashboard-kb-status dashboard-kb-status-${job.status}`}>
                  {STATUS_LABELS[job.status] || job.status}
                </span>
              </div>
              <div className="dashboard-lead-row-details">
                <span>{job.operation === "delete" ? "Removed" : "Added or updated"}</span>
                {job.status === "success" && job.chunk_count != null && (
                  <span>{job.chunk_count} chunk{job.chunk_count === 1 ? "" : "s"}</span>
                )}
                {job.status === "failed" && job.error_message && (
                  <span>{job.error_message}</span>
                )}
                <span>{new Date(job.created_at).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
