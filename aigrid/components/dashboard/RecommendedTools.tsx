"use client";
import { useState } from "react";
import Link from "next/link";
import { MOCK_RECOMMENDED_TOOLS } from "@/lib/dashboard-data";

export function RecommendedTools() {
  const [tools, setTools] = useState(MOCK_RECOMMENDED_TOOLS);

  const handleRefresh = () => {
    // Shuffle the tools array
    setTools([...tools].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">Recommended For You</h2>
          <div className="group relative">
            <svg className="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap">
              Based on your saved tools
            </div>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="text-sm text-gray-600 hover:text-brand transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh recommendations
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.slice(0, 6).map((tool) => (
          <Link
            key={tool.id}
            href={`/tool/${tool.id}`}
            className="group p-4 border border-gray-200 rounded-lg hover:border-brand hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="text-3xl">{tool.logo}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate group-hover:text-brand transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-500">{tool.category}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{tool.pricingModel}</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-medium text-gray-900">{tool.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
