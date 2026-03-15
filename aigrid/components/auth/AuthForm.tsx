"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { OAuthButtons } from "./OAuthButtons";

function AIGridLogo() {
  return (
    <svg width="110" height="28" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AIGrid" className="mx-auto">
      <rect width="28" height="28" rx="6" fill="#1A56DB" />
      <text x="5" y="20" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="14" fill="white">AI</text>
      <text x="36" y="20" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="16" fill="#1A56DB">Grid</text>
    </svg>
  );
}

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-lg p-8">
      {/* Logo */}
      <div className="mb-8">
        <AIGridLogo />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("signin")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "signin"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab("signup")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "signup"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* OAuth Buttons */}
      <OAuthButtons />

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        {activeTab === "signin" ? (
          <motion.div
            key="signin"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <SignInForm />
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <SignUpForm />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
