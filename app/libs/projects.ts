// @/app/libs/projects.ts

export interface ProjectOverview {
  year: string;
  role: string;
  scope: string;     // e.g., "End-to-End Product Design"
  timeline: string;  // e.g., "3 Months"
  tools: string[];   // e.g., ["Figma", "After Effects"]
  platform: string;  // e.g., "Web App"
}

export interface Project {
  id: number;
  title: string;
  category: "UI Design" | "Branding";
  tags: string[];
  image: string;
  date: string;
  liveLink: string | null;
  caseStudy: string | null;
  slug: string;
  isLiveLocked: boolean;
  isCaseStudyLocked: boolean;
  // --- NEW FIELD ---
  overview: ProjectOverview; 
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Defining Lipaworld Marketplace Web App",
    category: "Branding",
    image: "/lipa1.png",
    date: "2025",
    liveLink: "https://lipaworld.com",
    caseStudy: "https://behance.net/lipaworld-web",
    slug: "lipaworld-web",
    isLiveLocked: false,
    isCaseStudyLocked: false,
    tags: ["Case Study", 'E-Commerce', 'Web App'],
    // --- NEW DATA ---
    overview: {
      year: "2025",
      role: "Lead Product Designer",
      scope: "Brand Identity & UI System",
      timeline: "8 Weeks",
      tools: ["Figma", "Illustrator", "Linear"],
      platform: "Responsive Web"
    }
  },
  {
    id: 2,
    title: "Building the Lipaworld Mobile App...",
    category: "UI Design",
    image: "/lipa2.png",
    date: "2024",
    liveLink: null,
    caseStudy: "https://behance.net/lipaworld-mobile",
    slug: "lipaworld-mobile",
    isLiveLocked: true,
    isCaseStudyLocked: false,
    tags: ["Case Study", 'E-Commerce', 'Web App'],
    // --- NEW DATA ---
    overview: {
      year: "2024",
      role: "UI/UX Designer",
      scope: "Mobile App Design",
      timeline: "3 Months",
      tools: ["Figma", "Protopie"],
      platform: "iOS & Android"
    }
  },
];