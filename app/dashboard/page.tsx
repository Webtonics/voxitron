import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";
import StatsStrip from "@/components/dashboard/StatsStrip";
import Inbox, { type ExtendedConversationListItem } from "@/components/dashboard/Inbox";
import { computeAverageReplyTimeSeconds, formatReplyTimeMono } from "@/lib/dashboard/replyTime";

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
    .select("id, contact_name, contact_phone, needs_human, escalation_reason, started_at")
    .eq("customer_id", active.id);

  if (activeNumberId) {
    conversationsQuery = conversationsQuery.eq("whatsapp_number_id", activeNumberId);
  }

  const { data: conversations } = await conversationsQuery;
  const conversationIds = (conversations || []).map((c) => c.id);

  const { data: messages } = conversationIds.length
    ? await supabase
        .from("messages")
        .select("id, conversation_id, direction, body, sent_at")
        .in("conversation_id", conversationIds)
        .order("sent_at", { ascending: false })
    : {
        data: [] as {
          id: string;
          conversation_id: string;
          direction: "inbound" | "outbound";
          body: string;
          sent_at: string;
        }[],
      };

  const { data: kbJobs } = await supabase
    .from("kb_ingest_jobs")
    .select("id")
    .eq("customer_id", active.id)
    .eq("status", "success")
    .eq("operation", "ingest")
    .limit(1);

  const { data: customerConfig } = await supabase
    .from("customers")
    .select("config")
    .eq("id", active.id)
    .single();

  const latestByConversation = new Map<string, { body: string; sent_at: string }>();
  for (const m of messages || []) {
    if (!latestByConversation.has(m.conversation_id)) {
      latestByConversation.set(m.conversation_id, { body: m.body, sent_at: m.sent_at });
    }
  }

  const conversationItems: ExtendedConversationListItem[] = (conversations || [])
    .map((c) => {
      const latest = latestByConversation.get(c.id);
      return {
        id: c.id,
        contact_name: c.contact_name,
        contact_phone: c.contact_phone,
        needs_human: c.needs_human,
        escalation_reason: c.escalation_reason,
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
  const escalations = (conversations || []).filter((c) => c.needs_human).length;

  const averageReplyTimeSeconds = computeAverageReplyTimeSeconds(
    (messages || []).map((m) => ({
      conversation_id: m.conversation_id,
      direction: m.direction,
      sent_at: m.sent_at,
    }))
  );

  const stats = [
    { number: String(conversationsThisWeek), label: "Conversations this week", icon: "conversations" as const },
    { number: String(messagesThisWeek), label: "Messages this week", icon: "messages" as const },
    averageReplyTimeSeconds === null
      ? { number: "Waiting for your first message", label: "Average reply time", icon: "reply-time" as const, isEmpty: true }
      : { number: formatReplyTimeMono(averageReplyTimeSeconds), label: "Average reply time", icon: "reply-time" as const },
    { number: String(escalations), label: "Escalations", icon: "escalations" as const },
  ];

  const numberConnected = (numbers || []).length > 0;
  const knowledgeBaseLoaded = (kbJobs || []).length > 0;
  const config = (customerConfig?.config || {}) as { tone_notes?: string };
  const agentConfigured = Boolean(config.tone_notes);

  return (
    <div className="dashboard-inbox-page">
      <div className="dashboard-inbox-toolbar">
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
      </div>

      <Inbox
        conversations={conversationItems}
        numberConnected={numberConnected}
        knowledgeBaseLoaded={knowledgeBaseLoaded}
        agentConfigured={agentConfigured}
      />
    </div>
  );
}
