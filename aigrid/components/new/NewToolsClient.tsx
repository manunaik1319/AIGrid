"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { formatDistanceToNow, isToday, isYesterday, isThisWeek, subWeeks } from "date-fns";
import { ToolCard } from "@/components/aigrid/ToolCard";
import { NewBadge } from "@/components/aigrid/Badge";
import type { SearchTool } from "@/lib/mock-tools";

type Filter = "all" | "free" | "opensource";

interface NewToolsClientProps {
  tools: SearchTool[];
}

// Group tools by date
function groupToolsByDate(tools: SearchTool[]) {
  const groups: Record<string, SearchTool[]> = {
    today: [],
    yesterday: [],
    thisWeek: [],
    lastWeek: [],
  };

  const oneWeekAgo = subWeeks(new Date(), 1);

  tools.forEach(tool => {
    const date = new Date(tool.dateAdded);
    if (isToday(date)) {
      groups.today.push(tool);
    } else if (isYesterday(date)) {
      groups.yesterday.push(tool);
    } else if (isThisWeek(date, { weekStartsOn: 1 })) {
      groups.thisWeek.push(tool);
    } else if (date >= oneWeekAgo) {
      groups.lastWeek.push(tool);
    }
  });

  return groups;
}

export function NewToolsClient({ tools }: NewToolsClientProps) {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  
  const [filter, setFilter] = useState<Filter>("all");
  const [visibleCount, setVisibleCount] = useState(20);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Set filter from URL parameter
  useEffect(() => {
    if (filterParam === "free" || filterParam === "opensource") {
      setFilter(filterParam);
    }
  }, [filterParam]);

  // Apply filters
  const filteredTools = useMemo(() => {
    let result = tools;
    if (filter === "free") {
      result = result.filter(t => t.pricingModel === "Free" || t.pricingModel === "Freemium");
    }
    if (filter === "opensource") {
      result = result.filter(t => t.pricingModel === "Free");
    }
    return result;
  }, [tools, filter]);

  const grouped = useMemo(() => groupToolsByDate(filteredTools), [filteredTools]);
  const visible = filteredTools.slice(0, visibleCount);
  const visibleGrouped = useMemo(() => groupToolsByDate(visible), [visible]);

  const toggleCompare = (toolId: string) => {
    setCompareList(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  return (
    <div className="flex gap-8">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Filter pills and Compare button */}
        <div className="flex items-center gap-3 mb-8">
          {/* Compare button */}
          <button
            onClick={() => {
              if (compareList.length > 0) {
                console.log("Compare tools:", compareList);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              compareList.length > 0
                ? "bg-brand text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
            disabled={compareList.length === 0}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
            Compare
            {compareList.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                {compareList.length}
              </span>
            )}
          </button>

          <div className="w-px h-6 bg-gray-200" />

          {/* Filter pills */}
          {(["all", "free", "opensource"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? "bg-brand text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-brand"
              }`}
            >
              {f === "all" ? "All" : f === "free" ? "Free Only" : "Open Source"}
            </button>
          ))}
          <span className="text-sm text-gray-400 ml-2">
            {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
          </span>
        </div>

        {/* Date-grouped feed */}
        <div className="space-y-12">
          {visibleGrouped.today.length > 0 && (
            <DateGroup 
              title="Added Today" 
              tools={visibleGrouped.today} 
              filter={filter}
              compareList={compareList}
              onToggleCompare={toggleCompare}
            />
          )}
          {visibleGrouped.yesterday.length > 0 && (
            <DateGroup 
              title="Yesterday" 
              tools={visibleGrouped.yesterday}
              filter={filter}
              compareList={compareList}
              onToggleCompare={toggleCompare}
            />
          )}
          {visibleGrouped.thisWeek.length > 0 && (
            <DateGroup 
              title="This Week" 
              tools={visibleGrouped.thisWeek}
              filter={filter}
              compareList={compareList}
              onToggleCompare={toggleCompare}
            />
          )}
          {visibleGrouped.lastWeek.length > 0 && (
            <DateGroup 
              title="Last Week" 
              tools={visibleGrouped.lastWeek}
              filter={filter}
              compareList={compareList}
              onToggleCompare={toggleCompare}
            />
          )}
        </div>

        {/* Load more */}
        {visibleCount < filteredTools.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount(v => v + 20)}
              className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-brand hover:text-brand transition-colors"
            >
              Load earlier tools ({filteredTools.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <NewToolsSidebar grouped={grouped} />
      </aside>
    </div>
  );
}

// Date group section
function DateGroup({ 
  title, 
  tools, 
  filter,
  compareList,
  onToggleCompare 
}: { 
  title: string; 
  tools: SearchTool[];
  filter: Filter;
  compareList: string[];
  onToggleCompare: (toolId: string) => void;
}) {
  return (
    <section>
      {/* Sticky date divider */}
      <div className="sticky top-16 z-10 flex items-center gap-4 mb-6 py-2 bg-gray-50">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
          {title}
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map(tool => (
          <div key={tool.id} className="relative group">
            {/* NEW badge with tooltip */}
            <div className="absolute top-3 left-3 z-20" title={`Added ${formatDistanceToNow(new Date(tool.dateAdded), { addSuffix: true })}`}>
              <NewBadge />
            </div>
            
            {/* Pricing badge - show "Free" if filter is on, otherwise show actual pricing */}
            <div className="absolute top-3 right-3 z-20">
              {filter === "free" || filter === "opensource" ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Free
                </span>
              ) : (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  tool.pricingModel === "Free" ? "bg-green-100 text-green-700" :
                  tool.pricingModel === "Freemium" ? "bg-amber-100 text-amber-700" :
                  tool.pricingModel === "Paid" ? "bg-red-100 text-red-700" :
                  "bg-purple-100 text-purple-700"
                }`}>
                  {tool.pricingModel}
                </span>
              )}
            </div>

            {/* Compare checkbox */}
            <div className="absolute top-14 right-3 z-20">
              <button
                onClick={() => onToggleCompare(tool.id)}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                  compareList.includes(tool.id)
                    ? "bg-brand border-brand"
                    : "bg-white border-gray-300 hover:border-brand"
                }`}
                title="Add to compare"
              >
                {compareList.includes(tool.id) && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>

            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
    </section>
  );
}

// Sidebar component
function NewToolsSidebar({ grouped }: { grouped: Record<string, SearchTool[]> }) {
  // Calculate category stats
  const categoryStats = useMemo(() => {
    const allTools = [...grouped.today, ...grouped.yesterday, ...grouped.thisWeek];
    const counts: Record<string, number> = {};
    allTools.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [grouped]);

  const maxCount = categoryStats[0]?.[1] || 1;

  return (
    <div className="space-y-6 sticky top-20">
      {/* Category stats */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 text-sm">Most Active Categories</h3>
        <div className="space-y-3">
          {categoryStats.map(([cat, count]) => (
            <div key={cat}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600 capitalize">{cat.replace(/-/g, " ")}</span>
                <span className="font-semibold text-gray-900">{count}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand rounded-full transition-all duration-300"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe CTA */}
      <div className="bg-gradient-to-br from-brand-pale to-blue-50 rounded-2xl border border-brand/20 p-5">
        <div className="text-2xl mb-3">🔔</div>
        <h3 className="font-semibold text-gray-900 mb-2">Get New Tool Alerts</h3>
        <p className="text-xs text-gray-600 mb-4 leading-relaxed">
          Subscribe to get notified when new tools are added in your favorite categories.
        </p>
        <button className="w-full px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  );
}
