"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Call, Message } from "iconsax-react";
import HeroCard from "./herocards";
import Badge from "./badge";
import Button from "./button";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    { id: 1, src: "/hero1.jpg" },
    { id: 2, src: "/hero3.jpg" },
    { id: 3, src: "/hero2.png" },
  ];

  // Define the three slot positions
  const slots = [
    {
      // LEFT CARD
      xPercent: -85,
      yPercent: -50,
      rotation: -15,
      scale: 0.9,
      zIndex: 0,
      opacity: 1,
    },
    {
      // CENTER CARD
      xPercent: -50,
      yPercent: -50,
      rotation: 0,
      scale: 1,
      zIndex: 10,
      opacity: 1,
    },
    {
      // RIGHT CARD
      xPercent: -15,
      yPercent: -50,
      rotation: 15,
      scale: 0.9,
      zIndex: 0,
      opacity: 1,
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize cards to their starting positions
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

    // Create the sequential animation timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    // Animation sequence: Each card moves to the next position
    // Step 1: After 3 seconds, all cards move to their next position
    tl.to(
      ".hero-card-0",
      {
        xPercent: slots[1].xPercent,
        yPercent: slots[1].yPercent,
        rotation: slots[1].rotation,
        scale: slots[1].scale,
        zIndex: slots[1].zIndex,
        opacity: slots[1].opacity,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "+=3"
    );

    tl.to(
      ".hero-card-1",
      {
        xPercent: slots[2].xPercent,
        yPercent: slots[2].yPercent,
        rotation: slots[2].rotation,
        scale: slots[2].scale,
        zIndex: slots[2].zIndex,
        opacity: slots[2].opacity,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "<"
    );

    tl.to(
      ".hero-card-2",
      {
        xPercent: slots[0].xPercent,
        yPercent: slots[0].yPercent,
        rotation: slots[0].rotation,
        scale: slots[0].scale,
        zIndex: slots[0].zIndex,
        opacity: slots[0].opacity,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "<"
    );

    // Step 2: After another 3 seconds, all cards move to their next position
    tl.to(
      ".hero-card-0",
      {
        xPercent: slots[2].xPercent,
        yPercent: slots[2].yPercent,
        rotation: slots[2].rotation,
        scale: slots[2].scale,
        zIndex: slots[2].zIndex,
        opacity: slots[2].opacity,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "+=3"
    );

    tl.to(
      ".hero-card-1",
      {
        xPercent: slots[0].xPercent,
        yPercent: slots[0].yPercent,
        rotation: slots[0].rotation,
        scale: slots[0].scale,
        zIndex: slots[0].zIndex,
        opacity: slots[0].opacity,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "<"
    );

    tl.to(
      ".hero-card-2",
      {
        xPercent: slots[1].xPercent,
        yPercent: slots[1].yPercent,
        rotation: slots[1].rotation,
        scale: slots[1].scale,
        zIndex: slots[1].zIndex,
        opacity: slots[1].opacity,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "<"
    );

    // Step 3: After another 3 seconds, all cards return to starting positions
    tl.to(
      ".hero-card-0",
      {
        xPercent: slots[0].xPercent,
        yPercent: slots[0].yPercent,
        rotation: slots[0].rotation,
        scale: slots[0].scale,
        zIndex: slots[0].zIndex,
        opacity: slots[0].opacity,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "+=3"
    );

    tl.to(
      ".hero-card-1",
      {
        xPercent: slots[1].xPercent,
        yPercent: slots[1].yPercent,
        rotation: slots[1].rotation,
        scale: slots[1].scale,
        zIndex: slots[1].zIndex,
        opacity: slots[1].opacity,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "<"
    );

    tl.to(
      ".hero-card-2",
      {
        xPercent: slots[2].xPercent,
        yPercent: slots[2].yPercent,
        rotation: slots[2].rotation,
        scale: slots[2].scale,
        zIndex: slots[2].zIndex,
        opacity: slots[2].opacity,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "<"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="grid gap-6 place-items-center w-[866px] mx-auto pt-30 pb-10">
      <div ref={containerRef} className="w-full h-37 relative isolate">
        {cards.map((card, index) => (
          <HeroCard
            key={card.id}
            src={card.src}
            alt="Hero Image"
            className={`hero-card-${index} absolute top-1/2 left-1/2 shadow-2xl origin-center`}
          />
        ))}
      </div>

      <div className="flex gap-4">
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
        <div className="grid gap-3 text-center">
          <h1 className="text-3xl font-normal uppercase text-primary-text Rinter">
            I’m Newman Ogbo, a Product & Visual Designer
            I design web and mobile experiences, build scalable design systems, and work closely
            with products from early concepts to launch.
          </h1>
        </div>
      </div>

      <div className="flex gap-6 place-items-center mt-6">
        <Button
          bgColor="bg-white"
          textColor="text-dark"
          borderColor="border-[#E5E7E3]"
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