"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FaPenNib, 
  FaPalette, 
  FaCode, 
  FaMusic, 
  FaVideo, 
  FaBolt, 
  FaFlask, 
  FaPuzzlePiece 
} from "react-icons/fa";

interface CategoryItemProps {
  slug: string;
  label: string;
  count: number;
  featuredTools: { name: string; url: string }[];
}

interface Props { categories: CategoryItemProps[]; }

// Map slugs to icon components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "text-writing": FaPenNib,
  "image-generation": FaPalette,
  "code-dev": FaCode,
  "audio-music": FaMusic,
  "video-generation": FaVideo,
  "productivity": FaBolt,
  "research": FaFlask,
  "data-analytics": FaPuzzlePiece,
};

export function CategoryGrid({ categories }: Props) {
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-14 px-4 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const searchUrl = `/search?category=${cat.slug}`;
            const Icon = iconMap[cat.slug] || FaPuzzlePiece;
            
            return (
              <div
                key={cat.slug + cat.label}
                role="button"
                tabIndex={0}
                onClick={() => router.push(searchUrl)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") router.push(searchUrl); }}
                className="group relative flex flex-col items-center p-6 rounded-3xl bg-gradient-to-b from-[#F0F7FF] to-[#E2EDFF] border border-white shadow-xl shadow-blue-900/5 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/10 cursor-pointer"
              >
                {/* Category Icon Area */}
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">
                  <div className="w-14 h-14 rounded-xl bg-white shadow-inner flex items-center justify-center text-brand">
                    <Icon className="w-7 h-7" />
                  </div>
                </div>

                {/* Label & Count */}
                <div className="text-center mb-4">
                  <p className="text-xl font-extrabold text-[#1E293B] mb-0.5 tracking-tight">{cat.label}</p>
                  <p className="text-[10px] font-bold text-[#64748B] tracking-[0.15em] uppercase">{cat.count} TOOLS</p>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-slate-200/50 mb-6" />
                
                {/* Featured tools list */}
                <div className="w-full flex flex-col gap-2.5">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] text-center mb-0.5">Top Tools</p>
                  {cat.featuredTools.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-100/50 shadow-sm hover:shadow transition-all py-2 px-3 rounded-lg w-full group/tool"
                    >
                      <div className="w-5 h-5 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-[9px] text-slate-400 group-hover/tool:text-blue-500 transition-colors">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-[12px] font-semibold text-slate-600 group-hover/tool:text-blue-600 transition-colors truncate">
                        {tool.name}
                      </span>
                    </a>
                  ))}
                </div>

                {/* Decorative Bottom: Dots & Arrow */}
                <div className="flex items-center justify-center gap-2 mt-6 mb-1">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                  </div>
                  <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Subtle Branding Bottom right of card */}
                <div className="absolute bottom-3 right-4 opacity-20 group-hover:opacity-40 transition-opacity flex items-center gap-1">
                   <div className="w-3 h-3 rounded-[2px] bg-blue-600 flex items-center justify-center text-[8px] text-white font-bold">A</div>
                   <span className="text-[8px] font-bold tracking-tighter text-blue-900 uppercase">AIGrid</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
