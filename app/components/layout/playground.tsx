"use client";

import React, { useState, useRef, useEffect } from "react";
import { Element4, ArrowLeft2, ArrowRight2, RowHorizontal } from "iconsax-react";
import Image from "next/image";
import { galleryImages, GalleryImage } from "@/app/libs/playground";
import CustomCursor from "../ui/customcursor";
import IconToggle from "../ui/icontoggle";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

interface PlaygroundProps {
  limit?: number;
}

export default function Playground({ limit = 9 }: PlaygroundProps) {
  const [isCarouselView, setIsCarouselView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGridCursorActive, setIsGridCursorActive] = useState(false);

  const router = useRouter();

  const displayItems = limit > 0 ? galleryImages.slice(0, limit) : galleryImages;

  const items = displayItems.map((item: GalleryImage, index: number) => ({
    id: index + 1,
    src: item.src,
    title: item.alt,
    hsrc: item.hsrc,
  }));

  // Add this near your other state variables
  const carouselRef = useRef<HTMLDivElement>(null);

  // Add this useEffect to instantly center the image on mount
  useEffect(() => {
    if (isCarouselView && carouselRef.current) {
      // Finds the very first image (skipping the empty spacer)
      const firstImage = carouselRef.current.querySelector("img");

      if (firstImage) {
        // Instantly jumps the scroll position to center the image
        firstImage.scrollIntoView({ inline: "center", behavior: "auto" });
      }
    }
  }, [isCarouselView]); // Runs every time you toggle into the carousel view

  // --- UPDATED GSAP LOGIC FOR VARIABLE WIDTHS ---

  const handleNext = () => {
    if (activeIndex < items.length - 1) setActiveIndex((p) => p + 1);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex((p) => p - 1);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--color-tertiary-text)_1.5px,transparent_1.5px)] bg-[length:26px_26px] pointer-events-none opacity-50" />
      <div className="relative z-10 w-full py-6 grid gap-12">

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
        {isCarouselView ? (
          <div
            ref={carouselRef}
            className="flex overflow-x-auto items-center snap-x snap-mandatory scrollbar-hide"
          >
            {/* 1. START SPACER: Gives the first item room to be centered */}
            <div className="shrink-0 w-[50vw] pointer-events-none" />

            {items.map((item, index) => (
              <img
                src={item.hsrc}
                alt={item.title}
                key={item.id}
                className="h-[533px] w-auto shrink-0 object-contain snap-center mr-8"
              />
            ))}

            {/* 3. END SPACER: Gives the last item room to be centered */}
            <div className="shrink-0 w-[50vw] pointer-events-none" />
          </div>
        ) : (
          <div>
            <CustomCursor isActive={isGridCursorActive} text="view" />
            <div className="columns-2 md:columns-3 gap-6 space-y-6 animate-in fade-in duration-500 max-w-[1040px] mx-auto px-4 pb-10 w-full">
              {items.map((item) => (
                <div
                  key={item.id}
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
              ))}
            </div>
          </div>
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
    </section >
  );
}