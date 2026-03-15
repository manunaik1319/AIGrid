"use client";
import { useState } from 'react';
import { WORKFLOW_TOOLS, WORKFLOW_CATEGORIES, getToolsByCategory, searchTools } from '@/lib/workflow-tools-data';
import { WorkflowTool } from '@/lib/workflow-store';

interface ToolPaletteProps {
  onToolDragStart?: (tool: WorkflowTool) => void;
}

export function ToolPalette({ onToolDragStart }: ToolPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tools = searchQuery
    ? searchTools(searchQuery)
    : getToolsByCategory(selectedCategory);

  const handleDragStart = (event: React.DragEvent, tool: WorkflowTool) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(tool));
    event.dataTransfer.effectAllowed = 'move';
    onToolDragStart?.(tool);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-900 mb-3">Tool Palette</h2>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
          />
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-2 py-3 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-1">
          {WORKFLOW_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-brand text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tool List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {tools.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-500">
            No tools found
          </div>
        ) : (
          tools.map((tool) => (
            <div
              key={tool.id}
              draggable
              onDragStart={(e) => handleDragStart(e, tool)}
              className="group bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:border-brand hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-2">
                <div className="text-2xl flex-shrink-0">{tool.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-gray-900 truncate">
                      {tool.name}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: tool.categoryColor }}
                      title={tool.category}
                    />
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Hint */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          💡 Drag tools to the canvas to build your workflow
        </p>
      </div>
    </div>
  );
}
