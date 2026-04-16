"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Layer 0 — Infinite Canvas (Background Grid)
 * 
 * Provides a high-performance, subtle grid background that anchors the 3D-like
 * elements. Uses a simple SVG pattern to ensure zero performance overhead.
 * 
 * INTERACTIVITY:
 * - Parallax Scroll: Moves slightly with the page scroll for depth.
 */
export function InfiniteCanvas() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none" 
      aria-hidden="true"
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-0 h-[120%] w-full"
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full opacity-[0.15] dark:opacity-[0.25]"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 L 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-border/40"
              />
            </pattern>
            
            {/* Larger major grid lines for depth */}
            <pattern
              id="major-grid"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 200 0 L 0 0 L 0 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-border/60"
              />
            </pattern>

            <radialGradient id="fade-out" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            
            <mask id="grid-mask">
              <rect width="100%" height="100%" fill="url(#fade-out)" />
            </mask>
          </defs>

          {/* Render the grids */}
          <rect width="100%" height="100%" fill="url(#grid)" mask="url(#grid-mask)" />
          <rect width="100%" height="100%" fill="url(#major-grid)" mask="url(#grid-mask)" />
        </svg>
      </motion.div>

      {/* Subtle bottom fade to transition into next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
