"use client";

import React from "react";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AddRelic from "@/components/AddRelic";
import AddCharacter from "@/components/AddCharacter";
import { useState, useEffect } from "react";
import Image from "next/image";
import chevronUp from "@/public/icons/KAup.png";
import chevronDown from "@/public/icons/KAdown.png";

async function getRelics(user: any) {
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

const RelicCardMini = ({ part, name }: { part: any; name: string }) => {
  return part ? (
    <div className="flex flex-col m-2" style={{ maxWidth: 120 }}>
      <h3 className="font-semibold ml-1"> {name}</h3>
      <h3 className="font-semibold ml-1">Main Stat</h3>
      <p className="border-2 border-gray-500 rounded-md p-1 m-0.5">
        {part.mainS}
      </p>
      <h4 className="font-semibold ml-1">Sub Stats</h4>
      <p className="border-2 border-gray-500 rounded-md p-1 m-0.5">
        {part.sub1}
      </p>
      <p className="border-2 border-gray-500 rounded-md p-1 m-0.5">
        {part.sub2}
      </p>
      <p className="border-2 border-gray-500 rounded-md p-1 m-0.5">
        {part.sub3}
      </p>
      <p className="border-2 border-gray-500 rounded-md p-1 m-0.5">
        {part.sub4}
      </p>
    </div>
  ) : null;
};

const RelicCard = ({ relicData }: any) => {
  return relicData && relicData.length > 0 ? (
    <div>
      {relicData.map((relic: any, index: number) => (
        <div key={index}>
          <div
            className="flex border-2 p-2 rounded-md items-center justify-between"
            style={{ backgroundColor: "#4c437a", maxWidth: 800 }}
          >
            <h4 className="text-xl">{relic.name}</h4>
            <Image src={chevronUp} alt={"Right Arrow"} height={30} width={30} />
          </div>
          <div className="flex flex-row">
            <RelicCardMini part={relic.hatStats} name={"Hat"} />
            <RelicCardMini part={relic.gloveStats} name={"Glove"} />
            <RelicCardMini part={relic.shoesStats} name={"Shoes"} />
            <RelicCardMini part={relic.bodyStats} name={"Body"} />
            <RelicCardMini part={relic.sphereStats} name={"Sphere"} />
            <RelicCardMini part={relic.ropeStats} name={"Rope"} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>{"You don't have any relics added. Start by adding some!"}</div>
  );
};

export default function Home() {
  const [charPopup, setCharPopup] = useState<boolean>(false);
  const [relicPopup, setRelicPopup] = useState<boolean>(false);
  const [columnWidth, setColumnWidth] = useState<number>(400);
  const [relicData, setRelicData] = useState<any[]>([]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setColumnWidth(window.innerWidth - 230);
      setUser(localStorage.getItem("email"));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchRelics = async () => {
        const data = await getRelics(user);
        setRelicData(data);
      };

      fetchRelics();
    }
  }, [user]);

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

  return user ? (
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
          <RelicCard relicData={relicData} />
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
  ) : (
    <>
      <Header />
      <main className="flex flex-row">
        <Sidebar />
        <div className="p-6">
          <h1>
            <a href="/log-in" style={{ fontWeight: 500 }}>
              <u>Log in</u>
            </a>{" "}
            {"to start saving relics!"}
          </h1>
        </div>
      </main>
    </>
  );
}
