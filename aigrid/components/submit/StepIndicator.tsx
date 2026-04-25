"use client";

import { FaCheck } from "react-icons/fa";

const STEPS = [
  "Basic Info",
  "Features",
  "Links & Media",
  "Preview",
  "Submit",
];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="border-b border-slate-200 bg-slate-50/90 px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="relative flex items-start justify-between gap-2">
          <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-slate-200" />
          <div
            className="absolute left-0 top-5 h-1 rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />

          {STEPS.map((label, index) => {
            const stepNumber = index + 1;
            const isComplete = currentStep > stepNumber;
            const isCurrent = currentStep === stepNumber;

            return (
              <div key={label} className="relative z-10 flex max-w-[88px] flex-1 flex-col items-center text-center sm:max-w-none">
                <div
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                    isComplete && "border-blue-600 bg-blue-600 text-white",
                    isCurrent && "border-blue-600 bg-blue-600 text-white shadow-[0_0_0_6px_rgba(37,99,235,0.12)]",
                    !isComplete && !isCurrent && "border-slate-300 bg-white text-slate-500",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isComplete ? <FaCheck className="h-3.5 w-3.5" /> : stepNumber}
                </div>
                <span
                  className={[
                    "mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs",
                    isCurrent || isComplete ? "text-slate-900" : "text-slate-500",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
