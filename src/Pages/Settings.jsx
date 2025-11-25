// src/Pages/Settings.jsx
import React, { useState, useEffect } from "react";

export default function SettingsPage() {
  // Load stored settings from localStorage
  const [settings, setSettings] = useState({
    restaurantName: "",
    address: "",
    gstNumber: "",
    phone: "",
    theme: "light",
    taxPercent: 5,
    printerSize: "58mm",
  });

  // Load saved settings
  useEffect(() => {
    const saved = localStorage.getItem("pos-settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  // Update handler
  const update = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Save handler
  const saveSettings = () => {
    localStorage.setItem("pos-settings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* RESTAURANT DETAILS */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Restaurant Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Restaurant Name"
            value={settings.restaurantName}
            onChange={(e) => update("restaurantName", e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Phone Number"
            value={settings.phone}
            onChange={(e) => update("phone", e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="GST Number"
            value={settings.gstNumber}
            onChange={(e) => update("gstNumber", e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Address"
            value={settings.address}
            onChange={(e) => update("address", e.target.value)}
          />
        </div>
      </section>

      <hr className="my-6" />

      {/* TAX SETTINGS */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Tax Settings</h2>

        <div className="flex gap-4 items-center">
          <label className="font-medium">GST %:</label>
          <input
            type="number"
            className="border p-2 rounded w-24"
            value={settings.taxPercent}
            onChange={(e) => update("taxPercent", Number(e.target.value))}
          />
        </div>
      </section>

      <hr className="my-6" />

      {/* THEME SETTINGS */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Theme</h2>

        <div className="flex gap-4">
          <button
            onClick={() => update("theme", "light")}
            className={`px-4 py-2 rounded ${
              settings.theme === "light"
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            Light Mode
          </button>

          <button
            onClick={() => update("theme", "dark")}
            className={`px-4 py-2 rounded ${
              settings.theme === "dark"
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            Dark Mode
          </button>
        </div>
      </section>

      <hr className="my-6" />

      {/* PRINTER SETTINGS */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Printer Settings</h2>

        <select
          className="border p-2 rounded"
          value={settings.printerSize}
          onChange={(e) => update("printerSize", e.target.value)}
        >
          <option value="58mm">58mm Thermal</option>
          <option value="80mm">80mm Thermal</option>
        </select>
      </section>

      <hr className="my-6" />

      {/* SAVE BUTTON */}
      <button
        onClick={saveSettings}
        className="bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-pink-700"
      >
        Save Settings
      </button>
    </div>
  );
}
