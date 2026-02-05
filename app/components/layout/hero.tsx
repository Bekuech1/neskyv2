// "use client";

// import { useRef, useState, useLayoutEffect } from "react";
// import gsap from "gsap";
// import HeroCard from "../ui/herocards";
// import Badge from "../ui/badge";
// import Button from "../ui/button";

// export default function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLHeadingElement>(null);
//   const [isReady, setIsReady] = useState(false);

//   const lines = [
//     "I'm Newman Ogbo, a Product & Visual Designer",
//     "I design web and mobile experiences, build",
//     "scalable design systems, and work closely",
//     "with products from early concepts to launch."
//   ];

//   const cards = [
//     { id: 1, src: "/hero1.jpg" },
//     { id: 2, src: "/hero2.png" },
//     { id: 3, src: "/hero3.jpg" },
//   ];

//   const slots = [
//     { xPercent: -85, yPercent: -50, rotation: -15, scale: 0.9, zIndex: 0, opacity: 1 },
//     { xPercent: -50, yPercent: -50, rotation: 0, scale: 1, zIndex: 10, opacity: 1 },
//     { xPercent: -15, yPercent: -50, rotation: 15, scale: 0.9, zIndex: 0, opacity: 1 },
//   ];

//   useLayoutEffect(() => {
//     if (!containerRef.current || !textRef.current) return;

//     const getThemeColor = (variableName: string) => {
//       if (typeof window === "undefined") return "";
//       return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
//     };

//     // We only need endColor now since startColor was for the old color-change effect
//     const endColor = getThemeColor("--text-primary");

//     // Initialize card positions
//     cards.forEach((_, cardIndex) => {
//       const targetSlot = slots[cardIndex];
//       gsap.set(`.hero-card-${cardIndex}`, {
//         xPercent: targetSlot.xPercent,
//         yPercent: targetSlot.yPercent,
//         rotation: targetSlot.rotation,
//         scale: targetSlot.scale,
//         zIndex: targetSlot.zIndex,
//         opacity: targetSlot.opacity,
//       });
//     });

//     setIsReady(true);

//     // --- CARD ANIMATION ---
//     const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

//     // Step 1
//     tl.to(".hero-card-0", { xPercent: slots[1].xPercent, yPercent: slots[1].yPercent, rotation: slots[1].rotation, scale: slots[1].scale, zIndex: slots[1].zIndex, opacity: slots[1].opacity, duration: 0.8, ease: "power3.inOut" }, "+=3");
//     tl.to(".hero-card-1", { xPercent: slots[2].xPercent, yPercent: slots[2].yPercent, rotation: slots[2].rotation, scale: slots[2].scale, zIndex: slots[2].zIndex, opacity: slots[2].opacity, duration: 0.8, ease: "power3.inOut" }, "<");
//     tl.to(".hero-card-2", { xPercent: slots[0].xPercent, yPercent: slots[0].yPercent, rotation: slots[0].rotation, scale: slots[0].scale, zIndex: slots[0].zIndex, opacity: slots[0].opacity, duration: 0.8, ease: "power3.inOut" }, "<");

//     // Step 2
//     tl.to(".hero-card-0", { xPercent: slots[2].xPercent, yPercent: slots[2].yPercent, rotation: slots[2].rotation, scale: slots[2].scale, zIndex: slots[2].zIndex, opacity: slots[2].opacity, duration: 0.8, ease: "power3.inOut" }, "+=3");
//     tl.to(".hero-card-1", { xPercent: slots[0].xPercent, yPercent: slots[0].yPercent, rotation: slots[0].rotation, scale: slots[0].scale, zIndex: slots[0].zIndex, opacity: slots[0].opacity, duration: 0.8, ease: "power3.inOut" }, "<");
//     tl.to(".hero-card-2", { xPercent: slots[1].xPercent, yPercent: slots[1].yPercent, rotation: slots[1].rotation, scale: slots[1].scale, zIndex: slots[1].zIndex, opacity: slots[1].opacity, duration: 0.8, ease: "power3.inOut" }, "<");

//     // Step 3
//     tl.to(".hero-card-0", { xPercent: slots[0].xPercent, yPercent: slots[0].yPercent, rotation: slots[0].rotation, scale: slots[0].scale, zIndex: slots[0].zIndex, opacity: slots[0].opacity, duration: 0.8, ease: "power3.inOut" }, "+=3");
//     tl.to(".hero-card-1", { xPercent: slots[1].xPercent, yPercent: slots[1].yPercent, rotation: slots[1].rotation, scale: slots[1].scale, zIndex: slots[1].zIndex, opacity: slots[1].opacity, duration: 0.8, ease: "power3.inOut" }, "<");
//     tl.to(".hero-card-2", { xPercent: slots[2].xPercent, yPercent: slots[2].yPercent, rotation: slots[2].rotation, scale: slots[2].scale, zIndex: slots[2].zIndex, opacity: slots[2].opacity, duration: 0.8, ease: "power3.inOut" }, "<");

//     // --- TEXT ANIMATION (PREMIUM BLUR REVEAL) ---
//     const textTl = gsap.timeline({ delay: 0.5 });

//     const letters = gsap.utils.toArray(".hero-letter");

//     textTl.to(letters, {
//       opacity: 1,
//       filter: "blur(0px)",
//       y: 0, // Reset translateY
//       duration: 0.8,
//       stagger: 0.03, // Fast, smooth flow
//       ease: "power3.out", // Smooth exponential ease
//     });

//     return () => {
//       tl.kill();
//       textTl.kill();
//     };
//   }, []);

//   return (
//     <div className="grid gap-8 place-items-center w-full max-w-[886px] mx-auto pt-40 pb-10 px-4">
//       <div
//         ref={containerRef}
//         className="w-full h-37 relative"
//         style={{ visibility: isReady ? 'visible' : 'hidden' }}
//       >
//         {cards.map((card, index) => (
//           <HeroCard
//             key={card.id}
//             src={card.src}
//             alt="Hero Image"
//             className={`hero-card-${index} absolute top-1/2 left-1/2 shadow-2xl origin-center`}
//           />
//         ))}
//       </div>

//       <div className="flex gap-4 flex-wrap justify-center">
//         <Badge
//           bgColor="bg-[#EBEEFA]"
//           textColor="text-[#2F4CBE]"
//           borderColor="border-[#C0CAF1]"
//         >
//           UI Designer
//         </Badge>
//         <Badge
//           bgColor="bg-[#EBFAF9]"
//           textColor="text-[#259488]"
//           borderColor="border-[#C0F1EB]"
//         >
//           Brand Designer
//         </Badge>
//         <Badge
//           bgColor="bg-[#F9FEEB]"
//           textColor="text-[#526818]"
//           borderColor="border-[#E3FBA4]"
//         >
//           Product Manager
//         </Badge>
//       </div>

//       <div className="grid gap-12">
//         <div className="grid gap-3 text-center px-4">
//           <h1 ref={textRef} className="text-3xl font-normal uppercase rinter grid gap-1">
//             {lines.map((line, lineIndex) => (
//               <div key={lineIndex} className="block">
//                 {/* 1. Split line into words to preserve word-wrapping */}
//                 {line.split(" ").map((word, wordIndex) => (
//                   <span
//                     key={wordIndex}
//                     className="inline-block whitespace-nowrap mr-[0.25em]"
//                   >
//                     {/* 2. Split word into letters for animation */}
//                     {word.split("").map((char, charIndex) => (
//                       <span
//                         key={charIndex}
//                         className="hero-letter inline-block"
//                         style={{
//                           // Initial State: Hidden, Blurred, Offset Down
//                           opacity: 0,
//                           filter: "blur(10px)",
//                           transform: "translateY(10px)",
//                           color: "var(--text-primary)", // Set final color immediately
//                           willChange: "transform, opacity, filter" // Performance hint
//                         }}
//                       >
//                         {char}
//                       </span>
//                     ))}
//                   </span>
//                 ))}
//               </div>
//             ))}
//           </h1>
//         </div>
//       </div>

//       <div className="flex gap-6 place-items-center mt-6">
//         <Button
//           bgColor="bg-primary"
//           textColor="text-primary-text"
//           borderColor="border-border-base"
//           icon={<img src="/gmail.svg" alt="" className="size-4" />}
//         >
//           Get in Touch
//         </Button>
//         <Button
//           bgColor="bg-dark"
//           textColor="text-white"
//           borderColor="border-transparent"
//           icon={<img src="/meet.svg" alt="" className="size-4" />}
//         >
//           Book a Call
//         </Button>
//       </div>
//     </div>
//   );
// }




"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import HeroCard from "../ui/herocards";
import Badge from "../ui/badge";
import Button from "../ui/button";

export default function Hero() {
  // 1. Create refs for all major sections
  const cardsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // We use this to prevent FOUC (Flash of Unstyled Content) before GSAP loads
  const [isReady, setIsReady] = useState(false);

  const lines = [
    "I'm Newman Ogbo, a Product & Visual Designer",
    "I design web and mobile experiences, build",
    "scalable design systems, and work closely",
    "with products from early concepts to launch."
  ];

  const cards = [
    { id: 1, src: "/hero1.jpg" },
    { id: 2, src: "/hero2.png" },
    { id: 3, src: "/hero3.jpg" },
  ];

  const slots = [
    { xPercent: -85, yPercent: -50, rotation: -15, scale: 0.9, zIndex: 0, opacity: 1 },
    { xPercent: -50, yPercent: -50, rotation: 0, scale: 1, zIndex: 10, opacity: 1 },
    { xPercent: -15, yPercent: -50, rotation: 15, scale: 0.9, zIndex: 0, opacity: 1 },
  ];

  useLayoutEffect(() => {
    // 2. Create a GSAP Context for easy cleanup
    const ctx = gsap.context(() => {
      // --- SETUP: Card Positioning (Your existing logic) ---
      cards.forEach((_, cardIndex) => {
        const targetSlot = slots[cardIndex];
        gsap.set(`.hero-card-${cardIndex}`, {
          xPercent: targetSlot.xPercent,
          yPercent: targetSlot.yPercent,
          rotation: targetSlot.rotation,
          scale: targetSlot.scale,
          zIndex: targetSlot.zIndex,
          opacity: targetSlot.opacity,
        });
      });

      // --- SETUP: Initial States for Entrance Animation ---
      // We set autoAlpha: 0 (visibility: hidden + opacity: 0) to prevent flashing
      const sectionsToAnimate = [cardsRef.current, badgesRef.current, buttonsRef.current];

      gsap.set(sectionsToAnimate, {
        autoAlpha: 0,
        y: 20, // Push down slightly
        filter: "blur(10px)", // Match the text blur
      });

      // Allow React to render the visibility now that GSAP has set initial states
      setIsReady(true);


      // --- MASTER TIMELINE ---
      const masterTl = gsap.timeline({ delay: 0.2 });

      // Step A: Reveal Cards Container
      masterTl.to(cardsRef.current, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      });

      // Step B: Reveal Badges (slightly overlapping with cards)
      masterTl.to(badgesRef.current, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6");

      // Step C: Reveal Text (Letter by Letter)
      // We select the letters we created in the JSX
      const letters = gsap.utils.toArray(".hero-letter");

      masterTl.to(letters, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        stagger: 0.015, // Slightly faster stagger for a snappy feel
        ease: "power3.out",
      }, "-=0.4"); // Start while badges are finishing

      // Step D: Reveal Buttons
      masterTl.to(buttonsRef.current, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5"); // Overlap with text end


      // --- CONTINUOUS ANIMATION: Card Carousel ---
      // Runs independently of the entrance animation
      const carouselTl = gsap.timeline({ repeat: -1, repeatDelay: 0, delay: 2 }); // Delayed start so entrance finishes first

      // Step 1
      carouselTl.to(".hero-card-0", { xPercent: slots[1].xPercent, yPercent: slots[1].yPercent, rotation: slots[1].rotation, scale: slots[1].scale, zIndex: slots[1].zIndex, opacity: slots[1].opacity, duration: 0.8, ease: "power3.inOut" }, "+=3");
      carouselTl.to(".hero-card-1", { xPercent: slots[2].xPercent, yPercent: slots[2].yPercent, rotation: slots[2].rotation, scale: slots[2].scale, zIndex: slots[2].zIndex, opacity: slots[2].opacity, duration: 0.8, ease: "power3.inOut" }, "<");
      carouselTl.to(".hero-card-2", { xPercent: slots[0].xPercent, yPercent: slots[0].yPercent, rotation: slots[0].rotation, scale: slots[0].scale, zIndex: slots[0].zIndex, opacity: slots[0].opacity, duration: 0.8, ease: "power3.inOut" }, "<");

      // Step 2
      carouselTl.to(".hero-card-0", { xPercent: slots[2].xPercent, yPercent: slots[2].yPercent, rotation: slots[2].rotation, scale: slots[2].scale, zIndex: slots[2].zIndex, opacity: slots[2].opacity, duration: 0.8, ease: "power3.inOut" }, "+=3");
      carouselTl.to(".hero-card-1", { xPercent: slots[0].xPercent, yPercent: slots[0].yPercent, rotation: slots[0].rotation, scale: slots[0].scale, zIndex: slots[0].zIndex, opacity: slots[0].opacity, duration: 0.8, ease: "power3.inOut" }, "<");
      carouselTl.to(".hero-card-2", { xPercent: slots[1].xPercent, yPercent: slots[1].yPercent, rotation: slots[1].rotation, scale: slots[1].scale, zIndex: slots[1].zIndex, opacity: slots[1].opacity, duration: 0.8, ease: "power3.inOut" }, "<");

      // Step 3
      carouselTl.to(".hero-card-0", { xPercent: slots[0].xPercent, yPercent: slots[0].yPercent, rotation: slots[0].rotation, scale: slots[0].scale, zIndex: slots[0].zIndex, opacity: slots[0].opacity, duration: 0.8, ease: "power3.inOut" }, "+=3");
      carouselTl.to(".hero-card-1", { xPercent: slots[1].xPercent, yPercent: slots[1].yPercent, rotation: slots[1].rotation, scale: slots[1].scale, zIndex: slots[1].zIndex, opacity: slots[1].opacity, duration: 0.8, ease: "power3.inOut" }, "<");
      carouselTl.to(".hero-card-2", { xPercent: slots[2].xPercent, yPercent: slots[2].yPercent, rotation: slots[2].rotation, scale: slots[2].scale, zIndex: slots[2].zIndex, opacity: slots[2].opacity, duration: 0.8, ease: "power3.inOut" }, "<");

    });

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, []);

  return (
    <div className="grid gap-8 place-items-center w-full max-w-[886px] mx-auto pt-40 pb-10 px-4">

      {/* 3. Cards Container - Attached Ref */}
      <div
        ref={cardsRef}
        className="w-full h-37 relative"
        // Use visible/hidden for the first split second before hydration, 
        // afterwards GSAP handles autoAlpha
        style={{ visibility: isReady ? 'visible' : 'hidden' }}
      >
        {cards.map((card, index) => (
          <HeroCard
            key={card.id}
            src={card.src}
            alt="Hero Image"
            className={`hero-card-${index} absolute top-1/2 left-1/2 shadow-2xl origin-center`}
          />
        ))}
      </div>

      {/* 4. Badges Container - Attached Ref */}
      <div
        ref={badgesRef}
        className="flex gap-4 flex-wrap justify-center"
        style={{ visibility: isReady ? 'visible' : 'hidden' }}
      >
        <Badge
          bgColor="bg-[#EBEEFA]"
          textColor="text-[#2F4CBE]"
          borderColor="border-[#C0CAF1]"
        >
          UI Designer
        </Badge>
        <Badge
          bgColor="bg-[#EBFAF9]"
          textColor="text-[#259488]"
          borderColor="border-[#C0F1EB]"
        >
          Brand Designer
        </Badge>
        <Badge
          bgColor="bg-[#F9FEEB]"
          textColor="text-[#526818]"
          borderColor="border-[#E3FBA4]"
        >
          Product Manager
        </Badge>
      </div>

      <div className="grid gap-12">
        <div className="grid gap-3 text-center px-4">
          <h1 ref={textRef} className="text-3xl font-normal uppercase rinter grid gap-1">
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="block">
                {line.split(" ").map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="inline-block whitespace-nowrap mr-[0.25em]"
                  >
                    {word.split("").map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className="hero-letter inline-block"
                        style={{
                          // Initial State handled by CSS to ensure clean hydration
                          opacity: 0,
                          filter: "blur(10px)",
                          transform: "translateY(10px)",
                          color: "var(--text-primary)",
                          willChange: "transform, opacity, filter"
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            ))}
          </h1>
        </div>
      </div>

      {/* 5. Buttons Container - Attached Ref */}
      <div
        ref={buttonsRef}
        className="flex gap-6 place-items-center mt-6"
        style={{ visibility: isReady ? 'visible' : 'hidden' }}
      >
        <Button
          bgColor="bg-primary"
          textColor="text-primary-text"
          borderColor="border-border-base"
          icon={<img src="/gmail.svg" alt="" className="size-4" />}
        >
          Get in Touch
        </Button>
        <Button
          bgColor="bg-dark"
          textColor="text-white"
          borderColor="border-transparent"
          icon={<img src="/meet.svg" alt="" className="size-4" />}
        >
          Book a Call
        </Button>
      </div>
    </div>
  );
}