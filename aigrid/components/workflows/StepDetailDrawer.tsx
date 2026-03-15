"use client";
import { useState, useEffect } from 'react';
import { useWorkflowStore } from '@/lib/workflow-store';
import { motion, AnimatePresence } from 'framer-motion';

export function StepDetailDrawer() {
  const { nodes, selectedNodeId, setSelectedNodeId, updateNodeData } = useWorkflowStore();
  
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const [formData, setFormData] = useState({
    stepName: '',
    notes: '',
    inputFormat: '',
    outputFormat: '',
    estimatedTime: '',
  });

  useEffect(() => {
    if (selectedNode) {
      setFormData({
        stepName: selectedNode.data.stepName || selectedNode.data.tool.name,
        notes: selectedNode.data.notes || '',
        inputFormat: selectedNode.data.inputFormat || '',
        outputFormat: selectedNode.data.outputFormat || '',
        estimatedTime: selectedNode.data.estimatedTime || '',
      });
    }
  }, [selectedNode]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (selectedNodeId) {
      updateNodeData(selectedNodeId, { [field]: value });
    }
  };

  const handleClose = () => {
    setSelectedNodeId(null);
  };

  return (
    <AnimatePresence>
      {selectedNode && (
        <motion.div
          initial={{ x: 320 }}
          animate={{ x: 0 }}
          exit={{ x: 320 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-[320px] bg-white border-l border-gray-200 flex-shrink-0 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Step Details</h3>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Tool Info */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-3xl">{selectedNode.data.tool.logo}</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{selectedNode.data.tool.name}</div>
                <div className="text-xs text-gray-500">{selectedNode.data.tool.category}</div>
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: selectedNode.data.tool.categoryColor }}
              >
                {selectedNode.data.stepNumber}
              </div>
            </div>

            {/* Step Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Step Name
              </label>
              <input
                type="text"
                value={formData.stepName}
                onChange={(e) => handleChange('stepName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-sm"
                placeholder="Enter step name"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes / Instructions
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-sm resize-none"
                placeholder="Add notes or instructions for this step..."
              />
            </div>

            {/* Input Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Input Format
              </label>
              <input
                type="text"
                value={formData.inputFormat}
                onChange={(e) => handleChange('inputFormat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-sm"
                placeholder="e.g., Text, Image, JSON"
              />
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Output Format
              </label>
              <input
                type="text"
                value={formData.outputFormat}
                onChange={(e) => handleChange('outputFormat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-sm"
                placeholder="e.g., Text, Image, JSON"
              />
            </div>

            {/* Estimated Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Time
              </label>
              <input
                type="text"
                value={formData.estimatedTime}
                onChange={(e) => handleChange('estimatedTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-sm"
                placeholder="e.g., 5 min, 1 hour"
              />
            </div>

            {/* Open Tool Page */}
            <a
              href={`/tool/${selectedNode.data.tool.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors text-center"
            >
              Open Tool Page →
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
