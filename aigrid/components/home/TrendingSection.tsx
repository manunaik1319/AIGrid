"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Tool } from "@/components/aigrid/ToolCard";

interface Props { tools: Tool[]; }

const pricingColor: Record<string, string> = {
  Free: "bg-green-50 text-green-700 border-green-200",
  Freemium: "bg-amber-50 text-amber-700 border-amber-200",
  Paid: "bg-red-50 text-red-700 border-red-200",
};

function ToolCard({ tool, rank }: { tool: Tool; rank?: number }) {
  const [saved, setSaved] = useState(false);
  const [checked, setChecked] = useState(false);
  const initials = tool.name.slice(0, 2).toUpperCase();

  return (
    <a 
      href={tool.websiteUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group relative bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 transition-all hover:shadow-md hover:border-[#1A56DB] w-64 shrink-0 block"
    >
      {/* ── Top row: rank badge + logo + name + actions ── */}
      <div className="flex items-start gap-3">
        {/* Rank badge — sits in the row, no overlap */}
        {rank !== undefined && (
          <span className="shrink-0 w-7 h-7 rounded-full bg-amber-400 text-white text-xs font-bold flex items-center justify-center shadow mt-0.5">
            #{rank}
          </span>
        )}

        {/* Logo */}
        <div className="shrink-0">
          {tool.logoUrl ? (
            <img
              src={tool.logoUrl}
              alt={tool.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg object-contain border border-gray-100 bg-white p-0.5"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div className="w-12 h-12 rounded-lg bg-[#DBEAFE] text-[#1E40AF] font-bold text-base flex items-center justify-center hidden">
            {initials}
          </div>
        </div>

        {/* Name + category */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-base font-semibold text-gray-900 truncate">{tool.name}</p>
            <svg className="w-3 h-3 text-gray-300 group-hover:text-[#1A56DB] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{tool.category.replace(/-/g, " ")}</p>
        </div>

        {/* Compare checkbox (hover) */}
        <label 
          className="hidden group-hover:flex items-center gap-1 cursor-pointer shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="w-3.5 h-3.5 rounded accent-[#1A56DB]"
          />
          <span className="text-[10px] text-gray-400 whitespace-nowrap">Compare</span>
        </label>

        {/* Bookmark */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSaved(!saved);
          }} 
          aria-label="Save tool" 
          className="shrink-0 text-gray-300 hover:text-[#1A56DB] transition-colors"
        >
          {saved ? (
            <svg className="w-5 h-5 fill-[#1A56DB]" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Tagline */}
      <p className="text-sm text-gray-500 leading-snug line-clamp-2">{tool.tagline}</p>

      {/* Pricing + Rating */}
      <div className="flex items-center justify-between gap-2 mt-auto pt-1">
        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${pricingColor[tool.pricingModel] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
          {tool.pricingModel}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-medium text-gray-600">{tool.rating.toFixed(1)}</span>
          <span>({tool.reviewCount.toLocaleString()})</span>
        </div>
      </div>
    </a>
  );
}

export function TrendingSection({ tools }: Props) {
  // Duplicate cards for seamless infinite loop
  const doubled = [...tools, ...tools];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Trending This Week</h2>
          <Link href="/search?sort=trending" className="text-sm font-semibold text-[#1A56DB] hover:underline">
            View All →
          </Link>
        </div>
      </div>

      {/* Scrolling track */}
      <div className="relative w-full">
        {/* Fade left edge */}
        <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        {/* Fade right edge */}
        <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4 pl-4 animate-scroll-left hover:[animation-play-state:paused] pb-4"
          style={{ width: "max-content" }}
        >
          {doubled.map((tool, i) => (
            <ToolCard
              key={`${tool.id}-${i}`}
              tool={tool}
              rank={i < tools.length ? i + 1 : undefined}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
