"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { StepIndicator } from "./StepIndicator";
import { Step1BasicInfo } from "./Step1BasicInfo";
import { Step2FeaturesPricing } from "./Step2FeaturesPricing";
import { Step3LinksMedia } from "./Step3LinksMedia";
import { Step4Preview } from "./Step4Preview";
import { Step5Submit } from "./Step5Submit";
import { submitSchema, type SubmitFormData } from "@/lib/submit-schema";
import { MOCK_TOOLS } from "@/lib/mock-tools";

const STORAGE_KEY = "aigrid-submit-form";

const DEFAULT_VALUES: SubmitFormData = {
  name: "",
  tagline: "",
  description: "",
  primaryCategory: "",
  secondaryCategory: "",
  tags: [],
  features: [""],
  pricingModel: "Freemium",
  plans: [{ name: "", priceMonthly: "", priceYearly: "", limits: "", ctaLabel: "" }],
  hasFreeTier: false,
  isOpenSource: false,
  openSourceUrl: "",
  websiteUrl: "",
  logoUrl: "",
  twitterUrl: "",
  githubUrl: "",
  docsUrl: "",
  apiDocsUrl: "",
};

const STEP_FIELDS: Array<Array<keyof SubmitFormData>> = [
  ["name", "tagline", "description", "primaryCategory", "secondaryCategory", "tags"],
  ["features", "pricingModel", "plans", "hasFreeTier", "isOpenSource", "openSourceUrl"],
  ["websiteUrl", "logoUrl", "twitterUrl", "githubUrl", "docsUrl", "apiDocsUrl"],
  [],
  [],
];

type NameStatus = "idle" | "checking" | "available" | "taken";

export function SubmitWizard({ userEmail }: { userEmail: string }) {
  const [step, setStep] = useState(1);
  const [hydrated, setHydrated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nameStatus, setNameStatus] = useState<NameStatus>("idle");

  const methods = useForm<SubmitFormData>({
    resolver: zodResolver(submitSchema) as Resolver<SubmitFormData>,
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const { watch, reset, trigger, handleSubmit, getValues } = methods;
  const values = watch();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { values?: SubmitFormData; step?: number };
        reset({ ...DEFAULT_VALUES, ...parsed.values });
        if (parsed.step && parsed.step >= 1 && parsed.step <= 5) {
          setStep(parsed.step);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setHydrated(true);
  }, [reset]);

  useEffect(() => {
    if (!hydrated || submitted) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        values,
        step,
      }),
    );
  }, [hydrated, step, submitted, values]);

  const checkNameAvailability = async () => {
    const rawName = getValues("name");
    const name = rawName.trim();

    if (name.length < 2) {
      setNameStatus("idle");
      return;
    }

    setNameStatus("checking");
    await new Promise((resolve) => setTimeout(resolve, 350));

    const taken = MOCK_TOOLS.some((tool) => tool.name.toLowerCase() === name.toLowerCase());
    setNameStatus(taken ? "taken" : "available");
  };

  const goNext = async () => {
    const fields = STEP_FIELDS[step - 1];
    const isValid = fields.length ? await trigger(fields) : true;

    if (!isValid) {
      toast.error("Please fix the highlighted fields before continuing.");
      return;
    }

    if (step === 1 && nameStatus === "taken") {
      toast.error("That tool name is already in the directory.");
      return;
    }

    setStep((current) => Math.min(current + 1, 5));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    localStorage.removeItem(STORAGE_KEY);
    setSubmitted(true);
    setStep(5);
  });

  if (!hydrated) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <StepIndicator currentStep={step} />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="p-5 sm:p-8">
          {step === 1 && (
            <Step1BasicInfo
              nameStatus={nameStatus}
              onNameBlur={checkNameAvailability}
            />
          )}
          {step === 2 && <Step2FeaturesPricing />}
          {step === 3 && <Step3LinksMedia />}
          {step === 4 && <Step4Preview />}
          {step === 5 && (
            <Step5Submit
              isSubmitted={submitted}
              isSubmitting={methods.formState.isSubmitting}
              userEmail={userEmail}
              onReset={() => {
                reset(DEFAULT_VALUES);
                setSubmitted(false);
                setNameStatus("idle");
                setStep(1);
                localStorage.removeItem(STORAGE_KEY);
              }}
            />
          )}

          {!submitted && step < 5 && (
            <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className={[
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                  step === 1
                    ? "cursor-not-allowed text-slate-300"
                    : "text-slate-600 hover:bg-slate-100",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                {step === 4 ? "Continue to submit" : "Next"}
              </button>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
