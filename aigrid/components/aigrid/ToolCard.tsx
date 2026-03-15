"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PricingBadge, CategoryBadge } from "./Badge";
import type { PricingModel } from "./Badge";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  logoUrl?: string;
  category: string;
  pricingModel: PricingModel;
  rating: number;
  reviewCount: number;
  websiteUrl: string;
}

export interface ToolCardProps {
  tool: Tool;
  onSave?: (id: string, saved: boolean) => void;
  onCompare?: (id: string, checked: boolean) => void;
  isSaved?: boolean;
  isCompared?: boolean;
}

// ── Star rating ───────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// ── ToolCard ──────────────────────────────────────────────────────────────────

export function ToolCard({ tool, onSave, onCompare, isSaved = false, isCompared = false }: ToolCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const [hovered, setHovered] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    const next = !saved;
    setSaved(next);
    onSave?.(tool.id, next);
  };

  const handleCompare = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCompare?.(tool.id, e.target.checked);
  };

  const initials = tool.name.slice(0, 2).toUpperCase();

  return (
    <a 
      href={tool.websiteUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block h-full group/card"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative bg-white rounded-xl border transition-all duration-200 p-5 flex flex-col gap-3 h-full
          ${hovered ? "shadow-lg shadow-brand/10 border-brand -translate-y-1" : "border-gray-200 shadow-sm"}`}
      >
        {/* Top row: logo + content */}
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-gray-100 flex items-center justify-center shadow-sm p-2">
            {tool.logoUrl ? (
              <img 
                src={tool.logoUrl} 
                alt={`${tool.name} logo`} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.remove('bg-white', 'border-gray-100', 'p-2');
                    parent.classList.add('bg-brand-pale');
                    const span = document.createElement('span');
                    span.className = 'text-brand-dark font-bold text-base';
                    span.textContent = initials;
                    parent.appendChild(span);
                  }
                }}
              />
            ) : (
              <span className="text-brand-dark font-bold text-base">{initials}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-gray-900 truncate text-base">{tool.name}</p>
              <svg className="w-3.5 h-3.5 text-gray-300 group-hover/card:text-[#1A56DB] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1 leading-snug">{tool.tagline}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <CategoryBadge slug={tool.category} />
          <PricingBadge model={tool.pricingModel} />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-auto">
          <Stars rating={tool.rating} />
          <span className="text-sm text-gray-400 font-medium">{tool.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{tool.reviewCount.toLocaleString()} reviews</span>
        </div>

        {/* Footer: bookmark + compare */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button 
            onClick={(e) => {
              e.preventDefault();
              handleSave(e);
            }} 
            aria-label={saved ? "Remove bookmark" : "Bookmark tool"}
            className="text-gray-400 hover:text-brand transition-colors p-1 -m-1"
          >
            <svg className={`w-5 h-5 ${saved ? "fill-brand text-brand" : "fill-none"}`}
              stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17 3H7a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2z" />
            </svg>
          </button>

          <label
            className={`flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer transition-opacity duration-150
              ${hovered ? "opacity-100" : "opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <input type="checkbox" checked={isCompared} onChange={handleCompare}
              className="rounded border-gray-300 text-brand focus:ring-brand w-3.5 h-3.5" />
            <span className="font-medium">Compare</span>
          </label>
        </div>
      </div>
    </a>
  );
}

export default ToolCard;
