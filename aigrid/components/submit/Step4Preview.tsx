"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { FaExclamationTriangle } from "react-icons/fa";
import { ToolListCard } from "@/components/search/ToolListCard";
import { CategoryBadge, PricingBadge } from "@/components/aigrid/Badge";
import { type SearchTool } from "@/lib/mock-tools";
import { type SubmitFormData } from "@/lib/submit-schema";
import { getCategoryBySlug } from "@/lib/category-config";

export function Step4Preview() {
  const { watch } = useFormContext<SubmitFormData>();
  const values = watch();
  const badgeCategory = getCategoryBySlug(values.primaryCategory)?.toolSlug || "data-analytics";

  const previewTool: SearchTool = {
    id: "preview",
    slug: "preview",
    name: values.name || "Your tool name",
    tagline: values.tagline || "Your tagline will appear here.",
    logoUrl: values.logoUrl,
    category: badgeCategory,
    pricingModel: values.pricingModel,
    rating: 4.7,
    reviewCount: 128,
    websiteUrl: values.websiteUrl || "#",
    features: values.features.filter(Boolean).slice(0, 3),
    platform: ["Web"],
    dateAdded: new Date().toISOString(),
  };

  const warnings: string[] = [];

  if (values.description.trim().length < 160) {
    warnings.push("Descriptions under 160 characters tend to underperform in directory search.");
  }
  if (values.tags.length < 3) {
    warnings.push("Add a few more tags to improve discoverability.");
  }
  if ((values.pricingModel === "Freemium" || values.pricingModel === "Paid") && values.plans.length < 2) {
    warnings.push("Adding more than one plan helps users compare options quickly.");
  }
  if (!values.docsUrl && !values.apiDocsUrl) {
    warnings.push("Documentation links help reviewers validate the product faster.");
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Step 4</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Here&apos;s how your tool will appear on AIGrid</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Review the search card, detail header, and any content warnings before submitting.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Search Result Preview</h3>
        <div className="pointer-events-none max-w-2xl">
          <ToolListCard tool={previewTool} />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Tool Detail Header Preview</h3>
        <div className="rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_55%,#f8fafc_100%)] p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              {values.logoUrl ? (
                <Image
                  src={values.logoUrl}
                  alt={`${values.name} logo`}
                  width={96}
                  height={96}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-slate-300">
                  {(values.name || "AI").slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-slate-900">{values.name || "Your tool name"}</h3>
              <p className="mt-2 max-w-2xl text-base text-slate-600">
                {values.tagline || "Your tagline will appear here."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <CategoryBadge slug={badgeCategory} />
                <PricingBadge model={values.pricingModel} />
                {values.isOpenSource && (
                  <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
                    Open Source
                  </span>
                )}
                {values.hasFreeTier && (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Free Tier
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {warnings.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Validation Warnings</h3>
          {warnings.map((warning) => (
            <div key={warning} className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
              <FaExclamationTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <p className="text-sm font-medium text-amber-900">{warning}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
