"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Button from "@/components/Button";

async function AddBug(title: string, description: string) {
  const user = localStorage.getItem("email");
  try {
    const res = await fetch("/api/addBug", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        title,
        description,
      }),
    });

    const data = await res.json();
  } catch (error) {
    console.error("Error submitting bug", error);
  }
}

export default function ReportBug() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [screenshot, setScreenshot] = React.useState(null);

  return (
    <>
      <Header />
      <main className="flex flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 animate-fade-in">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Report A Bug
            </h2>
            <div className="h-1 w-16 rounded-full bg-gradient-accent mb-6" />

            <p className="text-sm mb-6" style={{ color: "var(--foreground-muted)" }}>
              Fields indicated with a{" "}
              <span style={{ color: "#ef4444" }}>*</span> are required.
            </p>

            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Brief summary of the issue"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Description <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                  Please provide as much information as possible to help us
                  reproduce the issue.
                </p>
                <textarea
                  className="input-field"
                  rows={6}
                  placeholder="Describe the bug in detail..."
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Screenshot
                </label>
                <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                  Attach an image to help us understand the issue better.
                </p>
                <input
                  type="file"
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:cursor-pointer transition-all"
                  style={{
                    color: "var(--foreground-muted)",
                  }}
                />
              </div>

              <div className="pt-2">
                <Button text="Submit" onClick={() => AddBug(title, description)} />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
