import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";
import { BLOCKS, providerById } from "@/lib/blocks/registry";
import Pill from "@/components/dashboard/Pill";

export const metadata: Metadata = { title: "Connections | Voxitron" };

type RowState = "connected" | "attention" | "missing";

type Row = {
  label: string;
  description: string;
  state: RowState;
  detail?: string | null;
  action?: { href: string; label: string };
};

const VOXITRON_CONTACT = { href: "mailto:hello@voxitron.com", label: "Ask Voxitron to connect it" };

function StatePill({ state }: { state: RowState }) {
  if (state === "connected") return <Pill variant="booked">Connected</Pill>;
  if (state === "attention") return <Pill variant="needs-you">Needs attention</Pill>;
  return <Pill variant="new-lead">Not set up</Pill>;
}

export default async function ConnectionsPage({
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

  const [{ data: numbers }, { count: documentCount }, { data: owner }, { data: tools }] = await Promise.all([
    supabase
      .from("customer_whatsapp_numbers")
      .select("display_number, label")
      .eq("customer_id", active.id)
      .eq("is_active", true),
    supabase
      .from("kb_ingest_jobs")
      .select("id", { count: "exact", head: true })
      .eq("customer_id", active.id)
      .eq("operation", "ingest")
      .eq("status", "success"),
    supabase.from("customers").select("owner_whatsapp_number").eq("id", active.id).single(),
    supabase
      .from("customer_tools")
      .select("block, tool_name, status, last_error")
      .eq("customer_id", active.id)
      .neq("status", "disconnected"),
  ]);

  const liveNumber = numbers?.[0]?.display_number || numbers?.[0]?.label;

  const rows: Row[] = [
    {
      label: "WhatsApp",
      description: "Where your agent talks to customers",
      state: numbers?.length ? "connected" : "missing",
      detail: liveNumber,
      action: numbers?.length ? undefined : VOXITRON_CONTACT,
    },
    {
      label: "Knowledge base",
      description: "What your agent knows",
      state: documentCount ? "connected" : "missing",
      action: { href: "/dashboard/knowledge-base", label: documentCount ? "Manage" : "Add your prices and FAQs" },
    },
    ...BLOCKS.map((block): Row => {
      const tool = tools?.find((row) => row.block === block.id);
      if (!tool) {
        return { label: block.label, description: block.description, state: "missing", action: VOXITRON_CONTACT };
      }
      return {
        label: block.label,
        description: block.description,
        state: tool.status === "error" ? "attention" : "connected",
        detail: tool.status === "error" ? tool.last_error : providerById(tool.tool_name)?.label,
      };
    }),
    {
      label: "Alerts to you",
      description: "Messages you when a customer needs a person",
      state: owner?.owner_whatsapp_number ? "connected" : "missing",
      detail: owner?.owner_whatsapp_number,
      action: owner?.owner_whatsapp_number ? undefined : { href: "/dashboard/settings", label: "Add your number" },
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1 className="dashboard-page-title">Connections</h1>
          <p className="dashboard-page-subtitle">The tools your agent uses, and whether each one is working.</p>
        </div>
      </div>

      <ul className="connection-list">
        {rows.map((row) => (
          <li key={row.label} className="connection-row">
            <div className="connection-row-main">
              <span className="connection-row-label">{row.label}</span>
              <span className="connection-row-description">{row.description}</span>
              {row.detail && (
                <span className={row.state === "attention" ? "lead-form-error" : "connection-row-description"}>
                  {row.detail}
                </span>
              )}
              {row.action &&
                (row.action.href.startsWith("mailto:") ? (
                  <a className="connection-row-action" href={row.action.href}>{row.action.label}</a>
                ) : (
                  <Link className="connection-row-action" href={row.action.href}>{row.action.label}</Link>
                ))}
            </div>
            <StatePill state={row.state} />
          </li>
        ))}
      </ul>
    </div>
  );
}
