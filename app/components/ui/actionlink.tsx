import Link from "next/link";
import { DocumentText1, Link1, Lock1 } from "iconsax-react";

interface ActionLinkProps {
  label: string;
  href?: string; // Optional because locked items might not have one
  type?: "live" | "case"; // Restricted to specific strings
  locked?: boolean;
}

export default function ActionLink({ 
  label, 
  href = "#", 
  type = "live", 
  locked = false 
}: ActionLinkProps) {
  
  if (locked) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary-text select-none uppercase opacity-50 cursor-not-allowed">
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
      // Added 'hover:opacity-70' for better feedback
      className="flex items-center gap-1.5 text-xs font-semibold text-primary-text transition-opacity hover:opacity-70 cursor-pointer relative z-20 uppercase"
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
}