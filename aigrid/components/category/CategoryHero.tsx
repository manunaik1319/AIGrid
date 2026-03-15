import { getCategoryBySlug } from "@/lib/category-config";
import { MOCK_TOOLS } from "@/lib/mock-tools";

export function CategoryHero({ categorySlug }: { categorySlug: string }) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;
  
  const Icon = category.icon;
  const count = MOCK_TOOLS.filter(t => t.category === category.toolSlug).length;

  return (
    <section
      className="relative py-16 px-4 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${category.accent} 0%, ${category.accentDark} 100%)` }}
    >
      {/* Decorative circles — explicit sizes prevent layout shift */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
      </div>

      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center gap-4">
        {/* Icon — fixed 64px to prevent CLS */}
        <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center text-5xl leading-none"
          style={{ minWidth: "5rem", minHeight: "5rem" }}>
          <Icon className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          {category.label}
        </h1>

        <p className="text-lg text-white/80 max-w-xl leading-relaxed">
          {category.description}
        </p>

        {/* Count badge */}
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/20 text-white border border-white/30">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {count} tools in this category
        </span>
      </div>
    </section>
  );
}
