import React from "react";
import Link from "next/link";

const LINKS = {
  Product:   [{ label: "Browse Tools", href: "/browse" }, { label: "Categories", href: "/categories" }, { label: "Compare", href: "/compare" }, { label: "New Tools", href: "/new" }, { label: "Workflow Builder", href: "/workflows/build" }],
  Company:   [{ label: "About", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "Press", href: "/press" }],
  Developers:[{ label: "API", href: "/api" }, { label: "Submit a Tool", href: "/submit" }, { label: "Advertise", href: "/advertise" }, { label: "Affiliate", href: "/affiliate" }],
  Support:   [{ label: "Help Center", href: "/help" }, { label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }, { label: "Contact", href: "/contact" }],
};

const SOCIALS = [
  { label: "Twitter / X", href: "https://twitter.com", icon: "𝕏" },
  { label: "LinkedIn",    href: "https://linkedin.com", icon: "in" },
  { label: "GitHub",      href: "https://github.com",   icon: "GH" },
];

function FooterLogo() {
  return (
    <svg width="110" height="28" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AIGrid">
      <rect width="28" height="28" rx="6" fill="#1A56DB" />
      <text x="5" y="20" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="14" fill="white">AI</text>
      <text x="36" y="20" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="16" fill="#1A56DB">Grid</text>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top: logo + mission + link grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <FooterLogo />
            <p className="text-sm text-gray-500 leading-relaxed">
              Discover, compare, and find the best AI tools for every workflow.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 hover:border-brand hover:text-brand transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
              {links.map((l) => (
                <Link key={l.href} href={l.href}
                  className="text-sm text-gray-600 hover:text-brand transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} AIGrid 🇮🇳. All rights reserved.</span>
          <span>Built with ❤️ for the AI community</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
