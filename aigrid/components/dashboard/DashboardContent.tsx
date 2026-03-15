"use client";
import { Suspense } from "react";
import { format } from "date-fns";
import { StatsRow } from "./StatsRow";
import { RecommendedTools } from "./RecommendedTools";
import { SavedToolsSection } from "./SavedToolsSection";
import { MyWorkflows } from "./MyWorkflows";
import { AlertsPanel } from "./AlertsPanel";
import { ActivityFeed } from "./ActivityFeed";
import { DigestPreferences } from "./DigestPreferences";

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function DashboardContent({ user }: DashboardContentProps) {
  const userName = user.name || user.email?.split("@")[0] || "User";
  const today = format(new Date(), "EEEE, MMMM d, yyyy");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-gray-600">
          {today} • Your AI toolkit at a glance
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Row */}
          <Suspense fallback={<StatsRowSkeleton />}>
            <StatsRow />
          </Suspense>

          {/* Recommended Tools */}
          <Suspense fallback={<SectionSkeleton />}>
            <RecommendedTools />
          </Suspense>

          {/* Saved Tools */}
          <Suspense fallback={<SectionSkeleton />}>
            <SavedToolsSection />
          </Suspense>

          {/* My Workflows */}
          <Suspense fallback={<SectionSkeleton />}>
            <MyWorkflows />
          </Suspense>

          {/* Alerts Panel */}
          <Suspense fallback={<SectionSkeleton />}>
            <AlertsPanel />
          </Suspense>

          {/* Digest Preferences */}
          <DigestPreferences />
        </div>

        {/* Right Sidebar (1/3) */}
        <div className="space-y-6">
          <Suspense fallback={<SidebarSkeleton />}>
            <ActivityFeed />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function StatsRowSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-16 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
      ))}
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
