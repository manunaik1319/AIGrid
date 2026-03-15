import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { SearchClient } from "@/components/search/SearchClient";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const q = searchParams.q ?? "";

  return (
    <NuqsAdapter>
      <Navbar />
      <main className="min-h-screen bg-gray-50 bg-grid-pattern pt-2">
        <Suspense>
          <SearchClient initialQuery={q} />
        </Suspense>
      </main>
      <Footer />
    </NuqsAdapter>
  );
}
