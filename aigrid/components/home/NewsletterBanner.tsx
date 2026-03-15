"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-14 px-4 bg-[#EFF6FF] border-y border-blue-100"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get the weekly AI tools digest</h2>
        <p className="text-gray-500 text-sm mb-7">
          Every Monday — the best new tools, trending picks, and workflow ideas. No spam.
        </p>

        {subscribed ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-full font-semibold text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            You&apos;re subscribed!
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 h-11 px-4 text-sm border border-gray-200 rounded-full outline-none focus:border-[#1A56DB] bg-white w-full shadow-sm"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="h-11 px-7 bg-[#1A56DB] hover:bg-[#1E40AF] text-white text-sm font-semibold rounded-full active:scale-95 transition-all shadow-md shadow-blue-200 shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </motion.section>
  );
}
