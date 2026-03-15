import { WorkflowTool } from './workflow-store';

export const WORKFLOW_TOOLS: WorkflowTool[] = [
  // Writing Tools
  { id: 'chatgpt', name: 'ChatGPT', logo: '🤖', category: 'Writing', description: 'Generate text content', categoryColor: '#3B82F6' },
  { id: 'jasper', name: 'Jasper', logo: '✍️', category: 'Writing', description: 'Marketing copy', categoryColor: '#3B82F6' },
  { id: 'grammarly', name: 'Grammarly', logo: '📝', category: 'Writing', description: 'Grammar checking', categoryColor: '#3B82F6' },
  
  // Image Tools
  { id: 'midjourney', name: 'Midjourney', logo: '🎨', category: 'Image', description: 'AI image generation', categoryColor: '#EC4899' },
  { id: 'dalle', name: 'DALL-E', logo: '🖼️', category: 'Image', description: 'Create images from text', categoryColor: '#EC4899' },
  { id: 'canva', name: 'Canva AI', logo: '🎭', category: 'Image', description: 'Design graphics', categoryColor: '#EC4899' },
  { id: 'remove-bg', name: 'Remove.bg', logo: '🔲', category: 'Image', description: 'Remove backgrounds', categoryColor: '#EC4899' },
  
  // Code Tools
  { id: 'copilot', name: 'GitHub Copilot', logo: '💻', category: 'Code', description: 'Code completion', categoryColor: '#8B5CF6' },
  { id: 'tabnine', name: 'Tabnine', logo: '⚡', category: 'Code', description: 'AI code assistant', categoryColor: '#8B5CF6' },
  { id: 'codeium', name: 'Codeium', logo: '🚀', category: 'Code', description: 'Free code AI', categoryColor: '#8B5CF6' },
  
  // Audio Tools
  { id: 'elevenlabs', name: 'ElevenLabs', logo: '🎙️', category: 'Audio', description: 'Voice synthesis', categoryColor: '#10B981' },
  { id: 'murf', name: 'Murf AI', logo: '🔊', category: 'Audio', description: 'Text to speech', categoryColor: '#10B981' },
  { id: 'descript', name: 'Descript', logo: '🎧', category: 'Audio', description: 'Audio editing', categoryColor: '#10B981' },
  
  // Video Tools
  { id: 'runway', name: 'Runway', logo: '🎬', category: 'Video', description: 'Video generation', categoryColor: '#F59E0B' },
  { id: 'synthesia', name: 'Synthesia', logo: '📹', category: 'Video', description: 'AI video avatars', categoryColor: '#F59E0B' },
  { id: 'pictory', name: 'Pictory', logo: '🎞️', category: 'Video', description: 'Video from text', categoryColor: '#F59E0B' },
  
  // Data Tools
  { id: 'tableau', name: 'Tableau', logo: '📊', category: 'Data', description: 'Data visualization', categoryColor: '#06B6D4' },
  { id: 'julius', name: 'Julius AI', logo: '📈', category: 'Data', description: 'Data analysis', categoryColor: '#06B6D4' },
  
  // Productivity
  { id: 'notion-ai', name: 'Notion AI', logo: '📋', category: 'Productivity', description: 'Smart notes', categoryColor: '#6366F1' },
  { id: 'zapier', name: 'Zapier', logo: '⚙️', category: 'Productivity', description: 'Automation', categoryColor: '#6366F1' },
];

export const WORKFLOW_CATEGORIES = [
  { id: 'all', label: 'All', color: '#6B7280' },
  { id: 'writing', label: 'Writing', color: '#3B82F6' },
  { id: 'image', label: 'Image', color: '#EC4899' },
  { id: 'code', label: 'Code', color: '#8B5CF6' },
  { id: 'audio', label: 'Audio', color: '#10B981' },
  { id: 'video', label: 'Video', color: '#F59E0B' },
  { id: 'data', label: 'Data', color: '#06B6D4' },
  { id: 'productivity', label: 'Productivity', color: '#6366F1' },
];

export function getToolsByCategory(category: string): WorkflowTool[] {
  if (category === 'all') return WORKFLOW_TOOLS;
  return WORKFLOW_TOOLS.filter(tool => tool.category.toLowerCase() === category.toLowerCase());
}

export function searchTools(query: string): WorkflowTool[] {
  const lowerQuery = query.toLowerCase();
  return WORKFLOW_TOOLS.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.category.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery)
  );
}
