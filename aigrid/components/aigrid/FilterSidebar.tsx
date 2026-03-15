"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useQueryState } from "nuqs";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface FilterState {
  category?: string;
  pricing?: string;
  platform?: string;
  rating?: string;
  date?: string;
}

export interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

// ── Filter options ────────────────────────────────────────────────────────────

const FILTER_OPTIONS = {
  category: ["text-writing", "image-video", "code-dev", "audio-music", "productivity", "research", "marketing", "data-analytics"],
  pricing:  ["Free", "Freemium", "Paid", "API-only"],
  platform: ["Web", "iOS", "Android", "Desktop", "API"],
  rating:   ["5", "4+", "3+"],
  date:     ["Last 7 days", "Last 30 days", "Last 3 months", "This year"],
};

// ── Collapsible section ───────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 py-3">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 mb-2">
        {title}
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="flex flex-col gap-1.5">{children}</div>}
    </div>
  );
}

// ── Filter content ────────────────────────────────────────────────────────────

function FilterContent({ filters, onFilterChange }: Pick<FilterSidebarProps, "filters" | "onFilterChange">) {
  const set = (key: keyof FilterState, val: string) => {
    onFilterChange({ ...filters, [key]: filters[key] === val ? undefined : val });
  };

  return (
    <div className="flex flex-col">
      {(Object.keys(FILTER_OPTIONS) as Array<keyof typeof FILTER_OPTIONS>).map((key) => (
        <Section key={key} title={key.charAt(0).toUpperCase() + key.slice(1)}>
          {FILTER_OPTIONS[key].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={filters[key as keyof FilterState] === opt}
                onChange={() => set(key as keyof FilterState, opt)}
                className="rounded border-gray-300 text-brand focus:ring-brand" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{opt}</span>
            </label>
          ))}
        </Section>
      ))}
    </div>
  );
}

// ── FilterSidebar (desktop + mobile bottom sheet) ─────────────────────────────

export function FilterSidebar({ filters, onFilterChange, mobileOpen = false, onMobileClose }: FilterSidebarProps) {
  // Sync each filter key to URL via nuqs
  const [, setCategory] = useQueryState("category");
  const [, setPricing]  = useQueryState("pricing");
  const [, setPlatform] = useQueryState("platform");
  const [, setRating]   = useQueryState("rating");
  const [, setDate]     = useQueryState("date");

  const handleChange = (next: FilterState) => {
    setCategory(next.category ?? null);
    setPricing(next.pricing ?? null);
    setPlatform(next.platform ?? null);
    setRating(next.rating ?? null);
    setDate(next.date ?? null);
    onFilterChange(next);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-56 flex-shrink-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Filters</p>
        <FilterContent filters={filters} onFilterChange={handleChange} />
      </aside>

      {/* Mobile bottom sheet */}
      <Dialog.Root open={mobileOpen} onOpenChange={(o) => !o && onMobileClose?.()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40 md:hidden" />
          <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto md:hidden">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-base font-semibold text-gray-900">Filters</Dialog.Title>
              <Dialog.Close asChild>
                <button aria-label="Close filters" className="p-1 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>
            <FilterContent filters={filters} onFilterChange={handleChange} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default FilterSidebar;
