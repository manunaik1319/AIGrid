// Pure SVG sparkline — no JS charting lib, zero CLS
interface SparklineProps {
  data: number[]; // 7 values 0-100
  positive?: boolean;
}

export function Sparkline({ data, positive = true }: SparklineProps) {
  const W = 72, H = 28, pad = 2;
  const xs = data.map((_, i) => pad + (i / (data.length - 1)) * (W - pad * 2));
  const ys = data.map(v => H - pad - ((v / 100) * (H - pad * 2)));
  const points = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  const fillPoints = `${xs[0]},${H} ${points} ${xs[xs.length - 1]},${H}`;
  const stroke = positive ? "#10B981" : "#EF4444";
  const fill   = positive ? "#D1FAE5" : "#FEE2E2";

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="flex-shrink-0">
      <polygon points={fillPoints} fill={fill} opacity={0.6} />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
