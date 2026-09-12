import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";
import { computeMedianReplyTimeSeconds, formatReplyTimeMono } from "@/lib/dashboard/replyTime";
import MetricCard from "@/components/dashboard/MetricCard";
import TrendChart, { type TrendPoint } from "@/components/dashboard/TrendChart";
import ResolutionDonut from "@/components/dashboard/ResolutionDonut";
import AfterHoursBand, { type HourBucket } from "@/components/dashboard/AfterHoursBand";
import MessageTypeBars from "@/components/dashboard/MessageTypeBars";
import LeadsTable, { type LeadRow } from "@/components/dashboard/LeadsTable";
import EmptyState from "@/components/dashboard/EmptyState";
import NumberSwitcher from "@/components/dashboard/NumberSwitcher";

export const metadata: Metadata = { title: "Overview | Voxitron" };

type Range = "today" | "week" | "30days";

const RANGE_LABELS: Record<Range, string> = { today: "Today", week: "This week", "30days": "30 days" };
const RANGE_MS: Record<Range, number> = {
  today: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  "30days": 30 * 24 * 60 * 60 * 1000,
};

const DEFAULT_BUSINESS_HOURS = { open: 8, close: 18 }; // 8am-6pm, used when a customer hasn't set business_hours yet

function timeAgoOrTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false });
}

function isAfterHours(iso: string, businessHours: unknown): boolean {
  const hour = new Date(iso).getHours();
  const hours = (businessHours as { open?: number; close?: number } | null) || DEFAULT_BUSINESS_HOURS;
  const open = hours.open ?? DEFAULT_BUSINESS_HOURS.open;
  const close = hours.close ?? DEFAULT_BUSINESS_HOURS.close;
  return hour < open || hour >= close;
}

function statusFor(outcome: string | null): LeadRow["status"] {
  if (outcome === "booked") return "booked";
  return "new-lead";
}

export default async function OverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string; range?: string; number?: string }>;
}) {
  const { customer: customerParam, range: rangeParam, number: numberParam } = await searchParams;
  const range: Range = rangeParam === "today" || rangeParam === "30days" ? rangeParam : "week";
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const customers = await getUserCustomers(supabase, user.id);
  const active = resolveActiveCustomer(customers, customerParam);
  const customerQuery = customerParam ? `customer=${customerParam}&` : "";

  const inboxParams = new URLSearchParams();
  if (customerParam) inboxParams.set("customer", customerParam);
  if (numberParam) inboxParams.set("number", numberParam);
  const inboxHref = inboxParams.toString() ? `/dashboard/inbox?${inboxParams}` : "/dashboard/inbox";

  const { data: numbers } = await supabase
    .from("customer_whatsapp_numbers")
    .select("id, label, whatsapp_number")
    .eq("customer_id", active.id);

  const activeNumberId =
    numberParam && (numbers || []).some((n) => n.id === numberParam) ? numberParam : undefined;

  const { data: customerRow } = await supabase
    .from("customers")
    .select("business_hours")
    .eq("id", active.id)
    .single();
  const businessHours = customerRow?.business_hours ?? null;
  const usingAssumedHours = !businessHours;

  const now = Date.now();
  const rangeStart = new Date(now - RANGE_MS[range]).toISOString();
  const priorRangeStart = new Date(now - 2 * RANGE_MS[range]).toISOString();
  const fourteenDaysAgo = new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString();

  let conversationsQuery = supabase
    .from("conversations")
    .select("id, is_lead, outcome, needs_human, first_reply_seconds, started_at, contact_name, contact_phone")
    .eq("customer_id", active.id)
    .gte("started_at", priorRangeStart);
  if (activeNumberId) {
    conversationsQuery = conversationsQuery.eq("whatsapp_number_id", activeNumberId);
  }
  const { data: conversations } = await conversationsQuery;

  let trendQuery = supabase
    .from("conversations")
    .select("started_at")
    .eq("customer_id", active.id)
    .gte("started_at", fourteenDaysAgo);
  if (activeNumberId) {
    trendQuery = trendQuery.eq("whatsapp_number_id", activeNumberId);
  }
  const { data: trendConversations } = await trendQuery;

  const conversationIds = (conversations || []).map((c) => c.id);
  const { data: messages } = conversationIds.length
    ? await supabase
        .from("messages")
        .select("conversation_id, type, body, sent_at, direction")
        .in("conversation_id", conversationIds)
    : { data: [] as { conversation_id: string; type: string; body: string; sent_at: string; direction: string }[] };

  const inCurrentRange = (startedAt: string) => startedAt >= rangeStart;
  const inPriorRange = (startedAt: string) => startedAt >= priorRangeStart && startedAt < rangeStart;

  const currentConvos = (conversations || []).filter((c) => inCurrentRange(c.started_at));
  const priorConvos = (conversations || []).filter((c) => inPriorRange(c.started_at));

  const leadsCaptured = currentConvos.filter((c) => c.is_lead).length;
  const priorLeadsCaptured = priorConvos.filter((c) => c.is_lead).length;
  const leadsDelta = leadsCaptured - priorLeadsCaptured;

  const afterHoursLeads = currentConvos.filter((c) => c.is_lead && isAfterHours(c.started_at, businessHours));

  const medianReplySeconds = computeMedianReplyTimeSeconds(currentConvos.map((c) => c.first_reply_seconds));

  const handledAlone = currentConvos.filter((c) => !c.needs_human).length;
  const handledByHuman = currentConvos.filter((c) => c.needs_human).length;
  const handledTotal = handledAlone + handledByHuman;
  const handledPercent = handledTotal > 0 ? Math.round((handledAlone / handledTotal) * 100) : null;

  const hasAnyData = currentConvos.length > 0;

  const trendByDay = new Map<string, number>();
  for (const c of trendConversations || []) {
    const day = c.started_at.slice(0, 10);
    trendByDay.set(day, (trendByDay.get(day) || 0) + 1);
  }
  const trendPoints: TrendPoint[] = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now - (13 - i) * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    return {
      label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      count: trendByDay.get(key) || 0,
    };
  });

  const hourCounts = new Map<number, number>();
  for (const c of currentConvos) {
    const hour = new Date(c.started_at).getHours();
    hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
  }
  // 12 buckets of 1.5 hours each, starting at 6am and wrapping past midnight,
  // matching the mock's 6a-12a axis.
  const hourBuckets: HourBucket[] = Array.from({ length: 12 }, (_, i) => {
    const hour = Math.floor((6 + i * 1.5) % 24);
    let count = 0;
    for (const [h, c] of hourCounts) {
      if (Math.floor(((h - 6 + 24) % 24) / 1.5) === i) count += c;
    }
    return { hour, count, afterHours: isAfterHours(new Date(2000, 0, 1, hour).toISOString(), businessHours) };
  });

  const busiestHour = hourBuckets.reduce((best, h) => (h.count > best.count ? h : best), hourBuckets[0]);
  const busiestWindow =
    busiestHour && busiestHour.count > 0
      ? `${busiestHour.hour % 12 || 12}${busiestHour.hour < 12 ? "am" : "pm"} to ${(busiestHour.hour + 2) % 12 || 12}${(busiestHour.hour + 2) % 24 < 12 ? "am" : "pm"}`
      : null;

  const messageTypeCounts = { text: 0, voice: 0, photo: 0 };
  for (const m of messages || []) {
    if (m.type === "voice") messageTypeCounts.voice++;
    else if (m.type === "photo") messageTypeCounts.photo++;
    else messageTypeCounts.text++;
  }

  const latestMessageByConvo = new Map<string, string>();
  for (const m of messages || []) {
    if (!latestMessageByConvo.has(m.conversation_id)) latestMessageByConvo.set(m.conversation_id, m.body);
  }

  const leadRows: LeadRow[] = currentConvos
    .filter((c) => c.is_lead)
    .sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())
    .slice(0, 8)
    .map((c) => ({
      id: c.id,
      name: c.contact_name || c.contact_phone,
      wants: latestMessageByConvo.get(c.id) || "No message logged",
      time: timeAgoOrTime(c.started_at),
      status: c.needs_human ? "needs-you" : statusFor(c.outcome),
    }));

  if (!hasAnyData) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-page-header">
          <h1 className="dashboard-page-title">Your agent is live</h1>
        </div>
        <EmptyState
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
              <path d="M4 5h16v12H8l-4 4z" />
              <path d="M9 11h6" />
            </svg>
          }
          title="Watching for your first message"
          body={`Your agent is live and answering, day and night. The moment a customer messages, their conversation and your results show up here.`}
          primaryAction={
            <Link href="/dashboard/inbox" className="btn btn-primary">
              Message your agent to test it
            </Link>
          }
          secondaryAction={
            <Link href="/dashboard/knowledge-base" className="btn btn-ghost">
              See what it knows
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header-row">
        <div>
          <h1 className="dashboard-page-title">Here is what your agent did</h1>
          <p className="dashboard-page-subtitle">{active.business_name} &middot; {RANGE_LABELS[range].toLowerCase()}</p>
        </div>
        <div className="dashboard-page-header-controls">
          <NumberSwitcher
            basePath="/dashboard"
            numbers={numbers || []}
            activeNumberId={activeNumberId}
            extraParams={{ customer: customerParam, range }}
          />
          <div className="dashboard-range-pill">
            {(Object.keys(RANGE_LABELS) as Range[]).map((r) => (
              <Link
                key={r}
                href={`/dashboard?${customerQuery}range=${r}${activeNumberId ? `&number=${activeNumberId}` : ""}`}
                className={r === range ? "is-active" : ""}
              >
                {RANGE_LABELS[r]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-metric-grid">
        <MetricCard
          tone="amber"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>}
          value={leadsCaptured === 0 ? "No leads yet" : String(leadsCaptured)}
          isEmpty={leadsCaptured === 0}
          label="Leads captured"
          delta={priorConvos.length > 0 ? { label: `${leadsDelta >= 0 ? "+" : ""}${leadsDelta} vs last`, positive: leadsDelta >= 0 } : undefined}
        />
        <MetricCard
          tone="amber"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a9 9 0 109 9" /><path d="M12 7v5l3 2" /></svg>}
          value={afterHoursLeads.length === 0 ? "Waiting" : String(afterHoursLeads.length)}
          isEmpty={afterHoursLeads.length === 0}
          label="Captured after hours"
          sub={usingAssumedHours ? "hours assumed, set yours in Settings" : "while you were closed"}
        />
        <MetricCard
          tone="teal"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>}
          value={medianReplySeconds === null ? "Waiting for your first reply" : formatReplyTimeMono(medianReplySeconds)}
          isEmpty={medianReplySeconds === null}
          label="Average reply time"
        />
        <MetricCard
          tone="teal"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg>}
          value={handledPercent === null ? "Nothing to hand over yet" : `${handledPercent}%`}
          isEmpty={handledPercent === null}
          label="Handled without you"
          delta={handledByHuman > 0 ? { label: `${handledByHuman} to you`, positive: false } : undefined}
        />
      </div>

      <div className="dashboard-grid-2">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-header-title">Conversations</span>
            <span className="dashboard-card-header-meta">last 14 days</span>
          </div>
          <div className="dashboard-card-body">
            <TrendChart points={trendPoints} />
          </div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-header-title">Who answered</span>
          </div>
          <div className="dashboard-card-body">
            <ResolutionDonut agentCount={handledAlone} humanCount={handledByHuman} />
          </div>
        </div>
      </div>

      <AfterHoursBand
        afterHoursCount={afterHoursLeads.length}
        totalLeads={leadsCaptured}
        busiestWindow={busiestWindow}
        hours={hourBuckets}
        usingAssumedHours={usingAssumedHours}
      />

      <div className="dashboard-grid-2b">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-header-title">What customers sent</span>
            <span className="dashboard-card-header-meta">the agent read all of it</span>
          </div>
          <div className="dashboard-card-body">
            <MessageTypeBars
              items={[
                { label: "Text messages", count: messageTypeCounts.text },
                { label: "Voice notes", count: messageTypeCounts.voice, tag: "transcribed" },
                { label: "Photos", count: messageTypeCounts.photo, tag: "read" },
              ]}
            />
          </div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-header-title">Leads captured</span>
            <Link href={inboxHref} className="dashboard-card-header-meta">
              See inbox
            </Link>
          </div>
          <div className="dashboard-card-body">
            <LeadsTable rows={leadRows} />
          </div>
        </div>
      </div>
    </div>
  );
}
