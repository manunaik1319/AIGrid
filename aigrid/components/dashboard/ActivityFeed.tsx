"use client";
import { formatDistanceToNow } from "date-fns";
import { MOCK_ACTIVITY, type Activity } from "@/lib/dashboard-data";

export function ActivityFeed() {
  const getActivityIcon = (action: Activity["action"]) => {
    switch (action) {
      case "saved": return "📚";
      case "reviewed": return "⭐";
      case "workflow": return "🔄";
      case "visited": return "👁️";
      default: return "📌";
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.action) {
      case "saved": return `Saved ${activity.toolName}`;
      case "reviewed": return `Reviewed ${activity.toolName}`;
      case "workflow": return `Built ${activity.toolName}`;
      case "visited": return `Visited ${activity.toolName}`;
      default: return activity.toolName;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>

      <div className="space-y-4">
        {MOCK_ACTIVITY.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-pale flex items-center justify-center flex-shrink-0">
              <span className="text-lg">{getActivityIcon(activity.action)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{getActivityText(activity)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
