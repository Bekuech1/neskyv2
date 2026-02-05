"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CustomCursorProps {
  isActive: boolean;
  text: string;
}

export default function CustomCursor({ isActive, text }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position to prevent flash
    const setInitialPosition = (e: MouseEvent) => {
      xRef.current = e.clientX;
      yRef.current = e.clientY;
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      window.removeEventListener("mousemove", setInitialPosition);
    };
    
    window.addEventListener("mousemove", setInitialPosition);

    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      xRef.current = e.clientX;
      yRef.current = e.clientY;
      xSetter(e.clientX);
      ySetter(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", setInitialPosition);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Kill previous animation if exists
    if (animationRef.current) {
      animationRef.current.kill();
    }

    if (isActive) {
      animationRef.current = gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      animationRef.current = gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isActive]);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 grid items-center gap-1 opacity-0"
      style={{
        left: 0,
        top: 0,
        willChange: "transform",
        transform: "translate(0%, 0%)",
      }}
    >
      <img src="/cursor.svg" alt="" width={20} height={20} className="w-5 h-5" /> 
      
      <div className="uppercase rounded-3xl py-2.5 px-4 border border-[#526818] size-fit text-xs font-bold text-[#526818] bg-[#B1E135] whitespace-nowrap">
        {text}
      </div>
    </div>
  );
}