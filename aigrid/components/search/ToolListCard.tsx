"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PricingBadge, CategoryBadge } from "@/components/aigrid/Badge";
import type { SearchTool } from "@/lib/mock-tools";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export function ToolListCard({ tool }: { tool: SearchTool }) {
  const [saved, setSaved] = useState(false);
  const initials = tool.name.slice(0, 2).toUpperCase();

  return (
    <Link href={`/tool/${tool.slug}`} className="block">
      <div className="bg-white rounded-xl border border-gray-200 hover:border-brand hover:shadow-md transition-all duration-200 p-4 flex gap-4">
        {/* Logo */}
        <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-white border border-gray-100 flex items-center justify-center shadow-sm">
          {tool.logoUrl ? (
            <img 
              src={tool.logoUrl} 
              alt={`${tool.name} logo`}
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

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-gray-900">{tool.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">{tool.tagline}</p>
            </div>
            <button onClick={e => { e.preventDefault(); setSaved(s => !s); }}
              aria-label="Bookmark" className="flex-shrink-0 text-gray-400 hover:text-brand transition-colors mt-0.5">
              <svg className={`w-5 h-5 ${saved ? "fill-brand text-brand" : "fill-none"}`}
                stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 3H7a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2z" />
              </svg>
            </button>
          </div>

          {/* Features */}
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {tool.features.slice(0, 2).map(f => (
              <li key={f} className="flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* Badges + rating */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <CategoryBadge slug={tool.category} />
            <PricingBadge model={tool.pricingModel} />
            <span className="flex items-center gap-1">
              <Stars rating={tool.rating} />
              <span className="text-[13px] text-gray-400">{tool.rating.toFixed(1)} ({tool.reviewCount.toLocaleString()})</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
