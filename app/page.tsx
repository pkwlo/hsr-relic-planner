"use client";

import React from "react";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Home() {
  const [charPopup, setCharPopup] = React.useState<boolean>(false);
  const [relicPopup, setRelicPopup] = React.useState<boolean>(false);

  const addCharacter = (): void => {
    setCharPopup(true);
    setRelicPopup(false);
  };

  const addRelic = (): void => {
    setRelicPopup(true);
    setCharPopup(false);
  };

  const closePopup = (): void => {
    setCharPopup(false);
    setRelicPopup(false);
  };

  return (
    <>
      <Header />
      <main className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col">
          <div className="flex flex-row justify-center py-3">
            <h3>Characters</h3>
            <Button onClick={addCharacter} text={"Add a Character"} />
          </div>
          <div>
            {"You don't have any characters added. Start by adding some!"}
          </div>
          <div className="flex flex-row justify-center py-3">
            <h3>Relics</h3>
            <Button onClick={addRelic} text={"Add a Relic"} />
          </div>
          <div>{"You don't have any relics added. Start by adding some!"}</div>
        </div>
        <div className="flex flex-col">
          {charPopup && (
            <div className="popup">
              <div className="popup-content">
                <span className="close text-xl" onClick={closePopup}>
                  &times;
                </span>
                {/* Content of your popup goes here */}
                {/* For example: */}
                <h2>Add Character</h2>
                {/* Additional form fields or content */}
              </div>
            </div>
          )}
          {relicPopup && (
            <div className="popup">
              <div className="popup-content">
                <span className="close text-xl" onClick={closePopup}>
                  &times;
                </span>
                {/* Content of your popup goes here */}
                {/* For example: */}
                <h2>Add Relic</h2>
                {/* Additional form fields or content */}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
