"use client";

import React, { useState } from "react";
import ProjectCard from "../ui/projectcard";
import Toggle from "../ui/toggle";

export default function Projects() {
  const [isUiDesign, setIsUiDesign] = useState(true);

  return (
    <div className="py-14 grid gap-7.25 max-w-[1040px] mx-auto">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-extrabold text-2xl">Projects</h1>
        <Toggle
          leftLabel="UI Designs"
          rightLabel="Brandings"
          toggled={!isUiDesign}
          onToggle={() => setIsUiDesign(!isUiDesign)}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto">
        {isUiDesign ? (
          <>
            <ProjectCard
              title="Defining Lipaworld Marketplace Web App"
              imageSrc="/lipa1.png"
              year="2023"
              liveLink="https://..."
              caseStudyLink="https://..."
            />
            <ProjectCard
              title="Building the Lipaworld Mobile App: Marketplace × Wallet Integration"
              imageSrc="/lipa2.png"
              year="2022"
              liveLinkLocked={true}
              caseStudyLink="https://..."
            />
            <ProjectCard
              title="Defining Lipaworld Marketplace Web App"
              imageSrc="/lipa1.png"
              year="2024"
              liveLink="https://..."
              caseStudyLocked={true}
            />
            <ProjectCard
              title="Building the Lipaworld Mobile App: Marketplace × Wallet Integration"
              imageSrc="/lipa2.png"
              year="2024"
              liveLink="https://..."
              caseStudyLocked={true}
            />
          </>
        ) : (
          <>
            <ProjectCard
              title="Defining Lipaworld Marketplace Web App"
              imageSrc="/lipa1.png"
              year="2023"
              liveLink="https://..."
              caseStudyLink="https://..."
            />
            <ProjectCard
              title="Building the Lipaworld Mobile App: Marketplace × Wallet Integration"
              imageSrc="/lipa2.png"
              year="2022"
              liveLinkLocked={true}
              caseStudyLink="https://..."
            />
            <ProjectCard
              title="Defining Lipaworld Marketplace Web App"
              imageSrc="/lipa1.png"
              year="2024"
              liveLink="https://..."
              caseStudyLocked={true}
            />
            <ProjectCard
              title="Building the Lipaworld Mobile App: Marketplace × Wallet Integration"
              imageSrc="/lipa2.png"
              year="2024"
              liveLink="https://..."
              caseStudyLocked={true}
            />
          </>
        )}
      </div>
    </div>
  );
}
