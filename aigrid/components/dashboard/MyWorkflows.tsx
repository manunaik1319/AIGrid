"use client";
import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-hot-toast";
import { MOCK_WORKFLOWS, type Workflow } from "@/lib/dashboard-data";

export function MyWorkflows() {
  const [workflows, setWorkflows] = useState(MOCK_WORKFLOWS);

  const handleDelete = (id: string) => {
    setWorkflows(workflows.filter(w => w.id !== id));
    toast.success("Workflow deleted");
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">My Workflows</h2>
        <Link
          href="/workflows/build"
          className="px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors"
        >
          + New Workflow
        </Link>
      </div>

      {workflows.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔄</div>
          <p className="text-gray-600 mb-2">No workflows yet</p>
          <p className="text-sm text-gray-500">Create your first AI workflow</p>
        </div>
      ) : (
        <div className="space-y-3">
          {workflows.slice(0, 5).map((workflow) => (
            <div
              key={workflow.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-brand transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{workflow.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {workflow.stepCount} steps
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Edited {formatDistanceToNow(workflow.lastEdited, { addSuffix: true })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/workflows/build?id=${workflow.id}`}
                  className="px-3 py-1.5 text-sm font-medium text-brand hover:bg-brand-pale rounded-lg transition-colors"
                >
                  Open
                </Link>
                <button
                  onClick={() => handleDelete(workflow.id)}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {workflows.length > 5 && (
            <Link
              href="/workflows"
              className="block text-center py-2 text-sm text-brand hover:text-brand-dark transition-colors"
            >
              View All Workflows →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
