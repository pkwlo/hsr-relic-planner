"use client";

import React from "react";
import SideButton from "./SideButton";

const Sidebar = () => {
  return (
    <aside className="flex flex-col h-screen sticky top-0 border-r"
      style={{
        width: 240,
        minWidth: 240,
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex flex-col flex-1 pt-4 gap-0.5">
        <SideButton onClick={() => goTo("/")} text="Home" />
        <SideButton onClick={() => goTo("/relic-dashboard")} text="Relic Dashboard" />
        <SideButton onClick={() => goTo("/characters")} text="Characters" />
        <SideButton onClick={() => goTo("/relic-sets")} text="Relic & Ornament Sets" />
        <SideButton onClick={() => goTo("/report")} text="Report a Bug" />
      </div>
      <div className="px-5 py-4 border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
          Created by Nori, 2024
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--foreground-muted)", opacity: 0.6 }}>
          Honkai Star Rail &copy; MiHoYo Co., Ltd.
        </p>
      </div>
    </aside>
  );
};

function goTo(path: string) {
  window.location.href = path;
}

export default Sidebar;
