"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";
import characters from "./characters.json";

function CharacterCardTemplate({
  characterName,
  characterImage,
  characterType,
  characterRarity,
  characterPath,
}: {
  characterName: string;
  characterImage: string;
  characterType: string;
  characterRarity: string;
  characterPath: string;
}) {
  return (
    <div
      className="card flex flex-row items-start p-4 transition-all duration-200"
      style={{ width: 320 }}
    >
      <Image
        src={characterImage}
        alt={characterName}
        width={160}
        height={188}
        style={{
          width: 80,
          height: 92,
          borderRadius: 14,
          border: "2px solid rgba(255, 255, 255, 0.1)",
          backgroundColor:
            characterRarity === "rarity-5"
              ? "rgba(252, 253, 150, 0.15)"
              : "rgba(220, 172, 216, 0.15)",
        }}
        priority
      />
      <div className="flex flex-col ml-4 gap-1.5">
        <h6 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          {characterName}
        </h6>
        <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
          Element: {characterType}
        </p>
        <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
          Path: {characterPath}
        </p>
      </div>
    </div>
  );
}

export default function CharacterPage() {
  return (
    <>
      <Header />
      <main className="flex flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Characters</h2>
          <div className="h-1 w-16 rounded-full bg-gradient-accent mb-6" />
          <div className="flex flex-wrap gap-4">
            {characters.map((character, index) => (
              <CharacterCardTemplate
                key={index}
                characterName={character.name}
                characterType={character.element}
                characterImage={character.local}
                characterRarity={character.rarity}
                characterPath={character.path}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
