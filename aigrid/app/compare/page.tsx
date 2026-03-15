import { Suspense } from "react";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { ComparisonClient } from "@/components/compare/ComparisonClient";

export const metadata = {
  title: "Compare AI Tools | AIGrid",
  description: "Side-by-side comparison of AI tools",
};

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-600">Loading comparison...</div></div>}>
        <main className="min-h-screen bg-gray-50">
          <ComparisonClient />
        </main>
      </Suspense>
      <Footer />
    </>
  );
}
