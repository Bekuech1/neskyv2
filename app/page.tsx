"use client";

import { useState, useRef, useEffect } from "react";
import { Bayon } from "next/font/google";
import gsap from "gsap";
import Aboutme from "./components/layout/aboutme";
import Hero from "./components/layout/hero";
import Playground from "./components/layout/playground";
import Projects from "./components/layout/projects";

const bayon = Bayon({
  weight: '400',
  subsets: ['latin'],
});

let hasPlayedSplash = false;

export default function Home() {
  const loaderRef = useRef(null);
  const [splashFinished, setSplashFinished] = useState(hasPlayedSplash);

  useEffect(() => {
    if (splashFinished) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          hasPlayedSplash = true;
          setSplashFinished(true);
        },
      });

      // 1. SET MASTER TIMESTAMP
      tl.add("wipeStart", 1.0); // Starts at 1 second

      // 2. SMOOTH LEFT-TO-RIGHT COLOR WIPE
      // Takes 1.5 seconds to glide across the screen
      tl.to(".teal-wipe", {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.5,
        ease: "power2.inOut"
      }, "wipeStart");

      // 3. SYNCED TEXT SWAP (Now moving horizontally!)
      // Since the text is in the center, the wave hits it around 0.5s into the wipe
      tl.to(".text-newman", {
        opacity: 0,
        filter: "blur(10px)",
        x: -30, // Drifts to the left, pushed by the wave
        duration: 0.6,
      }, "wipeStart+=0.4");

      // The OGBO letters stagger in from the right, matching the wave's pacing
      "OGBO".split("").forEach((_, i) => {
        tl.to(`.splash-letter-${i}`, {
          opacity: 1,
          filter: "blur(0px)",
          x: 0, // Snaps to resting position
          duration: 0.6,
          ease: "power3.out"
        }, `wipeStart+=${0.5 + (i * 0.1)}`); // Staggers slightly slower to match the long wipe
      });

      // 4. VERTICAL SLIDE OPEN
      tl.add("doorsOpen", "+=0.3");

      tl.to(".door-top", {
        yPercent: -100,
        duration: 2.2,
        ease: "power3.inOut"
      }, "doorsOpen");

      tl.to(".door-bottom", {
        yPercent: 100,
        duration: 2.2,
        ease: "power3.inOut"
      }, "doorsOpen");

    }, loaderRef);

    return () => ctx.revert();
  }, [splashFinished]);

  const SplashTextContent = (
    <div className="absolute inset-0 flex flex-col items-center justify-between py-20 px-50 text-[#070707] pointer-events-none">
      <h1 className={`text-[32px] font-normal ${bayon.className}`}>UI DESIGNER</h1>

      <div className="relative flex items-center justify-center h-[200px] w-full">
        <h1 className={`text-newman text-[200px] font-normal absolute ${bayon.className}`}>
          NEWMAN
        </h1>

        <h1 className={`text-[200px] font-normal absolute flex ${bayon.className}`}>
          {"OGBO".split("").map((char, i) => (
            <span
              key={i}
              className={`splash-letter-${i} inline-block`}
              style={{
                opacity: 0,
                filter: "blur(10px)",
                transform: "translateX(30px)", // Changed from translateY to translateX
                willChange: "transform, opacity, filter"
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>

      <h1 className={`text-[32px] font-normal ${bayon.className}`}>PORTFOLIO V2</h1>
    </div>
  );

  return (
    <>
      {/* LOADING OVERLAY */}
      {!splashFinished && (
        <div ref={loaderRef} className="fixed inset-0 z-50 overflow-hidden">

          {/* TOP DOOR */}
          <div className="door-top absolute inset-0 z-20" style={{ clipPath: "inset(0 0 50% 0)" }}>
            <div className="absolute inset-0 bg-[#C3F73A]"></div>
            {/* INSET FROM RIGHT: Starts fully cropped, animates to 0% */}
            <div
              className="teal-wipe absolute inset-0 bg-[#5DDACC]"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            ></div>
            {SplashTextContent}
          </div>

          {/* BOTTOM DOOR */}
          <div className="door-bottom absolute inset-0 z-20" style={{ clipPath: "inset(50% 0 0 0)" }}>
            <div className="absolute inset-0 bg-[#C3F73A]"></div>
            <div
              className="teal-wipe absolute inset-0 bg-[#5DDACC]"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            ></div>
            {SplashTextContent}
          </div>

        </div>
      )}

      {/* MAIN CONTENT */}
      <div className={`no-scrollbar relative ${!splashFinished ? "h-screen overflow-hidden" : ""}`}>
        <section className="px-5 md:px-20">
          <Hero splashFinished={splashFinished} />
          <Projects />
        </section>
        <section>
          <div className="sticky top-[var--(nav-height)]">
            <Playground />
          </div>
          <section className="bg-secondary">
            <Aboutme />
          </section>
        </section>
      </div>
    </>
  );
}