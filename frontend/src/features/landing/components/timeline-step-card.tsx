"use client";

import type { ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";

interface TimelineStepCardProps {
  alpha: MotionValue<number>;
  side: "left" | "right";
  children: ReactNode;
}

/** Animated wrapper for timeline step card content. Handles opacity/scale/slide-in transforms. */
export function TimelineStepCard({ alpha, side, children }: TimelineStepCardProps) {
  const xOffset = side === "left" ? 30 : -30;
  const x = useTransform(alpha, [0, 1], [xOffset, 0]);

  return (
    <motion.div
      style={{ opacity: alpha, scale: alpha, x }}
      className={`z-10 mt-8 w-full pl-24 md:mt-0 md:pl-0 ${side === "right" ? "md:order-first" : ""}`}
    >
      {children}
    </motion.div>
  );
}
