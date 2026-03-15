// Central config for all 8 categories — used by generateStaticParams, hero, SEO, colours

import { IconType } from "react-icons";
import { FaPenNib, FaPalette, FaCode, FaMusic, FaVideo, FaBolt, FaFlask, FaPuzzlePiece } from "react-icons/fa";

export interface CategoryConfig {
  slug: string;           // URL slug  (matches MOCK_TOOLS category field)
  toolSlug: string;       // internal tool category key
  label: string;
  description: string;
  icon: IconType;
  accent: string;         // hex accent colour
  accentDark: string;     // darker shade for gradient end
  subCategories: { slug: string; label: string }[];
}

export const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    slug: "writing",
    toolSlug: "text-writing",
    label: "Writing",
    description: "AI tools that help you write faster, clearer, and more creatively — from blog posts to marketing copy.",
    icon: FaPenNib,
    accent: "#1A56DB",
    accentDark: "#1E40AF",
    subCategories: [
      { slug: "blog-posts",   label: "Blog Posts" },
      { slug: "copywriting",  label: "Copywriting" },
      { slug: "seo",          label: "SEO" },
      { slug: "email",        label: "Email" },
      { slug: "social-media", label: "Social Media" },
      { slug: "scripts",      label: "Scripts" },
    ],
  },
  {
    slug: "image-generation",
    toolSlug: "image-video",
    label: "Image Generation",
    description: "Generate, edit, and enhance images with AI — from photorealistic renders to artistic illustrations.",
    icon: FaPalette,
    accent: "#7C3AED",
    accentDark: "#5B21B6",
    subCategories: [
      { slug: "text-to-image",  label: "Text to Image" },
      { slug: "photo-editing",  label: "Photo Editing" },
      { slug: "avatars",        label: "Avatars" },
      { slug: "illustrations",  label: "Illustrations" },
      { slug: "logos",          label: "Logos" },
      { slug: "video",          label: "Video" },
    ],
  },
  {
    slug: "code",
    toolSlug: "code-dev",
    label: "Code & Dev",
    description: "AI coding assistants, code generators, and developer tools that supercharge your engineering workflow.",
    icon: FaCode,
    accent: "#0D9488",
    accentDark: "#0F766E",
    subCategories: [
      { slug: "code-completion", label: "Code Completion" },
      { slug: "code-review",     label: "Code Review" },
      { slug: "app-builders",    label: "App Builders" },
      { slug: "debugging",       label: "Debugging" },
      { slug: "documentation",   label: "Documentation" },
      { slug: "testing",         label: "Testing" },
    ],
  },
  {
    slug: "audio",
    toolSlug: "audio-music",
    label: "Audio & Music",
    description: "AI tools for voice synthesis, music generation, podcast editing, and audio enhancement.",
    icon: FaMusic,
    accent: "#D97706",
    accentDark: "#B45309",
    subCategories: [
      { slug: "text-to-speech", label: "Text to Speech" },
      { slug: "music-gen",      label: "Music Generation" },
      { slug: "voice-cloning",  label: "Voice Cloning" },
      { slug: "transcription",  label: "Transcription" },
      { slug: "noise-removal",  label: "Noise Removal" },
      { slug: "podcast",        label: "Podcast" },
    ],
  },
  {
    slug: "video",
    toolSlug: "image-video",
    label: "Video",
    description: "Create, edit, and enhance videos with AI — from text-to-video generation to avatar presenters.",
    icon: FaVideo,
    accent: "#DC2626",
    accentDark: "#B91C1C",
    subCategories: [
      { slug: "text-to-video",  label: "Text to Video" },
      { slug: "video-editing",  label: "Video Editing" },
      { slug: "ai-avatars",     label: "AI Avatars" },
      { slug: "subtitles",      label: "Subtitles" },
      { slug: "screen-record",  label: "Screen Recording" },
      { slug: "animation",      label: "Animation" },
    ],
  },
  {
    slug: "productivity",
    toolSlug: "productivity",
    label: "Productivity",
    description: "AI-powered tools to automate tasks, manage your calendar, take meeting notes, and stay organised.",
    icon: FaBolt,
    accent: "#059669",
    accentDark: "#047857",
    subCategories: [
      { slug: "meeting-notes",  label: "Meeting Notes" },
      { slug: "scheduling",     label: "Scheduling" },
      { slug: "task-management",label: "Task Management" },
      { slug: "note-taking",    label: "Note Taking" },
      { slug: "automation",     label: "Automation" },
      { slug: "email",          label: "Email" },
    ],
  },
  {
    slug: "research",
    toolSlug: "research",
    label: "Research",
    description: "AI research assistants that search academic papers, synthesise findings, and accelerate discovery.",
    icon: FaFlask,
    accent: "#4338CA",
    accentDark: "#3730A3",
    subCategories: [
      { slug: "paper-search",   label: "Paper Search" },
      { slug: "summarisation",  label: "Summarisation" },
      { slug: "fact-checking",  label: "Fact Checking" },
      { slug: "citations",      label: "Citations" },
      { slug: "data-analysis",  label: "Data Analysis" },
      { slug: "web-search",     label: "Web Search" },
    ],
  },
  {
    slug: "other",
    toolSlug: "data-analytics",
    label: "Other",
    description: "AI tools that don't fit neatly into one box — data analytics, automation, and emerging categories.",
    icon: FaPuzzlePiece,
    accent: "#6B7280",
    accentDark: "#4B5563",
    subCategories: [
      { slug: "data-analytics", label: "Data Analytics" },
      { slug: "chatbots",       label: "Chatbots" },
      { slug: "translation",    label: "Translation" },
      { slug: "accessibility",  label: "Accessibility" },
      { slug: "finance",        label: "Finance" },
      { slug: "healthcare",     label: "Healthcare" },
    ],
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORY_CONFIG.find(c => c.slug === slug);
}
