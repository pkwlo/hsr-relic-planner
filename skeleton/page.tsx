"use client";

import React from "react";
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
            <h3 className="text-3xl">Skeleton</h3>
          </div>
        </div>
      </main>
    </>
  );
}
