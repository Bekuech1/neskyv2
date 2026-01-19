import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DocumentText1, Link1, Lock1 } from "iconsax-react";

interface ProjectCardProps {
  title: string;
  imageSrc: string;
  year: string;
  liveLink?: string;
  caseStudyLink?: string;
  liveLinkLocked?: boolean;
  caseStudyLocked?: boolean;
}

export default function ProjectCard({
  title,
  imageSrc,
  year,
  liveLink = "#",
  caseStudyLink = "#",
  liveLinkLocked = false,
  caseStudyLocked = false,
}: ProjectCardProps) {
  const isFullyLocked = liveLinkLocked && caseStudyLocked;

  return (
    <div
      className="group flex flex-col gap-2 p-1 size-fit rounded-lg overflow-hidden hover:shadow-lg hover:rotate-[-1.5deg] transition-all duration-300 cursor-none"
    >
      <div className="relative w-125 h-75 rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${
            isFullyLocked ? "grayscale opacity-80" : "group-hover:scale-105"
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
        className="flex items-center gap-1.5 text-xs font-semibold text-secondary-text cursor-not-allowed select-none"
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
      className="flex items-center gap-1.5 text-xs font-semibold text-primary-text transition-opacity"
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
