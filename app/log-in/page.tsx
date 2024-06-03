"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Button from "@/components/Button";

export default function Home() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return (
    <>
      <Header />
      <main className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col px-6 p-3 items-center">
          <h3 className="text-3xl">Log-in to access your data!</h3>
          <p>
            {"Don't have an account?"}{" "}
            <a href="/register" style={{ fontWeight: 500 }}>
              <u>Register now!</u>
            </a>
          </p>
          <div className="flex flex-col pt-3">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email as string}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="p-2 border border-gray-300 rounded-md"
              style={{
                marginBottom: "1rem",
                color: "#272436",
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password as string}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  logIn(email, password);
                }
              }}
              name="password"
              className="p-2 border border-gray-300 rounded-md"
              style={{ marginBottom: "1rem", color: "#272436" }}
            />
          </div>
          <Button text={"Log In"} onClick={() => logIn(email, password)} />
        </div>
      </main>
    </>
  );
}

const logIn = async (email: string, password: string) => {
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
      window.location.href = "/";
    } else {
      alert(data.message);
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
