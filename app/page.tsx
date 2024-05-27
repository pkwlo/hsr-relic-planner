"use client";

import Image from "next/image";
import React from "react";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col">
          <div className="flex flex-row justify-center py-3">
            <h3>Characters</h3>
            <Button
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              text={"Add a Character"}
            />
          </div>
          <div>Placeholder for character avatars.</div>
          <div className="flex flex-row justify-center py-3">
            <h3>Relics</h3>
            <Button
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              text={"Add a Relic"}
            />
          </div>
          <div>Placeholder for relic data.</div>
        </div>
      </main>
    </>
  );
}
