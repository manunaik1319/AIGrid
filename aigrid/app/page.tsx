import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrendingSection } from "@/components/home/TrendingSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { NewThisWeek } from "@/components/home/NewThisWeek";
import { ResourceCards } from "@/components/home/ResourceCards";
import { TrustedBy } from "@/components/home/TrustedBy";
import { SocialProof } from "@/components/home/SocialProof";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import { TRENDING_TOOLS, NEW_TOOLS, CATEGORIES } from "@/lib/placeholder-data";

// SSG with 1-hour revalidation
export const revalidate = 3600;

export default function HomePage() {
  // Serialize categories data (exclude icon functions)
  const serializedCategories = CATEGORIES.map(cat => ({
    slug: cat.slug,
    label: cat.label,
    count: cat.count,
    featuredTools: cat.featuredTools,
  }));

  return (
    <>
      <Navbar />
      <main className="bg-grid-pattern min-h-screen">
        <HeroSection />
        <TrendingSection tools={TRENDING_TOOLS} />
        <TrustedBy />
        <CategoryGrid categories={serializedCategories} />
        <NewThisWeek tools={NEW_TOOLS} />
        <ResourceCards />
        <SocialProof />
        <NewsletterBanner />
      </main>
      <Footer />
    </>
  );
}
