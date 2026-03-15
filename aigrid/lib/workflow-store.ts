import { create } from 'zustand';
import { Node, Edge, Connection, addEdge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from 'reactflow';

export interface WorkflowTool {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  categoryColor: string;
}

export interface WorkflowNodeData {
  tool: WorkflowTool;
  stepNumber: number;
  stepName?: string;
  notes?: string;
  inputFormat?: string;
  outputFormat?: string;
  estimatedTime?: string;
}

interface HistoryState {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
}

interface WorkflowState {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  workflowName: string;
  lastSaved: Date | null;
  selectedNodeId: string | null;
  history: HistoryState[];
  historyIndex: number;
  
  // Actions
  setNodes: (nodes: Node<WorkflowNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (tool: WorkflowTool, position: { x: number; y: number }) => void;
  deleteNode: (nodeId: string) => void;
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => void;
  setWorkflowName: (name: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  saveToHistory: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  loadSampleWorkflow: () => void;
  clearWorkflow: () => void;
}

const MAX_HISTORY = 50;

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  workflowName: 'Untitled Workflow',
  lastSaved: null,
  selectedNodeId: null,
  history: [],
  historyIndex: -1,

  setNodes: (nodes) => set({ nodes }),
  
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, animated: true, type: 'smoothstep' }, get().edges),
    });
    get().saveToHistory();
  },

  addNode: (tool, position) => {
    const { nodes } = get();
    const stepNumber = nodes.length + 1;
    const newNode: Node<WorkflowNodeData> = {
      id: `node-${Date.now()}`,
      type: 'toolNode',
      position,
      data: {
        tool,
        stepNumber,
        stepName: tool.name,
      },
    };
    set({ nodes: [...nodes, newNode] });
    get().saveToHistory();
  },

  deleteNode: (nodeId) => {
    const { nodes, edges } = get();
    set({
      nodes: nodes.filter(n => n.id !== nodeId),
      edges: edges.filter(e => e.source !== nodeId && e.target !== nodeId),
      selectedNodeId: null,
    });
    get().saveToHistory();
  },

  updateNodeData: (nodeId, data) => {
    const { nodes } = get();
    set({
      nodes: nodes.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node
      ),
    });
  },

  setWorkflowName: (name) => set({ workflowName: name }),

  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  saveToHistory: () => {
    const { nodes, edges, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes: [...nodes], edges: [...edges] });
    
    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift();
    }
    
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      set({
        nodes: prevState.nodes,
        edges: prevState.edges,
        historyIndex: historyIndex - 1,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      set({
        nodes: nextState.nodes,
        edges: nextState.edges,
        historyIndex: historyIndex + 1,
      });
    }
  },

  canUndo: () => get().historyIndex > 0,
  
  canRedo: () => get().historyIndex < get().history.length - 1,

  saveToLocalStorage: () => {
    const { nodes, edges, workflowName } = get();
    const data = { nodes, edges, workflowName, lastSaved: new Date().toISOString() };
    localStorage.setItem('aigrid-workflow', JSON.stringify(data));
    set({ lastSaved: new Date() });
  },

  loadFromLocalStorage: () => {
    const saved = localStorage.getItem('aigrid-workflow');
    if (saved) {
      const data = JSON.parse(saved);
      set({
        nodes: data.nodes || [],
        edges: data.edges || [],
        workflowName: data.workflowName || 'Untitled Workflow',
        lastSaved: data.lastSaved ? new Date(data.lastSaved) : null,
      });
      get().saveToHistory();
    } else {
      // Load sample workflow on first visit
      get().loadSampleWorkflow();
    }
  },

  loadSampleWorkflow: () => {
    const sampleNodes: Node<WorkflowNodeData>[] = [
      {
        id: 'sample-1',
        type: 'toolNode',
        position: { x: 100, y: 100 },
        data: {
          tool: {
            id: 'chatgpt',
            name: 'ChatGPT',
            logo: '🤖',
            category: 'Writing',
            description: 'Generate text content',
            categoryColor: '#3B82F6',
          },
          stepNumber: 1,
          stepName: 'Generate Blog Post',
          notes: 'Create initial blog post draft',
          inputFormat: 'Topic keywords',
          outputFormat: 'Text',
          estimatedTime: '5 min',
        },
      },
      {
        id: 'sample-2',
        type: 'toolNode',
        position: { x: 400, y: 100 },
        data: {
          tool: {
            id: 'grammarly',
            name: 'Grammarly',
            logo: '📝',
            category: 'Writing',
            description: 'Grammar checking',
            categoryColor: '#3B82F6',
          },
          stepNumber: 2,
          stepName: 'Proofread Content',
          notes: 'Check grammar and spelling',
          inputFormat: 'Text',
          outputFormat: 'Corrected text',
          estimatedTime: '2 min',
        },
      },
      {
        id: 'sample-3',
        type: 'toolNode',
        position: { x: 700, y: 100 },
        data: {
          tool: {
            id: 'midjourney',
            name: 'Midjourney',
            logo: '🎨',
            category: 'Image',
            description: 'AI image generation',
            categoryColor: '#EC4899',
          },
          stepNumber: 3,
          stepName: 'Create Cover Image',
          notes: 'Generate featured image for blog post',
          inputFormat: 'Image prompt',
          outputFormat: 'Image',
          estimatedTime: '3 min',
        },
      },
    ];

    const sampleEdges: Edge[] = [
      {
        id: 'e1-2',
        source: 'sample-1',
        target: 'sample-2',
        animated: true,
        type: 'smoothstep',
      },
      {
        id: 'e2-3',
        source: 'sample-2',
        target: 'sample-3',
        animated: true,
        type: 'smoothstep',
      },
    ];

    set({
      nodes: sampleNodes,
      edges: sampleEdges,
      workflowName: 'Blog Post Creation Workflow',
    });
    get().saveToHistory();
  },

  clearWorkflow: () => {
    set({
      nodes: [],
      edges: [],
      workflowName: 'Untitled Workflow',
      selectedNodeId: null,
      history: [],
      historyIndex: -1,
    });
  },
}));
