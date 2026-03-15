"use client";
import { useState } from "react";
import Link from "next/link";
import { MOCK_WORKFLOWS_DETAIL, type WorkflowDetail } from "@/lib/workflows-data";
import { WorkflowCard } from "./WorkflowCard";
import { ShareWorkflowModal } from "./ShareWorkflowModal";
import { DeleteWorkflowModal } from "./DeleteWorkflowModal";

export function MyWorkflowsPage() {
  const [workflows, setWorkflows] = useState(MOCK_WORKFLOWS_DETAIL);
  const [shareWorkflow, setShareWorkflow] = useState<WorkflowDetail | null>(null);
  const [deleteWorkflow, setDeleteWorkflow] = useState<WorkflowDetail | null>(null);

  const handleDuplicate = (workflow: WorkflowDetail) => {
    const newWorkflow: WorkflowDetail = {
      ...workflow,
      id: `${workflow.id}-copy-${Date.now()}`,
      name: `${workflow.name} (Copy)`,
      lastEdited: new Date(),
    };
    setWorkflows([newWorkflow, ...workflows]);
  };

  const handleDelete = (id: string) => {
    setWorkflows(workflows.filter(w => w.id !== id));
    setDeleteWorkflow(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Workflows</h1>
          <p className="text-gray-600">
            You have {workflows.length} workflow{workflows.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/workflows/build"
          className="px-6 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Workflow
        </Link>
      </div>

      {/* Workflows Grid */}
      {workflows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="w-48 h-48 text-gray-300 mb-6" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            You haven't built any workflows yet
          </h2>
          <p className="text-gray-600 mb-6">
            Create your first AI-powered workflow to automate your tasks
          </p>
          <Link
            href="/workflows/build"
            className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Build your first workflow
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onShare={() => setShareWorkflow(workflow)}
              onDuplicate={() => handleDuplicate(workflow)}
              onDelete={() => setDeleteWorkflow(workflow)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {shareWorkflow && (
        <ShareWorkflowModal
          workflow={shareWorkflow}
          onClose={() => setShareWorkflow(null)}
        />
      )}

      {deleteWorkflow && (
        <DeleteWorkflowModal
          workflow={deleteWorkflow}
          onConfirm={() => handleDelete(deleteWorkflow.id)}
          onCancel={() => setDeleteWorkflow(null)}
        />
      )}
    </div>
  );
}
