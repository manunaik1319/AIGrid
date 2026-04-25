import Link from "next/link";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { FiClock, FiCalendar, FiUser } from "react-icons/fi";

type Category = "Guide" | "Tutorial" | "Tips" | "Roundup";
interface Post { slug: string; category: Category; title: string; description: string; readTime: number; date: string; }

const POSTS: Post[] = [
  { slug: "best-ai-tools-essay-writing",        category: "Guide",    title: "Best AI Tools for Essay Writing",                  description: "Discover the top AI writing assistants that help students craft better essays, fix grammar, and improve structure in minutes.",                             readTime: 5, date: "Jan 2026" },
  { slug: "github-copilot-assignments",          category: "Tutorial", title: "How to Use GitHub Copilot for Assignments",         description: "A step-by-step walkthrough on setting up GitHub Copilot and using it to speed up coding assignments without losing understanding.",                     readTime: 8, date: "Jan 2026" },
  { slug: "top-10-free-ai-tools-students",       category: "Roundup",  title: "Top 10 Free AI Tools for Students",                description: "We tested dozens of free AI tools so you don't have to. Here are the ten that actually deliver value for student life.",                                   readTime: 4, date: "Feb 2026" },
  { slug: "ai-research-summarize-papers",        category: "Guide",    title: "AI for Research: Summarize Papers Fast",           description: "Learn how to use AI tools to read, summarize, and extract key insights from academic papers in a fraction of the time.",                               readTime: 6, date: "Feb 2026" },
  { slug: "prompt-engineering-beginners",        category: "Tips",     title: "Prompt Engineering for Beginners",                 description: "Writing better prompts is a skill. These beginner-friendly techniques will help you get dramatically better results from any AI tool.",                 readTime: 7, date: "Feb 2026" },
  { slug: "ai-design-tools-non-designers",       category: "Roundup",  title: "AI Design Tools for Non-Designers",                description: "You don't need a design degree anymore. These AI-powered tools let anyone create stunning visuals, presentations, and graphics.",                       readTime: 5, date: "Mar 2026" },
  { slug: "notion-ai-study-notes",               category: "Tutorial", title: "Using Notion AI for Study Notes",                  description: "Notion AI can transform your messy lecture notes into structured summaries, flashcards, and action items automatically.",                               readTime: 6, date: "Mar 2026" },
  { slug: "how-to-fact-check-ai-outputs",        category: "Guide",    title: "How to Fact-Check AI Outputs",                     description: "AI can hallucinate. Here's a practical framework for verifying AI-generated content before you submit it or share it.",                               readTime: 5, date: "Mar 2026" },
  { slug: "chatgpt-prompts-every-student-needs", category: "Tips",     title: "10 ChatGPT Prompts Every Student Needs",           description: "Copy-paste these battle-tested prompts to get better explanations, study plans, essay outlines, and more from ChatGPT.",                             readTime: 4, date: "Apr 2026" },
];

const TAG_COLORS: Record<Category, string> = {
  Guide: "bg-[#F5C842] text-[#1A1A2E]", Tutorial: "bg-[#7DD3F0] text-[#1A1A2E]",
  Tips:  "bg-[#F5C842] text-[#1A1A2E]", Roundup:  "bg-[#7DD3F0] text-[#1A1A2E]",
};

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug) ?? POSTS[0];
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4F6F8]">

        <div className="max-w-6xl mx-auto px-4 pt-6">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-[#7DD3F0] hover:text-[#4BB8E0] font-medium transition-colors">← Back to Blog</Link>
        </div>

        {/* Post header */}
        <section className="max-w-6xl mx-auto px-4 pt-6 pb-10">
          <div className="bg-white border border-[#E8EAED] rounded-2xl p-8 md:p-12">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-5 ${TAG_COLORS[post.category]}`}>{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] leading-tight mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-[#6B7280]">
              <span className="flex items-center gap-1.5"><FiUser className="w-4 h-4" />AIGrid Team</span>
              <span className="flex items-center gap-1.5"><FiCalendar className="w-4 h-4" />{post.date}</span>
              <span className="flex items-center gap-1.5"><FiClock className="w-4 h-4" />{post.readTime} min read</span>
            </div>
          </div>
        </section>

        {/* Content + Sidebar */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Article */}
            <article className="flex-1 bg-white border border-[#E8EAED] rounded-2xl p-8 md:p-10">
              <p className="text-[#6B7280] leading-relaxed mb-6 text-base">Artificial intelligence has fundamentally changed how students approach academic work. From drafting essays to debugging code, AI tools are now embedded in every stage of the learning process. Understanding which tools to use — and how to use them effectively — can make a significant difference in both your productivity and the quality of your output.</p>
              <p className="text-[#6B7280] leading-relaxed mb-6 text-base">The key is not to rely on AI blindly, but to treat it as a collaborative partner. Think of it as having a knowledgeable study buddy available 24/7 — one that can explain concepts, suggest improvements, and help you work through problems. The students who get the most out of AI are those who stay in the driver's seat and use AI to amplify their own thinking.</p>
              <p className="text-[#6B7280] leading-relaxed mb-8 text-base">In this guide, we'll walk through the most effective strategies and tools available right now. Whether you're just getting started or looking to level up your existing workflow, there's something here for every type of student.</p>

              <h2 className="text-xl font-bold text-[#1A1A2E] border-b border-[#E8EAED] pb-3 mb-5">Getting Started: The Essentials</h2>

              <ul className="space-y-3 mb-8 pl-2">
                {["Start with a clear goal before opening any AI tool — vague inputs produce vague outputs.", "Use AI to generate a first draft, then rewrite it in your own voice.", "Always fact-check statistics, citations, and specific claims from AI responses.", "Experiment with different prompting styles to find what works best for your use case.", "Keep a personal prompt library of your best-performing prompts for reuse."].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#6B7280] text-base leading-relaxed">
                    <span className="mt-2 w-2 h-2 rounded-full bg-[#F5C842] flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>

              <p className="text-[#6B7280] leading-relaxed mb-6 text-base">Once you've built a basic workflow, the next step is to specialize. Different subjects benefit from different tools — a computer science student will get more value from GitHub Copilot than a literature student, who might prefer a tool focused on writing clarity and style. Matching the right tool to the right task is half the battle.</p>
              <p className="text-[#6B7280] leading-relaxed text-base">Finally, remember that AI tools evolve rapidly. What's best today may be superseded in a few months. Stay curious, keep experimenting, and check back on AIGrid regularly for updated roundups and reviews. The students who stay ahead are the ones who treat AI literacy as an ongoing skill, not a one-time setup.</p>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-20 bg-white border border-[#E8EAED] rounded-2xl p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-4">More Articles</p>
                <div className="flex flex-col gap-4">
                  {related.map((rel) => (
                    <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block">
                      <div className="bg-[#F4F6F8] border border-[#E8EAED] rounded-xl p-4 hover:shadow-md transition-shadow">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 ${TAG_COLORS[rel.category]}`}>{rel.category}</span>
                        <p className="text-sm font-bold text-[#1A1A2E] leading-snug group-hover:text-[#7DD3F0] transition-colors mb-1">{rel.title}</p>
                        <p className="text-xs text-[#6B7280]">{rel.readTime} min · {rel.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
