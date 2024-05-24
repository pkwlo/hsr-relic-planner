"use client";

import Image from "next/image";
import React from "react";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="flex flex-row justify-center py-3">
        <h3>Characters</h3>
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={"Add a Character"}
        />
      </div>
      <div className="flex flex-row justify-center py-3">
        <h3>Relics</h3>
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={"Add a Relic"}
        />
      </div>
    </main>
  );
}
