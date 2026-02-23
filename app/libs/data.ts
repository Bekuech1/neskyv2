export interface NavLink {
  name: string;
  href: string;
  isDownload?: boolean; // The '?' makes this property optional
}

export const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Design Playground", href: "/playground" },
  { name: "My Projects", href: "/projects" },
  { name: "Download CV", href: "/ppa_Letter.pdf", isDownload: true },
  { name: "About Me", href: "/about" },
];