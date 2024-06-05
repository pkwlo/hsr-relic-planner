"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col items-center p-3 px-6">
          <h3 className="text-3xl">Register!</h3>
          <p>
            {"Already have an account?"}{" "}
            <a href="/log-in" style={{ fontWeight: 500 }}>
              <u>Log-in now!</u>
            </a>
          </p>
          <div className="flex flex-col pt-3">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
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
              name="confirm-password"
              className="p-2 border border-gray-300 rounded-md"
              style={{ marginBottom: "1rem", color: "#272436" }}
            />
          </div>
          <Button text={"Register"} onClick={() => register(email, password)} />
        </div>
      </main>
    </>
  );

  const register = async (email: string, password: string) => {
    // Register logic here
  };
}
