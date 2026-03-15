import React from "react";

// ── Interfaces ────────────────────────────────────────────────────────────────

export type PricingModel = "Free" | "Freemium" | "Paid" | "API-only";

export interface PricingBadgeProps {
  model: PricingModel;
}

export interface CategoryBadgeProps {
  slug: string;
}

export interface NewBadgeProps {}
export interface TrendingBadgeProps {
  rank: number;
}

// ── Category map ──────────────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, { label: string; className: string }> = {
  "text-writing":    { label: "Text & Writing",    className: "bg-blue-100 text-blue-700" },
  "image-video":     { label: "Image & Video",     className: "bg-pink-100 text-pink-700" },
  "code-dev":        { label: "Code & Dev",        className: "bg-violet-100 text-violet-700" },
  "audio-music":     { label: "Audio & Music",     className: "bg-orange-100 text-orange-700" },
  "productivity":    { label: "Productivity",      className: "bg-teal-100 text-teal-700" },
  "research":        { label: "Research",          className: "bg-cyan-100 text-cyan-700" },
  "marketing":       { label: "Marketing",         className: "bg-rose-100 text-rose-700" },
  "data-analytics":  { label: "Data & Analytics",  className: "bg-indigo-100 text-indigo-700" },
};

const PRICING_MAP: Record<PricingModel, string> = {
  "Free":     "bg-green-100 text-green-700",
  "Freemium": "bg-amber-100 text-amber-700",
  "Paid":     "bg-red-100 text-red-700",
  "API-only": "bg-purple-100 text-purple-700",
};

// ── Components ────────────────────────────────────────────────────────────────

export function PricingBadge({ model }: PricingBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${PRICING_MAP[model]}`}>
      {model}
    </span>
  );
}

export function CategoryBadge({ slug }: CategoryBadgeProps) {
  const cat = CATEGORY_MAP[slug] ?? { label: slug, className: "bg-gray-100 text-gray-600" };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cat.className}`}>
      {cat.label}
    </span>
  );
}

export function NewBadge(_props: NewBadgeProps) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 tracking-wide">
      NEW
    </span>
  );
}

export function TrendingBadge({ rank }: TrendingBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
      🔥 #{rank}
    </span>
  );
}
