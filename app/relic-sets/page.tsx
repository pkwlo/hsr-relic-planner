"use client";

import { useState } from "react";
import Image from "next/image";
import relics from "./relics.json";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const relicSets = relics.filter((r) => r.type === "Relic Set");
const ornamentSets = relics.filter((r) => r.type !== "Relic Set");

type Tab = "relics" | "ornaments";

function RelicCardTemplate({
  relicName,
  relic2Pc,
  relic4Pc,
  relicImage,
}: {
  relicName: string;
  relic2Pc: string;
  relic4Pc: string;
  relicImage: string;
}) {
  return (
    <div className="card flex flex-row items-start p-4 w-full" style={{ maxWidth: 620 }}>
      <Image
        src={relicImage}
        alt={relicName}
        width={100}
        height={100}
        style={{
          width: 72,
          height: 72,
          borderRadius: 12,
          flexShrink: 0,
        }}
        priority
      />
      <div className="flex flex-col ml-4 gap-1.5">
        <h6 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          {relicName}
        </h6>
        <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
          <span className="font-medium" style={{ color: "var(--teal)" }}>2-Piece:</span>{" "}
          {relic2Pc}
        </p>
        {relic4Pc && (
          <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
            <span className="font-medium" style={{ color: "var(--accent)" }}>4-Piece:</span>{" "}
            {relic4Pc}
          </p>
        )}
      </div>
    </div>
  );
}

function OrnamentCardTemplate({
  ornamentName,
  ornament2Pc,
  ornamentImage,
}: {
  ornamentName: string;
  ornament2Pc: string;
  ornamentImage: string;
}) {
  return (
    <div className="card flex flex-row items-start p-4 w-full" style={{ maxWidth: 620 }}>
      <Image
        src={ornamentImage}
        alt={ornamentName}
        width={100}
        height={100}
        style={{
          width: 72,
          height: 72,
          borderRadius: 12,
          flexShrink: 0,
        }}
        priority
      />
      <div className="flex flex-col ml-4 gap-1.5">
        <h6 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          {ornamentName}
        </h6>
        <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
          <span className="font-medium" style={{ color: "var(--teal)" }}>2-Piece:</span>{" "}
          {ornament2Pc}
        </p>
      </div>
    </div>
  );
}

const TabButton = ({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="relative px-4 py-2.5 text-sm font-medium transition-all duration-200"
    style={{
      color: active ? "var(--foreground)" : "var(--foreground-muted)",
      background: active ? "var(--bg-surface)" : "transparent",
      borderRadius: "var(--radius-md) var(--radius-md) 0 0",
      borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
    }}
  >
    {label}
    <span
      className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
      style={{
        backgroundColor: active ? "rgba(108, 99, 255, 0.15)" : "rgba(255,255,255,0.06)",
        color: active ? "var(--accent)" : "var(--foreground-muted)",
      }}
    >
      {count}
    </span>
  </button>
);

export default function RelicPage() {
  const [activeTab, setActiveTab] = useState<Tab>("relics");

  return (
    <>
      <Header />
      <main className="flex flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Relic & Ornament Sets
          </h2>
          <div className="h-1 w-16 rounded-full bg-gradient-accent mb-6" />

          <div
            className="flex mb-6"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <TabButton
              label="Relics"
              count={relicSets.length}
              active={activeTab === "relics"}
              onClick={() => setActiveTab("relics")}
            />
            <TabButton
              label="Ornaments"
              count={ornamentSets.length}
              active={activeTab === "ornaments"}
              onClick={() => setActiveTab("ornaments")}
            />
          </div>

          {activeTab === "relics" ? (
            <div className="flex flex-col gap-3">
              {relicSets.map((relic, index) => (
                <RelicCardTemplate
                  key={index}
                  relicName={relic.name}
                  relic2Pc={relic.bonus2pc || ""}
                  relic4Pc={relic.bonus4pc || ""}
                  relicImage={relic.local}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {ornamentSets.map((relic, index) => (
                <OrnamentCardTemplate
                  key={index}
                  ornamentName={relic.name}
                  ornament2Pc={relic.bonus2pc}
                  ornamentImage={relic.local}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
