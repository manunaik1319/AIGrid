"use client";
import { useState } from 'react';
import { useWorkflowStore } from '@/lib/workflow-store';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

export function WorkflowToolbar() {
  const {
    workflowName,
    setWorkflowName,
    lastSaved,
    undo,
    redo,
    canUndo,
    canRedo,
    saveToLocalStorage,
  } = useWorkflowStore();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(workflowName);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setWorkflowName(tempName.trim());
      saveToLocalStorage();
    }
    setIsEditingName(false);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Workflow link copied to clipboard!');
  };

  const handleExportPNG = () => {
    toast.success('Export feature coming soon!');
  };

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4 flex-shrink-0">
      {/* Left - Workflow Name */}
      <div className="flex items-center gap-3">
        {isEditingName ? (
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleSaveName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveName();
              if (e.key === 'Escape') {
                setTempName(workflowName);
                setIsEditingName(false);
              }
            }}
            autoFocus
            className="px-2 py-1 border border-brand rounded text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-brand"
          />
        ) : (
          <button
            onClick={() => setIsEditingName(true)}
            className="group flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-semibold text-gray-900">{workflowName}</span>
            <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}

        {/* Auto-save status */}
        <div className="text-xs text-gray-500">
          {lastSaved ? `Saved ${formatDistanceToNow(lastSaved, { addSuffix: true })}` : 'Not saved'}
        </div>
      </div>

      {/* Right - Actions */}
      <div className="ml-auto flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Undo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Redo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
            </svg>
          </button>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>

        {/* Export PNG */}
        <button
          onClick={handleExportPNG}
          className="px-3 py-1.5 text-sm font-medium bg-brand text-white hover:bg-brand-dark rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Export PNG
        </button>
      </div>
    </div>
  );
}
