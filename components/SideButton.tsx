import React, { useState } from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const SideButton: React.FC<ButtonProps> = ({ onClick, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: isHovered ? "#c3c3c3" : "#fcfcfc", // Text color
        backgroundColor: isHovered ? "#5d737e" : "#30292f", // Background color
        padding: "10px", // Padding
        margin: "0px", // Margin
        cursor: "pointer", // Pointer cursor on hover
        transition: "background-color 0.3s", // Smooth transition
      }}
    >
      {text}
    </button>
  );
};

export default SideButton;
