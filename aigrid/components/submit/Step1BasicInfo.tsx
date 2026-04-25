"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaCheckCircle, FaSearch, FaTimes } from "react-icons/fa";
import { CATEGORY_CONFIG } from "@/lib/category-config";
import { type SubmitFormData } from "@/lib/submit-schema";

const TAG_OPTIONS = [
  "assistant",
  "automation",
  "copywriting",
  "design",
  "developer-tools",
  "education",
  "image-generation",
  "meeting-notes",
  "multimodal",
  "no-code",
  "open-source",
  "productivity",
  "prompting",
  "research",
  "search",
  "seo",
  "summarization",
  "video",
  "voice",
  "workflow",
];

type NameStatus = "idle" | "checking" | "available" | "taken";

export function Step1BasicInfo({
  nameStatus,
  onNameBlur,
}: {
  nameStatus: NameStatus;
  onNameBlur: () => void;
}) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<SubmitFormData>();
  const [tagQuery, setTagQuery] = useState("");
  const nameField = register("name");

  const tagline = watch("tagline", "");
  const selectedTags = watch("tags", []);

  const availableTags = TAG_OPTIONS.filter((tag) => {
    if (selectedTags.includes(tag)) return false;
    if (!tagQuery.trim()) return true;
    return tag.toLowerCase().includes(tagQuery.toLowerCase());
  }).slice(0, 8);

  const addTag = (tag: string) => {
    if (selectedTags.includes(tag) || selectedTags.length >= 10) return;
    setValue("tags", [...selectedTags, tag], { shouldValidate: true, shouldDirty: true });
    setTagQuery("");
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      selectedTags.filter((value) => value !== tag),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Step 1</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Basic info</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Start with the core details reviewers and visitors will see first.
        </p>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">Tool Name</label>
          <div className="relative">
            <input
              {...nameField}
              onBlur={(event) => {
                nameField.onBlur(event);
                onNameBlur();
              }}
              type="text"
              placeholder="e.g. PromptPilot"
              className={[
                "w-full rounded-2xl border px-4 py-3 pr-12 text-sm outline-none transition",
                errors.name ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-blue-500",
              ]
                .filter(Boolean)
                .join(" ")}
            />
            {nameStatus === "available" && !errors.name && (
              <FaCheckCircle className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500" />
            )}
          </div>
          {nameStatus === "checking" && (
            <p className="mt-2 text-sm text-slate-500">Checking availability...</p>
          )}
          {nameStatus === "available" && !errors.name && (
            <p className="mt-2 text-sm font-medium text-emerald-600">This name is available.</p>
          )}
          {nameStatus === "taken" && (
            <p className="mt-2 text-sm font-medium text-red-600">That name is already listed on AIGrid.</p>
          )}
          {errors.name && <p className="mt-2 text-sm font-medium text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-semibold text-slate-800">Tagline</label>
            <span className="text-xs font-medium text-slate-500">{tagline.length}/80</span>
          </div>
          <input
            {...register("tagline")}
            type="text"
            placeholder="A clear one-line value proposition"
            className={[
              "w-full rounded-2xl border px-4 py-3 text-sm outline-none transition",
              errors.tagline ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-blue-500",
            ]
              .filter(Boolean)
              .join(" ")}
          />
          {errors.tagline && <p className="mt-2 text-sm font-medium text-red-600">{errors.tagline.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">Full Description</label>
          <textarea
            {...register("description")}
            rows={7}
            placeholder="Describe what your tool does, who it is for, and what makes it stand out. Markdown is supported."
            className={[
              "w-full rounded-3xl border px-4 py-3 text-sm leading-6 outline-none transition",
              errors.description ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-blue-500",
            ]
              .filter(Boolean)
              .join(" ")}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Markdown-enabled</span>
            <span>{watch("description", "").length} characters</span>
          </div>
          {errors.description && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Primary Category</label>
            <select
              {...register("primaryCategory")}
              className={[
                "w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition",
                errors.primaryCategory ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-blue-500",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <option value="">Select a category</option>
              {CATEGORY_CONFIG.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.primaryCategory && (
              <p className="mt-2 text-sm font-medium text-red-600">{errors.primaryCategory.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Secondary Category</label>
            <select
              {...register("secondaryCategory")}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            >
              <option value="">Optional</option>
              {CATEGORY_CONFIG.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-semibold text-slate-800">Tags</label>
            <span className="text-xs font-medium text-slate-500">{selectedTags.length}/10</span>
          </div>

          <div className="rounded-3xl border border-slate-200 p-3">
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-slate-400 transition hover:text-slate-700">
                    <FaTimes className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="relative mt-3">
              <FaSearch className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                value={tagQuery}
                onChange={(event) => setTagQuery(event.target.value)}
                placeholder="Search tags"
                className="w-full rounded-2xl bg-slate-50 px-10 py-3 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  disabled={selectedTags.length >= 10}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {errors.tags && <p className="mt-2 text-sm font-medium text-red-600">{errors.tags.message}</p>}
        </div>
      </div>
    </div>
  );
}
