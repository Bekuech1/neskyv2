import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  // Custom Color Props
  bgColor?: string;
  textColor?: string;
  borderColor?: string;

  // Optional Icon
  icon?: React.ReactNode;
}

export default function Button({
  children,
  bgColor = "",
  textColor = "",
  borderColor = "",
  icon,
  className = "",
  ...props // Capture onClick, disabled, type, etc.
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-1.5
        h-11 w-fit
        px-4
        rounded-4xl
        text-base font-semibold
        border
        cursor-pointer
        ${bgColor}
        ${textColor}
        ${borderColor}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
