"use client";
import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Panel,
} from 'reactflow';
import { useWorkflowStore, WorkflowTool } from '@/lib/workflow-store';
import { ToolNode } from './ToolNode';

export function WorkflowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNodeId,
  } = useWorkflowStore();

  const nodeTypes = useMemo(() => ({ toolNode: ToolNode }), []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const toolData = event.dataTransfer.getData('application/reactflow');
      if (!toolData) return;

      const tool: WorkflowTool = JSON.parse(toolData);
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left - 110,
        y: event.clientY - reactFlowBounds.top - 50,
      };

      addNode(tool, position);
    },
    [addNode]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: any) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-[#1a1a2e]"
        defaultEdgeOptions={{
          animated: true,
          type: 'smoothstep',
          style: { stroke: '#6366F1', strokeWidth: 2 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#374151"
        />
        <Controls className="bg-white rounded-lg shadow-lg" />
        <MiniMap
          className="bg-white rounded-lg shadow-lg"
          nodeColor={(node) => {
            const data = node.data as any;
            return data?.tool?.categoryColor || '#6B7280';
          }}
        />

        {/* Empty State */}
        {nodes.length === 0 && (
          <Panel position="top-center" className="mt-20">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-xl border-2 border-dashed border-gray-300 max-w-md">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Start Building Your Workflow
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Drag tools from the left panel to create your AI-powered workflow
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Drag</kbd>
                  <span>+</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Drop</kbd>
                  <span>to add tools</span>
                </div>
              </div>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}
