import { FadeIn } from "@/components/aigrid/FadeIn";

const LOGOS = [
  { name: "OpenAI", icon: "🤖" },
  { name: "Microsoft", icon: "🪟" },
  { name: "Google", icon: "🔍" },
  { name: "Meta", icon: "♾️" },
  { name: "Tesla", icon: "⚡" },
  { name: "Notion", icon: "📝" },
];

const STATS = [
  { value: "2,000+", label: "AI Tools Listed", icon: "🔧" },
  { value: "50K+",   label: "Active Users",    icon: "👥" },
  { value: "15",     label: "Categories",      icon: "📂" },
  { value: "4.8/5",  label: "User Rating",     icon: "⭐" },
];

const TESTIMONIALS = [
  {
    quote: "AIGrid saved me hours of research. Found the perfect tool in minutes.",
    author: "Sarah Chen",
    role: "Product Designer",
    avatar: "SC"
  },
  {
    quote: "The comparison feature is a game-changer. No more endless tabs.",
    author: "Marcus Rodriguez",
    role: "Software Engineer",
    avatar: "MR"
  },
  {
    quote: "Best AI tool directory out there. Clean, fast, and always up-to-date.",
    author: "Emily Watson",
    role: "Content Creator",
    avatar: "EW"
  },
];

export function SocialProof() {
  return (
    <FadeIn>
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Testimonials */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 font-heading">Loved by Builders</h2>
            <p className="text-gray-500">Join thousands of professionals finding their perfect AI tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.author} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/30 to-white border border-blue-100/50 hover:border-brand/30 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-semibold text-sm">
                      {t.avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 text-sm">{t.author}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
