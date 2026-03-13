"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Button from "@/components/Button";

async function logIn(email: string, password: string) {
  try {
    const res = await fetch("/api/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200 && data.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("email", email);
        window.location.href = "/";
      }
    } else {
      alert(data.message);
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

export default function LogInPage() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return (
    <>
      <Header />
      <main className="flex flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-start justify-center p-8 animate-fade-in">
          <div className="card p-8 w-full" style={{ maxWidth: 420 }}>
            <h2 className="text-2xl font-bold tracking-tight mb-1">Log In</h2>
            <p className="text-sm mb-6" style={{ color: "var(--foreground-muted)" }}>
              {"Don't have an account? "}
              <a
                href="/register"
                className="font-medium transition-colors duration-150"
                style={{ color: "var(--accent)" }}
              >
                Register now
              </a>
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      logIn(email, password);
                    }
                  }}
                  name="password"
                  className="input-field"
                  placeholder="Enter your password"
                />
              </div>
              <div className="pt-2">
                <Button text="Log In" onClick={() => logIn(email, password)} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
