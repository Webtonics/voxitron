"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type Segment = "needs-you" | "active" | "leads" | "all" | "closed";

const LABELS: Record<Segment, string> = {
  "needs-you": "Needs you",
  active: "Active",
  leads: "Leads",
  all: "All",
  closed: "Closed",
};

export default function SegmentTabs({
  segment,
  counts,
}: {
  segment: Segment;
  counts: Record<Segment, number>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goTo(next: Segment) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("seg", next);
    params.delete("open");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="dashboard-segment-tabs" role="tablist" aria-label="Inbox segments">
      {(Object.keys(LABELS) as Segment[]).map((key) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={segment === key}
          className={`dashboard-segment-tab${segment === key ? " is-active" : ""}${key === "needs-you" ? " is-alert" : ""}`}
          onClick={() => goTo(key)}
        >
          {LABELS[key]}
          <span className="dashboard-segment-tab-count">{counts[key]}</span>
        </button>
      ))}
    </div>
  );
}
