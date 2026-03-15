import type { Metadata } from "next";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { TrendingClient } from "@/components/trending/TrendingClient";
import { TRENDING_ENTRIES } from "@/lib/trending-data";

// ISR — regenerate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Trending AI Tools This Week — AIGrid",
  description: "See which AI tools the community is saving and using most this week, month, and all time.",
  openGraph: {
    title: "Trending AI Tools — AIGrid",
    description: "The most-saved AI tools ranked by community activity.",
    images: [{ url: "/og/trending", width: 1200, height: 630 }],
  },
};

export default function TrendingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 bg-grid-pattern">
        {/* Page header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl leading-none" aria-hidden="true">🔥</span>
              <h1 className="text-3xl font-bold text-gray-900">Trending AI Tools</h1>
            </div>
            <p className="text-gray-500 text-base">
              What the community is saving and using this week
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <TrendingClient entries={TRENDING_ENTRIES} />
        </div>
      </main>
      <Footer />
    </>
  );
}
