"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DocumentText1, Link1, Lock1 } from "iconsax-react";
import CustomCursor from "./customcursor";

interface ProjectCardProps {
  title: string;
  imageSrc: string;
  year: string;
  liveLink?: string;
  caseStudyLink?: string;
  liveLinkLocked?: boolean;
  caseStudyLocked?: boolean;
  cursorText?: string; // New optional prop
}

export default function ProjectCard({
  title,
  imageSrc,
  year,
  liveLink = "#",
  caseStudyLink = "#",
  liveLinkLocked = false,
  caseStudyLocked = false,
  cursorText = "view case study", // Default value
}: ProjectCardProps) {
  const [cursorActive, setCursorActive] = useState(false);
  const isFullyLocked = liveLinkLocked && caseStudyLocked;

  return (
    <>
      {/* Pass the text prop here */}
      <CustomCursor isActive={cursorActive} text={cursorText} />

      <div
        className="group flex flex-col gap-2 p-1 size-fit rounded-lg overflow-hidden hover:shadow-lg hover:rotate-[-1.5deg] transition-all duration-300"
        style={{ cursor: cursorActive ? "none" : "auto" }}
        onMouseEnter={() => setCursorActive(true)}
        onMouseLeave={() => setCursorActive(false)}
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
    </>
  );
}

const ActionLink = ({
  label,
  href,
  type,
  locked,
}: {
  label: string;
  href: string;
  type: "live" | "case";
  locked: boolean;
}) => {
  if (locked) {
    return (
      <div
        className="flex items-center gap-1.5 text-xs font-semibold text-secondary-text select-none"
        title={`${label} is currently unavailable`}
      >
        <Lock1 size={16} color="currentColor" variant="Bold" />
        <span>{label}</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      // Added z-20 to ensure links are clickable even with custom cursor logic
      className="flex items-center gap-1.5 text-xs font-semibold text-primary-text transition-opacity cursor-none relative z-20"
    >
      <div className="text-primary-text">
        {type === "live" ? (
          <Link1 size={16} color="currentColor" />
        ) : (
          <DocumentText1 size={16} color="currentColor" variant="Bold" />
        )}
      </div>
      <span>{label}</span>
    </Link>
  );
};