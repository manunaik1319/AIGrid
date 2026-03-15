export interface WorkflowDetail {
  id: string;
  name: string;
  stepCount: number;
  lastEdited: Date;
  tools: {
    logo: string;
    name: string;
  }[];
  isPublic?: boolean;
  allowDuplicate?: boolean;
}

export const MOCK_WORKFLOWS_DETAIL: WorkflowDetail[] = [
  {
    id: "1",
    name: "Blog Post Creation Workflow",
    stepCount: 3,
    lastEdited: new Date(Date.now() - 2 * 60 * 60 * 1000),
    tools: [
      { logo: "🤖", name: "ChatGPT" },
      { logo: "📝", name: "Grammarly" },
      { logo: "🎨", name: "Midjourney" },
    ],
  },
  {
    id: "2",
    name: "Social Media Content Pipeline",
    stepCount: 5,
    lastEdited: new Date(Date.now() - 24 * 60 * 60 * 1000),
    tools: [
      { logo: "🤖", name: "ChatGPT" },
      { logo: "🎨", name: "Canva AI" },
      { logo: "🖼️", name: "DALL-E" },
      { logo: "📝", name: "Jasper" },
      { logo: "📋", name: "Notion AI" },
    ],
  },
  {
    id: "3",
    name: "Video Production Workflow",
    stepCount: 7,
    lastEdited: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tools: [
      { logo: "🤖", name: "ChatGPT" },
      { logo: "🎬", name: "Runway" },
      { logo: "🎙️", name: "ElevenLabs" },
      { logo: "🎧", name: "Descript" },
      { logo: "📹", name: "Synthesia" },
      { logo: "🎨", name: "Midjourney" },
      { logo: "🎞️", name: "Pictory" },
    ],
  },
  {
    id: "4",
    name: "Code Review & Documentation",
    stepCount: 4,
    lastEdited: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    tools: [
      { logo: "💻", name: "GitHub Copilot" },
      { logo: "🤖", name: "ChatGPT" },
      { logo: "📝", name: "Grammarly" },
      { logo: "📋", name: "Notion AI" },
    ],
  },
  {
    id: "5",
    name: "Market Research Analysis",
    stepCount: 6,
    lastEdited: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    tools: [
      { logo: "🔍", name: "Perplexity AI" },
      { logo: "🤖", name: "ChatGPT" },
      { logo: "📊", name: "Tableau" },
      { logo: "📈", name: "Julius AI" },
      { logo: "📋", name: "Notion AI" },
      { logo: "📝", name: "Jasper" },
    ],
  },
  {
    id: "6",
    name: "Email Campaign Builder",
    stepCount: 4,
    lastEdited: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    tools: [
      { logo: "✍️", name: "Jasper" },
      { logo: "🤖", name: "ChatGPT" },
      { logo: "🎨", name: "Canva AI" },
      { logo: "📝", name: "Grammarly" },
    ],
  },
];
