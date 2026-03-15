"use client";
import { MOCK_DASHBOARD_STATS } from "@/lib/dashboard-data";

export function StatsRow() {
  const stats = [
    { label: "Tools Saved", value: MOCK_DASHBOARD_STATS.toolsSaved, icon: "📚" },
    { label: "Reviews Written", value: MOCK_DASHBOARD_STATS.reviewsWritten, icon: "⭐" },
    { label: "Workflows Created", value: MOCK_DASHBOARD_STATS.workflowsCreated, icon: "🔄" },
    { label: "Tools Visited", value: MOCK_DASHBOARD_STATS.toolsVisited, icon: "👁️", subtitle: "this week" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">
            {stat.label}
            {stat.subtitle && <span className="block text-xs text-gray-400">{stat.subtitle}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
