"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Home() {
  const version = "v0.0.3 Alpha";
  return (
    <>
      <Header />
      <main className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col pl-6 pt-3" style={{ maxWidth: 600 }}>
          <h3 className="text-3xl">Welcome!</h3>
          <br />
          <p>
            This is the HSR Relic Planner <b>{version}</b>
          </p>
          <p>
            Version 1.0 is anticipated to be completed in mid September 2024.
          </p>
          <br />
          <p>
            This is a tool to help you plan your relic farming in the game
            Honkai Star Rail. (And more importantly, to help you keep track of
            which relics you can trash and which to keep!)
          </p>
          <br />
          <h3 className="text-xl">Change Log/Future Releases</h3>
          <b>Current: {version}</b>
          {/* <ul>
            <li>Release</li>
            <li>- MVP release (v1.0.0)</li>
            <li>- Go through backlog</li>
          </ul>
          <ul>
            <li>Beta</li>
            <li>- beautify page (v0.1.0)</li>
            <li>- mobile responsiveness</li>
          </ul> */}
          <ul>
            <li>Alpha</li>
            <li>- user log-in (v0.0.0)</li>
            <li>- user registration (v0.0.1)</li>
            <li>- add relics to inventory (v0.0.2)</li>
            <li>- add characters to inventory (v0.0.3)</li>
          </ul>
        </div>
      </main>
    </>
  );
}
