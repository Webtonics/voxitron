"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Customer = { id: string; business_name: string; industry: string | null };

export default function DashboardNav({
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

  return (
    <nav className="dashboard-nav" aria-label="Dashboard navigation">
      <Link href="/dashboard" className="dashboard-nav-brand">
        VOXITRON
      </Link>

      <div className="dashboard-nav-tenant">
        <span className="dashboard-nav-tenant-name">{active?.business_name}</span>
        {active?.industry && (
          <span className="dashboard-nav-tenant-badge">{active.industry}</span>
        )}
      </div>

      {isVoxitronTeam && (
        <div className="dashboard-nav-links">
          <Link href="/dashboard/leads" className="dashboard-nav-link">Leads</Link>
          <Link href="/dashboard/knowledge-base" className="dashboard-nav-link">Knowledge Base</Link>
          <Link href="/dashboard/onboarding" className="dashboard-nav-link">Onboarding</Link>
        </div>
      )}

      {customers.length > 1 && (
        <select
          className="dashboard-nav-switcher"
          value={activeId}
          onChange={(e) => handleSwitch(e.target.value)}
          aria-label="Switch customer"
        >
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.business_name}</option>
          ))}
        </select>
      )}

      <button type="button" className="dashboard-nav-signout" onClick={handleSignOut}>
        Sign out
      </button>
    </nav>
  );
}
