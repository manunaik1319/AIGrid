import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AIGridToaster } from "@/components/aigrid/Toast";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SessionProvider } from "@/components/auth/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "AIGrid – Discover the Best AI Tools",
  description: "Browse, compare, and find the best AI tools for every workflow.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased text-slate-800 bg-white selection:bg-brand/20 selection:text-brand-dark">
        <SessionProvider>
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
          <AIGridToaster />
        </SessionProvider>
      </body>
    </html>
  );
}
