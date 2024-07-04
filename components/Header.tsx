"use client";

import React from "react";
import { useEffect, useState } from "react";
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
    <header className="flex flex-row justify-between items-center">
      <h1 className="text-3xl" style={{ paddingLeft: "10px" }}>
        HSR Relic Planner
      </h1>
      {loggedIn ? (
        <Button text={"Log Out"} onClick={() => logOut()} />
      ) : (
        <>
          <div className="flex justify-end">
            <Button text={"Log In"} onClick={() => goTo("/log-in")} />
            <Button text={"Register"} onClick={() => goTo("/register")} />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
