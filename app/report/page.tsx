"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ReportBug() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("_subject", "[HSR Relic Planner] Bug Report");
      formData.append("_template", "table");
      formData.append("_captcha", "false");

      const res = await fetch("https://formsubmit.co/ajax/pkwlo1992@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (res.ok) {
        setStatus("sent");
        setTitle("");
        setDescription("");
      } else {
        console.error("FormSubmit response:", res.status, await res.text());
        setStatus("error");
      }
    } catch (err) {
      console.error("FormSubmit error:", err);
      setStatus("error");
    }
  }

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

            {status === "sent" ? (
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-2">Thank you!</h3>
                <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                  Your bug report has been submitted. We&apos;ll look into it.
                </p>
                <button
                  className="mt-4 text-sm font-medium px-4 py-2 rounded-md transition-all duration-200"
                  style={{
                    color: "var(--foreground)",
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                  onClick={() => setStatus("idle")}
                >
                  Submit another report
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm mb-6" style={{ color: "var(--foreground-muted)" }}>
                  Fields indicated with a{" "}
                  <span style={{ color: "#ef4444" }}>*</span> are required.
                </p>

                {status === "error" && (
                  <div
                    className="card p-4 mb-4 text-sm"
                    style={{ borderColor: "#ef4444", color: "#ef4444" }}
                  >
                    Something went wrong. Please try again.
                  </div>
                )}

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      name="Title"
                      className="input-field"
                      placeholder="Brief summary of the issue"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                      Please provide as much information as possible to help us
                      reproduce the issue.
                    </p>
                    <textarea
                      id="description"
                      name="Description"
                      className="input-field"
                      rows={6}
                      placeholder="Describe the bug in detail..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="text-sm font-medium transition-all duration-200"
                      style={{
                        color: status === "sending" ? "var(--foreground-muted)" : "#e8eaed",
                        background: status === "sending" ? "var(--bg-surface)" : "var(--accent)",
                        padding: "8px 18px",
                        cursor: status === "sending" ? "not-allowed" : "pointer",
                        borderRadius: "var(--radius-md)",
                        border: "none",
                        boxShadow: "var(--shadow-sm)",
                        opacity: status === "sending" ? 0.6 : 1,
                      }}
                    >
                      {status === "sending" ? "Sending..." : "Submit"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
