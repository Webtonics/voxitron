export type TrendPoint = { label: string; count: number };

const WIDTH = 560;
const HEIGHT = 170;
const PADDING_TOP = 14;

function buildPath(points: TrendPoint[]) {
  if (points.length === 0) return { line: "", area: "" };

  const max = Math.max(1, ...points.map((p) => p.count));
  const step = points.length > 1 ? WIDTH / (points.length - 1) : 0;

  const coords = points.map((p, i) => {
    const x = points.length > 1 ? i * step : WIDTH / 2;
    const y = PADDING_TOP + (1 - p.count / max) * (HEIGHT - PADDING_TOP - 10);
    return [x, y] as const;
  });

  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area = `${line} L${coords[coords.length - 1][0]},${HEIGHT} L0,${HEIGHT} Z`;

  return { line, area, last: coords[coords.length - 1] };
}

export default function TrendChart({ points }: { points: TrendPoint[] }) {
  if (points.length === 0 || points.every((p) => p.count === 0)) {
    return (
      <div className="dashboard-empty-state" style={{ textAlign: "left" }}>
        <p>Not enough conversations yet to chart a trend.</p>
      </div>
    );
  }

  const { line, area, last } = buildPath(points);

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width="100%"
        height={HEIGHT}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Conversation volume trend, ${points[0].label} to ${points[points.length - 1].label}`}
      >
        <defs>
          <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#0E7C6B" stopOpacity="0.22" />
            <stop offset="1" stopColor="#0E7C6B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="#E7E3DA" strokeWidth="1">
          <line x1="0" y1={HEIGHT * 0.18} x2={WIDTH} y2={HEIGHT * 0.18} />
          <line x1="0" y1={HEIGHT * 0.5} x2={WIDTH} y2={HEIGHT * 0.5} />
          <line x1="0" y1={HEIGHT * 0.82} x2={WIDTH} y2={HEIGHT * 0.82} />
        </g>
        <path d={area} fill="url(#trend-fill)" />
        <path d={line} fill="none" stroke="#0E7C6B" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {last && <circle cx={last[0]} cy={last[1]} r="4" fill="#E8890C" stroke="#fff" strokeWidth="2" />}
      </svg>
      <div className="dashboard-trend-axis">
        <span className="mono">{points[0].label}</span>
        <span className="mono">{points[points.length - 1].label}</span>
      </div>
    </div>
  );
}
