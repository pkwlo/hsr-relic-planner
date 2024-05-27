"use client";

import React from "react";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";
import characters from "./characters.json";

function CharacterCardTemplate({
  characterName,
  characterImage,
  characterType,
  characterRarity,
}: {
  characterName: string;
  characterImage: string;
  characterType: string;
  characterRarity: string;
}) {
  return (
    <div className="flex flex-row">
      <Image
        src={characterImage}
        alt={characterName}
        width={160}
        height={188}
        style={{
          width: 100,
          height: 115,
          border: "2px solid #FFFFFF",
          borderRadius: 20,
          margin: 10,
          backgroundColor:
            characterRarity === "rarity-5" ? "#FCFD96" : "#DCACD8",
        }}
        priority
      />

      <div className="flex flex-col py-4" style={{ width: 500 }}>
        <h6 className="text-xl">{characterName}</h6>
        <p className="mt-3">Element: {characterType}</p>
        <p className="mt-3">Path: </p>
        <p className="mt-3">Best Sets: </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col">
          <h3 className="text-3xl">Characters</h3>
          <div>
            {characters.map((character, index) => {
              const characterName = character.name;
              const characterType = character.type;
              const characterImage = character.local;
              const characterRarity = character.rarity;
              return (
                <CharacterCardTemplate
                  key={index}
                  characterName={characterName}
                  characterType={characterType}
                  characterImage={characterImage}
                  characterRarity={characterRarity}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
