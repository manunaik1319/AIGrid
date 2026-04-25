"use client";

import { useState } from "react";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { FiMail, FiTwitter, FiMessageCircle, FiCheckCircle } from "react-icons/fi";

const CONTACT_CARDS = [
  { Icon: FiMail,          label: "Email",      value: "hello@aigrid.io",    sub: "We reply within 24 hours" },
  { Icon: FiTwitter,       label: "Twitter / X", value: "@AIGridHQ",         sub: "DMs open for quick questions" },
  { Icon: FiMessageCircle, label: "Discord",     value: "discord.gg/aigrid", sub: "Join our student community" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const input = "w-full bg-white border border-[#E8EAED] rounded-xl px-4 py-3 text-sm text-[#1A1A2E] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7DD3F0] transition";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4F6F8]">

        {/* Hero */}
        <section className="bg-[#F5C842] py-16 px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A2E]/60 mb-3">Reach Out</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-4">Get in Touch</h1>
          <p className="text-[#1A1A2E]/70 text-lg max-w-xl mx-auto">Have a question, found a bug, or want to partner with us? We'd love to hear from you.</p>
        </section>

        {/* Two-column */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Left */}
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#7DD3F0] mb-2">Contact Info</p>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">We're here to help</h2>
                <p className="text-[#6B7280] text-sm leading-relaxed">Pick the channel that works best for you. For urgent issues, Discord is the fastest way to reach us.</p>
              </div>
              {CONTACT_CARDS.map(({ Icon, label, value, sub }) => (
                <div key={label} className="bg-white border border-[#E8EAED] rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[#7DD3F0] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#1A1A2E]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-0.5">{label}</p>
                    <p className="text-[#1A1A2E] font-semibold text-sm">{value}</p>
                    <p className="text-[#6B7280] text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — form */}
            <div className="bg-white border border-[#E8EAED] rounded-2xl p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <FiCheckCircle className="w-14 h-14 text-[#7DD3F0] mb-4" />
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">Message Sent!</h3>
                  <p className="text-[#6B7280] text-sm max-w-xs">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 px-5 py-2 bg-[#F4F6F8] border border-[#E8EAED] rounded-xl text-sm font-medium text-[#1A1A2E] hover:bg-[#E8EAED] transition-colors">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A2E] mb-1.5">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required className={input} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A2E] mb-1.5">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className={input} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A2E] mb-1.5">Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required className={input}>
                      <option value="" disabled>Select a subject</option>
                      <option>General</option>
                      <option>Bug Report</option>
                      <option>Partnership</option>
                      <option>Submit Tool</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A2E] mb-1.5">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us what's on your mind..." required rows={5} className={`${input} resize-none`} />
                  </div>
                  <button type="submit" className="w-full py-3 bg-[#7DD3F0] hover:bg-[#4BB8E0] text-[#1A1A2E] font-semibold rounded-xl transition-colors text-sm">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
