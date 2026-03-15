"use client";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "1",
    title: "Search",
    desc: "Type any task or tool name. Filter by category, price, or rating.",
  },
  {
    num: "2",
    title: "Compare",
    desc: "Side-by-side comparison of features, pricing, and user reviews.",
  },
  {
    num: "3",
    title: "Build Workflows",
    desc: "Combine tools into a stack and share it with your team.",
  },
];

export function HowItWorks() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-14 px-4 bg-[#EFF6FF]"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1A56DB] text-white text-xl font-bold flex items-center justify-center shadow-lg shadow-blue-200">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-500 max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
