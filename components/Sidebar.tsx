import React from "react";
import Button from "./Button";

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ width: "230px", minWidth: "230px" }}>
      <div className="flex flex-col">
        <Button onClick={() => goTo("/")} text={"Home"} />
        <Button
          onClick={() => goTo("/relic-dashboard")}
          text={"Relic Dashboard"}
        />
        <Button onClick={() => goTo("/characters")} text={"Characters"} />
        <Button
          onClick={() => goTo("/relic-sets")}
          text={"Relic & Ornament Sets"}
        />
      </div>
    </div>
  );
};

function goTo(path: string) {
  window.location.href = path;
}

export default Sidebar;
