// Shared by the interactive calculator (client) and its static hero preview
// (server), so the example figures in both always come from the same math.

// lossRate: share of what the business currently closes that we estimate is
// lost at this reply speed. A default only: the full calculator lets the
// visitor override it under "Adjust assumptions".
export const RESPONSE_BRACKETS = [
  { value: "under-1m", label: "Under 1 minute", lossRate: 0 },
  { value: "1-15m", label: "1 to 15 minutes", lossRate: 0.15 },
  { value: "15-60m", label: "15 to 60 minutes", lossRate: 0.3 },
  { value: "1-4h", label: "1 to 4 hours", lossRate: 0.45 },
  { value: "4h-same-day", label: "4+ hours, same day", lossRate: 0.55 },
  // TODO(Josh): confirm 0.65 default
  { value: "next-day", label: "Next day or later", lossRate: 0.65 },
] as const;

export type BracketValue = (typeof RESPONSE_BRACKETS)[number]["value"];

// Example values so a result renders on first load. Marked as examples in the
// UI until the visitor edits any field.
export const EXAMPLE = {
  inquiries: 200,
  bracket: "1-4h" as BracketValue,
  dealValue: "15000",
  closeRate: 20,
  recoverablePct: 70,
};

export function bracketDefaultPct(value: BracketValue): number {
  const bracket = RESPONSE_BRACKETS.find((b) => b.value === value);
  return Math.round((bracket?.lossRate ?? 0) * 100);
}

export function bracketLabel(value: BracketValue): string {
  return RESPONSE_BRACKETS.find((b) => b.value === value)?.label ?? "";
}

export function formatNaira(value: number): string {
  return `₦${Math.round(value).toLocaleString("en-NG")}`;
}

// Conservative: the loss rate is applied to revenue already closed, not to
// every inquiry.
export function estimate(input: {
  inquiries: number;
  closeRatePct: number;
  dealValue: number;
  lossPct: number;
  recoverablePct: number;
}) {
  const closed = input.inquiries * (input.closeRatePct / 100) * input.dealValue;
  const lost = closed * (input.lossPct / 100);
  const recoverable = lost * (input.recoverablePct / 100);
  return { closedRevenue: closed, lostRevenue: lost, recoverableRevenue: recoverable };
}

export const EXAMPLE_ESTIMATE = estimate({
  inquiries: EXAMPLE.inquiries,
  closeRatePct: EXAMPLE.closeRate,
  dealValue: Number(EXAMPLE.dealValue),
  lossPct: bracketDefaultPct(EXAMPLE.bracket),
  recoverablePct: EXAMPLE.recoverablePct,
});
