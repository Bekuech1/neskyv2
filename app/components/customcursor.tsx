"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CustomCursorProps {
  isActive: boolean;
  text: string;
}

export default function CustomCursor({ isActive, text }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
    };

    // GSAP ticker for smooth animation (60fps)
    const updateCursor = () => {
      gsap.to(cursor, {
        x: positionRef.current.x,
        y: positionRef.current.y,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    if (isActive) {
      window.addEventListener("mousemove", handleMouseMove);
      gsap.ticker.add(updateCursor);

      // Animate cursor in
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.1,
        ease: "linear",
      });
    } else {
      // Animate cursor out
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.1,
        ease: "linear",
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(updateCursor);
    };
  }, [isActive]);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 flex items-center grid gap-1"
      style={{
        left: 0,
        top: 0,
        transform: "translate(0%, 0%) scale(0)",
        opacity: 0,
      }}
    >
      {/* Ensure cursor.svg exists in your public folder */}
      <img src="/cursor.svg" alt="" /> 
      
      <div className="uppercase rounded-3xl py-2.5 px-4 border border-[#526818] size-fit text-xs font-bold text-[#526818] bg-[#B1E135] whitespace-nowrap">
        {text}
      </div>
    </div>
  );
}