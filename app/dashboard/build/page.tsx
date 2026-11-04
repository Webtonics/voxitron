import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUserCustomers } from "@/lib/dashboard/activeCustomer";
import { VOXITRON_CUSTOMER_ID } from "@/lib/dashboard/voxitron";
import { serviceAccountEmail } from "@/lib/blocks/googleAuth";
import { BLOCKS, PROVIDERS } from "@/lib/blocks/registry";
import { TOOL_COLUMNS, type ToolRow } from "@/lib/blocks/store";
import BlockCard from "@/components/dashboard/BlockCard";
import BuildCustomerPicker from "@/components/dashboard/BuildCustomerPicker";
import NewCustomerForm from "@/components/dashboard/NewCustomerForm";

export const metadata: Metadata = { title: "Build | Voxitron" };

export default async function BuildPage({
  searchParams,
}: {
  searchParams: Promise<{ for?: string }>;
}) {
  const { for: requestedId } = await searchParams;
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

  const memberships = await getUserCustomers(supabase, user.id);
  if (!memberships.some((c) => c.id === VOXITRON_CUSTOMER_ID)) {
    notFound();
  }

  const admin = createAdminClient();

  const { data: customers } = await admin
    .from("customers")
    .select("id, business_name")
    .order("business_name", { ascending: true });

  const active = customers?.find((c) => c.id === requestedId) || customers?.[0];

  const { data: tools } = active
    ? await admin.from("customer_tools").select(TOOL_COLUMNS).eq("customer_id", active.id).returns<ToolRow[]>()
    : { data: [] as ToolRow[] };

  const shareEmail = serviceAccountEmail();

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1 className="dashboard-page-title">Build</h1>
          <p className="dashboard-page-subtitle">
            Plug a customer&apos;s agent into the tools they already use.
          </p>
        </div>
      </div>

      <div className="dashboard-settings-section">
        {active && <BuildCustomerPicker customers={customers || []} activeId={active.id} />}

        {shareEmail ? (
          <p className="lead-form-hint">
            Customers share their sheet or calendar with <strong>{shareEmail}</strong>
          </p>
        ) : (
          <p className="lead-form-error">
            Google isn&apos;t set up yet. Add GOOGLE_SERVICE_ACCOUNT_JSON in Vercel to connect sheets and calendars.
          </p>
        )}
      </div>

      {active && (
        <div className="build-blocks">
          {BLOCKS.map((block) => {
            const tool = tools?.find((row) => row.block === block.id);
            return (
              <BlockCard
                key={`${active.id}-${block.id}`}
                customerId={active.id}
                blockId={block.id}
                label={block.label}
                question={block.onboardingQuestion}
                providers={PROVIDERS.filter((provider) => provider.block === block.id).map((provider) => ({
                  id: provider.id,
                  label: provider.label,
                  fields: provider.fields,
                }))}
                connection={
                  tool
                    ? {
                        toolName: tool.tool_name,
                        config: tool.config,
                        hasSecret: Boolean(tool.credentials.secret),
                        status: tool.status,
                        lastError: tool.last_error,
                        lastCheckedAt: tool.last_checked_at,
                      }
                    : null
                }
              />
            );
          })}
        </div>
      )}

      <details className="build-add-customer">
        <summary className="dashboard-settings-section-title">Add a customer</summary>
        <NewCustomerForm />
      </details>
    </div>
  );
}
