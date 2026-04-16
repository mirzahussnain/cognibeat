"use client";

import { motion, type MotionValue } from "framer-motion";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

interface TimelineNodeProps {
  icon: IconSvgElement;
  colorVar: string;
  borderClass: string;
  textClass: string;
  strokeClass: string;
  branchPath: MotionValue<number>;
  side: "left" | "right";
  branchSvgD: string;
}

/** Animated timeline node — circle with icon + branch SVG connector. */
export function TimelineNode({
  icon,
  colorVar,
  borderClass,
  textClass,
  strokeClass,
  branchPath,
  side,
  branchSvgD,
}: TimelineNodeProps) {
  const svgPosition = side === "left" ? "left-1/2" : "right-1/2";

  return (
    <div className="relative z-20 flex h-full items-center justify-start md:justify-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, margin: "-10%" }}
        className={`z-20 flex h-16 w-16 items-center justify-center rounded-full border-2 ${borderClass} bg-muted dark:bg-background shadow-[0_0_20px_color-mix(in_srgb,var(${colorVar})_40%,transparent)] absolute left-12 -translate-x-1/2 md:relative md:left-0 md:translate-x-0`}
      >
        <HugeiconsIcon icon={icon} size={28} className={textClass} />
      </motion.div>

      <svg
        className={`-z-10 hidden md:block absolute ${svgPosition} h-[120px] w-20 pointer-events-none ${strokeClass} overflow-visible`}
        style={{ top: "calc(50% - 120px)" }}
        preserveAspectRatio="none"
        viewBox="0 0 80 120"
      >
        <motion.path
          d={branchSvgD}
          fill="none"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: branchPath, opacity: branchPath }}
        />
      </svg>
    </div>
  );
}
