"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Home() {
  const version = "v0.0.6 Alpha";
  return (
    <>
      <Header />
      <main className="flex flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 animate-fade-in">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight mb-2">
              Welcome!
            </h2>
            <div className="h-1 w-16 rounded-full bg-gradient-accent mb-8" />

            <div className="card p-6 mb-6">
              <p className="text-base leading-relaxed" style={{ color: "var(--foreground)" }}>
                This is the HSR Relic Planner{" "}
                <span className="font-semibold gradient-text">{version}</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                This is a tool to help you plan your relic farming in Honkai Star
                Rail. And more importantly, to help you keep track of which relics
                you can trash and which to keep!
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-1">
                Change Log / Future Releases
              </h3>
              <p className="text-sm font-medium mb-4 gradient-text">
                Current: {version}
              </p>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
                  Alpha
                </p>
                {[
                  { ver: "v0.0.6", desc: "Move storage to local storage and add edit functionality" },
                  { ver: "v0.0.5", desc: "Site design overhaul" },
                  { ver: "v0.0.4", desc: "Add report bugs page" },
                  { ver: "v0.0.3", desc: "Add characters to inventory" },
                  { ver: "v0.0.2", desc: "Add relics to inventory" },
                  { ver: "v0.0.1", desc: "User log-in" },
                  { ver: "v0.0.0", desc: "User registration" },
                ].map((item) => (
                  <div
                    key={item.ver}
                    className="flex items-center gap-3 py-2 px-3 rounded-md transition-colors duration-150"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: "rgba(108, 99, 255, 0.15)",
                        color: "var(--accent)",
                      }}
                    >
                      {item.ver}
                    </span>
                    <span className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
