"use client";
import { useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { WorkflowCanvas } from './WorkflowCanvas';
import { ToolPalette } from './ToolPalette';
import { WorkflowToolbar } from './WorkflowToolbar';
import { StepDetailDrawer } from './StepDetailDrawer';
import { useWorkflowStore } from '@/lib/workflow-store';

export function WorkflowBuilder() {
  const [isMounted, setIsMounted] = useState(false);
  const { loadFromLocalStorage, saveToLocalStorage } = useWorkflowStore();

  useEffect(() => {
    setIsMounted(true);
    loadFromLocalStorage();

    // Auto-save every 30 seconds
    const interval = setInterval(() => {
      saveToLocalStorage();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadFromLocalStorage, saveToLocalStorage]);

  if (!isMounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1a1a2e]">
        <div className="text-white">Loading workflow builder...</div>
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col bg-[#1a1a2e] overflow-hidden">
        {/* Toolbar */}
        <WorkflowToolbar />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Tool Palette */}
          <div className="hidden lg:block w-[260px] bg-white border-r border-gray-200 flex-shrink-0">
            <ToolPalette />
          </div>

          {/* Center - Canvas */}
          <div className="flex-1 relative">
            <WorkflowCanvas />
          </div>

          {/* Right Panel - Step Detail Drawer */}
          <StepDetailDrawer />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
