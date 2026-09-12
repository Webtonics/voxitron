export type PillVariant = "needs-you" | "booked" | "new-lead" | "channel";

export default function Pill({
  variant,
  children,
}: {
  variant: PillVariant;
  children: React.ReactNode;
}) {
  return <span className={`dashboard-pill dashboard-pill-${variant}`}>{children}</span>;
}
