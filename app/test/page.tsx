"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AddRelic from "@/components/AddRelic";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col p-3 px-6">
          <h3 className="text-3xl mb-3">Testing grounds</h3>
          <AddRelic />
        </div>
      </main>
    </>
  );
}
