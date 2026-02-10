"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { ArrowDown2, Import } from "iconsax-react";
import { navLinks } from "@/app/libs/data";
import gsap from "gsap";

const themes = [
  { value: "light", label: "Light", color: "bg-[#FFFFFF]" },
  { value: "green", label: "Green", color: "bg-[#165850]" },
  { value: "blue", label: "Blue", color: "bg-[#162358]" },
  { value: "purple", label: "Purple", color: "bg-[#5856D6]" },
  { value: "red", label: "Red", color: "bg-[#E6294D]" },
  { value: "night", label: "Night", color: "bg-[#070707]" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => setMounted(true), []);

  const closeMenu = () => {
    if (!menuRef.current || isAnimating.current) return;
    isAnimating.current = true;
    gsap.to(menuRef.current, {
      opacity: 0,
      y: -8,
      scale: 0.95,
      filter: "blur(6px)",
      duration: 0.25,
      ease: "power3.in",
      onComplete: () => {
        setIsOpen(false);
        isAnimating.current = false;
      },
    });
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useLayoutEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.killTweensOf(menuRef.current);
      gsap.fromTo(
        menuRef.current,
        {
          opacity: 0,
          y: -8,
          scale: 0.95,
          filter: "blur(6px)",
          transformOrigin: "top right",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.2,
          ease: "power3.out",
        }
      );
    }
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full py-4 px-6 md:px-20 flex justify-between items-center bg-primary">
      {/* Left Side: Links */}
      <div className="flex gap-4">
        {navLinks.map((link: any) => {
          const isActive = pathname === link.href;
          
          // Define shared classes for both Link and a tag
          const linkClasses = `text-xs font-normal transition-colors duration-200 uppercase p-2 flex items-center gap-1.5 ${
            isActive
              ? "text-primary-text"
              : "text-secondary-text hover:text-primary-text"
          }`;

          // 1. CONDITIONAL RENDERING
          // If it's a download link, use a standard <a> tag
          if (link.isDownload) {
            return (
              <a
                key={link.href}
                href={link.href}
                download
                className={linkClasses}
              >
                {link.name}
                <Import size="14" color="currentColor" variant="Linear" />
              </a>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={linkClasses}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Right Side: Theme Switcher */}
      <div className="flex gap-1 place-items-center p-0.5 pl-1 pr-3 rounded-4xl border border-border-base bg-secondary">
        <div className="rounded-full bg-primary border border-border-base size-5 shrink-0"></div>
        {mounted ? (
          <div className="relative" ref={wrapperRef}>
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 bg-transparent uppercase text-secondary-text text-[10px] font-semibold cursor-pointer focus:outline-none"
            >
              <span>{themes.find((t) => t.value === theme)?.label}</span>
              <ArrowDown2
                size={12}
                className={`text-secondary-text transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isOpen ? "rotate-180" : ""
                }`}
                variant="Linear"
                color="currentColor"
              />
            </button>

            {isOpen && (
              <div
                ref={menuRef}
                className="absolute top-full mt-3 -right-4 w-[188px] p-2 bg-dropdown-bg rounded-[24px] shadow-lg overflow-hidden z-50 origin-top-right"
              >
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.value}
                    onClick={() => {
                      setTheme(themeOption.value);
                      closeMenu();
                    }}
                    className={`w-full flex rounded-[16px] items-center gap-1 p-2 text-sm font-medium capitalize text-dropdown-text hover:bg-dropdown-hover-bg transition-colors duration-200 ${
                      theme === themeOption.value &&
                      "bg-dropdown-hover-bg"
                    }`}
                  >
                    <div
                      className={`rounded-full ${themeOption.color} border border-[#393939] size-4 shrink-0`}
                    ></div>
                    {themeOption.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-20 h-9" />
        )}
      </div>
    </nav>
  );
}