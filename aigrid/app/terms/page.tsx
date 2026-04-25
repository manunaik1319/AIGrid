import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";

export const metadata = { title: "Terms of Service | AIGrid" };

const SECTIONS = [
  { title: "1. Acceptance of Terms",        content: "By accessing or using AIGrid, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the service. We reserve the right to update these terms at any time with reasonable notice." },
  { title: "2. Use of Service",             content: "AIGrid grants you a limited, non-exclusive, non-transferable license to access and use the platform for personal, non-commercial purposes. You agree not to use the service in any way that violates applicable laws or regulations." },
  { title: "3. Intellectual Property",      content: "All content on AIGrid, including text, graphics, logos, and software, is the property of AIGrid or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce or distribute any content without our express written permission." },
  { title: "4. User Content",               content: "If you submit tool reviews, comments, or other content to AIGrid, you grant us a worldwide, royalty-free license to use, display, and distribute that content. You are solely responsible for ensuring your submissions do not infringe on any third-party rights." },
  { title: "5. Prohibited Activities",      content: "You may not use AIGrid to scrape data at scale, attempt to gain unauthorized access to our systems, post spam or misleading content, or engage in any activity that disrupts the service for other users. Violations may result in immediate account termination." },
  { title: "6. Disclaimers",                content: "AIGrid is provided on an 'as is' and 'as available' basis without warranties of any kind. We do not guarantee the accuracy, completeness, or usefulness of any tool listing or content on the platform. Your use of any AI tool listed on AIGrid is entirely at your own risk." },
  { title: "7. Limitation of Liability",    content: "To the fullest extent permitted by law, AIGrid shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability to you for any claim shall not exceed the amount you paid us in the past twelve months." },
  { title: "8. Changes to Terms",           content: "We may revise these Terms of Service from time to time. We will notify registered users of material changes via email or a prominent notice on the site. Continued use of AIGrid after changes take effect constitutes your acceptance of the revised terms." },
  { title: "9. Contact",                    content: "If you have any questions about these Terms of Service, please contact us at legal@aigrid.io. We aim to respond to all legal inquiries within five business days." },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4F6F8]">
        <section className="bg-[#1A1A2E] py-16 px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-white/50 text-sm">Last updated: January 2026</p>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto bg-white border border-[#E8EAED] rounded-2xl p-8 md:p-12">
            <p className="text-[#6B7280] leading-relaxed mb-10 text-sm">These Terms of Service govern your use of AIGrid. Please read them carefully before using the platform. By using AIGrid, you confirm that you are at least 13 years old and agree to these terms.</p>
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
