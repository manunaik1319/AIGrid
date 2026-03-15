"use client";
import { Toaster, toast } from "react-hot-toast";

// ── AIGrid Toaster wrapper ────────────────────────────────────────────────────

export function AIGridToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#ffffff",
          color: "#111827",
          borderRadius: "12px",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
          padding: "12px 16px",
          fontSize: "14px",
          maxWidth: "360px",
        },
        success: {
          style: { borderLeft: "4px solid #16a34a" },
          iconTheme: { primary: "#16a34a", secondary: "#fff" },
        },
        error: {
          style: { borderLeft: "4px solid #dc2626" },
          iconTheme: { primary: "#dc2626", secondary: "#fff" },
        },
      }}
    />
  );
}

// ── Convenience helpers ───────────────────────────────────────────────────────

export const notify = {
  success: (msg: string) => toast.success(msg),
  error:   (msg: string) => toast.error(msg),
  info:    (msg: string) =>
    toast(msg, {
      icon: "ℹ️",
      style: {
        background: "#ffffff",
        color: "#111827",
        borderRadius: "12px",
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
        padding: "12px 16px",
        fontSize: "14px",
        borderLeft: "4px solid #1A56DB",
      },
    }),
};

export default AIGridToaster;
