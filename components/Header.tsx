import React from "react";
import Button from "./Button";

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center">
      <h1 className="text-3xl" style={{ paddingLeft: "10px" }}>
        HSR Relic Planner
      </h1>
      <div>
        <Button text={"Log In"} onClick={() => goTo("/log-in")} />
        <Button text={"Register"} onClick={() => goTo("/register")} />
      </div>
    </header>
  );
};

function goTo(path: string) {
  window.location.href = path;
}

export default Header;
