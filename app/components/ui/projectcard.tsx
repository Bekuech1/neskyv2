"use client";

import Image from "next/image";
import Link from "next/link";
import { DocumentText1, Link1, Lock1 } from "iconsax-react";
import ActionLink from "./actionlink";

interface ProjectCardProps {
  title: string;
  imageSrc: string;
  year: string;
  liveLink?: string;
  caseStudyLink?: string;
  liveLinkLocked?: boolean;
  caseStudyLocked?: boolean;
  cursorText?: string;
  // New: Function to notify parent
  onCursorChange?: (isActive: boolean, text?: string) => void;
}

export default function ProjectCard({
  title,
  imageSrc,
  year,
  liveLink = "#",
  caseStudyLink = "#",
  liveLinkLocked = false,
  caseStudyLocked = false,
  cursorText = "view case study",
  onCursorChange, // Destructure new prop
}: ProjectCardProps) {
  const isFullyLocked = liveLinkLocked && caseStudyLocked;

  return (
    <div
      className="group flex flex-col gap-2 p-1 size-fit rounded-lg overflow-hidden hover:shadow-[0_4px_24px_0px_rgba(0,0,0,0.08)] hover:rotate-[-1.5deg] transition-all duration-300"
      // We trigger the parent's state here
      onMouseEnter={() => onCursorChange?.(true, cursorText)}
      onMouseLeave={() => onCursorChange?.(false)}
      // We still hide the default cursor
      style={{ cursor: "none" }} 
    >
      <div className="relative w-125 h-75 rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${isFullyLocked ? "grayscale opacity-80" : "group-hover:scale-105"
            }`}
        />
      </div>

      <div className="flex flex-col gap-2 p-2 w-125">
        <h3 className="text-xl font-medium text-primary-text">{title}</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ActionLink
              label="View Live"
              href={liveLink}
              type="live"
              locked={liveLinkLocked}
            />
            <ActionLink
              label="Case Study"
              href={caseStudyLink}
              type="case"
              locked={caseStudyLocked}
            />
          </div>
          <span className="text-sm font-medium text-secondary-text">
            {year}
          </span>
        </div>
      </div>
    </div>
  );
}
