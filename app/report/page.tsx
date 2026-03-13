"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Button from "@/components/Button";

function sendBugReport(title: string, description: string) {
  const email = "pkwlo1992@gmail.com";
  const subject = encodeURIComponent(`[Bug Report] ${title}`);
  const body = encodeURIComponent(
    `Bug Report\n\nTitle: ${title}\n\nDescription:\n${description}`,
  );
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

export default function ReportBug() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

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
              Clicking submit will open your email client.
            </p>

            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Brief summary of the issue"
                  value={title}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="pt-2">
                <Button text="Submit" onClick={() => sendBugReport(title, description)} />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
