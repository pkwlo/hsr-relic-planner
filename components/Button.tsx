import React, { useState } from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: isHovered ? "#c3c3c3" : "#fcfcfc",
        backgroundColor: isHovered ? "#5d737e" : "#3f4045",
        padding: "5px 10px 5px 10px",
        margin: "0px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        borderRadius: "5px",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
