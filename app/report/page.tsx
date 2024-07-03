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
      <main className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col pl-6 pt-3" style={{ maxWidth: 600 }}>
          <h3 className="text-3xl">Report A Bug</h3>
          <p className="text-sm mt-2">
            Fields indicated with a{" "}
            <span className="text" style={{ color: "red" }}>
              *
            </span>{" "}
            are required.
          </p>
          <form className="mt-4">
            <label className="block">
              <span className="text-white text-xl">Title</span>
              <span className="text" style={{ color: "red" }}>
                *
              </span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black p-2"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="block mt-4">
              <span className="text-white text-xl">Description</span>
              <span className="text" style={{ color: "red" }}>
                *
              </span>
              <p className="text-sm mt-2">
                Please provide as much information as possible to help us
                reproduce the issue.
              </p>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black p-2"
                rows={6}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="block mt-4">
              <span className="text-white text-xl">Screenshot</span>
              <p className="text-sm mt-2">
                Attach an image to help us understand the issue better.
              </p>
              <input
                type="file"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-white p-2"
              />
            </label>
            <Button text="Submit" onClick={() => AddBug(title, description)} />
          </form>
        </div>
      </main>
    </>
  );
}
