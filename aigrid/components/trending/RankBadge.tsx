import type { TrendChange } from "@/lib/trending-data";

interface RankNumberProps {
  rank: number;
  animDelay?: number; // ms
}

export function RankNumber({ rank, animDelay = 0 }: RankNumberProps) {
  const isGold   = rank === 1;
  const isSilver = rank >= 2 && rank <= 3;

  const colour = isGold
    ? "text-amber-500"
    : isSilver
    ? "text-gray-400"
    : "text-gray-300";

  return (
    <span
      className={`rank-animate text-2xl font-bold tabular-nums w-8 text-right leading-none ${colour}`}
      style={{ animationDelay: `${animDelay}ms` }}
    >
      {rank}
    </span>
  );
}

interface TrendBadgeProps {
  change: TrendChange;
}

export function TrendBadge({ change }: TrendBadgeProps) {
  if (change.type === "new") {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#D1FAE5] text-[#059669] leading-none">
        NEW
      </span>
    );
  }
  if (change.type === "up") {
    return (
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-50 text-green-600 leading-none">
        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        +{change.delta}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-500 leading-none">
      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      -{change.delta}
    </span>
  );
}
