"use client";

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FaGripLines, FaPlus, FaTimes } from "react-icons/fa";
import { type SubmitFormData } from "@/lib/submit-schema";

const PRICING_MODELS: SubmitFormData["pricingModel"][] = ["Free", "Freemium", "Paid", "API-only"];

export function Step2FeaturesPricing() {
  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<SubmitFormData>();
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const pricingModel = watch("pricingModel");
  const isOpenSource = watch("isOpenSource");
  const features = watch("features");

  const {
    fields: planFields,
    append: appendPlan,
    remove: removePlan,
  } = useFieldArray({
    control,
    name: "plans",
  });

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Step 2</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Features & pricing</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Show what the tool does best and how people pay for it.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-800">Feature list builder</label>
          <span className="text-xs font-medium text-slate-500">{features.length}/10</span>
        </div>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <div
              key={`${index}-${feature}`}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (dragIndex === null || dragIndex === index) return;
                const next = [...features];
                const [moved] = next.splice(dragIndex, 1);
                next.splice(index, 0, moved);
                setValue("features", next, { shouldDirty: true, shouldValidate: true });
                setDragIndex(null);
              }}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3"
            >
              <span className="cursor-grab text-slate-400">
                <FaGripLines className="h-4 w-4" />
              </span>
              <input
                value={feature}
                onChange={(event) => {
                  const next = [...features];
                  next[index] = event.target.value;
                  setValue("features", next, { shouldDirty: true, shouldValidate: true });
                }}
                placeholder="e.g. Team workspaces"
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setValue(
                    "features",
                    features.filter((_, featureIndex) => featureIndex !== index),
                    { shouldDirty: true, shouldValidate: true },
                  )
                }
                className="rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <FaTimes className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {features.length < 10 && (
          <button
            type="button"
            onClick={() => setValue("features", [...features, ""], { shouldDirty: true, shouldValidate: true })}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            <FaPlus className="h-3.5 w-3.5" />
            Add Feature
          </button>
        )}
        {errors.features && <p className="text-sm font-medium text-red-600">{errors.features.message}</p>}
      </section>

      <section className="space-y-4">
        <label className="block text-sm font-semibold text-slate-800">Pricing Model</label>
        <div className="grid gap-3 sm:grid-cols-4">
          {PRICING_MODELS.map((model) => (
            <label
              key={model}
              className={[
                "cursor-pointer rounded-2xl border px-4 py-4 text-center transition",
                pricingModel === model
                  ? "border-blue-600 bg-blue-50 text-blue-700 shadow-[0_0_0_3px_rgba(37,99,235,0.08)]"
                  : "border-slate-200 text-slate-700 hover:border-slate-300",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <input {...register("pricingModel")} type="radio" value={model} className="sr-only" />
              <span className="text-sm font-semibold">{model}</span>
            </label>
          ))}
        </div>
      </section>

      {(pricingModel === "Freemium" || pricingModel === "Paid") && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-800">Plans table builder</label>
            <button
              type="button"
              onClick={() =>
                appendPlan({
                  name: "",
                  priceMonthly: "",
                  priceYearly: "",
                  limits: "",
                  ctaLabel: "",
                })
              }
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              <FaPlus className="h-3.5 w-3.5" />
              Add Plan
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Plan Name</th>
                    <th className="px-4 py-3 font-semibold">Price/mo</th>
                    <th className="px-4 py-3 font-semibold">Price/yr</th>
                    <th className="px-4 py-3 font-semibold">Key Limits</th>
                    <th className="px-4 py-3 font-semibold">CTA Label</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {planFields.map((field, index) => (
                    <tr key={field.id} className="bg-white">
                      <td className="px-4 py-3">
                        <input {...register(`plans.${index}.name`)} className="w-full outline-none" placeholder="Starter" />
                      </td>
                      <td className="px-4 py-3">
                        <input {...register(`plans.${index}.priceMonthly`)} className="w-full outline-none" placeholder="$19" />
                      </td>
                      <td className="px-4 py-3">
                        <input {...register(`plans.${index}.priceYearly`)} className="w-full outline-none" placeholder="$190" />
                      </td>
                      <td className="px-4 py-3">
                        <input {...register(`plans.${index}.limits`)} className="w-full outline-none" placeholder="5 seats, 10k credits" />
                      </td>
                      <td className="px-4 py-3">
                        <input {...register(`plans.${index}.ctaLabel`)} className="w-full outline-none" placeholder="Start free trial" />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => removePlan(index)}
                          className="rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <FaTimes className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {errors.plans && <p className="text-sm font-medium text-red-600">{errors.plans.message}</p>}
        </section>
      )}

      <section className="grid gap-4 md:grid-cols-2">
        <label className="rounded-3xl border border-slate-200 p-5">
          <div className="flex items-start gap-3">
            <input {...register("hasFreeTier")} type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
            <div>
              <span className="block text-sm font-semibold text-slate-900">Free tier available?</span>
              <span className="mt-1 block text-sm text-slate-500">Check this if users can get started without paying.</span>
            </div>
          </div>
        </label>

        <div className="rounded-3xl border border-slate-200 p-5">
          <label className="flex items-start gap-3">
            <input {...register("isOpenSource")} type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
            <div>
              <span className="block text-sm font-semibold text-slate-900">Open Source?</span>
              <span className="mt-1 block text-sm text-slate-500">Share the repository if the source code is public.</span>
            </div>
          </label>

          {isOpenSource && (
            <div className="mt-4">
              <input
                {...register("openSourceUrl")}
                placeholder="https://github.com/your-org/your-repo"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
              {errors.openSourceUrl && (
                <p className="mt-2 text-sm font-medium text-red-600">{errors.openSourceUrl.message}</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
