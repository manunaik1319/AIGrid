"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

interface SearchSuggestion {
  type: "tool" | "category" | "all";
  label: string;
  href: string;
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 animate-pulse">
      <div className="w-6 h-6 rounded bg-gray-200" />
      <div className="flex-1 h-3 rounded bg-gray-200" />
    </div>
  );
}

export function GlobalSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  // Cmd/Ctrl+K to focus
  useHotkeys("mod+k", (e) => {
    e.preventDefault();
    inputRef.current?.focus();
    setOpen(true);
  });

  // Debounced typeahead
  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); setLoading(false); return; }
    setLoading(true);
    const timer = setTimeout(async () => {
      // Mock suggestions — replace with real API call
      const mock: SearchSuggestion[] = [
        { type: "tool",     label: `${query} AI`,          href: `/tool/${query.toLowerCase().replace(/\s+/g, "-")}-ai` },
        { type: "tool",     label: `${query} Assistant`,   href: `/tool/${query.toLowerCase().replace(/\s+/g, "-")}-assistant` },
        { type: "category", label: `Category: ${query}`,   href: `/category/${query.toLowerCase()}` },
      ];
      setSuggestions(mock);
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const navigate = useCallback((href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  }, [router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
    if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder="Search AI tools…"
          className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
          aria-label="Search AI tools"
        />
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-gray-400 border border-gray-200 rounded font-mono">
          ⌘K
        </kbd>
      </div>

      {open && (query.length >= 2) && (
        <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {loading ? (
            <>
              <SkeletonRow /><SkeletonRow /><SkeletonRow />
            </>
          ) : (
            <>
              {suggestions.map((s, i) => (
                <button key={i} onMouseDown={() => navigate(s.href)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-brand-pale transition-colors">
                  <span className="text-gray-400">
                    {s.type === "tool" ? "🔧" : s.type === "category" ? "📂" : "🔍"}
                  </span>
                  <span className="text-gray-700">{s.label}</span>
                </button>
              ))}
              <button onMouseDown={() => navigate(`/search?q=${encodeURIComponent(query.trim())}`)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand font-medium border-t border-gray-100 hover:bg-brand-pale transition-colors">
                <span>🔍</span>
                <span>Search all for &ldquo;{query}&rdquo;</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;
