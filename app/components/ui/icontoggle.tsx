"use client";

import React from 'react';

interface IconToggleProps {
  /** The icon element to display on the left (e.g., <Sun1 size={20} />) */
  leftIcon: React.ReactNode;
  /** The icon element to display on the right (e.g., <Moon size={20} />) */
  rightIcon: React.ReactNode;
  /** Current state: false = left active, true = right active */
  toggled: boolean;
  /** Callback function when state changes */
  onToggle: (state: boolean) => void;
}

const IconToggle: React.FC<IconToggleProps> = ({ 
  leftIcon, 
  rightIcon, 
  toggled, 
  onToggle 
}) => {
  return (
    <div 
      // Kept the exact outer styling of the original toggle
      className="relative flex w-fit h-8.5 p-0.5 bg-primary border border-border-base rounded-full cursor-pointer select-none"
      onClick={() => onToggle(!toggled)}
    >
      {/* The Sliding Pill Background - Exactly the same logic */}
      <div 
        className={`
          absolute top-0.5 bottom-0.5
          w-[calc(50%-2px)] 
          bg-primary-text rounded-full shadow-sm transition-transform duration-300 ease-in-out
          ${toggled ? 'translate-x-full left-0.5' : 'translate-x-0 left-0.5'}
        `}
      />

      {/* Left Icon Container */}
      <div 
        className={`
          z-10 w-9 h-full flex items-center justify-center transition-colors duration-300
          /* We apply text color here. Icons need to use 'currentColor' to inherit this. */
          ${!toggled ? 'text-primary' : 'text-primary-text'}
        `}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(false);
        }}
      >
        {leftIcon}
      </div>

      {/* Right Icon Container */}
      <div 
        className={`
          z-10 w-9 h-full flex items-center justify-center transition-colors duration-300
          /* We apply text color here. Icons need to use 'currentColor' to inherit this. */
          ${toggled ? 'text-primary' : 'text-primary-text'}
        `}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(true);
        }}
      >
        {rightIcon}
      </div>
    </div>
  );
};

export default IconToggle;