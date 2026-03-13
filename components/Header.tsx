"use client";

import React from "react";
import { useEffect } from "react";
import Button from "@/components/Button";

const logOut = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");
    window.location.reload();
  }
};

function goTo(path: string) {
  window.location.href = path;
}

const Header = () => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("loggedIn") === "true") {
        setLoggedIn(true);
      }
    }
  }, []);

  return (
    <header
      className="flex flex-row justify-between items-center px-6 py-4 sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(15, 17, 23, 0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <h1 className="text-xl font-bold tracking-tight gradient-text">
        HSR Relic Planner
      </h1>
      {loggedIn ? (
        <Button text="Log Out" onClick={() => logOut()} />
      ) : (
        <div className="flex gap-2">
          <Button text="Log In" onClick={() => goTo("/log-in")} />
          <Button text="Register" onClick={() => goTo("/register")} />
        </div>
      )}
    </header>
  );
};

export default Header;
