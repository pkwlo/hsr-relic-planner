import React, { useState } from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
  disable: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, disable }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: disable ? "#858585" : isHovered ? "#c3c3c3" : "#fcfcfc",
        backgroundColor: disable
          ? "#30292f"
          : isHovered
            ? "#5d737e"
            : "#3f4045",
        padding: "5px 10px 5px 10px",
        margin: "10px 10px 0px 0px",
        cursor: disable ? "default" : "pointer",
        transition: "background-color 0.3s",
        borderRadius: "5px",
        border: "2px solid #5d737e",
      }}
      disabled={disable}
    >
      {text}
    </button>
  );
};

export default Button;
