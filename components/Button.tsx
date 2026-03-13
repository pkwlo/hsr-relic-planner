"use client";

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
      className="text-sm font-medium transition-all duration-200"
      style={{
        color: isHovered ? "#ffffff" : "#e8eaed",
        background: isHovered ? "var(--accent-hover)" : "var(--accent)",
        padding: "8px 18px",
        cursor: "pointer",
        borderRadius: "var(--radius-md)",
        border: "none",
        boxShadow: isHovered
          ? "0 0 20px var(--accent-glow)"
          : "var(--shadow-sm)",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
