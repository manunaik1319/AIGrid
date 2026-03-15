"use client";
import { useState } from "react";
import { ProfileTab } from "./ProfileTab";
import { NotificationsTab } from "./NotificationsTab";
import { PrivacyTab } from "./PrivacyTab";
import { ConnectedAccountsTab } from "./ConnectedAccountsTab";
import { DangerZoneTab } from "./DangerZoneTab";

type Tab = "profile" | "notifications" | "privacy" | "accounts" | "danger";

interface SettingsPageProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const TABS = [
  { id: "profile" as const, label: "Profile", icon: "👤" },
  { id: "notifications" as const, label: "Notifications", icon: "🔔" },
  { id: "privacy" as const, label: "Privacy", icon: "🔒" },
  { id: "accounts" as const, label: "Connected Accounts", icon: "🔗" },
  { id: "danger" as const, label: "Danger Zone", icon: "⚠️" },
];

export function SettingsPage({ user }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar Navigation */}
        <nav className="lg:w-56 flex-shrink-0">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-brand-pale text-brand border-l-4 border-brand"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="lg:hidden overflow-x-auto pb-2">
            <div className="flex gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "bg-brand text-white"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Right Content Area */}
        <div className="flex-1">
          {activeTab === "profile" && <ProfileTab user={user} />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "privacy" && <PrivacyTab />}
          {activeTab === "accounts" && <ConnectedAccountsTab />}
          {activeTab === "danger" && <DangerZoneTab />}
        </div>
      </div>
    </div>
  );
}
