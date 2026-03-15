"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { MOCK_SAVED_TOOLS, getCollections } from "@/lib/dashboard-data";

export function SavedToolsSection() {
  const [tools, setTools] = useState(MOCK_SAVED_TOOLS);
  const [activeCollection, setActiveCollection] = useState("all");
  const collections = getCollections(tools);

  const filteredTools = activeCollection === "all"
    ? tools
    : tools.filter(t => t.collection === activeCollection);

  const handleRemove = (toolId: string) => {
    setTools(tools.filter(t => t.id !== toolId));
    toast.success("Tool removed from saved");
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">Saved Tools</h2>
          <span className="px-2.5 py-0.5 bg-brand text-white text-xs font-bold rounded-full">
            {tools.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/saved" className="text-sm text-brand hover:text-brand-dark transition-colors">
            View All
          </Link>
          <button className="px-3 py-1.5 text-sm font-medium text-brand border border-brand rounded-lg hover:bg-brand hover:text-white transition-colors">
            + New Collection
          </button>
        </div>
      </div>

      {/* Collection Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCollection("all")}
          className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeCollection === "all"
              ? "bg-brand text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All ({tools.length})
        </button>
        {collections.map((collection) => (
          <button
            key={collection}
            onClick={() => setActiveCollection(collection)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeCollection === collection
                ? "bg-brand text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {collection} ({tools.filter(t => t.collection === collection).length})
          </button>
        ))}
        <button className="px-4 py-2 text-sm font-medium text-gray-400 border-2 border-dashed border-gray-300 rounded-lg hover:border-brand hover:text-brand transition-colors">
          +
        </button>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-gray-600 mb-2">No saved tools yet</p>
          <p className="text-sm text-gray-500">Save tools to access them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.slice(0, 6).map((tool) => (
            <div
              key={tool.id}
              className="group relative p-4 border border-gray-200 rounded-lg hover:border-brand hover:shadow-md transition-all"
            >
              <button
                onClick={() => handleRemove(tool.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                title="Remove"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <Link href={`/tool/${tool.id}`} className="block">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
