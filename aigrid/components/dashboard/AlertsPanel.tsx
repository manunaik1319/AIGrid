"use client";
import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MOCK_ALERTS, type Alert } from "@/lib/dashboard-data";

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const getAlertColor = (type: Alert["type"]) => {
    switch (type) {
      case "price": return "text-red-600 bg-red-50 border-red-200";
      case "feature": return "text-blue-600 bg-blue-50 border-blue-200";
      case "update": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Alerts</h2>
        <Link href="/settings/alerts" className="text-sm text-brand hover:text-brand-dark transition-colors">
          Manage Alerts
        </Link>
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔔</div>
          <p className="text-gray-600 mb-2">No new alerts</p>
          <p className="text-sm text-gray-500">We'll notify you of important updates</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`relative p-4 border rounded-lg ${getAlertColor(alert.type)}`}
            >
              <button
                onClick={() => handleDismiss(alert.id)}
                className="absolute top-2 right-2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                title="Dismiss"
              >
                <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-start gap-3 pr-6">
                <div className="text-2xl flex-shrink-0">{alert.toolLogo}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{alert.toolName}</h3>
                  <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
