"use client";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { WorkflowDetail } from "@/lib/workflows-data";

interface WorkflowCardProps {
  workflow: WorkflowDetail;
  onShare: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function WorkflowCard({ workflow, onShare, onDuplicate, onDelete }: WorkflowCardProps) {
  const displayTools = workflow.tools.slice(0, 5);
  const remainingCount = workflow.tools.length - 5;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex-1 pr-4">
          {workflow.name}
        </h3>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {formatDistanceToNow(workflow.lastEdited, { addSuffix: true })}
        </span>
      </div>

      {/* Tool Logos */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex -space-x-2">
          {displayTools.map((tool, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center text-lg"
              title={tool.name}
            >
              {tool.logo}
            </div>
          ))}
        </div>
        {remainingCount > 0 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            +{remainingCount} more
          </span>
        )}
      </div>

      {/* Step Count Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 text-sm font-medium rounded-full">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {workflow.stepCount} steps
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <Link
          href={`/workflows/build?id=${workflow.id}`}
          className="flex-1 px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors text-center"
        >
          Open
        </Link>
        <button
          onClick={onShare}
          className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          title="Share"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <button
          onClick={onDuplicate}
          className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          title="Duplicate"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
