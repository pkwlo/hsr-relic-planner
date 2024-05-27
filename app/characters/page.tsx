"use client";

import React from "react";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Page() {
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
          <div>Placeholder section for character avatars.</div>
        </div>
      </main>
    </>
  );
}
