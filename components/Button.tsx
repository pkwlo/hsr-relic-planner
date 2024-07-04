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
        border: "2px solid #c3c3c3", // Border color
        color: isHovered ? "#c3c3c3" : "#4c4b63", // Text color
        backgroundColor: isHovered ? "#5386e4" : "#aba8b2", // Background color
        padding: "10px", // Padding
        margin: "10px 10px 0px 10px", // Margin
        borderRadius: "5px", // Rounded corners
        cursor: "pointer", // Pointer cursor on hover
        transition: "background-color 0.3s", // Smooth transition
      }}
    >
      {text}
    </button>
  );
};

export default Button;
