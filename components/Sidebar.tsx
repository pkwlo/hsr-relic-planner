import React from "react";
import Button from "./Button";

interface SidebarProps {
  // Define any props you need for the sidebar component
}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="sidebar">
      <div className="flex flex-col">
        <Button onClick={() => goTo("/")} text={"Home"} />
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
