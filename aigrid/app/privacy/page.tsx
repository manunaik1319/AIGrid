import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";

export const metadata = { title: "Privacy Policy | AIGrid" };

const SECTIONS = [
  { title: "1. Information We Collect",   content: "We collect information you provide directly, such as your name and email address when you create an account or contact us. We also automatically collect certain usage data, including pages visited, search queries, and device information, to help us improve the service." },
  { title: "2. How We Use Information",   content: "We use the information we collect to operate and improve AIGrid, personalize your experience, and send you relevant updates about new tools and features. We do not sell your personal information to third parties under any circumstances." },
  { title: "3. Cookies",                  content: "AIGrid uses cookies and similar tracking technologies to remember your preferences and analyze site traffic. You can control cookie settings through your browser, though disabling certain cookies may affect the functionality of the site." },
  { title: "4. Third-Party Services",     content: "We may share anonymized, aggregated data with analytics providers to help us understand how AIGrid is used. Any third-party services we use are contractually required to handle your data in accordance with applicable privacy laws." },
  { title: "5. Data Security",            content: "We implement industry-standard security measures, including encryption in transit and at rest, to protect your personal information. While we take reasonable precautions, no method of transmission over the internet is 100% secure." },
  { title: "6. Your Rights",              content: "Depending on your location, you may have the right to access, correct, or delete the personal information we hold about you. To exercise any of these rights, please contact us at privacy@aigrid.io and we will respond within 30 days." },
  { title: "7. Contact Us",               content: "If you have any questions or concerns about this Privacy Policy, please reach out to us at privacy@aigrid.io. We take all privacy inquiries seriously and will do our best to address your concerns promptly." },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4F6F8]">
        <section className="bg-[#1A1A2E] py-16 px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: January 2026</p>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto bg-white border border-[#E8EAED] rounded-2xl p-8 md:p-12">
            <p className="text-[#6B7280] leading-relaxed mb-10 text-sm">At AIGrid, we take your privacy seriously. This policy explains what information we collect, how we use it, and the choices you have. By using AIGrid, you agree to the practices described below.</p>
            <div className="flex flex-col gap-10">
              {SECTIONS.map((s) => (
                <div key={s.title}>
                  <h2 className="text-xl font-bold text-[#1A1A2E] border-b border-[#E8EAED] pb-2 mb-4">{s.title}</h2>
                  <p className="text-[#6B7280] leading-relaxed text-sm">{s.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
