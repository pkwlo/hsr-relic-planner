"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Button from "@/components/Button";

function checkPassword(
  password: string,
  confirmPassword: string,
  email: string,
) {
  if (password === confirmPassword) {
    register(email, password);
  } else {
    alert("Passwords do not match!");
  }
}

async function register(email: string, password: string) {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200 && data.success) {
      alert(data.message);
      window.location.href = "/log-in";
    } else {
      alert(data.message);
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error registering:", error);
  }
}

export default function RegisterPage() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  return (
    <>
      <Header />
      <main className="flex flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-start justify-center p-8 animate-fade-in">
          <div className="card p-8 w-full" style={{ maxWidth: 420 }}>
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              Register
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--foreground-muted)" }}>
              {"Already have an account? "}
              <a
                href="/log-in"
                className="font-medium transition-colors duration-150"
                style={{ color: "var(--accent)" }}
              >
                Log in now
              </a>
            </p>

            <div
              className="flex items-center gap-2 px-4 py-3 rounded-md mb-6 text-sm"
              style={{
                backgroundColor: "rgba(108, 99, 255, 0.08)",
                border: "1px solid rgba(108, 99, 255, 0.2)",
                color: "var(--foreground-muted)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <circle cx="8" cy="8" r="7" stroke="var(--accent)" strokeWidth="1.5" />
                <path d="M8 5v3M8 10v1" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Make sure you use a password that you don&apos;t use anywhere else.
            </div>

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
                  name="password"
                  className="input-field"
                  placeholder="Create a password"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      checkPassword(password, confirmPassword, email);
                    }
                  }}
                  name="confirm-password"
                  className="input-field"
                  placeholder="Confirm your password"
                />
              </div>
              <div className="pt-2">
                <Button
                  text="Register"
                  onClick={() => checkPassword(password, confirmPassword, email)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
