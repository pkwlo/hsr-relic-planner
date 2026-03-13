"use client";

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
      className="relative w-full text-left px-5 py-3 text-sm font-medium tracking-wide transition-all duration-200"
      style={{
        color: isHovered ? "#e8eaed" : "#9aa0a6",
        backgroundColor: isHovered ? "rgba(108, 99, 255, 0.08)" : "transparent",
        borderLeft: isHovered ? "2px solid #6c63ff" : "2px solid transparent",
      }}
    >
      {text}
    </button>
  );
};

export default SideButton;
