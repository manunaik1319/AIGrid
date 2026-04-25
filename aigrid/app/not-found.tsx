import Link from "next/link";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4F6F8] flex items-center justify-center px-4 py-20">
        <div className="relative text-center max-w-lg mx-auto">

          {/* Floating tool cards */}
          <div className="absolute -top-8 -left-10 md:-left-20 w-14 h-14 bg-white border border-[#E8EAED] rounded-2xl flex items-center justify-center text-2xl shadow-md animate-bounce" style={{ animationDelay: "0s", animationDuration: "2.5s" }}>🤖</div>
          <div className="absolute -top-4 -right-10 md:-right-20 w-14 h-14 bg-white border border-[#E8EAED] rounded-2xl flex items-center justify-center text-2xl shadow-md animate-bounce" style={{ animationDelay: "0.4s", animationDuration: "2.5s" }}>🎨</div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-14 h-14 bg-white border border-[#E8EAED] rounded-2xl flex items-center justify-center text-2xl shadow-md animate-bounce" style={{ animationDelay: "0.8s", animationDuration: "2.5s" }}>🧠</div>

          {/* Content */}
          <p className="text-8xl font-bold text-[#F5C842] leading-none mb-4">404</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3">Page not found</h1>
          <p className="text-[#6B7280] text-base leading-relaxed mb-10 max-w-sm mx-auto">Looks like this page wandered off into the AI void. Let's get you back on track.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-[#F5C842] hover:bg-[#E6B800] text-[#1A1A2E] font-semibold rounded-xl transition-colors text-sm">
              Go Home
            </Link>
            <Link href="/search" className="inline-flex items-center justify-center px-6 py-3 bg-[#7DD3F0] hover:bg-[#4BB8E0] text-[#1A1A2E] font-semibold rounded-xl transition-colors text-sm">
              Browse Tools
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
