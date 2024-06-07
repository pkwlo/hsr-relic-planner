"use client";

import React from "react";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AddRelic from "@/components/AddRelic";
import AddCharacter from "@/components/AddCharacter";
import { useState, useEffect } from "react";

export default function Home() {
  const [charPopup, setCharPopup] = useState<boolean>(false);
  const [relicPopup, setRelicPopup] = useState<boolean>(false);
  const [columnWidth, setColumnWidth] = useState<number>(400);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setColumnWidth(window.innerWidth - 230);
    }
  }, []);

  const addCharacter = (): void => {
    setCharPopup(true);
    setRelicPopup(false);
    setColumnWidth(400);
  };

  const addRelic = (): void => {
    setRelicPopup(true);
    setCharPopup(false);
    setColumnWidth(400);
  };

  const closePopup = (): void => {
    setCharPopup(false);
    setRelicPopup(false);
    setColumnWidth(window.innerWidth - 230);
  };

  return (
    <>
      <Header />
      <main className="flex flex-row">
        <Sidebar />
        <div
          className="flex flex-col px-6"
          style={{ minWidth: columnWidth, maxWidth: columnWidth }}
        >
          <div className="flex flex-row items-center">
            <h3 className="text-2xl pr-3">Characters</h3>
            <Button onClick={addCharacter} text={"Add a Character"} />
          </div>
          <div>
            {"You don't have any characters added. Start by adding some!"}
          </div>
          <div className="flex flex-row items-center py-3">
            <h3 className="text-2xl pr-3">Relics</h3>
            <Button onClick={addRelic} text={"Add a Relic"} />
          </div>
          <div>{"You don't have any relics added. Start by adding some!"}</div>
        </div>
        <div className="flex flex-col">
          {charPopup && (
            <div className="popup">
              <div className="popup-content">
                <span
                  className="close text-3xl px-2 pb-1 border-2 border-white rounded-full ml-5"
                  onClick={closePopup}
                >
                  &times;
                </span>
                <AddCharacter />
              </div>
            </div>
          )}
          {relicPopup && (
            <div className="popup">
              <div className="popup-content">
                <span
                  className="close text-3xl px-2 pb-1 border-2 border-white rounded-full ml-5"
                  onClick={closePopup}
                >
                  &times;
                </span>
                <AddRelic />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
