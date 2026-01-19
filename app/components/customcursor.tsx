'use client';

import React, { useEffect, useRef } from 'react';
import { Lock1, Eye } from 'iconsax-react';
import { useCursor } from '../context/cursorcontext';

export default function CustomCursor() {
  const { cursorType } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Center the cursor on the mouse
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Don't render anything if it's the default cursor (optional, or style it as a small dot)
  if (cursorType === 'DEFAULT') return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ 
        // Initial position off-screen to prevent jump
        left: 0, 
        top: 0,
        // Make sure the custom cursor is centered on the mouse tip
        marginTop: '-2rem', // Half of height (approx)
        marginLeft: '-2rem' // Half of width (approx)
      }}
    >
      <div className={`
        relative flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ease-out
        ${cursorType === 'PROJECT' ? 'w-24 h-24 bg-black/80 text-white' : ''}
        ${cursorType === 'LOCKED' ? 'w-16 h-16 bg-gray-200/90 text-gray-500' : ''}
      `}>
        
        {/* Content for PROJECT state */}
        {cursorType === 'PROJECT' && (
          <span className="text-sm font-bold tracking-widest uppercase">View</span>
        )}

        {/* Content for LOCKED state */}
        {cursorType === 'LOCKED' && (
          <Lock1 size="24" variant="Bold" />
        )}
      </div>
    </div>
  );
}