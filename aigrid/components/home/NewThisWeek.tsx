"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Tool } from "@/components/aigrid/ToolCard";
import { useState } from "react";

const pricingColor: Record<string, string> = {
  Free: "bg-green-50 text-green-700 border-green-200",
  Freemium: "bg-amber-50 text-amber-700 border-amber-200",
  Paid: "bg-red-50 text-red-700 border-red-200",
};

function MiniToolCard({ tool }: { tool: Tool }) {
  const [saved, setSaved] = useState(false);
  const [checked, setChecked] = useState(false);
  const initials = tool.name.slice(0, 2).toUpperCase();

  return (
    <a 
      href={tool.websiteUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group relative bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 transition-all hover:shadow-md hover:border-[#1A56DB] block"
    >
      {/* New badge */}
      <span className="absolute top-3 left-3 bg-[#EFF6FF] text-[#1A56DB] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#DBEAFE]">
        NEW
      </span>

      {/* Compare checkbox — shows on hover */}
      <label 
        className="absolute top-3 right-10 z-10 hidden group-hover/card:flex items-center gap-1 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={() => setChecked(!checked)} 
          className="w-4 h-4 rounded accent-[#1A56DB]"
          onClick={(e) => e.stopPropagation()}
        />
        <span className="text-[10px] text-gray-500 whitespace-nowrap">Compare</span>
      </label>

      {/* Bookmark */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSaved(!saved);
        }} 
        aria-label="Save" 
        className="absolute top-3 right-3 z-10 text-gray-300 hover:text-[#1A56DB] transition-colors"
      >
        {saved
          ? <svg className="w-5 h-5 fill-[#1A56DB]" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          : <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        }
      </button>

      <div className="flex items-center gap-3 mt-4">
        {tool.logoUrl && (
          <img src={tool.logoUrl} alt={tool.name} width={48} height={48}
            className="w-12 h-12 rounded-lg object-contain border border-gray-100 bg-white p-0.5 shadow-sm"
            onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling?.classList.remove("hidden"); }}
          />
        )}
        <div className="w-12 h-12 rounded-lg bg-[#DBEAFE] text-[#1E40AF] font-bold text-base flex items-center justify-center shrink-0 hidden uppercase">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-gray-900 text-base truncate">{tool.name}</p>
            <svg className="w-3 h-3 text-gray-300 group-hover:text-[#1A56DB] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{tool.category.replace(/-/g, " ")}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 leading-snug line-clamp-2">{tool.tagline}</p>

      <div className="flex items-center justify-between gap-2 mt-auto pt-1">
        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${pricingColor[tool.pricingModel] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
          {tool.pricingModel}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          <span className="font-medium text-gray-600">{tool.rating.toFixed(1)}</span>
          <span>({tool.reviewCount.toLocaleString()})</span>
        </div>
      </div>
    </a>
  );
}

interface Props { tools: Tool[]; }

export function NewThisWeek({ tools }: Props) {
  const display = tools.slice(0, 8);
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-14 px-4 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">New This Week</h2>
          <Link href="/search?sort=newest" className="text-sm font-semibold text-[#1A56DB] hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {display.map((tool) => <MiniToolCard key={tool.id} tool={tool} />)}
        </div>
      </div>
    </motion.section>
  );
}
