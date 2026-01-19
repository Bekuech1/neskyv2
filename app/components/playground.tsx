"use client";

import React, { useState, useRef, useEffect } from "react";
import { Element4, RowVertical, ArrowLeft2, ArrowRight2 } from "iconsax-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import IconToggle from "./icontoggle";
import Image from "next/image";
import { galleryImages } from "../libs/playground";

// --- CONFIGURATION ---
const GAP = 40;
const PLAYGROUND_ITEMS = galleryImages.slice(0, 9).map((item, index) => ({
  id: index + 1,
  src: item.src,
  title: item.alt,
}));

interface PlaygroundProps { }

export default function Playground({ }: PlaygroundProps) {
    const [isCarouselView, setIsCarouselView] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // Stores the actual pixel width of the card for GSAP math
    const [cardWidth, setCardWidth] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // 1. MEASURE CARD WIDTH AUTOMATICALLY
    // This ensures the GSAP math is perfect regardless of screen size
    useEffect(() => {
        const measureCard = () => {
            if (cardRef.current) {
                setCardWidth(cardRef.current.offsetWidth);
            }
        };

        // Measure initially and on window resize
        measureCard();
        window.addEventListener("resize", measureCard);

        // Cleanup
        return () => window.removeEventListener("resize", measureCard);
    }, [isCarouselView]); // Re-measure if view switches

    // 2. GSAP ANIMATION LOGIC
    useGSAP(() => {
        if (!trackRef.current || !containerRef.current || cardWidth === 0) return;

        const itemTotalWidth = cardWidth + GAP;
        const containerCenter = containerRef.current.offsetWidth / 2;
        const cardCenter = cardWidth / 2;
        const centerOffset = containerCenter - cardCenter;

        const newX = -(activeIndex * itemTotalWidth) + centerOffset;

        gsap.to(trackRef.current, {
            x: newX,
            duration: 0.8,
            ease: "power3.out",
        });
    }, [activeIndex, isCarouselView, cardWidth]);

    const handleNext = () => {
        if (activeIndex < PLAYGROUND_ITEMS.length - 1) setActiveIndex((p) => p + 1);
    };

    const handlePrev = () => {
        if (activeIndex > 0) setActiveIndex((p) => p - 1);
    };

    return (
        <div className="w-full py-14 grid gap-8 overflow-hidden">

            {/* --- HEADER --- */}
            <div className="w-full flex justify-between items-center px-50">
                <h1 className="font-extrabold text-2xl text-primary-text">Playground</h1>
                <IconToggle
                    toggled={isCarouselView}
                    onToggle={setIsCarouselView}
                    leftIcon={<Element4 size={20} variant="Bold" color="currentColor" />}
                    rightIcon={<RowVertical size={20} variant="Bold" color="currentColor" />}
                />
            </div>

            {/* --- CONTENT AREA --- */}
            <div
                ref={containerRef}
                className="w-full relative min-h-[75vh] flex flex-col justify-center"
            >
                {isCarouselView ? (

                    /* ======================== 
                       CAROUSEL VIEW 
                       ======================== */
                    <div className="w-full h-full flex flex-col justify-center animate-in fade-in duration-500 relative">

                        {/* TRACK */}
                        <div
                            ref={trackRef}
                            className="flex items-center fix absolute top-1/2 -translate-y-1/2 left-0 pl-0 will-change-transform"
                            style={{ gap: GAP }}
                        >
                            {PLAYGROUND_ITEMS.map((item, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <div
                                        key={item.id}
                                        ref={index === 0 ? cardRef : null}
                                        onClick={() => setActiveIndex(index)}
                                        className={`
                      relative flex-shrink-0 
                      
                      /* Mobile: Drive by Width (85% of screen) */
                      w-[85vw]
                      
                      /* Desktop: Drive by Height (65% of screen), Width Auto */
                      md:w-80% md:h-75vh
                      
                      /* Force 4:3 Aspect Ratio (1011w / 754h) */
                      aspect-[4/3]
                      
                      /* Hard Caps for Max Size */
                      max-w-[1011px]
                      max-h-[754px]
                      
                      p-0 flex flex-col transition-all duration-500 cursor-pointer overflow-hidden bg-secondary rounded-3xl
                      ${isActive
                                                ? "scale-100 opacity-100 z-10 shadow-2xl"
                                                : "scale-90 opacity-40 hover:opacity-80 blur-[2px] hover:blur-none"
                                            }
                    `}
                                    >
                                        <div className="relative w-full h-full">
                                            {/* Using standard img for stability. Switch to <Image fill ... /> if configured */}
                                            <Image
                                                src={item.src}
                                                alt={item.title}
                                                fill
                                                priority={isActive} // Loads the active image immediately
                                                className="object-cover"
                                                sizes="(max-width: 768px) 85vw, (max-height: 1011px) 1000px, 100vw"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                                                <span className="text-white font-bold text-3xl block">
                                                    {item.title}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* BUTTONS */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                            <button
                                onClick={handlePrev}
                                disabled={activeIndex === 0}
                                className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 disabled:opacity-30 hover:bg-white hover:text-black transition-all"
                            >
                                <ArrowLeft2 size={24} variant="Bold" color="currentColor" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={activeIndex === PLAYGROUND_ITEMS.length - 1}
                                className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 disabled:opacity-30 hover:bg-white hover:text-black transition-all"
                            >
                                <ArrowRight2 size={24} variant="Bold" color="currentColor" />
                            </button>
                        </div>
                    </div>

                ) : (
                    <div className="px-50 columns-2 md:columns-3 gap-6 space-y-6 animate-in fade-in duration-500">
                        {PLAYGROUND_ITEMS.map((item) => (
                            <div
                                key={item.id}
                                className="break-inside-avoid overflow-hidden flex flex-col gap-3 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] border border-transparent hover:border-primary-text hover:-translate-y-1 transition-all duration-300"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    width={0}
                                    height={0}
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}