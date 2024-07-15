import React from "react";
import SideButton from "./SideButton";

const Sidebar = () => {
  return (
    <div
      className="sidebar flex-col"
      style={{ width: "230px", minWidth: "230px" }}
    >
      <div className="flex flex-col" style={{ minHeight: "80vh" }}>
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
      <div style={{ marginTop: "auto", textAlign: "center" }}>
        <p className="text-s text-center">Created by Nori, 2024</p>
        <p className="text-xs text-center">
          Honkai Star Rail © MiHoYo Co., Ltd.
        </p>
      </div>
    </div>
  );
};

function goTo(path: string) {
  window.location.href = path;
}

export default Sidebar;
