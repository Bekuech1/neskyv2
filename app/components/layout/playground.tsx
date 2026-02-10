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
import ScrollReveal from "../ui/ScrollReveal";

// --- CONFIGURATION ---
const GAP = 40;
const CAROUSEL_HEIGHT = 533; // Fixed Height
// removed CAROUSEL_CARD_WIDTH constant as it is now variable

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

  // --- UPDATED GSAP LOGIC FOR VARIABLE WIDTHS ---
  useGSAP(() => {
    if (!trackRef.current || !containerRef.current || !isCarouselView) return;

    // Get the specific DOM element for the active item
    // We cast children to HTMLElement to access offsetLeft/offsetWidth
    const activeItem = trackRef.current.children[activeIndex] as HTMLElement;

    if (!activeItem) return;

    // 1. Find center of the container (viewport)
    const containerCenter = containerRef.current.offsetWidth / 2;

    // 2. Find center of the active item relative to the start of the track
    // offsetLeft = distance from left edge of track to left edge of item
    // offsetWidth / 2 = half the width of the item
    const activeItemCenter = activeItem.offsetLeft + (activeItem.offsetWidth / 2);

    // 3. Calculate translation needed to overlap the two centers
    const newX = containerCenter - activeItemCenter;

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
    <section className="relative w-full min-h-screen">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--color-tertiary-text)_1.5px,transparent_1.5px)] bg-[length:26px_26px] pointer-events-none opacity-50" />
      <div className="relative z-10 w-full py-14 grid gap-16">

        {/* HEADER */}
        <ScrollReveal className="w-full flex justify-between items-center max-w-[1040px] mx-auto px-4">
          <h1 className="font-extrabold text-2xl text-primary-text">Playground</h1>
          <IconToggle
            toggled={isCarouselView}
            onToggle={setIsCarouselView}
            leftIcon={<Element4 size={20} variant="Bold" color="currentColor" />}
            rightIcon={<RowHorizontal size={20} variant="Bold" color="currentColor" />}
          />
        </ScrollReveal>

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
                        // REMOVED fixed width style.
                        // Added h-auto and w-auto to allow content to dictate size.
                        style={{ height: `${CAROUSEL_HEIGHT}px` }}
                        className={`
                          relative flex-shrink-0 transition-all duration-500 overflow-hidden cursor-none
                          ${isActive
                            ? " opacity-100 z-10 shadow-2xl scale-100"
                            : " opacity-40 hover:opacity-80 blur-[2px] hover:blur-none scale-95"
                          }
                        `}
                      >
                        {/* UPDATED IMAGE COMPONENT 
                           1. width={0} height={0} sizes="100vw": Tells Next.js to not enforce pixel dims.
                           2. style={{ width: 'auto', height: '100%' }}: CSS rule that calculates width based on aspect ratio + fixed height.
                        */}
                        <Image
                          src={item.src}
                          alt={item.title}
                          width={0}
                          height={0}
                          sizes="80vw"
                          priority={isActive}
                          style={{ width: 'auto', height: '100%' }}
                          className="object-contain"
                        />
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
            // GRID VIEW (Keep as is, or adjust mapped items if needed)
            <>
              <CustomCursor isActive={isGridCursorActive} text="view" />
              <div className="columns-2 md:columns-3 gap-6 space-y-6 animate-in fade-in duration-500 max-w-[1040px] mx-auto px-4 pb-10 w-full">
                {items.map((item) => (
                  <ScrollReveal
                    key={item.id}
                    className="break-inside-avoid inline-block w-full"
                  >
                    <div
                      onMouseEnter={() => setIsGridCursorActive(true)}
                      onMouseLeave={() => setIsGridCursorActive(false)}
                      className="break-inside-avoid overflow-hidden flex flex-col shadow-lg border border-transparent hover:border-primary-text hover:-translate-y-1 transition-all duration-300 cursor-none bg-white/5"
                    >
                      {/* Grid view images can stay standard responsive */}
                      <Image
                        src={item.src}
                        alt={item.title}
                        width={724}
                        height={533}
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </ScrollReveal>
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
                className="mx-auto"
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