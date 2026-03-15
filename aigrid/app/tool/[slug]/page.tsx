import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { ToolDetailClient } from "@/components/tool/ToolDetailClient";
import { TOOL_DETAIL_MOCK, SIMILAR_TOOLS } from "@/lib/tool-detail-data";

// Generate static params for all tools
export function generateStaticParams() {
  return [{ slug: "contentai" }];
}

// SEO metadata
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  // In production, fetch tool data here
  if (params.slug !== "contentai") {
    return { title: "Tool Not Found — AIGrid" };
  }

  const tool = TOOL_DETAIL_MOCK;
  const title = `${tool.name} — ${tool.tagline} | AIGrid`;
  const description = tool.tagline;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: `/og/tool/${params.slug}`, width: 1200, height: 630 }],
    },
  };
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  // In production, fetch tool data based on slug
  if (params.slug !== "contentai") {
    notFound();
  }

  const tool = TOOL_DETAIL_MOCK;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 bg-grid-pattern">
        <ToolDetailClient tool={tool} similarTools={SIMILAR_TOOLS} />
      </main>
      <Footer />
    </>
  );
}
