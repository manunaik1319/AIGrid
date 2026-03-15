"use client";
import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useWorkflowStore, WorkflowNodeData } from '@/lib/workflow-store';

export const ToolNode = memo(({ id, data, selected }: NodeProps<WorkflowNodeData>) => {
  const { deleteNode, setSelectedNodeId } = useWorkflowStore();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const handleDoubleClick = () => {
    setSelectedNodeId(id);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`bg-white rounded-xl shadow-lg border-2 transition-all ${
        selected ? 'border-brand shadow-xl' : 'border-gray-200'
      } w-[220px] cursor-pointer hover:shadow-xl group`}
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600 z-10"
        title="Delete node"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-brand border-2 border-white"
      />

      {/* Node Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: data.tool.categoryColor }}
          >
            {data.stepNumber}
          </div>
          <div className="text-2xl">{data.tool.logo}</div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 truncate">
              {data.stepName || data.tool.name}
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="px-2 py-0.5 text-xs font-medium rounded-full text-white"
            style={{ backgroundColor: data.tool.categoryColor }}
          >
            {data.tool.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">
          {data.tool.description}
        </p>

        {/* Metadata */}
        {data.estimatedTime && (
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {data.estimatedTime}
          </div>
        )}
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-brand border-2 border-white"
      />
    </div>
  );
});

ToolNode.displayName = 'ToolNode';
