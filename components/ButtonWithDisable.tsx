"use client";

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
      className="text-sm font-medium transition-all duration-200"
      style={{
        color: disable ? "var(--foreground-muted)" : isHovered ? "#ffffff" : "#e8eaed",
        background: disable
          ? "var(--bg-surface)"
          : isHovered
            ? "var(--accent-hover)"
            : "var(--accent)",
        padding: "8px 18px",
        cursor: disable ? "not-allowed" : "pointer",
        borderRadius: "var(--radius-md)",
        border: disable ? "1px solid var(--border)" : "none",
        boxShadow: disable
          ? "none"
          : isHovered
            ? "0 0 20px var(--accent-glow)"
            : "var(--shadow-sm)",
        opacity: disable ? 0.5 : 1,
      }}
      disabled={disable}
    >
      {text}
    </button>
  );
};

export default Button;
