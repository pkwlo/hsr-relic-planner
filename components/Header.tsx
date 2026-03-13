"use client";

import React, { useRef } from "react";
import Button from "@/components/Button";
import { exportData, importData, downloadJson, ExportPayload } from "@/lib/storage";

const Header = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportData();
    downloadJson(data, `hsr-relics-${new Date().toISOString().slice(0, 10)}.json`);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const payload: ExportPayload = JSON.parse(event.target?.result as string);
        const result = importData(payload);
        alert(`Imported ${result.count} relic set(s). Reloading...`);
        window.location.reload();
      } catch (err) {
        alert("Failed to import: invalid file format.");
        console.error(err);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <header
      className="flex flex-row justify-between items-center px-6 py-4 sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(15, 17, 23, 0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <h1 className="text-xl font-bold tracking-tight gradient-text">
        HSR Relic Planner
      </h1>
      <div className="flex gap-2">
        <Button text="Export Data" onClick={handleExport} />
        <Button text="Import Data" onClick={handleImportClick} />
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </header>
  );
};

export default Header;
