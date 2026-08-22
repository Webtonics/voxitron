import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";
import StatsStrip from "@/components/dashboard/StatsStrip";
import ConversationList, { type ConversationListItem } from "@/components/dashboard/ConversationList";

export const metadata: Metadata = { title: "Dashboard | Voxitron" };

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string; number?: string }>;
}) {
  const { customer: customerParam, number: numberParam } = await searchParams;
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const customers = await getUserCustomers(supabase, user.id);
  const active = resolveActiveCustomer(customers, customerParam);
  const customerQuery = customerParam ? `?customer=${customerParam}` : "";

  const { data: numbers } = await supabase
    .from("customer_whatsapp_numbers")
    .select("id, label, whatsapp_number")
    .eq("customer_id", active.id);

  const activeNumberId =
    numberParam && (numbers || []).some((n) => n.id === numberParam) ? numberParam : undefined;

  let conversationsQuery = supabase
    .from("conversations")
    .select("id, contact_name, contact_phone, needs_human, started_at")
    .eq("customer_id", active.id);

  if (activeNumberId) {
    conversationsQuery = conversationsQuery.eq("whatsapp_number_id", activeNumberId);
  }

  const { data: conversations } = await conversationsQuery;
  const conversationIds = (conversations || []).map((c) => c.id);

  const { data: messages } = conversationIds.length
    ? await supabase
        .from("messages")
        .select("id, conversation_id, body, sent_at")
        .in("conversation_id", conversationIds)
        .order("sent_at", { ascending: false })
    : { data: [] as { id: string; conversation_id: string; body: string; sent_at: string }[] };

  const latestByConversation = new Map<string, { body: string; sent_at: string }>();
  for (const m of messages || []) {
    if (!latestByConversation.has(m.conversation_id)) {
      latestByConversation.set(m.conversation_id, { body: m.body, sent_at: m.sent_at });
    }
  }

  const conversationItems: ConversationListItem[] = (conversations || [])
    .map((c) => {
      const latest = latestByConversation.get(c.id);
      return {
        id: c.id,
        contact_name: c.contact_name,
        contact_phone: c.contact_phone,
        needs_human: c.needs_human,
        latest_message_body: latest?.body || null,
        latest_message_at: latest?.sent_at || c.started_at,
      };
    })
    .sort((a, b) => {
      if (a.needs_human !== b.needs_human) return a.needs_human ? -1 : 1;
      const aTime = a.latest_message_at ? new Date(a.latest_message_at).getTime() : 0;
      const bTime = b.latest_message_at ? new Date(b.latest_message_at).getTime() : 0;
      return bTime - aTime;
    });

  const weekAgo = new Date(Date.now() - ONE_WEEK_MS).toISOString();
  const conversationsThisWeek = (conversations || []).filter((c) => c.started_at >= weekAgo).length;
  const messagesThisWeek = (messages || []).filter((m) => m.sent_at >= weekAgo).length;

  const stats = [
    { number: String((conversations || []).length), label: "Total conversations" },
    { number: String((messages || []).length), label: "Total messages" },
    { number: String(conversationsThisWeek), label: "New conversations this week" },
    { number: String(messagesThisWeek), label: "Messages this week" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">Overview</h1>
      </div>

      <StatsStrip stats={stats} />

      {(numbers || []).length > 1 && (
        <div className="dashboard-number-switcher">
          <a
            href={`/dashboard${customerQuery}`}
            className={`dashboard-number-tab${!activeNumberId ? " is-active" : ""}`}
          >
            All numbers
          </a>
          {(numbers || []).map((n) => {
            const params = new URLSearchParams();
            if (customerParam) params.set("customer", customerParam);
            params.set("number", n.id);
            return (
              <a
                key={n.id}
                href={`/dashboard?${params.toString()}`}
                className={`dashboard-number-tab${activeNumberId === n.id ? " is-active" : ""}`}
              >
                {n.label || n.whatsapp_number}
              </a>
            );
          })}
        </div>
      )}

      <ConversationList conversations={conversationItems} customerQuery={customerQuery} />
    </div>
  );
}
