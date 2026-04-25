import Link from "next/link";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { FiClock, FiCalendar, FiSearch } from "react-icons/fi";

type Category = "Guide" | "Tutorial" | "Tips" | "Roundup";

interface Post {
  slug: string; category: Category; title: string;
  description: string; readTime: number; date: string;
}

const POSTS: Post[] = [
  { slug: "best-ai-tools-essay-writing",       category: "Guide",    title: "Best AI Tools for Essay Writing",                  description: "Discover the top AI writing assistants that help students craft better essays, fix grammar, and improve structure in minutes.",                                    readTime: 5, date: "Jan 2026" },
  { slug: "github-copilot-assignments",         category: "Tutorial", title: "How to Use GitHub Copilot for Assignments",         description: "A step-by-step walkthrough on setting up GitHub Copilot and using it to speed up coding assignments without losing understanding.",                            readTime: 8, date: "Jan 2026" },
  { slug: "top-10-free-ai-tools-students",      category: "Roundup",  title: "Top 10 Free AI Tools for Students",                description: "We tested dozens of free AI tools so you don't have to. Here are the ten that actually deliver value for student life.",                                          readTime: 4, date: "Feb 2026" },
  { slug: "ai-research-summarize-papers",       category: "Guide",    title: "AI for Research: Summarize Papers Fast",           description: "Learn how to use AI tools to read, summarize, and extract key insights from academic papers in a fraction of the time.",                                      readTime: 6, date: "Feb 2026" },
  { slug: "prompt-engineering-beginners",       category: "Tips",     title: "Prompt Engineering for Beginners",                 description: "Writing better prompts is a skill. These beginner-friendly techniques will help you get dramatically better results from any AI tool.",                        readTime: 7, date: "Feb 2026" },
  { slug: "ai-design-tools-non-designers",      category: "Roundup",  title: "AI Design Tools for Non-Designers",                description: "You don't need a design degree anymore. These AI-powered tools let anyone create stunning visuals, presentations, and graphics.",                              readTime: 5, date: "Mar 2026" },
  { slug: "notion-ai-study-notes",              category: "Tutorial", title: "Using Notion AI for Study Notes",                  description: "Notion AI can transform your messy lecture notes into structured summaries, flashcards, and action items automatically.",                                        readTime: 6, date: "Mar 2026" },
  { slug: "how-to-fact-check-ai-outputs",       category: "Guide",    title: "How to Fact-Check AI Outputs",                     description: "AI can hallucinate. Here's a practical framework for verifying AI-generated content before you submit it or share it.",                                        readTime: 5, date: "Mar 2026" },
  { slug: "chatgpt-prompts-every-student-needs",category: "Tips",     title: "10 ChatGPT Prompts Every Student Needs",           description: "Copy-paste these battle-tested prompts to get better explanations, study plans, essay outlines, and more from ChatGPT.",                                      readTime: 4, date: "Apr 2026" },
];

const TAG_COLORS: Record<Category, string> = {
  Guide:    "bg-[#F5C842] text-[#1A1A2E]",
  Tutorial: "bg-[#7DD3F0] text-[#1A1A2E]",
  Tips:     "bg-[#F5C842] text-[#1A1A2E]",
  Roundup:  "bg-[#7DD3F0] text-[#1A1A2E]",
};

export const metadata = { title: "Blog & Resources | AIGrid", description: "Guides, tutorials and tips for students using AI tools." };

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4F6F8]">

        {/* Hero */}
        <section className="bg-[#F5C842] py-16 px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A2E]/60 mb-3">Resources</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-4">Guides &amp; Resources</h1>
          <p className="text-[#1A1A2E]/70 text-lg mb-8 max-w-xl mx-auto">Practical guides, tutorials, and tips to help you get the most out of AI tools as a student.</p>
          <div className="relative max-w-md mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] w-5 h-5" />
            <input type="text" placeholder="Search articles..." className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-[#E8EAED] text-[#1A1A2E] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7DD3F0] text-sm" />
          </div>
        </section>

        {/* Filter tabs */}
        <section className="bg-white border-b border-[#E8EAED] px-4 py-4">
          <div className="max-w-6xl mx-auto flex gap-2 flex-wrap justify-center">
            {["All", "Guides", "Tutorials", "Tips", "Roundups"].map((tab) => (
              <button key={tab} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${tab === "All" ? "bg-[#7DD3F0] text-[#1A1A2E]" : "bg-[#F4F6F8] text-[#6B7280] hover:bg-[#E8EAED]"}`}>
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((post) => (
              <article key={post.slug} className="bg-white border border-[#E8EAED] rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col">
                <span className={`inline-block self-start px-3 py-1 rounded-full text-xs font-bold mb-4 ${TAG_COLORS[post.category]}`}>{post.category}</span>
                <h2 className="text-[#1A1A2E] font-bold text-lg leading-snug mb-2">{post.title}</h2>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-4 flex-1">{post.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E8EAED]">
                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1"><FiClock className="w-3.5 h-3.5" />{post.readTime} min</span>
                    <span className="flex items-center gap-1"><FiCalendar className="w-3.5 h-3.5" />{post.date}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-[#7DD3F0] hover:text-[#4BB8E0] transition-colors">Read more →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
