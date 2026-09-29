import Tick from "@/components/Tick";
import { EXAMPLE, EXAMPLE_ESTIMATE, bracketLabel, formatNaira } from "@/lib/missedLeadCalc";

// Static, non-interactive preview of the calculator's result card for the
// /tools/missed-lead-calculator hero. Figures come from the calculator's own
// example inputs, and the card is labelled "Example" so it never reads as a
// real customer's number.
export default function CalculatorPreview() {
  return (
    <figure className="calculator-preview" aria-label="Example calculator result">
      <figcaption className="calculator-preview-tag">Example</figcaption>

      <div className="calculator-preview-figure">
        <span className="calculator-preview-label">Estimated monthly revenue lost</span>
        <span className="calculator-preview-value">{formatNaira(EXAMPLE_ESTIMATE.lostRevenue)}</span>
      </div>

      <div className="calculator-preview-figure is-primary">
        <span className="calculator-preview-label">Potential recovery under 60 seconds</span>
        <span className="calculator-preview-value">{formatNaira(EXAMPLE_ESTIMATE.recoverableRevenue)}</span>
      </div>

      <p className="calculator-preview-signature">
        Reply time: {bracketLabel(EXAMPLE.bracket)}
        <span className="calculator-signature-sep" aria-hidden="true">·</span>
        Ours: under 01:00 <Tick />
      </p>
    </figure>
  );
}
