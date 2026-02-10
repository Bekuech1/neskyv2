import Image from "next/image";
import { CSSProperties } from "react";
import ScrollReveal from "./ScrollReveal";

interface HeroCardProps {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}

export default function HeroCard({
  src,
  alt = "Hero image",
  className,
  style,
}: HeroCardProps) {
  return (
    <div
      style={style}
      className={`absolute overflow-hidden shadow-lg 
      rounded-2xl border-2 border-[#FDFDFD] aspect-square size-37 
      ${className} `}
    >
      <Image
        src={src}
        alt={alt}
        priority
        fill
        sizes="148px"
        className="object-cover object-[50%_7%]"
      />
    </div>
  );
}