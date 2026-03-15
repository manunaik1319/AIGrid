import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryClient } from "@/components/category/CategoryClient";
import { CATEGORY_CONFIG, getCategoryBySlug } from "@/lib/category-config";

// ── Static generation ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return CATEGORY_CONFIG.map(c => ({ slug: c.slug }));
}

// ── SEO metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "Category Not Found — AIGrid" };

  const title       = `Best ${category.label} AI Tools — AIGrid`;
  const description = category.description;
  const ogImage     = `/og/category/${params.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/category/${params.slug}`,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  return (
    <NuqsAdapter>
      <Navbar />
      <main className="min-h-screen bg-gray-50 bg-grid-pattern">
        {/* Hero — server-rendered, no CLS */}
        <CategoryHero categorySlug={params.slug} />

        {/* Interactive results — client boundary */}
        <Suspense>
          <CategoryClient categorySlug={params.slug} />
        </Suspense>
      </main>
      <Footer />
    </NuqsAdapter>
  );
}
