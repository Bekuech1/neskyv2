"use client";

import React, { useState } from "react";
import Button from "./button";
import { Copy, TickCircle } from "iconsax-react";
import { navLinks } from "../libs/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterProps { }

export default function Footer({ }: FooterProps) {
  const pathname = usePathname();

  // State to track if text is copied
  const [isCopied, setIsCopied] = useState(false);
  // State to track hover for the blur effect
  const [isHovered, setIsHovered] = useState(false);

  const email = "Newman.ogbo.s@gmail.com";

  // Logic to handle copying
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);

      // Reset back to "Copy" after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="bg-dark py-20 px-50 grid gap-16 relative overflow-hidden">
      <div className="flex justify-between items-center z-10 relative">
        <div className="h-12 flex items-center gap-4">
          <span className="text-base font-medium text-[#FDFDFD]">
            Find me on
          </span>
          <div className="flex gap-3">
            <img src="/footer1.svg" alt="" className="size-5.5" />
            <img src="/footer2.svg" alt="" className="size-5.5" />
            <img src="/footer3.svg" alt="" className="size-5.5" />
          </div>
        </div>
        <div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base uppercase font-medium py-3 px-4 transition-colors duration-200 ${isActive
                    ? "text-[#FDFDFD]"
                    : "text-[#595959] hover:text-[#FDFDFD]"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center z-10 relative">
        <h3
          onClick={handleCopy}
          onMouseEnter={() => setIsHovered(true)} // Enable blur
          onMouseLeave={() => setIsHovered(false)} // Disable blur
          className="text-[96px] agdasima font-bold text-[#595959] hover:text-[#FDFDFD] transition-colors duration-200 cursor-pointer"
        >
          {email}
        </h3>

        <div onClick={handleCopy}>
          <Button
            bgColor="bg-[#FDFDFD]"
            textColor="text-dark"
            borderColor="border-[#E5E7E3]"
            icon={
              isCopied ? (
                <TickCircle color="currentColor" size={16} variant="Bold" />
              ) : (
                <Copy color="currentColor" size={16} variant="Bold" />
              )
            }
          >
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>

      <div className="uppercase flex justify-between z-10 relative">
        <h6 className="text-[#929292] text-sm">
          With 💜 by <span className="text-[#FDFDFD]">Newman</span> &{" "}
          <a
            href="https://chibuikemigboanugo.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FDFDFD] cursor-pointer"
          >
            Beko
          </a>{" "}
          2026
        </h6>
        <span className="text-sm font-semibold text-[#929292]">
          V2 • PORTFOLIO
        </span>
      </div>

      {/* Blur Background */}
      <div
        className={`
           absolute
           left-1/2
           -bottom-120
           -translate-x-1/2
           -translate-y-1/2
           w-[392px]
           h-[392px]
           rounded-full
           bg-[#C3F73A]
           blur-[300px]
           z-[0]
           pointer-events-none
           transition-opacity duration-500 ease-in-out
           ${isHovered ? "opacity-100" : "opacity-0"} 
        `}
      />
    </div>
  );
}