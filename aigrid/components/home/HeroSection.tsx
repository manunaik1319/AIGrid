"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const QUICK_PILLS = ["Writing", "Image Generation", "Code & Dev", "Audio", "Video", "Productivity"];
const CATEGORIES_LIST = ["All Categories", "Writing", "Image Generation", "Code & Dev", "Audio & Music", "Video", "Productivity", "Research"];

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");

  const handleSearch = (q = query) => {
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}&category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-[#0A1F44] via-[#1A56DB] to-[#0F172A] py-24 md:py-32 px-4 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large glowing orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-[80px]" />
        
        {/* Dot grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
        
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-grid-cinematic opacity-30" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-white/15 border border-blue-300/30 text-white text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg shadow-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" />
            2,000+ AI Tools Indexed
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-[56px] md:text-[72px] font-bold text-white leading-[1.05] tracking-tight">
            Find the right AI tool
            <br />
            <span className="bg-gradient-to-r from-blue-200 via-cyan-100 to-blue-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(96,165,250,0.5)]">
              — fast.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto drop-shadow-lg">
            Search 2,000+ AI tools by task, category, or price.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          <div className="flex items-center h-14 bg-white/95 backdrop-blur-xl rounded-full shadow-2xl shadow-blue-900/30 ring-1 ring-blue-200/50 px-2 gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 pl-4 pr-3 text-sm font-medium text-gray-600 bg-transparent border-r border-gray-200 outline-none cursor-pointer shrink-0"
              aria-label="Select category"
            >
              {CATEGORIES_LIST.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search for 'image generator', 'writing assistant'…"
              className="flex-1 px-3 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              aria-label="Search AI tools"
            />
            <button
              onClick={() => handleSearch()}
              className="h-10 px-6 bg-gradient-to-r from-[#1A56DB] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#1A56DB] text-white text-sm font-semibold rounded-full active:scale-95 transition-all shadow-lg shadow-blue-500/30"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Quick pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {QUICK_PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => handleSearch(pill)}
              className="px-5 py-2 rounded-full text-sm font-medium bg-white/15 text-white border border-blue-300/30 hover:bg-white/25 hover:border-blue-200/50 backdrop-blur-md transition-all active:scale-95 shadow-lg shadow-blue-500/10"
            >
              {pill}
            </button>
          ))}
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-6 text-sm text-blue-200/70 flex-wrap justify-center"
        >
          {[
            { label: "2,000+ Tools" },
            { label: "15 Categories" },
            { label: "50,000+ Users" },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <span className="text-blue-300/30">|</span>}
              <span className="font-medium text-blue-100/90">{s.label}</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
