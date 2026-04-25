import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { SubmitWizardGate } from "@/components/submit/SubmitWizardGate";

export const metadata = {
  title: "Submit a Tool | AIGrid",
  description: "Add your AI tool to the AIGrid directory and reach thousands of students.",
};

export default function SubmitPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4F6F8]">

        {/* Hero */}
        <section className="bg-[#F5C842] py-14 px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A2E]/60 mb-3">Submit</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-3 tracking-tight">
            Submit Your AI Tool
          </h1>
          <p className="text-[#1A1A2E]/70 text-lg max-w-xl mx-auto">
            Share your tool with the AIGrid community and help the right students find it.
          </p>

          {/* Steps preview */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {["Basic Info", "Features & Pricing", "Links & Media", "Preview", "Submit"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-white/50 border border-white/70 rounded-full px-3 py-1">
                  <span className="w-5 h-5 rounded-full bg-[#1A1A2E] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#1A1A2E]">{step}</span>
                </div>
                {i < 4 && <span className="text-[#1A1A2E]/40 text-xs">→</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Wizard */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <SubmitWizardGate />
        </div>
      </main>
      <Footer />
    </>
  );
}
