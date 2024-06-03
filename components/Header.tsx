import React from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      style={{
        border: "2px solid #FFFFFF", // Border color
        color: "#FFFFFF", // Text color
        backgroundColor: "#7B67DF", // Background color
        padding: "10px", // Padding
        margin: "10px 10px 10px 0px", // Margin
        borderRadius: "5px", // Rounded corners
        cursor: "pointer", // Pointer cursor on hover
      }}
    >
      {text}
    </button>
  );
};

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
