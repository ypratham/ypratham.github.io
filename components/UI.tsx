"use client";

import React from "react";
import { useSounds } from "@/hooks/useSounds";

interface ValButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export const ValButton: React.FC<ValButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  onClick,
  onMouseEnter,
  ...props
}) => {
  const { playHover, stopHover, playClick } = useSounds();

  const baseClasses =
    "relative px-8 py-3 font-header font-bold tracking-widest uppercase transition-all duration-200 clip-corner group";

  const variants = {
    primary: "bg-[#FF4655] text-white hover:bg-[#D93542] text-white",
    secondary: "bg-[#ECE8E1] text-[#0F1923] hover:bg-white",
    outline: "border border-[#ECE8E1]/30 text-[#ECE8E1] hover:bg-[#ECE8E1]/10",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playHover();
    onMouseEnter?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    onClick?.(e);
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={stopHover}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {/* Decorative box inside */}
      <div className="absolute top-1 right-1 w-1 h-1 bg-white opacity-50"></div>
      <div className="absolute bottom-1 left-1 w-1 h-1 bg-black opacity-20"></div>
    </button>
  );
};

export const ValCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}> = ({ children, className = "", active = false }) => {
  const { playHover, stopHover } = useSounds();

  return (
    <div
      className={`relative bg-[#0F1923]/80 border ${
        active ? "border-[#FF4655]" : "border-[#ECE8E1]/20"
      } p-6 transition-all duration-300 hover:border-[#FF4655]/50 backdrop-blur-sm ${className}`}
      onMouseEnter={playHover}
      onMouseLeave={stopHover}
    >
      {/* Corner Accents */}
      <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-[#ECE8E1]/50"></div>
      <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-[#ECE8E1]/50"></div>
      {children}
    </div>
  );
};

export const ValBadge: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span className="inline-block px-2 py-1 text-xs font-bold tracking-wider text-[#0F1923] bg-[#ECE8E1] uppercase mr-2 mb-2">
    {children}
  </span>
);
