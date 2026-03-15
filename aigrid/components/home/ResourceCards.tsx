"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface ResourceCard {
  title: string;
  description: string;
  icon: JSX.Element;
  href: string;
  badge?: string;
  color: string;
}

const RESOURCES: ResourceCard[] = [
  {
    title: "AI News",
    description: "AI news in real time, at a glance.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    href: "/news",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "YouTube AI",
    description: "Access the best YouTube channels talking about AI.",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    href: "/youtube",
    color: "from-red-500 to-red-600"
  },
  {
    title: "Top 100 AI",
    description: "Top 100 most popular and trending AIs on AIGrid.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    href: "/top-100",
    badge: "beta",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "AI Video Tutorials",
    description: "Learn how to master the best AI tools on video.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    href: "/tutorials",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Blog & Tips",
    description: "All the tips, tutorials, and AI trends at the moment.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    href: "/blog",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "GPTs List",
    description: "A list of the best Custom GPTs.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    href: "/gpts",
    color: "from-teal-500 to-teal-600"
  },
  {
    title: "AI Job Offers",
    description: "Search thousands of AI jobs in the United States and worldwide.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    href: "/jobs",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    title: "AI Conferences",
    description: "Check out the agenda for all the AI conferences around the world.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    href: "/conferences",
    color: "from-pink-500 to-pink-600"
  }
];

export function ResourceCards() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore AI Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover news, tutorials, jobs, and more from the AI community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESOURCES.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                href={resource.href}
                className="group block h-full bg-white rounded-xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col h-full p-6">
                  {/* Icon with gradient background */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${resource.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {resource.icon}
                    </div>
                    {resource.badge && (
                      <span className="px-2.5 py-1 text-xs font-bold text-white bg-gradient-to-r from-brand to-brand-dark rounded-full shadow-sm">
                        {resource.badge.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand transition-colors">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                    {resource.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="flex items-center text-brand font-medium text-sm">
                    <span className="group-hover:mr-2 transition-all">Learn more</span>
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className={`h-1 bg-gradient-to-r ${resource.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
