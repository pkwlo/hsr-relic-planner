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
        border: "2px solid #4A90E2", // Border color
        color: "#FFFFFF", // Text color
        backgroundColor: "#4A90E2", // Background color
        padding: "10px 20px", // Padding
        borderRadius: "5px", // Rounded corners
        cursor: "pointer", // Pointer cursor on hover
      }}
    >
      {text}
    </button>
  );
};

export default Button;
