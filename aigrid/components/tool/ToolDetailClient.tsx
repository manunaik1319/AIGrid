"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ToolCard } from "@/components/aigrid/ToolCard";
import type { ToolDetail } from "@/lib/tool-detail-data";
import type { Tool } from "@/components/aigrid/ToolCard";

interface ToolDetailClientProps {
  tool: ToolDetail;
  similarTools: Tool[];
}

export function ToolDetailClient({ tool, similarTools }: ToolDetailClientProps) {
  const [saved, setSaved] = useState(false);
  const [compared, setCompared] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "pricing" | "reviews">("overview");
  const [annualBilling, setAnnualBilling] = useState(true);
  const [visibleReviews, setVisibleReviews] = useState(5);

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? "Tool removed from saved" : "Tool saved!", {
      icon: saved ? "💔" : "❤️",
    });
  };

  const handleCompare = () => {
    setCompared(!compared);
    toast.success(compared ? "Removed from compare" : "Added to compare!");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${tool.name} on AIGrid`);
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  // Calculate rating breakdown
  const ratingBreakdown = [
    { stars: 5, count: Math.floor(tool.reviewCount * 0.65) },
    { stars: 4, count: Math.floor(tool.reviewCount * 0.25) },
    { stars: 3, count: Math.floor(tool.reviewCount * 0.07) },
    { stars: 2, count: Math.floor(tool.reviewCount * 0.02) },
    { stars: 1, count: Math.floor(tool.reviewCount * 0.01) },
  ];

  return (
    <>
      <Toaster position="top-center" />
      
      {/* Desktop Layout */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Column - Main Content */}
          <div className="flex-1 min-w-0">
            <ToolHeader tool={tool} />
            <ToolDescription description={tool.description} />
            <ToolFeatures features={tool.features} />
            <ToolPricing 
              plans={tool.pricingPlans} 
              annualBilling={annualBilling}
              setAnnualBilling={setAnnualBilling}
            />
            <ToolUsageGuide steps={tool.usageSteps} prompts={tool.samplePrompts} toolName={tool.name} />
            <ToolChangelog changelog={tool.changelog} />
            <ToolReviews 
              reviews={tool.reviews}
              rating={tool.rating}
              reviewCount={tool.reviewCount}
              ratingBreakdown={ratingBreakdown}
              visibleReviews={visibleReviews}
              setVisibleReviews={setVisibleReviews}
            />
          </div>

          {/* Right Column - Sticky Sidebar */}
          <aside className="w-[380px] flex-shrink-0">
            <div className="sticky top-20">
              <ToolSidebar 
                tool={tool}
                saved={saved}
                compared={compared}
                onSave={handleSave}
                onCompare={handleCompare}
                onCopyLink={handleCopyLink}
                onShare={handleShare}
              />
            </div>
          </aside>
        </div>

        {/* Similar Tools */}
        <SimilarTools tools={similarTools} />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <ToolHeader tool={tool} mobile />
        </div>

        {/* Mobile Tabs */}
        <div className="sticky top-16 z-20 bg-white border-b border-gray-200">
          <div className="flex">
            {(["overview", "pricing", "reviews"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "text-brand border-b-2 border-brand"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-6 pb-24">
          {activeTab === "overview" && (
            <>
              <ToolDescription description={tool.description} />
              <ToolFeatures features={tool.features} />
              <ToolUsageGuide steps={tool.usageSteps} prompts={tool.samplePrompts} toolName={tool.name} />
              <ToolChangelog changelog={tool.changelog} />
            </>
          )}
          {activeTab === "pricing" && (
            <ToolPricing 
              plans={tool.pricingPlans}
              annualBilling={annualBilling}
              setAnnualBilling={setAnnualBilling}
            />
          )}
          {activeTab === "reviews" && (
            <ToolReviews 
              reviews={tool.reviews}
              rating={tool.rating}
              reviewCount={tool.reviewCount}
              ratingBreakdown={ratingBreakdown}
              visibleReviews={visibleReviews}
              setVisibleReviews={setVisibleReviews}
            />
          )}
        </div>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className={`p-3 rounded-lg border transition-colors ${
                saved ? "bg-red-50 border-red-200 text-red-600" : "border-gray-200 text-gray-600"
              }`}
            >
              <svg className="w-5 h-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-brand text-white text-center font-semibold rounded-lg hover:bg-brand-dark transition-colors"
            >
              Visit {tool.name}
            </a>
          </div>
        </div>

        {/* Similar Tools */}
        <div className="px-4 pb-8">
          <SimilarTools tools={similarTools} />
        </div>
      </div>
    </>
  );
}

// Component sections will be defined below...

// Tool Header Component
function ToolHeader({ tool, mobile = false }: { tool: ToolDetail; mobile?: boolean }) {
  return (
    <div className={mobile ? "space-y-3" : "bg-white rounded-2xl border border-gray-200 p-8 mb-6"}>
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
          {tool.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{tool.name}</h1>
          <p className="text-lg md:text-xl text-gray-500">{tool.tagline}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          {tool.category.replace(/-/g, " ")}
        </span>
        {tool.platforms.map(platform => (
          <span key={platform} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {platform}
          </span>
        ))}
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          tool.pricingModel === "Free" ? "bg-green-100 text-green-700" :
          tool.pricingModel === "Freemium" ? "bg-amber-100 text-amber-700" :
          "bg-red-100 text-red-700"
        }`}>
          {tool.pricingModel}
        </span>
        {tool.verified && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-6 h-6 ${i < Math.floor(tool.rating) ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-2xl font-bold text-gray-900">{tool.rating}</span>
        <a href="#reviews" className="text-sm text-brand hover:underline">
          {tool.reviewCount.toLocaleString()} reviews
        </a>
      </div>
    </div>
  );
}

// Tool Description Component
function ToolDescription({ description }: { description: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <div className="prose prose-gray max-w-none">
        {description.split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) {
            return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('### ')) {
            return <h3 key={i} className="text-xl font-semibold text-gray-900 mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
          }
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n');
            return (
              <ul key={i} className="list-disc list-inside space-y-1 text-gray-600">
                {items.map((item, j) => (
                  <li key={j}>{item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
                ))}
              </ul>
            );
          }
          return <p key={i} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>;
        })}
      </div>
    </div>
  );
}

// Tool Features Component
function ToolFeatures({ features }: { features: string[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tool Pricing Component
function ToolPricing({ plans, annualBilling, setAnnualBilling }: {
  plans: any[];
  annualBilling: boolean;
  setAnnualBilling: (value: boolean) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Pricing Plans</h2>
        <div className="flex items-center gap-3">
          <span className={`text-sm ${!annualBilling ? "font-semibold text-gray-900" : "text-gray-500"}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnualBilling(!annualBilling)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              annualBilling ? "bg-brand" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                annualBilling ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm ${annualBilling ? "font-semibold text-gray-900" : "text-gray-500"}`}>
            Annual
          </span>
          {annualBilling && (
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Save 20%
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-xl border-2 p-6 ${
              plan.popular
                ? "border-brand shadow-lg"
                : plan.free
                ? "border-green-200 bg-green-50/30"
                : "border-gray-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand text-white">
                  Most Popular
                </span>
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-gray-900">
                {annualBilling ? plan.price : (plan.priceMonthly || plan.price)}
              </span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{plan.limits}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature: string, j: number) => (
                <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                plan.popular
                  ? "bg-brand text-white hover:bg-brand-dark"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tool Usage Guide Component
function ToolUsageGuide({ steps, prompts, toolName }: {
  steps: string[];
  prompts: string[];
  toolName: string;
}) {
  const [showPrompts, setShowPrompts] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use {toolName}</h2>
      <ol className="space-y-4 mb-8">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-semibold">
              {i + 1}
            </span>
            <span className="text-gray-700 pt-1">{step}</span>
          </li>
        ))}
      </ol>

      <button
        onClick={() => setShowPrompts(!showPrompts)}
        className="flex items-center gap-2 text-brand font-semibold hover:text-brand-dark transition-colors"
      >
        <svg
          className={`w-5 h-5 transition-transform ${showPrompts ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        Sample Prompts
      </button>

      {showPrompts && (
        <div className="mt-4 space-y-3">
          {prompts.map((prompt, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-sm text-gray-700">
              {prompt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Tool Changelog Component
function ToolChangelog({ changelog }: { changelog: any[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Updates</h2>
      <div className="space-y-6">
        {changelog.map((entry, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-brand mt-2" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                  {entry.version}
                </span>
                <span className="text-sm text-gray-500">{entry.date}</span>
              </div>
              <p className="text-gray-700">{entry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tool Reviews Component
function ToolReviews({ reviews, rating, reviewCount, ratingBreakdown, visibleReviews, setVisibleReviews }: {
  reviews: any[];
  rating: number;
  reviewCount: number;
  ratingBreakdown: any[];
  visibleReviews: number;
  setVisibleReviews: (value: number) => void;
}) {
  return (
    <div id="reviews" className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Reviews</h2>

      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-gray-200">
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-gray-900 mb-2">{rating}</div>
          <div className="flex items-center gap-1 justify-center md:justify-start mb-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-500">{reviewCount.toLocaleString()} reviews</p>
        </div>

        <div className="flex-1 space-y-2">
          {ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-12">{item.stars} star</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${(item.count / reviewCount) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-500 w-12 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full md:w-auto px-6 py-2 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors mb-8">
        Write a Review
      </button>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.slice(0, visibleReviews).map((review) => (
          <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-semibold flex-shrink-0">
                {review.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900">{review.author}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 mb-3">{review.body}</p>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleReviews < reviews.length && (
        <button
          onClick={() => setVisibleReviews(visibleReviews + 5)}
          className="w-full mt-6 px-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-brand hover:text-brand transition-colors"
        >
          Load More Reviews ({reviews.length - visibleReviews} remaining)
        </button>
      )}
    </div>
  );
}

// Tool Sidebar Component
function ToolSidebar({ tool, saved, compared, onSave, onCompare, onCopyLink, onShare }: {
  tool: ToolDetail;
  saved: boolean;
  compared: boolean;
  onSave: () => void;
  onCompare: () => void;
  onCopyLink: () => void;
  onShare: (platform: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <a
        href={tool.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full px-6 py-3 bg-brand text-white text-center font-semibold rounded-lg hover:bg-brand-dark transition-colors"
      >
        Visit {tool.name}
      </a>

      <div className="flex gap-2">
        <button
          onClick={onSave}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            saved
              ? "bg-red-50 border-red-200 text-red-600"
              : "border-gray-200 text-gray-600 hover:border-brand hover:text-brand"
          }`}
        >
          <svg className="w-5 h-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Save
        </button>
        <button
          onClick={onCompare}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            compared
              ? "bg-brand-pale border-brand text-brand"
              : "border-gray-200 text-gray-600 hover:border-brand hover:text-brand"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
          </svg>
          Compare
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(tool.rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900">{tool.rating}</span>
          <span className="text-sm text-gray-500">({tool.reviewCount.toLocaleString()})</span>
        </div>

        {tool.pricingPlans[0].free && (
          <p className="text-sm text-green-600 font-medium mb-3">✓ Free tier available</p>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Facts</h3>
        {Object.entries(tool.quickFacts).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-500">{key}:</span>
            <span className="font-medium text-gray-900">{value}</span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Share</h3>
        <div className="flex gap-2">
          <button
            onClick={onCopyLink}
            className="flex-1 p-2 border border-gray-200 rounded-lg hover:border-brand hover:text-brand transition-colors"
            title="Copy link"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={() => onShare("twitter")}
            className="flex-1 p-2 border border-gray-200 rounded-lg hover:border-brand hover:text-brand transition-colors"
            title="Share on Twitter"
          >
            <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </button>
          <button
            onClick={() => onShare("linkedin")}
            className="flex-1 p-2 border border-gray-200 rounded-lg hover:border-brand hover:text-brand transition-colors"
            title="Share on LinkedIn"
          >
            <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <a href="#" className="text-sm text-gray-500 hover:text-brand transition-colors">
          Report an issue
        </a>
      </div>
    </div>
  );
}

// Similar Tools Component
function SimilarTools({ tools }: { tools: Tool[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Tools You Might Like</h2>
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-4 pb-4">
          {tools.map((tool) => (
            <div key={tool.id} className="w-80 flex-shrink-0">
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
