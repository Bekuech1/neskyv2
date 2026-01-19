import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function Badge({ 
  children, 
  bgColor = "bg-card", 
  textColor = "text-secondary-text",
  borderColor = "border-border",
  icon,
  className = ""
}: BadgeProps) {

  return (
    <div
      className={`
        inline-flex items-center gap-1.5
        size-fit
        px-4 py-2
        rounded-4xl
        text-xs font-semibold
        border
        cursor-default
        ${bgColor}
        ${textColor}
        ${borderColor}
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </div>
  );
}