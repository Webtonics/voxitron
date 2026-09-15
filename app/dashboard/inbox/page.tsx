import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";
import Inbox, { type ExtendedConversationListItem } from "@/components/dashboard/Inbox";
import NumberSwitcher from "@/components/dashboard/NumberSwitcher";
import type { Segment } from "@/components/dashboard/SegmentTabs";

export const metadata: Metadata = { title: "Inbox | Voxitron" };

const SEGMENTS: Segment[] = ["needs-you", "active", "leads", "all", "closed"];

function isSegment(value: string | undefined): value is Segment {
  return !!value && (SEGMENTS as string[]).includes(value);
}

export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string; number?: string; seg?: string; q?: string; open?: string }>;
}) {
  const { customer: customerParam, number: numberParam, seg: segParam, q: qParam, open: openParam } =
    await searchParams;
  const segment: Segment = isSegment(segParam) ? segParam : "needs-you";
  const query = (qParam || "").trim();

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
    .select("id, label, display_number")
    .eq("customer_id", active.id);

  const activeNumberId =
    numberParam && (numbers || []).some((n) => n.id === numberParam) ? numberParam : undefined;

  // Every conversation for this customer/number, unfiltered: segment counts
  // and the calm-state stats both need the full shape, not just the
  // currently-selected segment's rows. Fine at today's volume; windowed
  // loading is deferred (see voxitron-inbox-at-scale.md section 4).
  let baseQuery = supabase
    .from("conversations")
    .select(
      "id, contact_name, contact_phone, needs_human, escalation_reason, is_lead, resolved, ai_paused, first_reply_seconds, started_at"
    )
    .eq("customer_id", active.id);

  if (activeNumberId) {
    baseQuery = baseQuery.eq("whatsapp_number_id", activeNumberId);
  }

  const { data: allConversations } = await baseQuery;
  const conversations = allConversations || [];

  let matchingIds: Set<string> | null = null;
  if (query) {
    const [byContact, byMessage] = await Promise.all([
      supabase
        .from("conversations")
        .select("id")
        .eq("customer_id", active.id)
        .or(`contact_name.ilike.%${query}%,contact_phone.ilike.%${query}%`),
      supabase
        .from("messages")
        .select("conversation_id")
        .ilike("body", `%${query}%`)
        .in(
          "conversation_id",
          conversations.map((c) => c.id)
        ),
    ]);

    matchingIds = new Set([
      ...(byContact.data || []).map((c) => c.id),
      ...(byMessage.data || []).map((m) => m.conversation_id),
    ]);
  }

  const conversationIds = conversations.map((c) => c.id);

  const { data: messages } = conversationIds.length
    ? await supabase
        .from("messages")
        .select("id, conversation_id, direction, body, sent_at, type")
        .in("conversation_id", conversationIds)
        .order("sent_at", { ascending: false })
    : {
        data: [] as {
          id: string;
          conversation_id: string;
          direction: "inbound" | "outbound";
          body: string;
          sent_at: string;
          type: "text" | "voice" | "photo";
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

  const latestByConversation = new Map<string, { body: string; sent_at: string; type: string }>();
  for (const m of messages || []) {
    if (!latestByConversation.has(m.conversation_id)) {
      latestByConversation.set(m.conversation_id, { body: m.body, sent_at: m.sent_at, type: m.type });
    }
  }

  const allItems: ExtendedConversationListItem[] = conversations.map((c) => {
    const latest = latestByConversation.get(c.id);
    return {
      id: c.id,
      contact_name: c.contact_name,
      contact_phone: c.contact_phone,
      needs_human: c.needs_human,
      escalation_reason: c.escalation_reason,
      is_lead: c.is_lead,
      resolved: c.resolved,
      ai_paused: c.ai_paused,
      latest_message_body: latest?.body || null,
      latest_message_at: latest?.sent_at || c.started_at,
      latest_message_type: (latest?.type || "text") as "text" | "voice" | "photo",
    };
  });

  const counts = {
    "needs-you": allItems.filter((c) => c.needs_human).length,
    active: allItems.filter((c) => !c.needs_human && !c.resolved).length,
    leads: allItems.filter((c) => c.is_lead).length,
    all: allItems.length,
    closed: allItems.filter((c) => c.resolved).length,
  };

  const bySegment: Record<Segment, ExtendedConversationListItem[]> = {
    "needs-you": allItems.filter((c) => c.needs_human),
    active: allItems.filter((c) => !c.needs_human && !c.resolved),
    leads: allItems.filter((c) => c.is_lead),
    all: allItems,
    closed: allItems.filter((c) => c.resolved),
  };

  let conversationItems = bySegment[segment];
  if (matchingIds) {
    conversationItems = conversationItems.filter((c) => matchingIds!.has(c.id));
  }

  conversationItems = conversationItems.sort((a, b) => {
    if (a.needs_human !== b.needs_human) return a.needs_human ? -1 : 1;
    const aTime = a.latest_message_at ? new Date(a.latest_message_at).getTime() : 0;
    const bTime = b.latest_message_at ? new Date(b.latest_message_at).getTime() : 0;
    return bTime - aTime;
  });

  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const handledThisWeek = allItems.filter(
    (c) => !c.needs_human && c.latest_message_at && new Date(c.latest_message_at).getTime() >= weekAgo
  ).length;
  const leadsCaptured = counts.leads;
  const replyTimes = conversations
    .map((c) => c.first_reply_seconds)
    .filter((s): s is number => typeof s === "number");
  const avgReplySeconds =
    replyTimes.length > 0 ? Math.round(replyTimes.reduce((a, b) => a + b, 0) / replyTimes.length) : null;

  const numberConnected = (numbers || []).length > 0;
  const knowledgeBaseLoaded = (kbJobs || []).length > 0;
  const config = (customerConfig?.config || {}) as { tone_notes?: string };
  const agentConfigured = Boolean(config.tone_notes);

  return (
    <div className="dashboard-inbox-page">
      <div className="dashboard-inbox-toolbar">
        <div>
          <h1 className="dashboard-page-title">Inbox</h1>
          <p className="dashboard-page-subtitle">Conversations your agent is handling right now</p>
        </div>

        <NumberSwitcher
          basePath="/dashboard/inbox"
          numbers={numbers || []}
          activeNumberId={activeNumberId}
          extraParams={{ customer: customerParam }}
        />
      </div>

      <Inbox
        key={`${activeNumberId || "all"}:${segment}:${query}`}
        conversations={conversationItems}
        segment={segment}
        counts={counts}
        query={query}
        calmStats={{ handledThisWeek, leadsCaptured, avgReplySeconds }}
        numberConnected={numberConnected}
        knowledgeBaseLoaded={knowledgeBaseLoaded}
        agentConfigured={agentConfigured}
        openParam={openParam}
      />
    </div>
  );
}
