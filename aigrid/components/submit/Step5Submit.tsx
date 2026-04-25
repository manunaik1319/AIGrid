"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaHome, FaPlus } from "react-icons/fa";

export function Step5Submit({
  isSubmitted,
  isSubmitting,
  userEmail,
  onReset,
}: {
  isSubmitted: boolean;
  isSubmitting: boolean;
  userEmail: string;
  onReset: () => void;
}) {
  if (isSubmitted) {
    return (
      <div className="py-8 text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100"
        >
          <FaCheckCircle className="h-12 w-12 text-emerald-600" />
        </motion.div>

        <h2 className="mt-6 text-3xl font-bold text-slate-900">Submission received!</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
          We&apos;ll review your submission within 48 hours and email you at{" "}
          <span className="font-semibold text-slate-900">{userEmail}</span>.
        </p>

        <div className="mx-auto mt-10 max-w-lg rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Status Tracker</p>
          <div className="mt-6 space-y-5">
            <StatusRow title="Pending Review" description="Current" active />
            <StatusRow title="Approved" description="Pending" />
            <StatusRow title="Rejected" description="Pending" />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FaPlus className="h-3.5 w-3.5" />
            Submit another tool
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FaHome className="h-3.5 w-3.5" />
            Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Step 5</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Submit</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Confirm the details below and send your tool to the AIGrid review queue.
        </p>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-lg font-semibold text-slate-900">Ready to submit?</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Once submitted, our team will review your listing and follow up at{" "}
          <span className="font-semibold text-slate-900">{userEmail}</span>.
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-6">
        <div className="text-sm text-slate-500">Pending Review will be the initial status.</div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Confirm and submit"}
          {!isSubmitting && <FaArrowRight className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

function StatusRow({
  active = false,
  description,
  title,
}: {
  active?: boolean;
  description: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={[
          "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold",
          active
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-slate-300 bg-white text-slate-400",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {active ? <FaCheckCircle className="h-3.5 w-3.5" /> : "•"}
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}
