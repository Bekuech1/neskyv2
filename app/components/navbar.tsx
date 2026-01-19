"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ArrowDown2 } from "iconsax-react";
import { navLinks } from "../libs/data";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 w-full py-4 px-6 md:px-20 flex justify-between items-center bg-primary">
      {/* Left Side: Links */}
      <div className="flex gap-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-normal transition-colors duration-200 uppercase p-4 ${
                isActive
                  ? "text-primary-text"
                  : "text-secondary-text hover:text-primary-text"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-1 place-items-center p-0.5 pr-3 rounded-4xl border border-border-base bg-secondary">
        <div className="rounded-full bg-primary border border-border-base size-8 shrink-0"></div>
        {mounted ? (
          <div className="relative flex items-center">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="appearance-none bg-transparent uppercase border-none text-secondary-text text-sm font-semibold cursor-pointer pr-6 focus:outline-none focus:ring-0"
            >
              <option value="light">Light</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
              <option value="red">Red</option>
              <option value="night">Night</option>
            </select>
            <ArrowDown2
              size={16}
              className="absolute right-0 text-secondary-text pointer-events-none"
              variant="Linear"
              color="currentColor"
            />
          </div>
        ) : (
          <div className="w-20 h-9" />
        )}
      </div>
    </nav>
  );
}
