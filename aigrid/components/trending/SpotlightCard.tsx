import Link from "next/link";
import { PricingBadge, CategoryBadge } from "@/components/aigrid/Badge";
import { Sparkline } from "./Sparkline";
import type { TrendingEntry } from "@/lib/trending-data";

const MEDAL = [
  { border: "from-amber-300 via-yellow-200 to-amber-400", bg: "bg-amber-50",  icon: "👑", label: "gold"   },
  { border: "from-gray-300 via-gray-100 to-gray-400",     bg: "bg-gray-50",   icon: "🥈", label: "silver" },
  { border: "from-orange-300 via-orange-100 to-orange-400",bg:"bg-orange-50", icon: "🥉", label: "bronze" },
];

export function SpotlightCard({ entry }: { entry: TrendingEntry }) {
  const idx    = entry.rank - 1; // 0,1,2
  const medal  = MEDAL[idx];
  const isUp   = entry.change.type !== "down";
  const initials = entry.tool.name.slice(0, 2).toUpperCase();

  return (
    <Link href={`/tool/${entry.tool.slug}`} className="block group">
      {/* Gradient border via padding trick */}
      <div className={`p-px rounded-2xl bg-gradient-to-br ${medal.border}`}>
        <div className={`${medal.bg} rounded-2xl p-5 flex flex-col gap-4 h-full`}>
          {/* Top row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Rank + medal */}
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-2xl leading-none">{medal.icon}</span>
                <span className="text-xs font-bold text-gray-400">#{entry.rank}</span>
              </div>
              {/* Logo */}
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                {entry.tool.logoUrl ? (
                  <img 
                    src={entry.tool.logoUrl} 
                    alt={`${entry.tool.name} logo`}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.classList.add('bg-brand-pale');
                        parent.innerHTML = `<span class="text-brand-dark font-bold text-sm">${initials}</span>`;
                      }
                    }}
                  />
                ) : (
                  <span className="text-brand-dark font-bold text-sm">{initials}</span>
                )}
              </div>
            </div>
            {/* Growth pill */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${isUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
              {isUp ? "↑" : "↓"} {entry.growthPct}% this week
            </span>
          </div>

          {/* Name + tagline */}
          <div>
            <p className="font-bold text-gray-900 text-lg leading-tight group-hover:text-brand transition-colors">
              {entry.tool.name}
            </p>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{entry.tool.tagline}</p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            <CategoryBadge slug={entry.tool.category} />
            <PricingBadge model={entry.tool.pricingModel} />
          </div>

          {/* Stats + sparkline */}
          <div className="flex items-end justify-between mt-auto pt-3 border-t border-black/5">
            <div>
              <p className="text-xl font-bold text-gray-900">{entry.savesThisWeek.toLocaleString()}</p>
              <p className="text-xs text-gray-400">saves this week</p>
            </div>
            <Sparkline data={entry.sparkline} positive={isUp} />
          </div>
        </div>
      </div>
    </Link>
  );
}
