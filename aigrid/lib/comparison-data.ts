// Mock data for comparison tools

export interface ComparisonTool {
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  category: string;
  platforms: string[];
  pricingTier: string;
  
  // Pricing
  freeTier: boolean;
  startingPrice: string;
  popularPlanPrice: string;
  apiAccess: boolean;
  
  // Features
  features: {
    textGeneration: boolean | "partial";
    imageGeneration: boolean | "partial";
    codeGeneration: boolean | "partial";
    multiLanguage: boolean | "partial";
    contextWindow: string;
    apiAvailable: boolean | "partial";
    customModels: boolean | "partial";
    teamCollaboration: boolean | "partial";
    dataPrivacy: boolean | "partial";
    mobileApp: boolean | "partial";
    plugins: boolean | "partial";
    voiceInput: boolean | "partial";
    fileUpload: boolean | "partial";
    webBrowsing: boolean | "partial";
    realTimeData: boolean | "partial";
  };
  
  // Ratings
  overallRating: number;
  reviewCount: number;
  easeOfUse: number;
  valueForMoney: number;
  
  // Links
  website: string;
  docs: string;
  apiReference: string;
}

export const COMPARISON_TOOLS: Record<string, ComparisonTool> = {
  chatgpt: {
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "Conversational AI by OpenAI",
    logo: "🤖",
    category: "Chatbot",
    platforms: ["Web", "iOS", "Android"],
    pricingTier: "Freemium",
    
    freeTier: true,
    startingPrice: "$20/mo",
    popularPlanPrice: "$20/mo",
    apiAccess: true,
    
    features: {
      textGeneration: true,
      imageGeneration: "partial",
      codeGeneration: true,
      multiLanguage: true,
      contextWindow: "128K tokens",
      apiAvailable: true,
      customModels: true,
      teamCollaboration: true,
      dataPrivacy: true,
      mobileApp: true,
      plugins: true,
      voiceInput: true,
      fileUpload: true,
      webBrowsing: true,
      realTimeData: "partial",
    },
    
    overallRating: 4.8,
    reviewCount: 15420,
    easeOfUse: 4.9,
    valueForMoney: 4.7,
    
    website: "https://chat.openai.com",
    docs: "https://platform.openai.com/docs",
    apiReference: "https://platform.openai.com/docs/api-reference",
  },
  
  claude: {
    slug: "claude",
    name: "Claude",
    tagline: "AI assistant by Anthropic",
    logo: "🎭",
    category: "Chatbot",
    platforms: ["Web", "API"],
    pricingTier: "Freemium",
    
    freeTier: true,
    startingPrice: "$20/mo",
    popularPlanPrice: "$20/mo",
    apiAccess: true,
    
    features: {
      textGeneration: true,
      imageGeneration: false,
      codeGeneration: true,
      multiLanguage: true,
      contextWindow: "200K tokens",
      apiAvailable: true,
      customModels: false,
      teamCollaboration: true,
      dataPrivacy: true,
      mobileApp: false,
      plugins: false,
      voiceInput: false,
      fileUpload: true,
      webBrowsing: false,
      realTimeData: false,
    },
    
    overallRating: 4.7,
    reviewCount: 8930,
    easeOfUse: 4.8,
    valueForMoney: 4.6,
    
    website: "https://claude.ai",
    docs: "https://docs.anthropic.com",
    apiReference: "https://docs.anthropic.com/api",
  },
  
  gemini: {
    slug: "gemini",
    name: "Gemini",
    tagline: "Google's most capable AI",
    logo: "✨",
    category: "Chatbot",
    platforms: ["Web", "Android", "iOS"],
    pricingTier: "Freemium",
    
    freeTier: true,
    startingPrice: "$19.99/mo",
    popularPlanPrice: "$19.99/mo",
    apiAccess: true,
    
    features: {
      textGeneration: true,
      imageGeneration: true,
      codeGeneration: true,
      multiLanguage: true,
      contextWindow: "1M tokens",
      apiAvailable: true,
      customModels: false,
      teamCollaboration: "partial",
      dataPrivacy: true,
      mobileApp: true,
      plugins: true,
      voiceInput: true,
      fileUpload: true,
      webBrowsing: true,
      realTimeData: true,
    },
    
    overallRating: 4.6,
    reviewCount: 12100,
    easeOfUse: 4.7,
    valueForMoney: 4.8,
    
    website: "https://gemini.google.com",
    docs: "https://ai.google.dev/docs",
    apiReference: "https://ai.google.dev/api",
  },
  
  copilot: {
    slug: "copilot",
    name: "Microsoft Copilot",
    tagline: "AI-powered productivity assistant",
    logo: "🚀",
    category: "Productivity",
    platforms: ["Web", "Windows", "Edge"],
    pricingTier: "Freemium",
    
    freeTier: true,
    startingPrice: "$20/mo",
    popularPlanPrice: "$30/mo",
    apiAccess: false,
    
    features: {
      textGeneration: true,
      imageGeneration: true,
      codeGeneration: true,
      multiLanguage: true,
      contextWindow: "128K tokens",
      apiAvailable: false,
      customModels: false,
      teamCollaboration: true,
      dataPrivacy: true,
      mobileApp: "partial",
      plugins: true,
      voiceInput: true,
      fileUpload: true,
      webBrowsing: true,
      realTimeData: true,
    },
    
    overallRating: 4.5,
    reviewCount: 9870,
    easeOfUse: 4.6,
    valueForMoney: 4.4,
    
    website: "https://copilot.microsoft.com",
    docs: "https://learn.microsoft.com/copilot",
    apiReference: "N/A",
  },
};

export function getComparisonTool(slug: string): ComparisonTool | null {
  return COMPARISON_TOOLS[slug] || null;
}

export function getAllComparisonTools(): ComparisonTool[] {
  return Object.values(COMPARISON_TOOLS);
}
