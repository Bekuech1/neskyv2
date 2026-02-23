"use client";

import { useRef, useLayoutEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  startPos?: string;
  fadeOut?: boolean; // New: control whether to fade out
}

export default function ScrollReveal({
  children,
  className = "",
  enableBlur = true,
  baseOpacity = 0,
  startPos = "85%",
  fadeOut = true // Default: keep content visible after reveal
}: ScrollRevealProps) {
  const el = useRef(null);

  useLayoutEffect(() => {
    if (!el.current) return;

    const ctx = gsap.context(() => {
      // Explicitly set initial state
      gsap.set(el.current, {
        opacity: baseOpacity,
        y: 50,
        filter: enableBlur ? "blur(10px)" : "blur(0px)",
        willChange: "transform, opacity, filter"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el.current,
          start: `top ${startPos}`,
          end: "bottom 15%",
          scrub: true,
        }
      });

      // Fade in animation
      tl.to(el.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "none",
        duration: 1
      });

      // Only fade out if enabled
      if (fadeOut) {
        tl.to(el.current, {
          opacity: baseOpacity,
          y: -50,
          filter: enableBlur ? "blur(10px)" : "blur(0px)",
          ease: "none",
          duration: 1
        }, ">+=2");
      }
    }, el);

    return () => ctx.revert();
  }, [enableBlur, baseOpacity, startPos, fadeOut]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}