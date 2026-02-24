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

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCarouselView && carouselRef.current) {
      const firstImage = carouselRef.current.querySelector("img");

      if (firstImage) {
        firstImage.scrollIntoView({ inline: "center", behavior: "auto" });
      }
    }
  }, [isCarouselView]);

  const handleNext = () => {
    if (activeIndex < items.length - 1) setActiveIndex((p) => p + 1);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex((p) => p - 1);
  };

  return (
    <section className="relative w-full min-h-screen">
      {/* FIXED/STICKY BACKGROUND WRAPPER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-[62px] w-full h-screen bg-[radial-gradient(circle_at_center,var(--color-tertiary-text)_1.5px,transparent_1.5px)] bg-[length:26px_26px] opacity-50" />
      </div>

      {/* SCROLLING CONTENT AREA */}
      <div className="relative z-10 w-full py-6 grid gap-12">

        {/* HEADER - NOW STICKY */}
        {/* If your navbar is fixed, change top-0 to top-[var(--nav-height)] so it doesn't hide behind it */}
        <div className="sticky top-[78px] z-50 w-full flex justify-between items-center max-w-[1040px] mx-auto px-4 py-4 rounded-b-xl">
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
            {/* 1. START SPACER */}
            <div className="shrink-0 w-[50vw] pointer-events-none" />

            {items.map((item) => (
              <img
                src={item.hsrc}
                alt={item.title}
                key={item.id}
                className="h-[533px] w-auto shrink-0 object-contain snap-center mr-8"
              />
            ))}

            {/* 3. END SPACER */}
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
          <div className="flex justify-center mt-8 pb-8">
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
    </section>
  );
}