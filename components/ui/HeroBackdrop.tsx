"use client";

import dynamic from "next/dynamic";

const DnaHelix3D = dynamic(() => import("./DnaHelix3D"), { ssr: false });

export default function HeroBackdrop({
  className = "",
  opacity = 0.4,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ opacity }}>
      <DnaHelix3D className="h-full w-full" />
    </div>
  );
}
