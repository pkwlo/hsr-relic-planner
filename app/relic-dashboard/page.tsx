"use client";

import React from "react";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";
import chevronUp from "@/public/icons/KAup.png";
import chevronDown from "@/public/icons/KAdown.png";
import deleteIcon from "@/public/icons/delete.png";
import AddRelic from "@/app/relic-dashboard/AddRelic";
import AddCharacter from "@/app/relic-dashboard/AddCharacter";
import edit from "@/public/icons/edit.png";
import relicSets from "@/app/relic-sets/relics.json";
import deleteRelic from "./deleteRelic";
import getRelics from "./getRelics";
import getChars from "./getChars";
import EditRelic from "./EditRelic";
import characterClick from "./characterClick";

function getRelicImage(name: string): string | null {
  const match = relicSets.find((r) => r.name === name);
  return match?.local ?? null;
}

function getRelicType(name: string): string | null {
  const match = relicSets.find((r) => r.name === name);
  return match?.type ?? null;
}

function splitByType(relicData: any[]): { relics: any[]; ornaments: any[] } {
  const relics: any[] = [];
  const ornaments: any[] = [];
  for (const relic of relicData) {
    const type = getRelicType(relic.name);
    if (type === "Planetary Ornament Set") {
      ornaments.push(relic);
    } else {
      relics.push(relic);
    }
  }
  return { relics, ornaments };
}

const RelicCardMini = ({ part, name }: { part: any; name: string }) => {
  return part ? (
    <div className="flex flex-col" style={{ minWidth: 110, maxWidth: 120 }}>
      <h3 className="text-xs font-semibold mb-1" style={{ color: "var(--foreground)" }}>
        {name}
      </h3>
      <p className="text-xs font-medium mb-1.5" style={{ color: "var(--foreground-muted)" }}>
        {/* Main Stat */}
      </p>
      {part.mainS && (
        <div
          className="text-xs px-2 py-1 rounded-md mb-1"
          style={{
            backgroundColor: "rgba(108, 99, 255, 0.1)",
            border: "1px solid rgba(108, 99, 255, 0.2)",
            color: "var(--foreground)",
          }}
        >
          {part.mainS}
        </div>
      )}
      {(part.sub1 || part.sub2 || part.sub3 || part.sub4) && (
        <>
          <p className="text-xs font-medium mb-1 mt-1" style={{ color: "var(--foreground-muted)" }}>
            {/* Sub Stats */}
          </p>
          {[part.sub1, part.sub2, part.sub3, part.sub4]
            .filter(Boolean)
            .map((sub, i) => (
              <div
                key={i}
                className="text-xs px-2 py-1 rounded-md mb-1"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground-muted)",
                }}
              >
                {sub}
              </div>
            ))}
        </>
      )}
    </div>
  ) : null;
};

function groupRelicsByName(relics: any[]): Record<string, any[]> {
  const groups: Record<string, any[]> = {};
  for (const relic of relics) {
    const key = relic.name || "Unknown Set";
    if (!groups[key]) groups[key] = [];
    groups[key].push(relic);
  }
  return groups;
}

function statsEqual(a: any, b: any): boolean {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return (
    a.mainS === b.mainS &&
    a.sub1 === b.sub1 &&
    a.sub2 === b.sub2 &&
    a.sub3 === b.sub3 &&
    a.sub4 === b.sub4
  );
}

function relicStatsEqual(a: any, b: any): boolean {
  return (
    statsEqual(a.hatStats, b.hatStats) &&
    statsEqual(a.gloveStats, b.gloveStats) &&
    statsEqual(a.shoesStats, b.shoesStats) &&
    statsEqual(a.bodyStats, b.bodyStats) &&
    statsEqual(a.sphereStats, b.sphereStats) &&
    statsEqual(a.ropeStats, b.ropeStats)
  );
}

function mergeIdenticalRelics(relics: any[]): any[][] {
  const groups: any[][] = [];
  for (const relic of relics) {
    const existing = groups.find((g) => relicStatsEqual(g[0], relic));
    if (existing) {
      existing.push(relic);
    } else {
      groups.push([relic]);
    }
  }
  return groups;
}

const RelicGroupEntry = ({ relics, onEdit }: { relics: any[]; onEdit: (relic: any) => void }) => {
  const relic = relics[0];
  return (
    <div
      className="flex gap-4 p-5"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex gap-3 flex-wrap">
        <RelicCardMini part={relic.hatStats} name="Hat" />
        <RelicCardMini part={relic.gloveStats} name="Glove" />
        <RelicCardMini part={relic.shoesStats} name="Shoes" />
        <RelicCardMini part={relic.bodyStats} name="Body" />
        <RelicCardMini part={relic.sphereStats} name="Sphere" />
        <RelicCardMini part={relic.ropeStats} name="Rope" />
      </div>
      <div
        className="pl-4 ml-2 flex flex-col items-center"
        style={{ borderLeft: "1px solid var(--border)", minWidth: 70 }}
      >
        <p className="text-xs font-semibold mb-2" style={{ color: "var(--foreground-muted)" }}>
          {relics.length > 1 ? "Characters" : "Character"}
        </p>
        <div className="flex flex-row gap-3 items-start">
          {relics.map((r) => (
            <div key={r.setId} className="flex flex-col items-center gap-1">
              {r.character ? (
                <Image
                  src={"/char-images/" + r.character.replaceAll(" ", "_") + ".png"}
                  alt={r.character}
                  width={160}
                  height={188}
                  style={{
                    width: 48,
                    height: 55,
                    borderRadius: 12,
                    border: "2px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              ) : (
                <p className="text-xs text-center" style={{ color: "var(--foreground-muted)" }}>
                  None
                </p>
              )}
              <div className="flex items-center gap-1">
                <Image
                  src={edit}
                  alt="Edit"
                  height={14}
                  width={14}
                  style={{ cursor: "pointer", opacity: 0.6 }}
                  onClick={() => onEdit(r)}
                  className="hover:opacity-100 transition-opacity"
                />
                <Image
                  src={deleteIcon}
                  alt="Delete"
                  height={14}
                  width={14}
                  style={{ cursor: "pointer", opacity: 0.6 }}
                  onClick={() => deleteRelic(r.setId)}
                  className="hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RelicGroupCard = ({
  name,
  relics,
  globalExpanded,
  onEdit,
}: {
  name: string;
  relics: any[];
  globalExpanded: boolean;
  onEdit: (relic: any) => void;
}) => {
  const [expanded, setExpanded] = useState(true);
  const relicImage = getRelicImage(name);

  useEffect(() => {
    setExpanded(globalExpanded);
  }, [globalExpanded]);

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3 text-left transition-colors duration-150"
        style={{
          background: "linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(45, 212, 191, 0.08) 100%)",
          borderBottom: expanded ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="flex items-center gap-3">
          {relicImage && (
            <Image
              src={relicImage}
              alt={name}
              width={50}
              height={50}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                flexShrink: 0,
              }}
            />
          )}
          <h4 className="text-sm font-semibold">{name}</h4>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "rgba(108, 99, 255, 0.15)",
              color: "var(--accent)",
            }}
          >
            {relics.length} {relics.length === 1 ? "set" : "sets"}
          </span>
        </div>
        <Image
          src={expanded ? chevronUp : chevronDown}
          alt={expanded ? "Collapse" : "Expand"}
          height={20}
          width={20}
          style={{ opacity: 0.6, transition: "opacity 0.15s" }}
          className="hover:opacity-100"
        />
      </button>
      {expanded && (
        <div>
          {mergeIdenticalRelics(relics).map((group, index) => (
            <RelicGroupEntry key={group[0].setId || index} relics={group} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

const RelicList = ({
  items,
  emptyMessage,
  globalExpanded,
  onEdit,
}: {
  items: any[];
  emptyMessage: string;
  globalExpanded: boolean;
  onEdit: (relic: any) => void;
}) => {
  if (!items || items.length === 0) {
    return (
      <div
        className="card p-6 text-center"
        style={{ color: "var(--foreground-muted)" }}
      >
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  const grouped = groupRelicsByName(items);

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(grouped).map(([name, relics]) => (
        <RelicGroupCard
          key={name}
          name={name}
          relics={relics}
          globalExpanded={globalExpanded}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

const CharacterCard = ({ charData }: any) => {
  return charData && charData.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {charData.map((char: any, index: number) => (
        <div key={index}>
          {char.char !== "" && (
            <Image
              src={"/char-images/" + char.char.replaceAll(" ", "_") + ".png"}
              alt={char.char}
              width={160}
              height={188}
              style={{
                width: 48,
                height: 55,
                borderRadius: 12,
                border: "2px solid rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={characterClick}
              onContextMenu={characterClick}
            />
          )}
        </div>
      ))}
    </div>
  ) : (
    <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
      You don&apos;t have any characters added. Start by adding some!
    </p>
  );
};

type Tab = "relics" | "ornaments";

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

export default function RelicDashboard() {
  const [charPopup, setCharPopup] = useState<boolean>(false);
  const [relicPopup, setRelicPopup] = useState<boolean>(false);
  const [editingRelic, setEditingRelic] = useState<any | null>(null);
  const [relicData, setRelicData] = useState<any[]>([]);
  const [charData, setCharData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("relics");
  const [allExpanded, setAllExpanded] = useState(true);

  const { relics, ornaments } = splitByType(relicData ?? []);

  useEffect(() => {
    setRelicData(getRelics());
    setCharData(getChars());
  }, []);

  const addCharacter = (): void => {
    setCharPopup(true);
    setRelicPopup(false);
    setEditingRelic(null);
  };

  const addRelic = (): void => {
    setRelicPopup(true);
    setCharPopup(false);
    setEditingRelic(null);
  };

  const openEditRelic = (relic: any): void => {
    setEditingRelic(relic);
    setCharPopup(false);
    setRelicPopup(false);
  };

  const closePopup = (): void => {
    setCharPopup(false);
    setRelicPopup(false);
    setEditingRelic(null);
  };

  return (
    <>
      <Header />
      <main className="flex flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 animate-fade-in">
          {/* Characters */}
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Characters</h2>
            <Button onClick={addCharacter} text="Add a Character" />
          </div>
          <div className="mb-8">
            <CharacterCard charData={charData} />
          </div>

          {/* Tabs + actions */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <TabButton
                label="Relics"
                count={relics.length}
                active={activeTab === "relics"}
                onClick={() => setActiveTab("relics")}
              />
              <TabButton
                label="Ornaments"
                count={ornaments.length}
                active={activeTab === "ornaments"}
                onClick={() => setActiveTab("ornaments")}
              />
            </div>
            <Button onClick={addRelic} text="Add" />
            <button
              onClick={() => setAllExpanded((prev) => !prev)}
              className="text-xs font-medium px-3 py-2 rounded-md transition-all duration-200"
              style={{
                color: "var(--foreground-muted)",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              {allExpanded ? "Collapse All" : "Expand All"}
            </button>
          </div>

          {/* Tab content */}
          {activeTab === "relics" ? (
            <RelicList
              items={relics}
              emptyMessage="No relic sets added yet. Add one to get started!"
              globalExpanded={allExpanded}
              onEdit={openEditRelic}
            />
          ) : (
            <RelicList
              items={ornaments}
              emptyMessage="No ornament sets added yet. Add one to get started!"
              globalExpanded={allExpanded}
              onEdit={openEditRelic}
            />
          )}
        </div>
        {(charPopup || relicPopup || editingRelic) && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closePopup();
            }}
          >
            <div
              className="card overflow-y-auto animate-fade-in"
              style={{
                maxWidth: 820,
                maxHeight: "85vh",
                width: "90%",
                padding: 0,
              }}
            >
              {charPopup && (
                <AddCharacter
                  charData={charData}
                  closePopup={closePopup}
                  backToChar={addCharacter}
                />
              )}
              {relicPopup && (
                <AddRelic
                  charSelected=""
                  closePopup={closePopup}
                  backToChar={addCharacter}
                />
              )}
              {editingRelic && (
                <EditRelic
                  relic={editingRelic}
                  closePopup={closePopup}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
