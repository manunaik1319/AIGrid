import type { Tool } from "@/components/aigrid/ToolCard";

export interface PricingPlan {
  name: string;
  price: string;
  priceMonthly?: string;
  limits: string;
  features: string[];
  cta: string;
  popular?: boolean;
  free?: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  body: string;
  helpful: number;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  description: string;
}

export interface ToolDetail {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  logoUrl: string;
  category: string;
  platforms: string[];
  pricingModel: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  websiteUrl: string;
  description: string;
  features: string[];
  pricingPlans: PricingPlan[];
  usageSteps: string[];
  samplePrompts: string[];
  changelog: ChangelogEntry[];
  reviews: Review[];
  launched: string;
  lastUpdated: string;
  quickFacts: Record<string, string>;
}

export const TOOL_DETAIL_MOCK: ToolDetail = {
  id: "contentai-1",
  slug: "contentai",
  name: "ContentAI",
  tagline: "AI-powered content creation platform that writes like a human",
  logoUrl: "",
  category: "text-writing",
  platforms: ["Web", "Chrome Extension", "API"],
  pricingModel: "Freemium",
  verified: true,
  rating: 4.8,
  reviewCount: 2847,
  websiteUrl: "https://contentai.example.com",
  description: `ContentAI is a revolutionary AI writing assistant that helps you create high-quality content in minutes. 

## What Makes ContentAI Different?

Unlike other AI writing tools, ContentAI understands context, tone, and brand voice. It's trained on millions of high-performing articles and can adapt to any writing style.

### Perfect For:
- Blog posts and articles
- Marketing copy and ads
- Social media content
- Email campaigns
- Product descriptions

Our advanced AI model ensures your content is:
- **Original**: 100% plagiarism-free content
- **SEO-optimized**: Built-in keyword optimization
- **Brand-consistent**: Learns your unique voice
- **Fast**: Generate 1000+ words in under 60 seconds`,
  
  features: [
    "AI-powered long-form content generation",
    "50+ content templates for different use cases",
    "SEO optimization with keyword suggestions",
    "Tone and style customization",
    "Multi-language support (25+ languages)",
    "Plagiarism checker built-in",
    "Team collaboration features",
    "Chrome extension for writing anywhere",
    "API access for integrations",
    "Content calendar and scheduling",
    "A/B testing for headlines",
    "Export to WordPress, Medium, and more"
  ],

  pricingPlans: [
    {
      name: "Free",
      price: "$0",
      limits: "10,000 words/month",
      features: [
        "Basic AI writing",
        "5 content templates",
        "Standard support",
        "Export to PDF/DOCX"
      ],
      cta: "Start Free",
      free: true
    },
    {
      name: "Pro",
      price: "$29",
      priceMonthly: "$39",
      limits: "100,000 words/month",
      features: [
        "Everything in Free",
        "50+ content templates",
        "SEO optimization",
        "Plagiarism checker",
        "Priority support",
        "Chrome extension",
        "Team collaboration (3 seats)"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Business",
      price: "$99",
      priceMonthly: "$129",
      limits: "Unlimited words",
      features: [
        "Everything in Pro",
        "API access",
        "Custom AI training",
        "Dedicated account manager",
        "Advanced analytics",
        "White-label options",
        "Unlimited team seats",
        "SLA guarantee"
      ],
      cta: "Contact Sales"
    }
  ],

  usageSteps: [
    "Sign up for a free account at ContentAI.com",
    "Choose a content template or start from scratch",
    "Enter your topic, keywords, and desired tone",
    "Let the AI generate your first draft in seconds",
    "Edit and refine using the built-in editor",
    "Run the plagiarism and SEO checker",
    "Export or publish directly to your platform"
  ],

  samplePrompts: [
    "Write a 1000-word blog post about the benefits of remote work for tech companies",
    "Create 5 engaging social media posts for a new fitness app launch",
    "Generate product descriptions for eco-friendly water bottles with a friendly, conversational tone"
  ],

  changelog: [
    {
      version: "v2.4.0",
      date: "2 days ago",
      description: "Added support for 10 new languages including Japanese and Arabic. Improved AI accuracy by 15%."
    },
    {
      version: "v2.3.5",
      date: "1 week ago",
      description: "New Chrome extension with inline writing suggestions. Bug fixes for team collaboration."
    },
    {
      version: "v2.3.0",
      date: "2 weeks ago",
      description: "Introduced A/B testing for headlines. Added content calendar feature."
    },
    {
      version: "v2.2.0",
      date: "1 month ago",
      description: "API v2 released with improved rate limits. New WordPress plugin available."
    },
    {
      version: "v2.1.0",
      date: "2 months ago",
      description: "Major UI redesign. Added dark mode and improved mobile experience."
    }
  ],

  reviews: [
    {
      id: "r1",
      author: "Sarah Johnson",
      avatar: "",
      rating: 5,
      date: "2 days ago",
      body: "ContentAI has completely transformed how I create content for my blog. What used to take me 4-5 hours now takes less than an hour. The quality is impressive and it really understands my brand voice after training it.",
      helpful: 24
    },
    {
      id: "r2",
      author: "Michael Chen",
      avatar: "",
      rating: 4,
      date: "1 week ago",
      body: "Great tool for content creation. The SEO features are particularly useful. Only wish the free tier had more words per month, but the Pro plan is worth it if you're a regular content creator.",
      helpful: 18
    },
    {
      id: "r3",
      author: "Emily Rodriguez",
      avatar: "",
      rating: 5,
      date: "2 weeks ago",
      body: "As a marketing agency, we've tried many AI writing tools. ContentAI is by far the best. The team collaboration features and API access make it perfect for our workflow. Highly recommend!",
      helpful: 31
    },
    {
      id: "r4",
      author: "David Kim",
      avatar: "",
      rating: 4,
      date: "3 weeks ago",
      body: "Solid AI writing assistant. The content quality is consistently good and the plagiarism checker gives me peace of mind. Customer support is responsive too.",
      helpful: 12
    },
    {
      id: "r5",
      author: "Lisa Thompson",
      avatar: "",
      rating: 5,
      date: "1 month ago",
      body: "I was skeptical about AI writing tools, but ContentAI proved me wrong. It's not just about generating content - it actually helps me become a better writer by suggesting improvements.",
      helpful: 27
    }
  ],

  launched: "2023",
  lastUpdated: "2 days ago",
  quickFacts: {
    "Category": "Writing",
    "Launched": "2023",
    "Last Updated": "2 days ago",
    "Users": "50,000+",
    "Languages": "25+"
  }
};

// Similar tools
export const SIMILAR_TOOLS: Tool[] = [
  { id: "1", name: "Jasper AI", slug: "jasper-ai", tagline: "AI content platform for teams", logoUrl: "", category: "text-writing", pricingModel: "Paid" as const, rating: 4.7, reviewCount: 3200, websiteUrl: "#" },
  { id: "2", name: "Copy.ai", slug: "copy-ai", tagline: "AI copywriter for marketing", logoUrl: "", category: "text-writing", pricingModel: "Freemium" as const, rating: 4.6, reviewCount: 2100, websiteUrl: "#" },
  { id: "3", name: "Writesonic", slug: "writesonic", tagline: "AI writer for blogs and ads", logoUrl: "", category: "text-writing", pricingModel: "Freemium" as const, rating: 4.5, reviewCount: 1800, websiteUrl: "#" },
  { id: "4", name: "Rytr", slug: "rytr", tagline: "Affordable AI writing assistant", logoUrl: "", category: "text-writing", pricingModel: "Freemium" as const, rating: 4.4, reviewCount: 1500, websiteUrl: "#" },
  { id: "5", name: "Wordtune", slug: "wordtune", tagline: "AI writing companion", logoUrl: "", category: "text-writing", pricingModel: "Freemium" as const, rating: 4.6, reviewCount: 2400, websiteUrl: "#" },
  { id: "6", name: "Grammarly", slug: "grammarly", tagline: "Writing assistant with AI", logoUrl: "", category: "text-writing", pricingModel: "Freemium" as const, rating: 4.7, reviewCount: 5600, websiteUrl: "#" }
];
