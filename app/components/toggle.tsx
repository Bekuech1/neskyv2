import React from 'react';

interface ToggleProps {
  leftLabel: string;
  rightLabel: string;
  toggled: boolean;
  onToggle: (state: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ 
  leftLabel, 
  rightLabel, 
  toggled, 
  onToggle 
}) => {
  return (
    <div 
      className="relative flex w-fit h-8.5 p-0.5 uppercase bg-secondary border border-border-base rounded-full cursor-pointer select-none"
      onClick={() => onToggle(!toggled)}
    >
      {/* The Sliding Pill Background */}
      <div 
        className={`
          absolute top-0.5 bottom-0.5 
          /* 3. Width: 50% of parent minus the 2px padding */
          w-[calc(50%-2px)] 
          bg-primary rounded-full shadow-sm transition-transform duration-300 ease-in-out
          /* 4. Start at left-0.5 (2px) to match parent padding */
          ${toggled ? 'translate-x-full left-0.5' : 'translate-x-0 left-0.5'}
        `}
      />
      {/* Left Text */}
      <div 
        className={`
          z-10 w-1/2 min-w-25 text-nowrap flex items-center justify-center p-2 text-xs font-medium transition-colors duration-300
          ${!toggled ? 'text-primary-text' : 'text-secondary-text'}
        `}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(false);
        }}
      >
        {leftLabel}
      </div>

      {/* Right Text */}
      <div 
        className={`
          z-10 w-1/2 min-w-25 flex text-nowrap items-center justify-center p-2 text-xs font-medium transition-colors duration-300
          ${toggled ? 'text-primary-text' : 'text-secondary-text'}
        `}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(true);
        }}
      >
        {rightLabel}
      </div>
    </div>
  );
};

export default Toggle;