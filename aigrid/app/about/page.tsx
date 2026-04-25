import Link from "next/link";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { FiTarget, FiUsers, FiZap } from "react-icons/fi";

export const metadata = { title: "About | AIGrid", description: "Learn about AIGrid — the AI tools directory built for students." };

const VALUES = [
  { Icon: FiTarget, title: "Student-First Focus",   description: "Every tool we feature, every guide we write, and every decision we make is filtered through one question: does this genuinely help students?" },
  { Icon: FiUsers,  title: "Community Driven",       description: "AIGrid is built with input from thousands of students worldwide. Real reviews, real use cases, and real feedback shape everything we do." },
  { Icon: FiZap,    title: "Always Up to Date",      description: "The AI landscape moves fast. We update our listings weekly so you always have access to the latest tools, pricing, and features." },
];

const TEAM = [
  {
    emoji: "👨‍💻",
    name: "Bhukya Manohar",
    role: "Founder & Developer",
    bio: "Built AIGrid to help students discover the best AI tools without wasting hours searching. Student turned builder.",
    linkedin: "https://linkedin.com/in/bhukya-manohar1316",
    github: "https://github.com/manunaik1319",
  },
];

const STATS = [
  { value: "2,000+", label: "AI Tools Listed" },
  { value: "9",      label: "Categories" },
  { value: "60k+",   label: "Students Helped" },
  { value: "100+",   label: "Weekly Updates" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="bg-[#F5C842] py-20 px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A2E]/60 mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-5">About AIGrid</h1>
          <p className="text-[#1A1A2E]/70 text-lg max-w-2xl mx-auto leading-relaxed">AIGrid exists because finding the right AI tool shouldn't be a full-time job. We cut through the noise so students can spend less time searching and more time doing.</p>
        </section>

        {/* Values */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F5C842] mb-2">What We Stand For</p>
              <h2 className="text-3xl font-bold text-[#1A1A2E]">Our Mission</h2>
              <p className="text-[#6B7280] mt-3 max-w-xl mx-auto">We believe every student deserves access to the best AI tools — regardless of their budget, background, or technical skill level.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VALUES.map(({ Icon, title, description }) => (
                <div key={title} className="bg-[#F4F6F8] border border-[#E8EAED] rounded-2xl p-7 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#F5C842] rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#1A1A2E]" />
                  </div>
                  <h3 className="text-[#1A1A2E] font-bold text-lg mb-2">{title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4 bg-[#F4F6F8]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#7DD3F0] mb-2">The People</p>
              <h2 className="text-3xl font-bold text-[#1A1A2E]">Meet the Team</h2>
              <p className="text-[#6B7280] mt-3 max-w-xl mx-auto">A small, focused team of builders who were students not too long ago.</p>
            </div>
            <div className="flex justify-center">
              {TEAM.map((m) => (
                <div key={m.name} className="bg-white border border-[#E8EAED] rounded-2xl p-8 hover:shadow-md transition-shadow text-center max-w-sm w-full">
                  <div className="w-20 h-20 bg-[#7DD3F0] rounded-full flex items-center justify-center text-4xl mx-auto mb-4">{m.emoji}</div>
                  <h3 className="text-[#1A1A2E] font-bold text-xl mb-1">{m.name}</h3>
                  <p className="text-[#7DD3F0] text-sm font-semibold mb-3">{m.role}</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-5">{m.bio}</p>
                  <div className="flex items-center justify-center gap-3">
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A66C2] text-white text-xs font-semibold rounded-lg hover:bg-[#004182] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                    <a href={m.github} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A1A2E] text-white text-xs font-semibold rounded-lg hover:bg-[#2D2D44] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                      GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#1A1A2E] py-16 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-bold text-[#F5C842] mb-1">{s.value}</p>
                <p className="text-white/60 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#F5C842] py-20 px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A2E]/60 mb-3">Ready?</p>
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-4">Start Exploring AI Tools</h2>
          <p className="text-[#1A1A2E]/70 mb-8 max-w-md mx-auto">Browse 2,000+ AI tools curated specifically for students. Free, paid, and everything in between.</p>
          <Link href="/search" className="inline-flex items-center px-8 py-3 bg-[#1A1A2E] text-white font-semibold rounded-xl hover:bg-[#2D2D44] transition-colors">Browse All Tools</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
