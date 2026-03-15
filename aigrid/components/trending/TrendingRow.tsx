import Link from "next/link";
import { PricingBadge, CategoryBadge } from "@/components/aigrid/Badge";
import { RankNumber, TrendBadge } from "./RankBadge";
import { Sparkline } from "./Sparkline";
import type { TrendingEntry } from "@/lib/trending-data";

interface TrendingRowProps {
  entry: TrendingEntry;
  period: "week" | "month" | "all";
  animDelay: number;
}

export function TrendingRow({ entry, period, animDelay }: TrendingRowProps) {
  const saves = period === "week" ? entry.savesThisWeek : period === "month" ? entry.savesThisMonth : entry.savesAllTime;
  const savesLabel = period === "week" ? "saves this week" : period === "month" ? "saves this month" : "saves all time";
  const isUp = entry.change.type !== "down";
  const initials = entry.tool.name.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-3 sm:gap-4 px-4 py-3 bg-white rounded-xl border border-gray-100 hover:border-brand hover:shadow-sm transition-all duration-150 group">
      {/* Rank + trend */}
      <div className="flex flex-col items-center gap-1 w-10 flex-shrink-0">
        <RankNumber rank={entry.rank} animDelay={animDelay} />
        <TrendBadge change={entry.change} />
      </div>

      {/* Logo */}
      <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        {entry.tool.logoUrl ? (
          <img 
            src={entry.tool.logoUrl} 
            alt={`${entry.tool.name} logo`}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('bg-brand-pale');
                parent.innerHTML = `<span class="text-brand-dark font-bold text-xs">${initials}</span>`;
              }
            }}
          />
        ) : (
          <span className="text-brand-dark font-bold text-xs">{initials}</span>
        )}
      </div>

      {/* Name + tagline + badges */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href={`/tool/${entry.tool.slug}`}
            className="font-semibold text-gray-900 text-sm hover:text-brand transition-colors truncate">
            {entry.tool.name}
          </Link>
          <CategoryBadge slug={entry.tool.category} />
          <PricingBadge model={entry.tool.pricingModel} />
        </div>
        <p className="text-xs text-gray-400 truncate mt-0.5">{entry.tool.tagline}</p>
      </div>

      {/* Stats + sparkline — hidden on small screens */}
      <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-900">{saves.toLocaleString()}</p>
          <p className="text-[11px] text-gray-400">{savesLabel}</p>
        </div>
        <Sparkline data={entry.sparkline} positive={isUp} />
      </div>

      {/* Visit button */}
      <Link href={`/tool/${entry.tool.slug}`}
        className="hidden md:inline-flex flex-shrink-0 items-center px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-brand hover:text-brand transition-colors"
        onClick={e => e.stopPropagation()}>
        Visit →
      </Link>
    </div>
  );
}
