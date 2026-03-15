"use client";
import { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { TrendingRow } from "./TrendingRow";
import type { TrendingEntry } from "@/lib/trending-data";

type Period = "week" | "month" | "all";

const TABS: { id: Period; label: string }[] = [
  { id: "week",  label: "This Week"  },
  { id: "month", label: "This Month" },
  { id: "all",   label: "All Time"   },
];

interface TrendingClientProps {
  entries: TrendingEntry[];
}

export function TrendingClient({ entries }: TrendingClientProps) {
  const [period, setPeriod] = useState<Period>("week");

  const top3 = entries.slice(0, 3);
  const rest  = entries.slice(3);

  return (
    <>
      {/* Tab bar */}
      <div className="flex items-center gap-0 border-b border-gray-200 mb-8">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setPeriod(tab.id)}
            className={`px-5 py-3 text-sm font-medium transition-colors relative
              ${period === tab.id ? "text-amber-600" : "text-gray-500 hover:text-gray-800"}`}
          >
            {tab.label}
            {period === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Top 3 spotlight */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {top3.map(entry => (
          <SpotlightCard key={entry.tool.id} entry={entry} />
        ))}
      </div>

      {/* Leaderboard #4–50 */}
      <div className="flex flex-col gap-2">
        {rest.map((entry, i) => (
          <TrendingRow
            key={entry.tool.id}
            entry={entry}
            period={period}
            animDelay={i * 18}
          />
        ))}
      </div>
    </>
  );
}
