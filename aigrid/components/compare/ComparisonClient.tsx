"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getComparisonTool, getAllComparisonTools, type ComparisonTool } from "@/lib/comparison-data";
import { ComparisonTable } from "./ComparisonTable";
import { AddToolColumn } from "./AddToolColumn";
import { FloatingToolBar } from "./FloatingToolBar";

const MAX_TOOLS = 4;
const MIN_TOOLS = 2;

export function ComparisonClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tools, setTools] = useState<ComparisonTool[]>([]);
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  const updateURL = useCallback((newTools: ComparisonTool[]) => {
    const slugs = newTools.map(t => t.slug).join(",");
    router.push(`/compare?tools=${slugs}`, { scroll: false });
  }, [router]);

  const loadDefaultTools = useCallback(() => {
    const defaultTools = ["chatgpt", "claude", "gemini"]
      .map(slug => getComparisonTool(slug))
      .filter((tool): tool is ComparisonTool => tool !== null);
    setTools(defaultTools);
    updateURL(defaultTools);
  }, [updateURL]);

  // Parse tools from URL on mount
  useEffect(() => {
    const toolsParam = searchParams.get("tools");
    if (toolsParam) {
      const slugs = toolsParam.split(",").slice(0, MAX_TOOLS);
      const loadedTools = slugs
        .map(slug => getComparisonTool(slug.trim()))
        .filter((tool): tool is ComparisonTool => tool !== null);
      
      if (loadedTools.length > 0) {
        setTools(loadedTools);
      } else {
        // Default tools if invalid slugs
        loadDefaultTools();
      }
    } else {
      // Default tools if no param
      loadDefaultTools();
    }
  }, [searchParams, loadDefaultTools]);

  const handleAddTool = (slug: string) => {
    if (tools.length >= MAX_TOOLS) {
      toast.error(`Maximum ${MAX_TOOLS} tools allowed`);
      return;
    }
    
    if (tools.some(t => t.slug === slug)) {
      toast.error("Tool already added");
      return;
    }

    const tool = getComparisonTool(slug);
    if (tool) {
      const newTools = [...tools, tool];
      setTools(newTools);
      updateURL(newTools);
      toast.success(`${tool.name} added to comparison`);
    }
  };

  const handleRemoveTool = (slug: string) => {
    if (tools.length <= MIN_TOOLS) {
      toast.error(`Minimum ${MIN_TOOLS} tools required`);
      return;
    }

    const newTools = tools.filter(t => t.slug !== slug);
    setTools(newTools);
    updateURL(newTools);
    toast.success("Tool removed");
  };

  const handleShareComparison = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Comparison link copied to clipboard!");
  };

  const handleExportPDF = () => {
    window.print();
    toast.success("Opening print dialog...");
  };

  // Handle scroll for floating bar
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const availableTools = getAllComparisonTools().filter(
    t => !tools.some(existing => existing.slug === t.slug)
  );

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Comparing {tools.length} AI Tool{tools.length !== 1 ? "s" : ""}
              </h1>
              <p className="text-gray-600 mt-2">
                Side-by-side comparison of features, pricing, and ratings
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleShareComparison}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
              
              <button
                onClick={handleExportPDF}
                className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Export PDF
              </button>
            </div>
          </div>

          {/* Mobile warning */}
          <div className="md:hidden bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-amber-800">
              💡 For the best comparison experience, view on desktop
            </p>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <ComparisonTable
          tools={tools}
          onRemoveTool={handleRemoveTool}
          showAddColumn={tools.length < MAX_TOOLS}
          addToolSlot={
            tools.length < MAX_TOOLS ? (
              <AddToolColumn
                availableTools={availableTools}
                onAddTool={handleAddTool}
              />
            ) : null
          }
        />

        {/* Floating Bottom Bar */}
        <AnimatePresence>
          {showFloatingBar && (
            <FloatingToolBar tools={tools} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
