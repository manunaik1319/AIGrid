"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { FaBook, FaGlobe, FaGithub, FaLink, FaUpload } from "react-icons/fa";
import { type SubmitFormData } from "@/lib/submit-schema";

async function cropImageToSquare(file: File) {
  if (file.type === "image/svg+xml") {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Could not read the SVG file."));
      reader.readAsDataURL(file);
    });
  }

  const bitmap = await createImageBitmap(file);
  const size = Math.min(bitmap.width, bitmap.height);
  const offsetX = (bitmap.width - size) / 2;
  const offsetY = (bitmap.height - size) / 2;
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 320;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not prepare the image preview.");
  }

  context.drawImage(bitmap, offsetX, offsetY, size, size, 0, 0, 320, 320);
  return canvas.toDataURL("image/png", 0.92);
}

export function Step3LinksMedia() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<SubmitFormData>();
  const [uploadError, setUploadError] = useState("");

  const logoUrl = watch("logoUrl");

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const cropped = await cropImageToSquare(file);
      setValue("logoUrl", cropped, { shouldDirty: true, shouldValidate: true });
      setUploadError("");
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
    }
  };

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/svg+xml": [".svg"],
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
    onDrop,
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0];
      if (!rejection) return;
      setUploadError(rejection.errors[0]?.message || "Please upload a PNG or SVG under 2MB.");
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Step 3</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Links & media</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Add the URLs and brand assets people will use to trust and explore the tool.
        </p>
      </div>

      <div className="grid gap-6">
        <Field
          icon={<FaGlobe className="h-4 w-4" />}
          label="Website URL"
          error={errors.websiteUrl?.message}
        >
          <input
            {...register("websiteUrl")}
            placeholder="https://yourtool.com"
            className="w-full bg-transparent text-sm outline-none"
          />
        </Field>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">Logo Upload</label>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div
              {...getRootProps()}
              className={[
                "flex min-h-[170px] flex-1 cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed px-6 text-center transition",
                isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/60",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <input {...getInputProps()} />
              <FaUpload className="h-8 w-8 text-blue-600" />
              <p className="mt-4 text-sm font-semibold text-slate-800">
                Drop PNG or SVG here or click to upload
              </p>
              <p className="mt-1 text-xs text-slate-500">Max 2MB, auto-crops to square</p>
            </div>

            <div className="flex min-w-[120px] flex-col items-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                {logoUrl ? (
                  <Image src={logoUrl} alt="Logo preview" width={80} height={80} unoptimized className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Preview</span>
                )}
              </div>
            </div>
          </div>
          {(errors.logoUrl?.message || uploadError) && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.logoUrl?.message || uploadError}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field icon={<FaLink className="h-4 w-4" />} label="Twitter/X URL" error={errors.twitterUrl?.message}>
            <input {...register("twitterUrl")} placeholder="https://x.com/yourtool" className="w-full bg-transparent text-sm outline-none" />
          </Field>
          <Field icon={<FaGithub className="h-4 w-4" />} label="GitHub URL" error={errors.githubUrl?.message}>
            <input {...register("githubUrl")} placeholder="https://github.com/your-org" className="w-full bg-transparent text-sm outline-none" />
          </Field>
          <Field icon={<FaBook className="h-4 w-4" />} label="Documentation URL" error={errors.docsUrl?.message}>
            <input {...register("docsUrl")} placeholder="https://docs.yourtool.com" className="w-full bg-transparent text-sm outline-none" />
          </Field>
          <Field icon={<FaBook className="h-4 w-4" />} label="API Docs URL" error={errors.apiDocsUrl?.message}>
            <input {...register("apiDocsUrl")} placeholder="https://developers.yourtool.com" className="w-full bg-transparent text-sm outline-none" />
          </Field>
        </div>
      </div>
    </div>
  );
}

function Field({
  children,
  error,
  icon,
  label,
}: {
  children: ReactNode;
  error?: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-800">{label}</label>
      <div
        className={[
          "flex items-center gap-3 rounded-2xl border px-4 py-3 transition",
          error ? "border-red-300" : "border-slate-200 focus-within:border-blue-500",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="text-slate-400">{icon}</span>
        {children}
      </div>
      {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
