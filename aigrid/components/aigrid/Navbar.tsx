"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { GlobalSearch } from "./GlobalSearch";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Category {
  slug: string;
  label: string;
  icon: string;
  count: number;
}

const CATEGORIES: Category[] = [
  { slug: "text-writing",   label: "Text & Writing",   icon: "✍️",  count: 142 },
  { slug: "image-video",    label: "Image & Video",    icon: "🎨",  count: 98  },
  { slug: "code-dev",       label: "Code & Dev",       icon: "💻",  count: 76  },
  { slug: "audio-music",    label: "Audio & Music",    icon: "🎵",  count: 54  },
  { slug: "productivity",   label: "Productivity",     icon: "⚡",  count: 89  },
  { slug: "research",       label: "Research",         icon: "🔬",  count: 63  },
  { slug: "marketing",      label: "Marketing",        icon: "📣",  count: 71  },
  { slug: "data-analytics", label: "Data & Analytics", icon: "📊",  count: 45  },
];

// ── AIGrid Wordmark ───────────────────────────────────────────────────────────

function AIGridLogo() {
  return (
    <svg width="110" height="28" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AIGrid">
      <rect width="28" height="28" rx="6" fill="#1A56DB" />
      <text x="5" y="20" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="14" fill="white">AI</text>
      <text x="36" y="20" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="16" fill="#1A56DB">Grid</text>
    </svg>
  );
}

// ── Categories Dropdown ───────────────────────────────────────────────────────

function CategoriesDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand transition-colors px-2 py-1 rounded-md hover:bg-brand-pale">
        Categories
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`}
              className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-brand-pale hover:text-brand transition-colors">
              <span className="flex items-center gap-2">
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </span>
              <span className="text-xs text-gray-400">{cat.count}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ── User Dropdown ─────────────────────────────────────────────────────────────

function UserDropdown({ user }: { user: { name?: string | null; email?: string | null; image?: string | null } }) {
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-semibold text-sm hover:bg-brand-dark transition-colors"
      >
        {user.image ? (
          <img src={user.image} alt={user.name || "User"} className="w-full h-full rounded-full" />
        ) : (
          user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name || "User"}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>

            <Link
              href="/workflows/build"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              My Workflows
            </Link>

            <Link
              href="/saved"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Saved Tools
            </Link>

            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>

            <div className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

export function Navbar({ compareCount = 0 }: { compareCount?: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 flex items-center gap-4">
          {/* Left */}
          <Link href="/" className="flex-shrink-0">
            <AIGridLogo />
          </Link>
          <div className="hidden md:block">
            <CategoriesDropdown />
          </div>

          {/* Free Tools Link - Before Search */}
          <Link href="/new?filter=free" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors px-3 py-1.5 rounded-md hover:bg-green-50 border border-green-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Free
          </Link>

          {/* Centre */}
          <div className="flex-1 hidden md:flex justify-center">
            <GlobalSearch />
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 ml-auto">
            {/* All Tools Link */}
            <Link href="/search" className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-brand transition-colors px-3 py-1.5 rounded-md hover:bg-brand-pale">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              All Tools
            </Link>

            {/* Compare */}
            <Link href="/compare" className="relative hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-brand transition-colors px-2 py-1 rounded-md hover:bg-brand-pale">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
              </svg>
              Compare
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* Bookmarks */}
            <Link href="/saved" aria-label="Saved tools" className="hidden sm:flex p-2 text-gray-500 hover:text-brand hover:bg-brand-pale rounded-md transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 3H7a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2z" />
              </svg>
            </Link>

            {/* Submit CTA */}
            <Link href="/submit" className="hidden md:inline-flex items-center px-3 py-1.5 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors">
              Submit a Tool
            </Link>

            {/* User */}
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <UserDropdown user={user} />
            ) : (
              <Link href="/auth" className="text-sm font-medium text-gray-600 hover:text-brand transition-colors px-2">
                Sign In
              </Link>
            )}

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 text-gray-500 hover:text-brand" aria-label="Open menu">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-6">
          <div className="flex items-center justify-between mb-6">
            <AIGridLogo />
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2 text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <GlobalSearch />
          <nav className="mt-6 flex flex-col gap-1">
            {/* All Tools Link */}
            <Link href="/search" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-brand-pale hover:text-brand transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="text-sm font-medium">All Tools</span>
            </Link>

            {/* Free Tools Link */}
            <Link href="/new?filter=free" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors border border-green-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Free Tools</span>
            </Link>
            
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-brand-pale hover:text-brand transition-colors">
                <span>{cat.icon}</span>
                <span className="text-sm font-medium">{cat.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
            <Link href="/submit" onClick={() => setMobileOpen(false)}
              className="w-full text-center px-4 py-2.5 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors">
              Submit a Tool
            </Link>
            {user ? (
              <button
                onClick={async () => {
                  setMobileOpen(false);
                  await signOut({ callbackUrl: "/" });
                }}
                className="w-full text-center px-4 py-2.5 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/auth" onClick={() => setMobileOpen(false)}
                className="w-full text-center px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
