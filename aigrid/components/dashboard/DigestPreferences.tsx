"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

const CATEGORIES = [
  "Writing", "Image", "Video", "Audio", "Code", "Productivity", "Research", "Marketing"
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function DigestPreferences() {
  const [selectedCategories, setSelectedCategories] = useState(["Writing", "Image", "Code"]);
  const [digestDay, setDigestDay] = useState("Friday");
  const [isPaused, setIsPaused] = useState(false);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSave = () => {
    toast.success("Digest preferences saved!");
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Your Weekly Digest</h2>

      {/* Categories */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Include these categories:
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Digest Day */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Digest Day:
        </label>
        <select
          value={digestDay}
          onChange={(e) => setDigestDay(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
        >
          {DAYS.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      {/* Pause Toggle */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm font-medium text-gray-900">Pause digest</p>
          <p className="text-xs text-gray-500">Temporarily stop receiving weekly emails</p>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isPaused ? "bg-gray-300" : "bg-brand"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isPaused ? "translate-x-1" : "translate-x-6"
            }`}
          />
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-2.5 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
      >
        Save Preferences
      </button>
    </div>
  );
}
