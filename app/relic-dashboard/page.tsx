"use client";

import React from "react";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AddRelic from "@/components/AddRelic";
import AddCharacter from "@/components/AddCharacter";
import { useState, useEffect } from "react";

async function getRelics() {
  const user = localStorage.getItem("user");

  try {
    const res = await fetch("/api/getRelics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    const data = await res.json();

    if (res.status === 200) {
      return data;
    } else {
      console.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error getting relics:", error);
  }
}

function RelicCard({ relic }: any) {}

export default function Home() {
  const [charPopup, setCharPopup] = useState<boolean>(false);
  const [relicPopup, setRelicPopup] = useState<boolean>(false);
  const [columnWidth, setColumnWidth] = useState<number>(400);
  const [relicData, setRelicData] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setColumnWidth(window.innerWidth - 230);
    }
  }, []);

  useEffect(() => {
    const fetchRelics = async () => {
      const data = await getRelics();
      console.log(data);
      setRelicData(data);
    };

    fetchRelics();
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
          {relicData ? (
            <div>
              {relicData.map((relic: any, index: number) => (
                <div key={index}>
                  <h4>{relic.name}</h4>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {"You don't have any relics added. Start by adding some!"}
            </div>
          )}
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
