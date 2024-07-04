import React from "react";
import SideButton from "./SideButton";

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ width: "230px", minWidth: "230px" }}>
      <div className="flex flex-col">
        <SideButton onClick={() => goTo("/")} text={"Home"} />
        <SideButton
          onClick={() => goTo("/relic-dashboard")}
          text={"Relic Dashboard"}
        />
        <SideButton onClick={() => goTo("/characters")} text={"Characters"} />
        <SideButton
          onClick={() => goTo("/relic-sets")}
          text={"Relic & Ornament Sets"}
        />
        <SideButton onClick={() => goTo("/report")} text={"Report a Bug"} />
      </div>
    </div>
  );
};

function goTo(path: string) {
  window.location.href = path;
}

export default Sidebar;
