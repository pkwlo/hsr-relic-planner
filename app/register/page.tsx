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
      <main className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col items-center p-3 px-6">
          <h3 className="text-3xl">Register!</h3>
          <p className="pb-2">
            {"Already have an account?"}{" "}
            <a href="/log-in" style={{ fontWeight: 500 }}>
              <u>Log-in now!</u>
            </a>
          </p>
          <p className="p-2 border border-2">
            {"Make sure you use a password that you don't use anywhere else."}
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
              name="password"
              className="p-2 border border-gray-300 rounded-md"
              style={{ marginBottom: "1rem", color: "#272436" }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirm-password" className="text-lg">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword as string}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  checkPassword(password, confirmPassword, email);
                }
              }}
              name="confirm-password"
              className="p-2 border border-gray-300 rounded-md"
              style={{ marginBottom: "1rem", color: "#272436" }}
            />
          </div>
          <Button
            text={"Register"}
            onClick={() => checkPassword(password, confirmPassword, email)}
          />
        </div>
      </main>
    </>
  );
}
