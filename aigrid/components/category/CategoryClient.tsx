"use client";
import React, { useState, useMemo, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useQueryState, parseAsString, parseAsFloat } from "nuqs";
import { ToolCard } from "@/components/aigrid/ToolCard";
import { ToolListCard } from "@/components/search/ToolListCard";
import { SearchFilters, DEFAULT_FILTERS } from "@/components/search/SearchFilters";
import type { SearchFilterState } from "@/components/search/SearchFilters";
import { MOCK_TOOLS } from "@/lib/mock-tools";
import type { SearchTool } from "@/lib/mock-tools";
import { getCategoryBySlug } from "@/lib/category-config";
import type { CategoryConfig } from "@/lib/category-config";

const PAGE_SIZE = 20;

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-lg bg-gray-200" />
        <div className="flex-1 flex flex-col gap-2 pt-1">
          <div className="h-3.5 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-full" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-20 bg-gray-200 rounded-full" />
        <div className="h-5 w-16 bg-gray-200 rounded-full" />
      </div>
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
      <p className="text-xl font-semibold text-gray-700">No tools match your filters</p>
      <p className="text-sm text-gray-400">Try adjusting or clearing your filters</p>
    </div>
  );
}

// ── Filter chips ──────────────────────────────────────────────────────────────

function FilterChips({ filters, onChange }: { filters: SearchFilterState; onChange: (f: SearchFilterState) => void }) {
  const chips: { label: string; remove: () => void }[] = [];
  filters.pricing.forEach(p   => chips.push({ label: p, remove: () => onChange({ ...filters, pricing:   filters.pricing.filter(x => x !== p) }) }));
  filters.platforms.forEach(p => chips.push({ label: p, remove: () => onChange({ ...filters, platforms: filters.platforms.filter(x => x !== p) }) }));
  if (filters.minRating > 0)       chips.push({ label: `${filters.minRating}★+`, remove: () => onChange({ ...filters, minRating: 0 }) });
  if (filters.dateAdded !== "any") chips.push({ label: filters.dateAdded,         remove: () => onChange({ ...filters, dateAdded: "any" }) });
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap gap-2 py-2">
      {chips.map((chip, i) => (
        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-pale text-brand border border-brand/20">
          {chip.label}
          <button onClick={chip.remove} aria-label={`Remove ${chip.label} filter`} className="hover:text-brand-dark">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
    </div>
  );
}

// ── Filtering ─────────────────────────────────────────────────────────────────

function applyFilters(tools: SearchTool[], toolSlug: string, sub: string, filters: SearchFilterState, sort: string): SearchTool[] {
  const now = new Date();
  const dateThreshold = (val: string): Date | null => {
    if (val === "7d")  { const d = new Date(now); d.setDate(d.getDate() - 7);   return d; }
    if (val === "30d") { const d = new Date(now); d.setDate(d.getDate() - 30);  return d; }
    if (val === "3m")  { const d = new Date(now); d.setMonth(d.getMonth() - 3); return d; }
    if (val === "year"){ const d = new Date(now); d.setFullYear(d.getFullYear() - 1); return d; }
    return null;
  };

  let result = tools.filter(t => {
    if (t.category !== toolSlug) return false;
    if (filters.pricing.length  && !filters.pricing.includes(t.pricingModel))          return false;
    if (filters.platforms.length && !filters.platforms.some(p => t.platform.includes(p))) return false;
    if (filters.minRating > 0   && t.rating < filters.minRating)                       return false;
    const threshold = dateThreshold(filters.dateAdded);
    if (threshold && new Date(t.dateAdded) < threshold) return false;
    return true;
  });

  if (sort === "rating")  result = [...result].sort((a, b) => b.rating - a.rating);
  if (sort === "reviews") result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
  if (sort === "newest")  result = [...result].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  if (sort === "az")      result = [...result].sort((a, b) => a.name.localeCompare(b.name));

  return result;
}

// ── Sub-category pills ────────────────────────────────────────────────────────

function SubCategoryPills({ items, active, accent }: {
  items: { slug: string; label: string }[];
  active: string;
  accent: string;
}) {
  const [, setSub] = useQueryState("sub", parseAsString.withDefault(""));
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        onClick={() => setSub(null)}
        className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors"
        style={!active ? { background: accent, color: "#fff", borderColor: accent } : { background: "transparent", color: "#374151", borderColor: "#D1D5DB" }}
      >
        All
      </button>
      {items.map(item => (
        <button
          key={item.slug}
          onClick={() => setSub(item.slug === active ? null : item.slug)}
          className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors"
          style={item.slug === active
            ? { background: accent, color: "#fff", borderColor: accent }
            : { background: "transparent", color: "#374151", borderColor: "#D1D5DB" }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ── Locked category sidebar wrapper ──────────────────────────────────────────

function LockedCategoryFilters({ category, Icon, filters, onChange, onClearAll }: {
  category: CategoryConfig;
  Icon: React.ComponentType<{ className?: string }>;
  filters: SearchFilterState;
  onChange: (f: SearchFilterState) => void;
  onClearAll: () => void;
}) {
  return (
    <div>
      {/* Locked category chip */}
      <div className="mb-3 pb-3 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Category</p>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white"
          style={{ background: category.accent }}>
          <Icon className="w-3 h-3" /> {category.label}
          <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 0v2m0-2h2m-2 0H10" />
          </svg>
        </span>
        <p className="text-[11px] text-gray-400 mt-1.5">Category filter is locked on this page</p>
      </div>
      <SearchFilters
        filters={{ ...filters, categories: [category.toolSlug] }}
        onChange={f => onChange({ ...f, categories: [] })}
        onClearAll={onClearAll}
      />
    </div>
  );
}

// ── Main CategoryClient ───────────────────────────────────────────────────────

export function CategoryClient({ categorySlug }: { categorySlug: string }) {
  // Reconstruct category config on client side
  const category = useMemo(() => getCategoryBySlug(categorySlug)!, [categorySlug]);
  const Icon = category.icon;

  const [sortParam, setSort]   = useQueryState("sort",   parseAsString.withDefault("rating"));
  const [priceParam, setPrice] = useQueryState("price",  parseAsString.withDefault(""));
  const [platParam,  setPlat]  = useQueryState("plat",   parseAsString.withDefault(""));
  const [ratingParam,setRating]= useQueryState("rating", parseAsFloat.withDefault(0));
  const [dateParam,  setDate]  = useQueryState("date",   parseAsString.withDefault("any"));
  const [subParam]             = useQueryState("sub",    parseAsString.withDefault(""));

  const [view, setView]                   = useState<"grid" | "list">("grid");
  const [visibleCount, setVisible]        = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileOpen] = useState(false);

  const filters: SearchFilterState = useMemo(() => ({
    categories: [],
    pricing:    priceParam ? priceParam.split(",").filter(Boolean) : [],
    platforms:  platParam  ? platParam.split(",").filter(Boolean)  : [],
    minRating:  ratingParam,
    dateAdded:  dateParam,
  }), [priceParam, platParam, ratingParam, dateParam]);

  const syncFilters = useCallback((f: SearchFilterState) => {
    setPrice(f.pricing.join(",")   || null);
    setPlat(f.platforms.join(",")  || null);
    setRating(f.minRating          || null);
    setDate(f.dateAdded === "any"  ? null : f.dateAdded);
    setVisible(PAGE_SIZE);
  }, [setPrice, setPlat, setRating, setDate]);

  const clearAll = useCallback(() => syncFilters({ ...DEFAULT_FILTERS, categories: [] }), [syncFilters]);

  const results = useMemo(
    () => applyFilters(MOCK_TOOLS, category.toolSlug, subParam, filters, sortParam),
    [category.toolSlug, subParam, filters, sortParam]
  );
  const visible = results.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      {/* Sub-category pills */}
      <div className="py-4 border-b border-gray-200">
        <SubCategoryPills items={category.subCategories} active={subParam} accent={category.accent} />
      </div>

      {/* Sticky result count bar */}
      <div className="sticky top-16 z-30 bg-gray-50 border-b border-gray-200 py-3 -mx-4 px-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{results.length} tools</span>
            {" "}in {category.label}
            {subParam && <> · <span className="font-medium">{subParam.replace(/-/g, " ")}</span></>}
          </p>
          <button onClick={() => setMobileOpen(true)}
            className="md:hidden flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:border-brand transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h4" />
            </svg>
            Filters
          </button>
        </div>
        <FilterChips filters={filters} onChange={syncFilters} />
      </div>

      <div className="flex gap-6 pt-6">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <LockedCategoryFilters category={category} Icon={Icon} filters={filters} onChange={syncFilters} onClearAll={clearAll} />
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Sort + view toggle */}
          <div className="flex items-center justify-between mb-4 gap-3">
            <select value={sortParam} onChange={e => { setSort(e.target.value); setVisible(PAGE_SIZE); }}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 outline-none focus:border-brand bg-white">
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="newest">Newest</option>
              <option value="az">A–Z</option>
            </select>

            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 bg-white">
              {(["grid", "list"] as const).map(v => (
                <button key={v} onClick={() => setView(v)} aria-label={`${v} view`}
                  className={`p-1.5 rounded-md transition-colors ${view === v ? "bg-brand text-white" : "text-gray-400 hover:text-gray-600"}`}>
                  {v === "grid" ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/>
                      <rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {results.length === 0 ? <EmptyState /> : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visible.map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {visible.map(tool => <ToolListCard key={tool.id} tool={tool} />)}
            </div>
          )}

          {visibleCount < results.length && (
            <div className="flex justify-center mt-8">
              <button onClick={() => setVisible(v => v + PAGE_SIZE)}
                className="px-6 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-brand hover:text-brand transition-colors">
                Load 20 more ({results.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <Dialog.Root open={mobileFiltersOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40 md:hidden" />
          <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto md:hidden">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-base font-semibold text-gray-900">Filters</Dialog.Title>
              <Dialog.Close asChild>
                <button aria-label="Close" className="p-1 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>
            <LockedCategoryFilters
              category={category}
              Icon={Icon}
              filters={filters}
              onChange={f => { syncFilters(f); setMobileOpen(false); }}
              onClearAll={() => { clearAll(); setMobileOpen(false); }}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
