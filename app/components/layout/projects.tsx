"use client";

import React, { useState } from "react";
import ProjectCard from "../ui/projectcard";
import Toggle from "../ui/toggle";
import ScrollReveal from "../ui/ScrollReveal";
import CustomCursor from "../ui/customcursor"; // Import it here
import { projects } from "@/app/libs/projects";
import Link from "next/link";

export default function Projects() {
  const [isUiDesign, setIsUiDesign] = useState(true);

  // --- NEW: State for the global cursor ---
  const [cursorState, setCursorState] = useState({
    active: false,
    text: "View"
  });

  // Helper to update cursor
  const handleCursor = (isActive: boolean, text?: string) => {
    setCursorState({
      active: isActive,
      text: text || "View"
    });
  };

  const filteredProjects = projects.filter((project) =>
    isUiDesign
      ? project.category === "UI Design"
      : project.category === "Branding"
  );

  return (
    <div className="py-14 grid gap-7.25 max-w-[1040px] mx-auto relative">

      {/* 1. Header Section */}
      <div className="w-full flex justify-between items-center">
        <ScrollReveal>
          <h1 className="font-extrabold text-2xl">Projects</h1>
        </ScrollReveal>
        <ScrollReveal>
          <Toggle
            leftLabel="UI Designs"
            rightLabel="Brandings"
            toggled={!isUiDesign}
            onToggle={() => setIsUiDesign(!isUiDesign)}
          />
        </ScrollReveal>
      </div>

      {/* 2. Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto">
        {filteredProjects.map((project, index) => (
          <ScrollReveal
            key={project.id}
            className="h-full"
          >
            <Link href={`/projects/${project.slug}`}>
              <ProjectCard
                title={project.title}
                imageSrc={project.image}
                year={project.date}
                liveLink={project.liveLink || undefined}
                caseStudyLink={project.caseStudy || undefined}
                liveLinkLocked={project.isLiveLocked}
                caseStudyLocked={project.isCaseStudyLocked}
                onCursorChange={handleCursor}
              />
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* --- 3. RENDER CURSOR HERE --- */}
      {/* It is outside of ScrollReveal, so it works perfectly */}
      <CustomCursor
        isActive={cursorState.active}
        text={cursorState.text}
      />
    </div>
  );
}