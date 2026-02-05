"use client";

import React, { useState, useRef } from "react";
import { Element4, ArrowLeft2, ArrowRight2, RowHorizontal } from "iconsax-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { galleryImages } from "@/app/libs/playground";
import CustomCursor from "../ui/customcursor";
import IconToggle from "../ui/icontoggle";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

// --- CONFIGURATION ---
const GAP = 40;
const CAROUSEL_CARD_WIDTH = 724;
const CAROUSEL_CARD_HEIGHT = 533;

interface PlaygroundProps {
  limit?: number;
}

export default function Playground({ limit = 9 }: PlaygroundProps) {
  const [isCarouselView, setIsCarouselView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGridCursorActive, setIsGridCursorActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const displayItems = limit > 0 ? galleryImages.slice(0, limit) : galleryImages;

  const items = displayItems.map((item: any, index: number) => ({
    id: index + 1,
    src: item.src,
    title: item.alt,
  }));

  useGSAP(() => {
    if (!trackRef.current || !containerRef.current || !isCarouselView) return;

    const itemTotalWidth = CAROUSEL_CARD_WIDTH + GAP;
    // We use window.innerWidth or a fixed container width for calculation in this mode
    // forcing a re-calc if needed, but containerRef.current.offsetWidth is usually fine.
    const containerCenter = containerRef.current.offsetWidth / 2;
    const cardCenter = CAROUSEL_CARD_WIDTH / 2;
    const centerOffset = containerCenter - cardCenter;

    const newX = -(activeIndex * itemTotalWidth) + centerOffset;

    gsap.to(trackRef.current, {
      x: newX,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [activeIndex, isCarouselView]);

  const handleNext = () => {
    if (activeIndex < items.length - 1) setActiveIndex((p) => p + 1);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex((p) => p - 1);
  };

  return (
    // 1. WRAPPER: min-h-screen ensures bg covers full view even if content is short.
    // relative allows the absolute bg to stretch to content height.
    <section className="relative w-full min-h-screen">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--color-tertiary-text)_1.5px,transparent_1.5px)] bg-[length:26px_26px] pointer-events-none opacity-50" />
      {/* 3. CONTENT: Relative z-10 so it sits on top of bg */}
      <div className="relative z-10 w-full py-14 grid gap-16">

        {/* HEADER */}
        <div className="w-full flex justify-between items-center max-w-[1040px] mx-auto px-4">
          <h1 className="font-extrabold text-2xl text-primary-text">Playground</h1>
          <IconToggle
            toggled={isCarouselView}
            onToggle={setIsCarouselView}
            leftIcon={<Element4 size={20} variant="Bold" color="currentColor" />}
            rightIcon={<RowHorizontal size={20} variant="Bold" color="currentColor" />}
          />
        </div>

        {/* VIEW AREA */}
        <div ref={containerRef} className="w-full relative min-h-[600px] flex flex-col justify-center">
          {isCarouselView ? (
            <>
              <CustomCursor isActive={isGridCursorActive} text="view" />
              <div className="w-full h-[600px] flex flex-col justify-center animate-in fade-in duration-500 relative overflow-hidden">
                <div
                  ref={trackRef}
                  className="flex items-center absolute top-1/2 -translate-y-1/2 left-0 will-change-transform"
                  style={{ gap: GAP }}
                >
                  {items.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveIndex(index)}
                        onMouseEnter={() => setIsGridCursorActive(true)}
                        onMouseLeave={() => setIsGridCursorActive(false)}
                        style={{
                          width: `${CAROUSEL_CARD_WIDTH}px`,
                          height: `${CAROUSEL_CARD_HEIGHT}px`,
                        }}
                        className={`
                          relative flex-shrink-0 transition-all duration-500 overflow-hidden cursor-none
                          ${isActive
                            ? " opacity-100 z-10 shadow-2xl scale-100"
                            : " opacity-40 hover:opacity-80 blur-[2px] hover:blur-none scale-95"
                          }
                        `}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            priority={isActive}
                            style={{
                              objectFit: "cover",
                              objectPosition: "top center"
                            }}
                            className="transition-transform duration-500"
                            sizes={`${CAROUSEL_CARD_WIDTH}px`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CONTROLS */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                  <button
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className="p-4 rounded-full bg-white/10 backdrop-blur-md text-primary-text border border-white/20 disabled:opacity-30 hover:bg-white hover:text-black transition-all"
                  >
                    <ArrowLeft2 size={24} variant="Bold" color="currentColor" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={activeIndex === items.length - 1}
                    className="p-4 rounded-full bg-white/10 backdrop-blur-md text-primary-text border border-white/20 disabled:opacity-30 hover:bg-white hover:text-black transition-all"
                  >
                    <ArrowRight2 size={24} variant="Bold" color="currentColor" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            // GRID VIEW
            <>
              <CustomCursor isActive={isGridCursorActive} text="view" />
              <div className="columns-2 md:columns-3 gap-6 space-y-6 animate-in fade-in duration-500 max-w-[1040px] mx-auto px-4 pb-10 w-full">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setIsGridCursorActive(true)}
                    onMouseLeave={() => setIsGridCursorActive(false)}
                    className="break-inside-avoid overflow-hidden flex flex-col shadow-lg border border-transparent hover:border-primary-text hover:-translate-y-1 transition-all duration-300 cursor-none bg-white/5"
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={CAROUSEL_CARD_WIDTH}
                      height={CAROUSEL_CARD_HEIGHT}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          {limit > 0 && (
            <div className="flex justify-center mt-8">
              <Button
                bgColor="bg-white"
                textColor="text-dark"
                borderColor="border-[#E5E7E3]"
                onClick={() => { router.push("/playground") }}
              >
                See All
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}