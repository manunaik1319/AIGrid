"use client";
import React, { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SearchFilterState {
  categories: string[];
  pricing: string[];
  platforms: string[];
  minRating: number;
  dateAdded: string;
}

export const DEFAULT_FILTERS: SearchFilterState = {
  categories: [],
  pricing: [],
  platforms: [],
  minRating: 0,
  dateAdded: "any",
};

interface SearchFiltersProps {
  filters: SearchFilterState;
  onChange: (f: SearchFilterState) => void;
  onClearAll: () => void;
}

// ── Options ───────────────────────────────────────────────────────────────────

const CATEGORY_OPTIONS = [
  { slug: "text-writing", label: "Writing" },
  { slug: "image-video",  label: "Image & Video" },
  { slug: "code-dev",     label: "Code & Dev" },
  { slug: "audio-music",  label: "Audio & Music" },
  { slug: "productivity", label: "Productivity" },
  { slug: "research",     label: "Research" },
];

const PRICING_OPTIONS  = ["Free", "Freemium", "Paid", "API-only"];
const PLATFORM_OPTIONS = ["Web", "Mobile", "Desktop", "API"];
const DATE_OPTIONS     = [
  { value: "any",    label: "Any time" },
  { value: "7d",     label: "Last 7 days" },
  { value: "30d",    label: "Last 30 days" },
  { value: "3m",     label: "Last 3 months" },
  { value: "year",   label: "This year" },
];

// ── Collapsible section ───────────────────────────────────────────────────────

function Section({ title, badge, children }: { title: string; badge?: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 py-3">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 mb-2">
        <span className="flex items-center gap-2">
          {title}
          {badge ? (
            <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
              {badge}
            </span>
          ) : null}
        </span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="flex flex-col gap-2">{children}</div>}
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input type="checkbox" checked={checked} onChange={onChange}
        className="rounded border-gray-300 text-brand focus:ring-brand w-4 h-4" />
      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
    </label>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function SearchFilters({ filters, onChange, onClearAll }: SearchFiltersProps) {
  const toggle = (key: "categories" | "pricing" | "platforms", val: string) => {
    const arr = filters[key];
    onChange({ ...filters, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] });
  };

  const totalActive =
    filters.categories.length + filters.pricing.length +
    filters.platforms.length + (filters.minRating > 0 ? 1 : 0) +
    (filters.dateAdded !== "any" ? 1 : 0);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1 pb-3 border-b border-gray-100">
        <span className="font-semibold text-gray-900">Filters</span>
        {totalActive > 0 && (
          <button onClick={onClearAll} className="text-xs text-brand hover:underline font-medium">
            Clear All
          </button>
        )}
      </div>

      <Section title="Category" badge={filters.categories.length || undefined}>
        {CATEGORY_OPTIONS.map(opt => (
          <Checkbox key={opt.slug} label={opt.label}
            checked={filters.categories.includes(opt.slug)}
            onChange={() => toggle("categories", opt.slug)} />
        ))}
      </Section>

      <Section title="Pricing" badge={filters.pricing.length || undefined}>
        {PRICING_OPTIONS.map(opt => (
          <Checkbox key={opt} label={opt}
            checked={filters.pricing.includes(opt)}
            onChange={() => toggle("pricing", opt)} />
        ))}
      </Section>

      <Section title="Platform" badge={filters.platforms.length || undefined}>
        {PLATFORM_OPTIONS.map(opt => (
          <Checkbox key={opt} label={opt}
            checked={filters.platforms.includes(opt)}
            onChange={() => toggle("platforms", opt)} />
        ))}
      </Section>

      <Section title="Min Rating" badge={filters.minRating > 0 ? 1 : undefined}>
        <div className="flex flex-col gap-1.5 pt-1">
          <input type="range" min={0} max={5} step={0.5}
            value={filters.minRating}
            onChange={e => onChange({ ...filters, minRating: parseFloat(e.target.value) })}
            className="w-full accent-brand" aria-label="Minimum rating" />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Any</span>
            <span className="font-medium text-gray-700">{filters.minRating > 0 ? `${filters.minRating}★+` : "All"}</span>
            <span>5★</span>
          </div>
        </div>
      </Section>

      <Section title="Date Added" badge={filters.dateAdded !== "any" ? 1 : undefined}>
        <select value={filters.dateAdded}
          onChange={e => onChange({ ...filters, dateAdded: e.target.value })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 bg-white">
          {DATE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </Section>
    </div>
  );
}
