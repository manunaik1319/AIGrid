"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ComparisonTool } from "@/lib/comparison-data";

interface FloatingToolBarProps {
  tools: ComparisonTool[];
}

export function FloatingToolBar({ tools }: FloatingToolBarProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-6 overflow-x-auto">
          {tools.map((tool) => (
            <div key={tool.slug} className="flex items-center gap-3 min-w-fit">
              <div className="flex items-center gap-2">
                <div className="text-2xl">{tool.logo}</div>
                <span className="font-medium text-gray-900 hidden sm:inline">{tool.name}</span>
              </div>
              <Link
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors"
              >
                Visit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
