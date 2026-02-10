"use client";

import { useRef, useLayoutEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  enableBlur?: boolean;
  baseOpacity?: number; // New: How visible should it be when "faded out"? (0 = invisible, 0.2 = faint)
}

export default function ScrollReveal({ 
  children, 
  className = "", 
  enableBlur = true,
  baseOpacity = 0 // Default to completely invisible at edges
}: ScrollRevealProps) {
  const el = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!el.current) return;

    const ctx = gsap.context(() => {
      // We create a Timeline that is linked to the scroll position (scrub: true)
      // The timeline has 3 steps: 
      // 1. Fade In (Enter from bottom)
      // 2. Stay Visible (Center of screen)
      // 3. Fade Out (Leave to top)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el.current,
          start: "top bottom", // Start when Top of element hits Bottom of viewport
          end: "bottom top",   // End when Bottom of element hits Top of viewport
          scrub: true,         // <--- This is the magic. It ties animation to scroll bar.
        }
      });

      tl.fromTo(el.current, 
        { 
          opacity: baseOpacity, 
          y: 50, 
          filter: enableBlur ? "blur(10px)" : "blur(0px)" 
        },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)", 
          ease: "none", 
          duration: 1 // Takes up the first part of the scroll
        }
      )
      .to(el.current, 
        { 
          opacity: baseOpacity, 
          y: -50, // Move UP slightly as it fades out (Parallax feel)
          filter: enableBlur ? "blur(10px)" : "blur(0px)", 
          ease: "none",
          duration: 1 // Takes up the last part of the scroll
        }, 
        // This ">-0.5" creates a "Hold" in the middle where it stays visible
        // Adjust this value to make the "visible zone" larger or smaller
        ">+=2" 
      );

    }, el);

    return () => ctx.revert();
  }, [enableBlur, baseOpacity]);

  return (
    <div 
      ref={el} 
      className={className}
      // Set initial opacity to baseOpacity (or 0) to prevent FOUC
      style={{ opacity: baseOpacity, willChange: "opacity, transform, filter" }}
    >
      {children}
    </div>
  );
}