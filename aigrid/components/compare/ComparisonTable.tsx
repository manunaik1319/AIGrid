"use client";
import { motion } from "framer-motion";
import type { ComparisonTool } from "@/lib/comparison-data";
import { ComparisonCell } from "./ComparisonCell";

interface ComparisonTableProps {
  tools: ComparisonTool[];
  onRemoveTool: (slug: string) => void;
  showAddColumn: boolean;
  addToolSlot: React.ReactNode;
}

interface FeatureRow {
  label: string;
  key: keyof ComparisonTool["features"] | "text";
  getValue?: (tool: ComparisonTool) => boolean | string | number | "partial";
  type?: "boolean" | "text" | "rating" | "price";
  isWinner?: (tools: ComparisonTool[], tool: ComparisonTool) => boolean;
}

const SECTIONS = {
  overview: [
    { label: "Tool Name", key: "text" as const, getValue: (t: ComparisonTool) => t.name, type: "text" as const },
    { label: "Category", key: "text" as const, getValue: (t: ComparisonTool) => t.category, type: "text" as const },
    { label: "Platform", key: "text" as const, getValue: (t: ComparisonTool) => t.platforms.join(", "), type: "text" as const },
    { label: "Pricing Tier", key: "text" as const, getValue: (t: ComparisonTool) => t.pricingTier, type: "text" as const },
  ],
  pricing: [
    { label: "Free Tier", key: "text" as const, getValue: (t: ComparisonTool) => t.freeTier, type: "boolean" as const },
    { 
      label: "Starting Price", 
      key: "text" as const, 
      getValue: (t: ComparisonTool) => t.startingPrice, 
      type: "price" as const,
      isWinner: (tools: ComparisonTool[], tool: ComparisonTool) => {
        const prices = tools.map(t => parseFloat(t.startingPrice.replace(/[^0-9.]/g, "")));
        const minPrice = Math.min(...prices);
        return parseFloat(tool.startingPrice.replace(/[^0-9.]/g, "")) === minPrice;
      }
    },
    { label: "Popular Plan", key: "text" as const, getValue: (t: ComparisonTool) => t.popularPlanPrice, type: "text" as const },
    { label: "API Access", key: "text" as const, getValue: (t: ComparisonTool) => t.apiAccess, type: "boolean" as const },
  ],
  features: [
    { label: "Text Generation", key: "textGeneration" as const, type: "boolean" as const },
    { label: "Image Generation", key: "imageGeneration" as const, type: "boolean" as const },
    { label: "Code Generation", key: "codeGeneration" as const, type: "boolean" as const },
    { label: "Multi-Language", key: "multiLanguage" as const, type: "boolean" as const },
    { label: "Context Window", key: "contextWindow" as const, type: "text" as const },
    { label: "API Available", key: "apiAvailable" as const, type: "boolean" as const },
    { label: "Custom Models", key: "customModels" as const, type: "boolean" as const },
    { label: "Team Collaboration", key: "teamCollaboration" as const, type: "boolean" as const },
    { label: "Data Privacy", key: "dataPrivacy" as const, type: "boolean" as const },
    { label: "Mobile App", key: "mobileApp" as const, type: "boolean" as const },
    { label: "Plugins/Extensions", key: "plugins" as const, type: "boolean" as const },
    { label: "Voice Input", key: "voiceInput" as const, type: "boolean" as const },
    { label: "File Upload", key: "fileUpload" as const, type: "boolean" as const },
    { label: "Web Browsing", key: "webBrowsing" as const, type: "boolean" as const },
    { label: "Real-time Data", key: "realTimeData" as const, type: "boolean" as const },
  ],
  ratings: [
    { 
      label: "Overall Rating", 
      key: "text" as const, 
      getValue: (t: ComparisonTool) => t.overallRating, 
      type: "rating" as const,
      isWinner: (tools: ComparisonTool[], tool: ComparisonTool) => {
        const maxRating = Math.max(...tools.map(t => t.overallRating));
        return tool.overallRating === maxRating;
      }
    },
    { label: "Number of Reviews", key: "text" as const, getValue: (t: ComparisonTool) => t.reviewCount.toLocaleString(), type: "text" as const },
    { 
      label: "Ease of Use", 
      key: "text" as const, 
      getValue: (t: ComparisonTool) => t.easeOfUse, 
      type: "rating" as const,
      isWinner: (tools: ComparisonTool[], tool: ComparisonTool) => {
        const maxRating = Math.max(...tools.map(t => t.easeOfUse));
        return tool.easeOfUse === maxRating;
      }
    },
    { 
      label: "Value for Money", 
      key: "text" as const, 
      getValue: (t: ComparisonTool) => t.valueForMoney, 
      type: "rating" as const,
      isWinner: (tools: ComparisonTool[], tool: ComparisonTool) => {
        const maxRating = Math.max(...tools.map(t => t.valueForMoney));
        return tool.valueForMoney === maxRating;
      }
    },
  ],
  links: [
    { label: "Website", key: "text" as const, getValue: (t: ComparisonTool) => t.website, type: "text" as const },
    { label: "Documentation", key: "text" as const, getValue: (t: ComparisonTool) => t.docs, type: "text" as const },
    { label: "API Reference", key: "text" as const, getValue: (t: ComparisonTool) => t.apiReference, type: "text" as const },
  ],
};

export function ComparisonTable({ tools, onRemoveTool, showAddColumn, addToolSlot }: ComparisonTableProps) {
  const renderSectionRows = (rows: FeatureRow[], sectionName: string) => {
    return rows.map((row, idx) => (
      <tr key={`${sectionName}-${idx}`} className="border-b border-gray-200 hover:bg-gray-50">
        <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200 z-10">
          {row.label}
        </td>
        {tools.map((tool) => {
          let value: boolean | string | number | "partial" | undefined;
          if (row.getValue) {
            value = row.getValue(tool);
          } else if (row.key !== "text") {
            value = tool.features[row.key];
          }
          
          const isWinner = row.isWinner ? row.isWinner(tools, tool) : false;
          
          return (
            <td key={tool.slug} className="px-4 py-3 text-center">
              <ComparisonCell 
                value={value ?? false} 
                type={row.type || "boolean"} 
                isWinner={isWinner}
              />
            </td>
          );
        })}
        {showAddColumn && (
          <td className="px-4 py-3 bg-gray-50"></td>
        )}
      </tr>
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Sticky Header */}
          <thead className="sticky top-0 z-20 bg-white shadow-sm">
            <tr>
              <th className="sticky left-0 bg-white w-48 px-4 py-4 text-left border-r border-gray-200 z-30"></th>
              {tools.map((tool, idx) => (
                <motion.th
                  key={tool.slug}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="px-4 py-4 min-w-[200px] border-r border-gray-200"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl">{tool.logo}</div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">{tool.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{tool.tagline}</div>
                    </div>
                    <button
                      onClick={() => onRemoveTool(tool.slug)}
                      className="mt-2 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove tool"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </motion.th>
              ))}
              {showAddColumn && (
                <th className="px-4 py-4 min-w-[200px] bg-gray-50">
                  {/* Add tool column header */}
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {/* Overview Section */}
            <tr className="bg-gray-100">
              <td colSpan={tools.length + (showAddColumn ? 2 : 1)} className="px-4 py-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                Overview
              </td>
            </tr>
            {renderSectionRows(SECTIONS.overview, "overview")}

            {/* Pricing Section */}
            <tr className="bg-gray-100">
              <td colSpan={tools.length + (showAddColumn ? 2 : 1)} className="px-4 py-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                Pricing
              </td>
            </tr>
            {renderSectionRows(SECTIONS.pricing, "pricing")}

            {/* Features Section */}
            <tr className="bg-gray-100">
              <td colSpan={tools.length + (showAddColumn ? 2 : 1)} className="px-4 py-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                Features
              </td>
            </tr>
            {renderSectionRows(SECTIONS.features, "features")}

            {/* Ratings Section */}
            <tr className="bg-gray-100">
              <td colSpan={tools.length + (showAddColumn ? 2 : 1)} className="px-4 py-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                Ratings & Reviews
              </td>
            </tr>
            {renderSectionRows(SECTIONS.ratings, "ratings")}

            {/* Links Section */}
            <tr className="bg-gray-100">
              <td colSpan={tools.length + (showAddColumn ? 2 : 1)} className="px-4 py-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                Links
              </td>
            </tr>
            {renderSectionRows(SECTIONS.links, "links")}

            {/* Add Tool Column (full height) */}
            {showAddColumn && (
              <tr>
                <td className="sticky left-0 bg-white"></td>
                {tools.map((tool) => (
                  <td key={tool.slug}></td>
                ))}
                <td className="bg-gray-50 border-l-2 border-dashed border-gray-300" rowSpan={100}>
                  {addToolSlot}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
