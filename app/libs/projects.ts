// @/app/libs/projects.ts

export interface Project {
  id: number;
  title: string;
  category: "UI Design" | "Branding";
  image: string;
  date: string;
  liveLink: string | null;
  caseStudy: string | null;
  slug: string; // <--- RENAMED (Stores "lipaworld-web", NOT "/projects/...")
  isLiveLocked: boolean;
  isCaseStudyLocked: boolean;
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
    isCaseStudyLocked: false
  },
  {
    id: 2,
    title: "Building the Lipaworld Mobile App...",
    category: "UI Design",
    image: "/lipa2.png",
    date: "2024",
    liveLink: null,
    caseStudy: "https://behance.net/lipaworld-mobile",
    slug: "lipaworld-mobile", // <--- CLEAN ID
    isLiveLocked: true,
    isCaseStudyLocked: false
  },
];