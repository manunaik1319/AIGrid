export interface DashboardStats {
  toolsSaved: number;
  reviewsWritten: number;
  workflowsCreated: number;
  toolsVisited: number;
}

export interface SavedTool {
  id: string;
  name: string;
  logo: string;
  category: string;
  pricingModel: string;
  rating: number;
  collection?: string;
}

export interface Workflow {
  id: string;
  name: string;
  stepCount: number;
  lastEdited: Date;
}

export interface Alert {
  id: string;
  toolId: string;
  toolName: string;
  toolLogo: string;
  message: string;
  timestamp: Date;
  type: "price" | "feature" | "update";
}

export interface Activity {
  id: string;
  action: "saved" | "reviewed" | "workflow" | "visited";
  toolName: string;
  timestamp: Date;
}

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  toolsSaved: 12,
  reviewsWritten: 3,
  workflowsCreated: 2,
  toolsVisited: 24,
};

export const MOCK_SAVED_TOOLS: SavedTool[] = [
  { id: "1", name: "ChatGPT", logo: "🤖", category: "Writing", pricingModel: "Freemium", rating: 4.8, collection: "AI Assistants" },
  { id: "2", name: "Midjourney", logo: "🎨", category: "Image", pricingModel: "Paid", rating: 4.9, collection: "Creative Tools" },
  { id: "3", name: "Claude", logo: "🎭", category: "Writing", pricingModel: "Freemium", rating: 4.7, collection: "AI Assistants" },
  { id: "4", name: "DALL-E", logo: "🖼️", category: "Image", pricingModel: "Paid", rating: 4.6 },
  { id: "5", name: "GitHub Copilot", logo: "💻", category: "Code", pricingModel: "Paid", rating: 4.8, collection: "Dev Tools" },
  { id: "6", name: "Grammarly", logo: "📝", category: "Writing", pricingModel: "Freemium", rating: 4.5 },
  { id: "7", name: "Jasper", logo: "✍️", category: "Writing", pricingModel: "Paid", rating: 4.4, collection: "Marketing" },
  { id: "8", name: "Runway", logo: "🎬", category: "Video", pricingModel: "Freemium", rating: 4.7, collection: "Creative Tools" },
  { id: "9", name: "ElevenLabs", logo: "🎙️", category: "Audio", pricingModel: "Freemium", rating: 4.8 },
  { id: "10", name: "Notion AI", logo: "📋", category: "Productivity", pricingModel: "Freemium", rating: 4.6 },
  { id: "11", name: "Canva AI", logo: "🎭", category: "Image", pricingModel: "Freemium", rating: 4.5, collection: "Creative Tools" },
  { id: "12", name: "Synthesia", logo: "📹", category: "Video", pricingModel: "Paid", rating: 4.6 },
];

export const MOCK_WORKFLOWS: Workflow[] = [
  { id: "1", name: "Blog Post Creation Workflow", stepCount: 3, lastEdited: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: "2", name: "Social Media Content Pipeline", stepCount: 5, lastEdited: new Date(Date.now() - 24 * 60 * 60 * 1000) },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: "1",
    toolId: "chatgpt",
    toolName: "ChatGPT",
    toolLogo: "🤖",
    message: "New GPT-4 Turbo model released with improved performance",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    type: "feature",
  },
  {
    id: "2",
    toolId: "midjourney",
    toolName: "Midjourney",
    toolLogo: "🎨",
    message: "Price increase: Basic plan now $15/month (was $10/month)",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    type: "price",
  },
  {
    id: "3",
    toolId: "claude",
    toolName: "Claude",
    toolLogo: "🎭",
    message: "New feature: Claude can now analyze images",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    type: "feature",
  },
];

export const MOCK_ACTIVITY: Activity[] = [
  { id: "1", action: "saved", toolName: "ChatGPT", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: "2", action: "reviewed", toolName: "Claude", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  { id: "3", action: "workflow", toolName: "Blog Post Creation", timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
  { id: "4", action: "visited", toolName: "Midjourney", timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  { id: "5", action: "saved", toolName: "GitHub Copilot", timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
];

export const MOCK_RECOMMENDED_TOOLS: SavedTool[] = [
  { id: "r1", name: "Perplexity AI", logo: "🔍", category: "Research", pricingModel: "Freemium", rating: 4.7 },
  { id: "r2", name: "Stable Diffusion", logo: "🌈", category: "Image", pricingModel: "Free", rating: 4.8 },
  { id: "r3", name: "Descript", logo: "🎧", category: "Audio", pricingModel: "Freemium", rating: 4.6 },
  { id: "r4", name: "Zapier AI", logo: "⚙️", category: "Productivity", pricingModel: "Freemium", rating: 4.5 },
  { id: "r5", name: "Pictory", logo: "🎞️", category: "Video", pricingModel: "Paid", rating: 4.4 },
  { id: "r6", name: "Copy.ai", logo: "✨", category: "Writing", pricingModel: "Freemium", rating: 4.3 },
];

export function getCollections(tools: SavedTool[]): string[] {
  const collections = new Set<string>();
  tools.forEach(tool => {
    if (tool.collection) collections.add(tool.collection);
  });
  return Array.from(collections);
}
