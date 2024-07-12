"use client";

import React from "react";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
// images
import Image from "next/image";
import chevronUp from "@/public/icons/KAup.png";
import chevronDown from "@/public/icons/KAdown.png";
import deleteIcon from "@/public/icons/delete.png";
// page specific components
import AddRelic from "@/app/relic-dashboard/AddRelic";
import AddCharacter from "@/app/relic-dashboard/AddCharacter";
import edit from "@/public/icons/edit.png";
import deleteRelic from "./deleteRelic";
import getRelics from "./getRelics";
import getChars from "./getChars";
import editRelic from "./editRelic";
import expandRelic from "./expandRelic";
import hideRelic from "./hideRelic";
import characterClick from "./characterClick";

const RelicCardMini = ({ part, name }: { part: any; name: string }) => {
  return part ? (
    <div className="flex flex-col m-2" style={{ maxWidth: 120 }}>
      <h3 className="font-semibold ml-1">{name}</h3>
      <h3 className="font-semibold ml-1">Main Stat</h3>
      {part.mainS && (
        <p className="border-2 border-gray-500 rounded-md p-1 m-0.5">
          {part.mainS}
        </p>
      )}
      {(part.sub1 || part.sub2 || part.sub3 || part.sub4) && (
        <>
          <h4 className="font-semibold ml-1">Sub Stats</h4>
          {part.sub1 && (
            <p className="border-2 border-gray-500 rounded-md p-1 m-0.5">
              {part.sub1}
            </p>
          )}
          {part.sub2 && (
            <p className="border-2 border-gray-500 rounded-md p-1 m-0.5">
              {part.sub2}
            </p>
          )}
          {part.sub3 && (
            <p className="border-2 border-gray-500 rounded-md p-1 m-0.5">
              {part.sub3}
            </p>
          )}
          {part.sub4 && (
            <p className="border-2 border-gray-500 rounded-md p-1 m-0.5">
              {part.sub4}
            </p>
          )}
        </>
      )}
    </div>
  ) : null;
};

const RelicCard = ({ relicData }: any) => {
  return relicData && relicData.length > 0 ? (
    <div>
      {relicData.map((relic: any, index: number) => (
        <div key={index}>
          <div
            className="flex p-2 rounded-md items-center justify-between"
            style={{
              backgroundColor: "#5d737e",
              maxWidth: 800,
              border: "1px solid #c3c3c3",
              color: "white",
            }}
          >
            <h4 className="text-xl">{relic.name}</h4>
            <div className="flex flex-row">
              <Image
                src={edit}
                alt={"Edit"}
                height={20}
                width={20}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 10,
                  marginTop: 5,
                  cursor: "pointer",
                }}
                onClick={editRelic}
              />
              <Image
                src={deleteIcon}
                alt="Delete"
                height={20}
                width={20}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 10,
                  marginTop: 5,
                  cursor: "pointer",
                }}
                onClick={() => deleteRelic(relic.setId)}
              />
              <Image
                src={chevronUp}
                alt={"Up Arrow"}
                height={30}
                width={30}
                style={{
                  cursor: "pointer",
                }}
                onClick={hideRelic}
              />
            </div>
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

const CharacterCard = ({ charData }: any) => {
  return charData && charData.length > 0 ? (
    <div className="flex flex-wrap">
      {charData.map((char: any, index: number) => (
        <div key={index}>
          <Image
            src={"/char-images/" + char.char.replaceAll(" ", "_") + ".png"}
            alt={char.char}
            width={160}
            height={188}
            style={{
              width: 50,
              height: 57.5,
              border: "2px solid #FFFFFF",
              borderRadius: 20,
              margin: 5,
              cursor: "pointer",
            }}
            onClick={characterClick}
            onContextMenu={characterClick}
          />
        </div>
      ))}
    </div>
  ) : (
    <div>{"You don't have any characters added. Start by adding some!"}</div>
  );
};

export default function RelicDashboard() {
  const [charPopup, setCharPopup] = useState<boolean>(false);
  const [relicPopup, setRelicPopup] = useState<boolean>(false);
  const [columnWidth, setColumnWidth] = useState<number>(400);
  const [relicData, setRelicData] = useState<any[]>([]);
  const [charData, setCharData] = useState<any[]>([]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setColumnWidth(window.innerWidth - 230);
      setUser(localStorage.getItem("email"));
    }
  }, []);

  useEffect(() => {
    const fetchRelics = async () => {
      try {
        const data = await getRelics(user);
        setRelicData(data);
      } catch (error) {
        console.error("Error fetching relics:", error);
      }
    };

    const fetchChars = async () => {
      try {
        const data = await getChars(user);
        setCharData(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    if (user) {
      fetchRelics();
      fetchChars();
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
    // User is logged in
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
            {/* All characters user added will show up here */}
            <CharacterCard charData={charData} />
          </div>
          <div className="flex flex-row items-center py-3">
            <h3 className="text-2xl pr-3">Relics</h3>
            <Button onClick={addRelic} text={"Add a Relic"} />
          </div>
          {/* All relics user added will show up here */}
          <RelicCard relicData={relicData} />
        </div>
        <div className="flex flex-col">
          {/* Add character popup that shows up after clicking Add Character*/}
          {charPopup && (
            <div className="popup">
              <div className="popup-content">
                <span
                  className="close text-3xl px-2 pb-1 border-2 border-white rounded-full ml-5"
                  onClick={closePopup}
                >
                  &times;
                </span>
                <AddCharacter
                  charData={charData}
                  closePopup={closePopup}
                  backToChar={addCharacter}
                />
              </div>
            </div>
          )}
          {/* Add relic popup that shows up after clicking Add Relic*/}
          {relicPopup && (
            <div className="popup">
              <div className="popup-content">
                <span
                  className="close text-3xl px-2 pb-1 border-2 border-white rounded-full ml-5"
                  onClick={closePopup}
                >
                  &times;
                </span>
                <AddRelic
                  charSelected={""}
                  closePopup={closePopup}
                  backToChar={addCharacter}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  ) : (
    // User is not logged in
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
