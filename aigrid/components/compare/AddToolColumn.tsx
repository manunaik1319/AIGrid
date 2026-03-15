"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ComparisonTool } from "@/lib/comparison-data";

interface AddToolColumnProps {
  availableTools: ComparisonTool[];
  onAddTool: (slug: string) => void;
}

export function AddToolColumn({ availableTools, onAddTool }: AddToolColumnProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = availableTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isSearching) {
    return (
      <div className="p-6 min-h-[400px]">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
          />
          <button
            onClick={() => {
              setIsSearching(false);
              setSearchQuery("");
            }}
            className="mt-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          <AnimatePresence>
            {filteredTools.map((tool, idx) => (
              <motion.button
                key={tool.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  onAddTool(tool.slug);
                  setIsSearching(false);
                  setSearchQuery("");
                }}
                className="w-full flex items-center gap-3 p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors text-left"
              >
                <div className="text-2xl">{tool.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{tool.name}</div>
                  <div className="text-xs text-gray-500">{tool.category}</div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </motion.button>
            ))}
          </AnimatePresence>

          {filteredTools.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No tools found
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsSearching(true)}
      className="w-full h-full min-h-[400px] flex flex-col items-center justify-center gap-4 p-6 hover:bg-gray-100 transition-colors group"
    >
      <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-400 group-hover:border-brand flex items-center justify-center transition-colors">
        <svg className="w-8 h-8 text-gray-400 group-hover:text-brand transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <div className="text-center">
        <div className="font-medium text-gray-700 group-hover:text-brand transition-colors">
          Add a tool to compare
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Click to search
        </div>
      </div>
    </button>
  );
}
