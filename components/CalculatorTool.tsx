"use client";

import { useMemo, useState } from "react";

const RESPONSE_BRACKETS = [
  { value: "1", label: "Under 1 minute", recoveryRate: 0 },
  { value: "10", label: "5 to 15 minutes", recoveryRate: 0.15 },
  { value: "60", label: "15 minutes to 1 hour", recoveryRate: 0.3 },
  { value: "240", label: "1 to 4 hours", recoveryRate: 0.45 },
  { value: "1440", label: "Same day, but hours later", recoveryRate: 0.55 },
] as const;

function formatNaira(value: number): string {
  return `₦${Math.round(value).toLocaleString("en-NG")}`;
}

export default function CalculatorTool() {
  const [monthlyInquiries, setMonthlyInquiries] = useState(200);
  const [responseBracket, setResponseBracket] = useState<(typeof RESPONSE_BRACKETS)[number]["value"]>("60");
  const [dealValue, setDealValue] = useState(15000);
  const [closeRate, setCloseRate] = useState(20);

  const bracket = RESPONSE_BRACKETS.find((b) => b.value === responseBracket) ?? RESPONSE_BRACKETS[2];

  const { lostRevenue, recoverableRevenue } = useMemo(() => {
    const closeRateDecimal = Math.max(0, Math.min(100, closeRate)) / 100;
    const totalPotentialRevenue = monthlyInquiries * closeRateDecimal * dealValue;
    // Assumes the recoveryRate share of currently-lost deals would close if
    // response time dropped to under 60 seconds.
    const lost = totalPotentialRevenue * bracket.recoveryRate;
    const recoverable = lost * 0.7; // conservative: not every recovered reply converts to a sale
    return { lostRevenue: lost, recoverableRevenue: recoverable };
  }, [monthlyInquiries, dealValue, closeRate, bracket]);

  return (
    <div className="calculator-card">
      <div className="calculator-inputs">
        <div className="calculator-field">
          <label htmlFor="calc-inquiries">Monthly WhatsApp inquiries</label>
          <input
            id="calc-inquiries"
            type="number"
            min={0}
            value={monthlyInquiries}
            onChange={(e) => setMonthlyInquiries(Number(e.target.value) || 0)}
          />
          <span className="calculator-field-hint">How many new customer messages you get per month.</span>
        </div>

        <div className="calculator-field">
          <label htmlFor="calc-response">Typical response time</label>
          <select
            id="calc-response"
            value={responseBracket}
            onChange={(e) => setResponseBracket(e.target.value as typeof responseBracket)}
          >
            {RESPONSE_BRACKETS.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
          <span className="calculator-field-hint">Be honest, not aspirational. This drives the whole estimate.</span>
        </div>

        <div className="calculator-field">
          <label htmlFor="calc-deal-value">Average deal value (&#8358;)</label>
          <input
            id="calc-deal-value"
            type="number"
            min={0}
            value={dealValue}
            onChange={(e) => setDealValue(Number(e.target.value) || 0)}
          />
          <span className="calculator-field-hint">What a typical order or booking is worth to you.</span>
        </div>

        <div className="calculator-field">
          <label htmlFor="calc-close-rate">Current close rate (%)</label>
          <input
            id="calc-close-rate"
            type="number"
            min={0}
            max={100}
            value={closeRate}
            onChange={(e) => setCloseRate(Number(e.target.value) || 0)}
          />
          <span className="calculator-field-hint">Of inquiries that reply, roughly what share become paying customers.</span>
        </div>
      </div>

      <div className="calculator-results">
        <div className="calculator-result">
          <div className="calculator-result-label">Estimated monthly revenue lost</div>
          <div className="calculator-result-value">{formatNaira(lostRevenue)}</div>
        </div>
        <div className="calculator-result is-primary">
          <div className="calculator-result-label">Potential recovery under 60 seconds</div>
          <div className="calculator-result-value">{formatNaira(recoverableRevenue)}</div>
        </div>

        <div className="calculator-formula">
          <strong>How this is calculated:</strong> monthly inquiries &times; your close rate
          &times; average deal value gives your total potential revenue. We assume a share
          of that (based on your response-time bracket) is currently being lost to slow
          replies, and that 70% of it is realistically recoverable once replies happen in
          under 60 seconds. This is an estimate to guide your thinking, not a guarantee.
        </div>
      </div>
    </div>
  );
}
