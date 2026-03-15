import type { Metadata } from "next";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { NewToolsClient } from "@/components/new/NewToolsClient";
import { NEW_TOOLS_FEED } from "@/lib/new-tools-data";

// ISR — regenerate every 30 minutes
export const revalidate = 1800;

export const metadata: Metadata = {
  title: "New AI Tools — AIGrid",
  description: "Discover the latest AI tools added to AIGrid. Stay up-to-date with new releases across all categories.",
  openGraph: {
    title: "New AI Tools — AIGrid",
    description: "The latest AI tools added to the directory.",
    images: [{ url: "/og/new", width: 1200, height: 630 }],
  },
};

export default function NewToolsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 bg-grid-pattern">
        {/* Page header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl leading-none" aria-hidden="true">✨</span>
              <h1 className="text-3xl font-bold text-gray-900">New AI Tools</h1>
            </div>
            <p className="text-gray-500 text-base">
              The latest additions to AIGrid — fresh tools added daily
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <NewToolsClient tools={NEW_TOOLS_FEED} />
        </div>
      </main>
      <Footer />
    </>
  );
}
