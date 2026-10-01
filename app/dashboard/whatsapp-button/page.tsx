import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";
import { toWaDigits, waLink, type WhatsappButtonRow } from "@/lib/whatsappButton";
import WhatsappButtonEditor, {
  type ButtonNumberOption,
  type ButtonSettings,
} from "@/components/dashboard/WhatsappButtonEditor";
import EmbedSnippet from "@/components/dashboard/EmbedSnippet";
import EmptyState from "@/components/dashboard/EmptyState";
import MetricCard from "@/components/dashboard/MetricCard";
import TrendChart, { type TrendPoint } from "@/components/dashboard/TrendChart";

export const metadata: Metadata = { title: "WhatsApp Button | Voxitron" };

const DAY_MS = 24 * 60 * 60 * 1000;

type NumberRow = { id: string; label: string | null; display_number: string | null; is_active: boolean };
type ClickRow = { clicked_at: string; page_path: string | null };

/** Click stats for the last 30 days. RLS limits this to the member's own button. */
async function loadClickStats(supabase: SupabaseClient, buttonId: string) {
  const now = Date.now();
  const { data } = await supabase
    .from("whatsapp_button_clicks")
    .select("clicked_at, page_path")
    .eq("button_id", buttonId)
    .gte("clicked_at", new Date(now - 30 * DAY_MS).toISOString())
    .order("clicked_at", { ascending: false })
    .limit(10000)
    .returns<ClickRow[]>();
  const clicks = data || [];

  const byDay = new Map<string, number>();
  const byPage = new Map<string, number>();
  for (const c of clicks) {
    const day = c.clicked_at.slice(0, 10);
    byDay.set(day, (byDay.get(day) || 0) + 1);
    if (c.page_path) byPage.set(c.page_path, (byPage.get(c.page_path) || 0) + 1);
  }

  const trendPoints: TrendPoint[] = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now - (29 - i) * DAY_MS);
    return {
      label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      count: byDay.get(d.toISOString().slice(0, 10)) || 0,
    };
  });

  return {
    total: clicks.length,
    last7: clicks.filter((c) => now - new Date(c.clicked_at).getTime() <= 7 * DAY_MS).length,
    trendPoints,
    topPages: [...byPage.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5),
  };
}

export default async function WhatsappButtonPage({
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

  const [{ data: numberRows }, { data: button }] = await Promise.all([
    supabase
      .from("customer_whatsapp_numbers")
      .select("id, label, display_number, is_active")
      .eq("customer_id", active.id)
      .eq("is_active", true)
      .order("created_at", { ascending: true })
      .returns<NumberRow[]>(),
    supabase
      .from("whatsapp_buttons")
      .select("id, customer_id, whatsapp_number_id, greeting, tooltip, position, color_mode, brand_color, is_enabled")
      .eq("customer_id", active.id)
      .maybeSingle<WhatsappButtonRow>(),
  ]);

  // Only numbers wa.me can actually open are offered. A number stored in
  // local format would send visitors to the wrong chat.
  const usableNumbers = (numberRows || []).filter((n) => toWaDigits(n.display_number));
  const unusableCount = (numberRows || []).length - usableNumbers.length;

  const numberOptions: ButtonNumberOption[] = usableNumbers.map((n) => ({
    id: n.id,
    name: n.label ? `${n.label} (${n.display_number})` : n.display_number || "",
  }));

  const header = (
    <div className="dashboard-page-header">
      <div>
        <h1 className="dashboard-page-title">WhatsApp button</h1>
        <p className="dashboard-page-subtitle">
          Put a WhatsApp chat button on your website. Your agent replies to every message.
        </p>
      </div>
    </div>
  );

  if (usableNumbers.length === 0) {
    return (
      <div className="dashboard-page">
        {header}
        <EmptyState
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z" strokeLinejoin="round" />
            </svg>
          }
          title="No number ready for the button yet"
          body={
            unusableCount > 0
              ? "Your number isn't stored in international format yet, so the button can't link to it. Contact Voxitron and we'll fix it."
              : "The button needs an active WhatsApp number connected to your agent. Contact Voxitron to finish setting it up."
          }
          primaryAction={
            <a className="btn btn-primary" href="mailto:hello@voxitron.com">Contact Voxitron</a>
          }
        />
      </div>
    );
  }

  // A saved button whose number has since been deactivated falls back to the
  // first usable number in the form, so saving fixes it.
  const savedNumberUsable = button?.whatsapp_number_id
    ? usableNumbers.some((n) => n.id === button.whatsapp_number_id)
    : false;

  const initial: ButtonSettings | null = button
    ? {
        whatsappNumberId: savedNumberUsable ? button.whatsapp_number_id! : usableNumbers[0].id,
        greeting: button.greeting,
        tooltip: button.tooltip || "",
        position: button.position,
        colorMode: button.color_mode,
        brandColor: button.brand_color || "#0E7C6B",
        isEnabled: button.is_enabled,
      }
    : null;

  const liveNumber = button && savedNumberUsable
    ? usableNumbers.find((n) => n.id === button.whatsapp_number_id)
    : undefined;
  const liveDigits = liveNumber ? toWaDigits(liveNumber.display_number) : null;

  const headerList = await headers();
  const host = headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") || "https";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (host ? `${proto}://${host}` : "https://voxitron.com");
  const snippet = button
    ? `<script src="${siteUrl}/wa-button.js" data-button="${button.id}" async></script>`
    : null;

  const { total: clicks30, last7: clicks7, trendPoints, topPages } = button
    ? await loadClickStats(supabase, button.id)
    : { total: 0, last7: 0, trendPoints: [], topPages: [] };

  return (
    <div className="dashboard-page">
      {header}

      <div className="dashboard-card wa-btn-card">
        <div className="dashboard-card-header">
          <span className="dashboard-card-header-title">Set up your button</span>
          {button && (
            <span className={`wa-btn-status${button.is_enabled ? " is-live" : ""}`}>
              {button.is_enabled ? "Live" : "Turned off"}
            </span>
          )}
        </div>
        <div className="dashboard-card-body">
          <WhatsappButtonEditor
            customerId={active.id}
            numbers={numberOptions}
            initial={initial}
            hasSaved={Boolean(button)}
          />
        </div>
      </div>

      {button && snippet && (
        <div className="dashboard-card wa-btn-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-header-title">Install on your website</span>
            {liveDigits && (
              <a
                className="dashboard-card-header-meta"
                href={waLink(liveDigits, button.greeting)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Test the link
              </a>
            )}
          </div>
          <div className="dashboard-card-body wa-btn-install">
            <p className="wa-btn-install-lead">
              Paste this code just before the closing <code>&lt;/body&gt;</code> tag on every page. Changes you save
              here reach your site within a minute, no need to paste it again.
            </p>
            <EmbedSnippet code={snippet} />
            <ul className="wa-btn-install-list">
              <li><strong>WordPress:</strong> use a plugin like WPCode, add it as a footer script.</li>
              <li><strong>Wix:</strong> Settings, Custom code, add to Body end, all pages.</li>
              <li><strong>Shopify:</strong> Online Store, Themes, Edit code, paste above <code>&lt;/body&gt;</code> in theme.liquid.</li>
            </ul>
            {!button.is_enabled && (
              <p className="lead-form-hint">The button is turned off, so this code shows nothing until you turn it back on.</p>
            )}
          </div>
        </div>
      )}

      {button && (
        <>
          <div className="wa-btn-metric-grid">
            <MetricCard
              tone="amber"
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 9l10 4-4 2-2 4z" strokeLinejoin="round" /><path d="M5 3v3M3 5h3" strokeLinecap="round" /></svg>}
              value={clicks7 === 0 ? "No clicks yet" : String(clicks7)}
              label="Button clicks, last 7 days"
              isEmpty={clicks7 === 0}
            />
            <MetricCard
              tone="teal"
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" strokeLinecap="round" /></svg>}
              value={clicks30 === 0 ? "No clicks yet" : String(clicks30)}
              label="Button clicks, last 30 days"
              isEmpty={clicks30 === 0}
            />
          </div>

          <div className="dashboard-grid-2">
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <span className="dashboard-card-header-title">Clicks per day</span>
                <span className="dashboard-card-header-meta">Last 30 days</span>
              </div>
              <div className="dashboard-card-body">
                <TrendChart
                  points={trendPoints}
                  subject="Button clicks"
                  emptyMessage="No clicks yet. Once the code is on your site, clicks show up here."
                />
              </div>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <span className="dashboard-card-header-title">Top pages</span>
                <span className="dashboard-card-header-meta">Where visitors clicked</span>
              </div>
              <div className="dashboard-card-body">
                {topPages.length === 0 ? (
                  <div className="dashboard-empty-state" style={{ textAlign: "left" }}>
                    <p>No clicks yet.</p>
                  </div>
                ) : (
                  <ol className="wa-btn-top-pages">
                    {topPages.map(([page, count]) => (
                      <li key={page}>
                        <span className="wa-btn-top-pages-path">{page}</span>
                        <span className="wa-btn-top-pages-count mono">{count}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
