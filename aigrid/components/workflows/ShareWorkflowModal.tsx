"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { WorkflowDetail } from "@/lib/workflows-data";

interface ShareWorkflowModalProps {
  workflow: WorkflowDetail;
  onClose: () => void;
}

export function ShareWorkflowModal({ workflow, onClose }: ShareWorkflowModalProps) {
  const [allowDuplicate, setAllowDuplicate] = useState(workflow.allowDuplicate ?? true);
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/workflows/shared/${workflow.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Share Workflow</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Workflow Preview */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">{workflow.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{workflow.stepCount} steps</span>
              <span>•</span>
              <span>{workflow.tools.length} tools</span>
            </div>
          </div>

          {/* Share Link */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Public Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-600"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Anyone with link can view
            </p>
          </div>

          {/* Allow Duplicate Toggle */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-gray-900">Allow others to duplicate</p>
                <p className="text-xs text-gray-500 mt-1">
                  Let viewers create their own copy of this workflow
                </p>
              </div>
              <button
                onClick={() => setAllowDuplicate(!allowDuplicate)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  allowDuplicate ? "bg-brand" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    allowDuplicate ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
