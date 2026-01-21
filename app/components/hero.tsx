"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { Call, Message } from "iconsax-react";
import HeroCard from "./herocards";
import Badge from "./badge";
import Button from "./button";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
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
    if (!containerRef.current || !textRef.current) return;

    const getThemeColor = (variableName: string) => {
      // Safety check: ensure we are in a browser environment
      if (typeof window === "undefined") return "";
      return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    };

    // 2. Capture the actual color values *before* the loop
    const startColor = getThemeColor("--text-secondary2");
    const endColor = getThemeColor("--text-primary");

    // Initialize card positions immediately
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

    setIsReady(true);

    // Card Animation Timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    // Step 1
    tl.to(".hero-card-0", { xPercent: slots[1].xPercent, yPercent: slots[1].yPercent, rotation: slots[1].rotation, scale: slots[1].scale, zIndex: slots[1].zIndex, opacity: slots[1].opacity, duration: 0.8, ease: "power3.inOut" }, "+=3");
    tl.to(".hero-card-1", { xPercent: slots[2].xPercent, yPercent: slots[2].yPercent, rotation: slots[2].rotation, scale: slots[2].scale, zIndex: slots[2].zIndex, opacity: slots[2].opacity, duration: 0.8, ease: "power3.inOut" }, "<");
    tl.to(".hero-card-2", { xPercent: slots[0].xPercent, yPercent: slots[0].yPercent, rotation: slots[0].rotation, scale: slots[0].scale, zIndex: slots[0].zIndex, opacity: slots[0].opacity, duration: 0.8, ease: "power3.inOut" }, "<");

    // Step 2
    tl.to(".hero-card-0", { xPercent: slots[2].xPercent, yPercent: slots[2].yPercent, rotation: slots[2].rotation, scale: slots[2].scale, zIndex: slots[2].zIndex, opacity: slots[2].opacity, duration: 0.8, ease: "power3.inOut" }, "+=3");
    tl.to(".hero-card-1", { xPercent: slots[0].xPercent, yPercent: slots[0].yPercent, rotation: slots[0].rotation, scale: slots[0].scale, zIndex: slots[0].zIndex, opacity: slots[0].opacity, duration: 0.8, ease: "power3.inOut" }, "<");
    tl.to(".hero-card-2", { xPercent: slots[1].xPercent, yPercent: slots[1].yPercent, rotation: slots[1].rotation, scale: slots[1].scale, zIndex: slots[1].zIndex, opacity: slots[1].opacity, duration: 0.8, ease: "power3.inOut" }, "<");

    // Step 3
    tl.to(".hero-card-0", { xPercent: slots[0].xPercent, yPercent: slots[0].yPercent, rotation: slots[0].rotation, scale: slots[0].scale, zIndex: slots[0].zIndex, opacity: slots[0].opacity, duration: 0.8, ease: "power3.inOut" }, "+=3");
    tl.to(".hero-card-1", { xPercent: slots[1].xPercent, yPercent: slots[1].yPercent, rotation: slots[1].rotation, scale: slots[1].scale, zIndex: slots[1].zIndex, opacity: slots[1].opacity, duration: 0.8, ease: "power3.inOut" }, "<");
    tl.to(".hero-card-2", { xPercent: slots[2].xPercent, yPercent: slots[2].yPercent, rotation: slots[2].rotation, scale: slots[2].scale, zIndex: slots[2].zIndex, opacity: slots[2].opacity, duration: 0.8, ease: "power3.inOut" }, "<");

    // Enhanced Text Animation with smooth velvet-like transition
    const textTl = gsap.timeline({ delay: 0.5 });

    if (textRef.current?.children) {
      lines.forEach((_, index) => {
        if (textRef.current?.children[index]) {
          textTl.fromTo(
            textRef.current.children[index],
            {
              color: startColor,
              opacity: 1,
            },
            {
              color: endColor,
              opacity: 1,
              duration: 2.5,
              ease: "power3.inOut",
              clearProps: "all"
            },
            index === 0 ? "+=0" : "-=0.7"
          );
        }
      });
    }

    return () => {
      tl.kill();
      textTl.kill();
    };
  }, []);
  return (
    <div className="grid gap-8 place-items-center w-full max-w-[886px] mx-auto pt-40 pb-10 px-4">
      <div
        ref={containerRef}
        className="w-full h-37 relative"
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

      <div className="flex gap-4 flex-wrap justify-center">
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
            {lines.map((line, i) => (
              <div key={i}
                className="block"
                style={{ color: "var(--text-secondary2)", opacity: 1 }}>
                {line}
              </div>
            ))}
          </h1>
        </div>
      </div>

      <div className="flex gap-6 place-items-center mt-6">
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