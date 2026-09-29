"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import Link from "next/link";
import Tick from "@/components/Tick";
import {
  RESPONSE_BRACKETS,
  EXAMPLE,
  bracketDefaultPct,
  estimate,
  formatNaira,
  type BracketValue,
} from "@/lib/missedLeadCalc";

const WA_NUMBER = "2348120907050";

function formatThousands(digits: string): string {
  return digits === "" ? "" : Number(digits).toLocaleString("en-NG");
}

function clampPct(raw: string): number | "" {
  if (raw === "") return "";
  return Math.max(0, Math.min(100, Number(raw)));
}

type CalculatorToolProps = {
  compact?: boolean;
};

export default function CalculatorTool({ compact = false }: CalculatorToolProps) {
  const [monthlyInquiries, setMonthlyInquiries] = useState<number | "">(EXAMPLE.inquiries);
  const [responseBracket, setResponseBracket] = useState<BracketValue>(EXAMPLE.bracket);
  const [dealValue, setDealValue] = useState<string>(EXAMPLE.dealValue);
  const [closeRate, setCloseRate] = useState<number | "">(EXAMPLE.closeRate);
  const [lossPct, setLossPct] = useState<number | "">(bracketDefaultPct(EXAMPLE.bracket));
  const [recoverablePct, setRecoverablePct] = useState<number | "">(EXAMPLE.recoverablePct);
  const [isExample, setIsExample] = useState(true);
  const [tickDone, setTickDone] = useState(false);

  const signatureRef = useRef<HTMLParagraphElement | null>(null);
  const formulaRef = useRef<HTMLDetailsElement | null>(null);

  const bracket = RESPONSE_BRACKETS.find((b) => b.value === responseBracket) ?? RESPONSE_BRACKETS[0];
  const dealValueNumber = dealValue === "" ? "" : Number(dealValue);
  const hasAllInputs =
    monthlyInquiries !== "" &&
    dealValueNumber !== "" &&
    closeRate !== "" &&
    lossPct !== "" &&
    recoverablePct !== "";
  const isAlreadyFast = responseBracket === "under-1m" && lossPct === 0;
  const showFormula = !compact && hasAllInputs && !isAlreadyFast;

  const { closedRevenue, lostRevenue, recoverableRevenue } = useMemo(() => {
    if (!hasAllInputs) return { closedRevenue: 0, lostRevenue: 0, recoverableRevenue: 0 };
    return estimate({
      inquiries: monthlyInquiries,
      closeRatePct: closeRate,
      dealValue: dealValueNumber,
      lossPct,
      recoverablePct,
    });
  }, [hasAllInputs, monthlyInquiries, closeRate, dealValueNumber, lossPct, recoverablePct]);

  // "How this is calculated" is open by default on desktop only. Rendered open
  // (no desktop layout shift), then collapsed after hydration on small screens.
  useEffect(() => {
    if (formulaRef.current && window.matchMedia("(max-width: 759px)").matches) {
      formulaRef.current.open = false;
    }
  }, [showFormula]);

  // The signature tick flips to amber once, the first time it scrolls into
  // view. Reduced motion drops the transition and pop in CSS.
  useEffect(() => {
    const el = signatureRef.current;
    if (!el || tickDone) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setTickDone(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          window.setTimeout(() => setTickDone(true), 400);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [tickDone]);

  function markEdited() {
    if (isExample) setIsExample(false);
  }

  function handleBracketChange(e: ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as BracketValue;
    setResponseBracket(next);
    setLossPct(bracketDefaultPct(next));
    markEdited();
  }

  function handleDealValueChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const caret = input.selectionStart ?? input.value.length;
    const digitsBeforeCaret = input.value.slice(0, caret).replace(/\D/g, "").length;
    const digits = input.value.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 12);
    setDealValue(digits);
    markEdited();

    // Keep the caret after the same digit once separators are re-inserted.
    requestAnimationFrame(() => {
      const formatted = input.value;
      let seen = 0;
      let pos = 0;
      while (pos < formatted.length && seen < digitsBeforeCaret) {
        if (/\d/.test(formatted[pos])) seen++;
        pos++;
      }
      input.setSelectionRange(pos, pos);
    });
  }

  const waMessage = !hasAllInputs
    ? "Hi Voxitron, I used the missed lead calculator."
    : isAlreadyFast
      ? "Hi Voxitron, I used the missed lead calculator. I already reply in under 1 minute."
      : `Hi Voxitron, I used the missed lead calculator. My estimate: ${formatNaira(lostRevenue)} lost a month at ${bracket.label.toLowerCase()} reply time.`;
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="calculator-card">
      <div className="calculator-inputs">
        <div className="calculator-field">
          <label htmlFor="calc-inquiries">Monthly WhatsApp inquiries</label>
          <input
            id="calc-inquiries"
            type="number"
            inputMode="numeric"
            min={0}
            value={monthlyInquiries}
            onChange={(e) => {
              setMonthlyInquiries(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)));
              markEdited();
            }}
          />
          <span className="calculator-field-hint">How many new customer messages you get per month.</span>
        </div>

        <div className="calculator-field">
          <label htmlFor="calc-response">Typical response time</label>
          <select id="calc-response" value={responseBracket} onChange={handleBracketChange}>
            {RESPONSE_BRACKETS.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
          <span className="calculator-field-hint">
            Be honest, not aspirational. This drives the whole estimate.
            {!compact && lossPct !== "" && (
              <>
                {" "}Assumption: at this reply speed, we estimate lost revenue at about {lossPct}%
                of what you currently close. Adjust it below if you know better.
              </>
            )}
          </span>
        </div>

        <div className="calculator-field">
          <label htmlFor="calc-deal-value">Average deal value (&#8358;)</label>
          <input
            id="calc-deal-value"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={formatThousands(dealValue)}
            onChange={handleDealValueChange}
          />
          <span className="calculator-field-hint">What a typical order or booking is worth to you.</span>
        </div>

        <div className="calculator-field">
          <label htmlFor="calc-close-rate">Current close rate (%)</label>
          <input
            id="calc-close-rate"
            type="number"
            inputMode="numeric"
            min={0}
            max={100}
            value={closeRate}
            onChange={(e) => {
              setCloseRate(clampPct(e.target.value));
              markEdited();
            }}
          />
          <span className="calculator-field-hint">Of people you reply to, roughly what share end up paying.</span>
        </div>

        {!compact && (
          <details className="calculator-assumptions">
            <summary>Adjust assumptions</summary>
            <div className="calculator-assumptions-fields">
              <div className="calculator-field">
                <label htmlFor="calc-loss-rate">Share of revenue lost at this reply speed (%)</label>
                <input
                  id="calc-loss-rate"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={100}
                  value={lossPct}
                  onChange={(e) => {
                    setLossPct(clampPct(e.target.value));
                    markEdited();
                  }}
                />
                <span className="calculator-field-hint">
                  Default for this response time: {bracketDefaultPct(responseBracket)}%.
                </span>
              </div>
              <div className="calculator-field">
                <label htmlFor="calc-recoverable">Share realistically recoverable (%)</label>
                <input
                  id="calc-recoverable"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={100}
                  value={recoverablePct}
                  onChange={(e) => {
                    setRecoverablePct(clampPct(e.target.value));
                    markEdited();
                  }}
                />
                <span className="calculator-field-hint">Not every recovered reply turns into a sale.</span>
              </div>
            </div>
          </details>
        )}
      </div>

      <div className="calculator-results">
        {isExample && hasAllInputs && (
          <p className="calculator-example-note">Example numbers. Change them to yours.</p>
        )}

        <div className="calculator-figures" aria-live="polite">
          {!hasAllInputs ? (
            <div className="calculator-result calculator-result-empty">
              <div className="calculator-result-label">Fill in your numbers to see your estimate</div>
            </div>
          ) : isAlreadyFast ? (
            <div className="calculator-result calculator-result-fast is-primary">
              <p className="calculator-result-fast-text">
                You&apos;re already fast. Most owners aren&apos;t, especially at night.
              </p>
            </div>
          ) : (
            <>
              <div className="calculator-result">
                <div className="calculator-result-label">Estimated monthly revenue lost</div>
                <div className="calculator-result-value">{formatNaira(lostRevenue)}</div>
              </div>
              <div className="calculator-result is-primary">
                <div className="calculator-result-label">Potential recovery under 60 seconds</div>
                <div className="calculator-result-value">{formatNaira(recoverableRevenue)}</div>
              </div>
            </>
          )}
        </div>

        <p className="calculator-signature" ref={signatureRef}>
          Your reply time: {bracket.label}
          <span className="calculator-signature-sep" aria-hidden="true">·</span>
          Ours: under 01:00 <Tick done={tickDone} className="calculator-signature-tick" />
        </p>

        {showFormula && (
          <details className="calculator-formula" ref={formulaRef} open>
            <summary>How this is calculated</summary>
            <p className="calculator-formula-math">
              {monthlyInquiries} inquiries &times; {closeRate}% close rate &times;{" "}
              {formatNaira(Number(dealValueNumber))} = {formatNaira(closedRevenue)} closed a month
            </p>
            <p className="calculator-formula-math">
              {formatNaira(closedRevenue)} &times; {lossPct}% lost = {formatNaira(lostRevenue)}
            </p>
            <p className="calculator-formula-math">
              {formatNaira(lostRevenue)} &times; {recoverablePct}% recoverable = {formatNaira(recoverableRevenue)}
            </p>
            <p>
              The loss rate is applied to revenue you already close, so this errs low. An
              estimate to guide you, not a guarantee.
            </p>
          </details>
        )}

        <div className="calculator-cta-group" data-wa-float-hide="">
          <a
            href={waHref}
            className={`btn ${isExample ? "btn-secondary" : "btn-primary"}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
          <Link href="/contact" className="btn btn-outline">Book a call</Link>
        </div>
      </div>
    </div>
  );
}
