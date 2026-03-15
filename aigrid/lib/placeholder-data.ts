import type { Tool } from "@/components/aigrid/ToolCard";
import type { PricingModel } from "@/components/aigrid/Badge";
import { IconType } from "react-icons";
import { FaPenNib, FaPalette, FaCode, FaMusic, FaVideo, FaBolt, FaFlask, FaPuzzlePiece } from "react-icons/fa";

export const TRENDING_TOOLS: Tool[] = [
  { id: "1", name: "ChatGPT",      slug: "chatgpt",      tagline: "The world's most popular AI assistant for writing, coding, and more.", logoUrl: "https://cdn.oaistatic.com/_next/static/media/apple-touch-icon.59f2e898.png", category: "text-writing",   pricingModel: "Freemium", rating: 4.8, reviewCount: 12400, websiteUrl: "https://chatgpt.com" },
  { id: "2", name: "Midjourney",   slug: "midjourney",   tagline: "Generate stunning images from text prompts with unmatched quality.",   logoUrl: "https://www.midjourney.com/apple-touch-icon.png", category: "image-generation",    pricingModel: "Paid",     rating: 4.7, reviewCount: 9800, websiteUrl: "https://midjourney.com"  },
  { id: "3", name: "GitHub Copilot",slug:"github-copilot",tagline: "AI pair programmer that suggests code completions in real time.",      logoUrl: "https://github.githubassets.com/assets/apple-touch-icon-144x144-b882e354c005.png", category: "code-dev",       pricingModel: "Freemium", rating: 4.6, reviewCount: 8200, websiteUrl: "https://github.com/features/copilot"  },
  { id: "4", name: "ElevenLabs",   slug: "elevenlabs",   tagline: "Ultra-realistic AI voice synthesis and text-to-speech platform.",      logoUrl: "https://elevenlabs.io/favicon.ico", category: "audio-music",    pricingModel: "Freemium", rating: 4.5, reviewCount: 5600, websiteUrl: "https://elevenlabs.io"  },
  { id: "5", name: "Notion AI",    slug: "notion-ai",    tagline: "AI writing and summarisation built right into your Notion workspace.", logoUrl: "https://www.notion.so/images/favicon.ico", category: "productivity",    pricingModel: "Freemium", rating: 4.4, reviewCount: 7100, websiteUrl: "https://notion.so/ai"  },
  { id: "6", name: "Perplexity",   slug: "perplexity",   tagline: "AI-powered search engine that answers questions with cited sources.",  logoUrl: "https://www.perplexity.ai/favicon.svg", category: "research",        pricingModel: "Freemium", rating: 4.6, reviewCount: 6300, websiteUrl: "https://perplexity.ai"  },
];

export const NEW_TOOLS: Tool[] = [
  { id: "7",  name: "Sora",        slug: "sora",         tagline: "OpenAI's text-to-video model that creates realistic video clips.",    logoUrl: "https://cdn.oaistatic.com/_next/static/media/apple-touch-icon.59f2e898.png", category: "video-generation",    pricingModel: "Paid",     rating: 4.3, reviewCount: 1200, websiteUrl: "https://openai.com/sora"  },
  { id: "8",  name: "Claude 3",    slug: "claude-3",     tagline: "Anthropic's frontier model excelling at analysis and long context.",  logoUrl: "https://claude.ai/images/claude_app_icon.png", category: "text-writing",   pricingModel: "Freemium", rating: 4.7, reviewCount: 3400, websiteUrl: "https://claude.ai"  },
  { id: "9",  name: "Gemini Ultra",slug: "gemini-ultra", tagline: "Google's most capable multimodal AI model for complex tasks.",        logoUrl: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg", category: "text-writing",   pricingModel: "Freemium", rating: 4.5, reviewCount: 2800, websiteUrl: "https://gemini.google.com"  },
  { id: "10", name: "Runway Gen-3",slug: "runway-gen3",  tagline: "Next-gen AI video generation with precise motion control.",           logoUrl: "https://app.runwayml.com/favicon.ico", category: "video-generation",    pricingModel: "Paid",     rating: 4.4, reviewCount: 1900, websiteUrl: "https://runwayml.com"  },
  { id: "11", name: "Devin",       slug: "devin",        tagline: "The first fully autonomous AI software engineer by Cognition.",       logoUrl: "https://preview.devin.ai/favicon.ico", category: "code-dev",       pricingModel: "Paid",     rating: 4.2, reviewCount: 980, websiteUrl: "https://devin.ai"   },
  { id: "12", name: "Udio",        slug: "udio",         tagline: "Create full songs with vocals and instruments from a text prompt.",   logoUrl: "https://www.udio.com/favicon.ico", category: "audio-music",    pricingModel: "Free",     rating: 4.3, reviewCount: 1500, websiteUrl: "https://udio.com"  },
  { id: "13", name: "Grok 2",      slug: "grok-2",       tagline: "xAI's real-time AI assistant with live internet access.",             logoUrl: "https://grok.x.ai/favicon.ico", category: "research",        pricingModel: "Freemium", rating: 4.1, reviewCount: 2100, websiteUrl: "https://x.ai"  },
  { id: "14", name: "Bolt.new",    slug: "bolt-new",     tagline: "Full-stack web app builder powered by AI — deploy in seconds.",      logoUrl: "https://bolt.new/favicon.ico", category: "code-dev",       pricingModel: "Freemium", rating: 4.5, reviewCount: 3200, websiteUrl: "https://bolt.new"  },
];

export interface CategoryItem {
  slug: string;
  label: string;
  icon: IconType;
  count: number;
  featuredTools: { name: string; url: string }[];
}

export const CATEGORIES: CategoryItem[] = [
  { 
    slug: "text-writing",   
    label: "Writing",          
    icon: FaPenNib,  
    count: 142,
    featuredTools: [
      { name: "ChatGPT", url: "https://chatgpt.com" },
      { name: "Claude 3", url: "https://claude.ai" },
      { name: "Gemini Ultra", url: "https://gemini.google.com" },
      { name: "Jasper AI", url: "https://jasper.ai" },
      { name: "Copy.ai", url: "https://copy.ai" }
    ]
  },
  { 
    slug: "image-generation",    
    label: "Image Generation", 
    icon: FaPalette,  
    count: 98,
    featuredTools: [
      { name: "Midjourney", url: "https://midjourney.com" },
      { name: "DALL-E 3", url: "https://openai.com/dall-e-3" },
      { name: "Stable Diffusion", url: "https://stability.ai" },
      { name: "Adobe Firefly", url: "https://adobe.com/firefly" },
      { name: "Canva AI", url: "https://canva.com" }
    ]
  },
  { 
    slug: "code-dev",       
    label: "Code & Dev",       
    icon: FaCode,  
    count: 76,
    featuredTools: [
      { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
      { name: "Devin", url: "https://devin.ai" },
      { name: "Bolt.new", url: "https://bolt.new" },
      { name: "Cursor", url: "https://cursor.com" },
      { name: "Tabnine", url: "https://tabnine.com" }
    ]
  },
  { 
    slug: "audio-music",    
    label: "Audio & Music",    
    icon: FaMusic,  
    count: 54,
    featuredTools: [
      { name: "ElevenLabs", url: "https://elevenlabs.io" },
      { name: "Suno AI", url: "https://suno.com" },
      { name: "Udio", url: "https://udio.com" },
      { name: "Murf AI", url: "https://murf.ai" },
      { name: "Adobe Podcast", url: "https://podcast.adobe.com" }
    ]
  },
  { 
    slug: "video-generation",    
    label: "Video",            
    icon: FaVideo,  
    count: 61,
    featuredTools: [
      { name: "Sora", url: "https://openai.com/sora" },
      { name: "Runway Gen-3", url: "https://runwayml.com" },
      { name: "Synthesia", url: "https://synthesia.io" },
      { name: "HeyGen", url: "https://heygen.com" },
      { name: "Pika Labs", url: "https://pika.art" }
    ]
  },
  { 
    slug: "productivity",   
    label: "Productivity",     
    icon: FaBolt,  
    count: 89,
    featuredTools: [
      { name: "Notion AI", url: "https://notion.so/ai" },
      { name: "Otter.ai", url: "https://otter.ai" },
      { name: "Motion", url: "https://usemotion.com" },
      { name: "Reclaim.ai", url: "https://reclaim.ai" },
      { name: "Taskade", url: "https://taskade.com" }
    ]
  },
  { 
    slug: "research",       
    label: "Research",         
    icon: FaFlask,  
    count: 63,
    featuredTools: [
      { name: "Perplexity", url: "https://perplexity.ai" },
      { name: "Grok 2", url: "https://x.ai" },
      { name: "Elicit", url: "https://elicit.org" },
      { name: "Consensus", url: "https://consensus.app" },
      { name: "scite.ai", url: "https://scite.ai" }
    ]
  },
  { 
    slug: "data-analytics", 
    label: "Other",            
    icon: FaPuzzlePiece,  
    count: 45,
    featuredTools: [
      { name: "Mem.ai", url: "https://mem.ai" },
      { name: "Fireflies.ai", url: "https://fireflies.ai" },
      { name: "Wordtune", url: "https://wordtune.com" },
      { name: "Grammarly", url: "https://grammarly.com" },
      { name: "Quillbot", url: "https://quillbot.com" }
    ]
  },
];
