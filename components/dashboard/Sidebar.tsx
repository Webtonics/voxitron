"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Customer = { id: string; business_name: string; industry: string | null };

const NAV_ITEMS = [
  { href: "/dashboard", label: "Inbox", icon: "inbox" as const },
];

const TEAM_NAV_ITEMS = [
  { href: "/dashboard/leads", label: "Leads", icon: "leads" as const },
  { href: "/dashboard/knowledge-base", label: "Knowledge Base", icon: "kb" as const },
  { href: "/dashboard/onboarding", label: "Onboarding", icon: "onboarding" as const },
];

function NavIcon({ name }: { name: "inbox" | "leads" | "kb" | "onboarding" }) {
  const paths: Record<typeof name, React.ReactNode> = {
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

      <button type="button" className="dashboard-sidebar-signout" onClick={handleSignOut}>
        Sign out
      </button>
    </aside>
  );
}
