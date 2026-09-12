"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { isDebugModeEnabled, setDebugModeEnabled } from "@/lib/dashboard/debugMode";

type Customer = { id: string; business_name: string; industry: string | null };

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: "overview" as const },
  { href: "/dashboard/inbox", label: "Inbox", icon: "inbox" as const },
  { href: "/dashboard/knowledge-base", label: "Knowledge base", icon: "kb" as const },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" as const },
];

const TEAM_NAV_ITEMS = [
  { href: "/dashboard/leads", label: "Leads", icon: "leads" as const },
  { href: "/dashboard/onboarding", label: "Onboarding", icon: "onboarding" as const },
];

function NavIcon({ name }: { name: "overview" | "inbox" | "leads" | "kb" | "onboarding" | "settings" }) {
  const paths: Record<typeof name, React.ReactNode> = {
    overview: (
      <path
        d="M3 12L5 10L9 14L14 7L17 10M3 17H17"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    inbox: (
      <path
        d="M3 8L5 3H15L17 8M3 8V15C3 15.55 3.45 16 4 16H16C16.55 16 17 15.55 17 15V8M3 8H7.5C7.5 9.38 8.62 10.5 10 10.5C11.38 10.5 12.5 9.38 12.5 8H17"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    ),
    leads: (
      <path
        d="M10 10C11.66 10 13 8.66 13 7C13 5.34 11.66 4 10 4C8.34 4 7 5.34 7 7C7 8.66 8.34 10 10 10Z M4 17C4 13.69 6.69 11 10 11C13.31 11 16 13.69 16 17"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    kb: (
      <path
        d="M4 4.5C4 3.67 4.67 3 5.5 3H14.5C15.33 3 16 3.67 16 4.5V15.5C16 16.33 15.33 17 14.5 17H5.5C4.67 17 4 16.33 4 15.5V4.5Z M7 7H13M7 10H13M7 13H10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    ),
    onboarding: (
      <path
        d="M10 2L12.2 6.5L17 7.2L13.5 10.6L14.4 15.5L10 13.2L5.6 15.5L6.5 10.6L3 7.2L7.8 6.5L10 2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    ),
    settings: (
      <>
        <circle cx="10" cy="10" r="2.8" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M10 3.5V5.5M10 14.5V16.5M16.5 10H14.5M5.5 10H3.5M14.6 5.4L13.2 6.8M6.8 13.2L5.4 14.6M14.6 14.6L13.2 13.2M6.8 6.8L5.4 5.4"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </>
    ),
  };

  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function Sidebar({
  customers,
  isVoxitronTeam = false,
}: {
  customers: Customer[];
  isVoxitronTeam?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeId = searchParams.get("customer") || customers[0]?.id;
  const active = customers.find((c) => c.id === activeId) || customers[0];

  const [inboxCount, setInboxCount] = useState(0);
  const [liveNumber, setLiveNumber] = useState<string | null>(null);
  const [debugMode, setDebugModeState] = useState(() => isDebugModeEnabled());

  function toggleDebugMode() {
    const next = !debugMode;
    setDebugModeState(next);
    setDebugModeEnabled(next);
  }

  useEffect(() => {
    if (!activeId) return;
    let cancelled = false;

    async function loadSidebarStats() {
      const supabase = createClient();

      const [{ count }, { data: numbers }] = await Promise.all([
        supabase
          .from("conversations")
          .select("id", { count: "exact", head: true })
          .eq("customer_id", activeId)
          .eq("needs_human", true),
        supabase
          .from("customer_whatsapp_numbers")
          .select("whatsapp_number")
          .eq("customer_id", activeId)
          .limit(1),
      ]);

      if (!cancelled) {
        setInboxCount(count || 0);
        setLiveNumber(numbers?.[0]?.whatsapp_number || null);
      }
    }

    loadSidebarStats();
    return () => {
      cancelled = true;
    };
  }, [activeId]);

  function handleSwitch(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("customer", id);
    router.push(`${pathname}?${params.toString()}`);
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string) {
    return href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
  }

  return (
    <aside className="dashboard-sidebar" aria-label="Dashboard navigation">
      <Link href="/dashboard" className="dashboard-sidebar-brand">
        VOXITRON
      </Link>

      <div className="dashboard-sidebar-tenant">
        <span className="dashboard-sidebar-tenant-name">{active?.business_name}</span>
        {active?.industry && (
          <span className="dashboard-nav-tenant-badge">{active.industry}</span>
        )}
        {liveNumber && (
          <span className="dashboard-sidebar-tenant-live">
            <span className="dashboard-sidebar-live-dot" aria-hidden="true" />
            Agent live on {liveNumber}
          </span>
        )}
        {customers.length > 1 && (
          <select
            className="dashboard-sidebar-switcher"
            value={activeId}
            onChange={(e) => handleSwitch(e.target.value)}
            aria-label="Switch customer"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.business_name}</option>
            ))}
          </select>
        )}
      </div>

      <nav className="dashboard-sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`dashboard-sidebar-link${isActive(item.href) ? " is-active" : ""}`}
          >
            <NavIcon name={item.icon} />
            {item.label}
            {item.icon === "inbox" && inboxCount > 0 && (
              <span className="dashboard-sidebar-badge">{inboxCount}</span>
            )}
          </Link>
        ))}

        {isVoxitronTeam && (
          <>
            <span className="dashboard-sidebar-section-label">Voxitron team</span>
            {TEAM_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`dashboard-sidebar-link${isActive(item.href) ? " is-active" : ""}`}
              >
                <NavIcon name={item.icon} />
                {item.label}
              </Link>
            ))}
          </>
        )}
      </nav>

      {isVoxitronTeam && (
        <button
          type="button"
          className={`dashboard-debug-toggle${debugMode ? " is-on" : ""}`}
          onClick={toggleDebugMode}
          aria-pressed={debugMode}
          title="Show raw errors from n8n/Supabase instead of the friendly message"
        >
          <span className="dashboard-debug-toggle-dot" aria-hidden="true" />
          Debug mode {debugMode ? "on" : "off"}
        </button>
      )}

      <button type="button" className="dashboard-sidebar-signout" onClick={handleSignOut}>
        Sign out
      </button>
    </aside>
  );
}
