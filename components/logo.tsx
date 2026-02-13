"use client";

import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({
  width = 200,
  height = 50,
  className = "",
  priority = false,
}: LogoProps) {
  return (
    <div className={`relative flex items-center ${className} logo-container`}>
      <Image
        src="/logo-white.png"
        alt="CloneOS"
        width={width}
        height={height}
        className="h-full w-auto block object-contain"
        quality={100}
        priority={priority}
      />
    </div>
  );
}
