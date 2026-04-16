"use client";

import { useRef } from "react";
import { useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

export interface TimelineScrollValues {
  containerRef: React.RefObject<HTMLDivElement | null>;
  lineHeight: MotionValue<string>;
  branch1Path: MotionValue<number>;
  card1Alpha: MotionValue<number>;
  branch2Path: MotionValue<number>;
  card2Alpha: MotionValue<number>;
  branch3Path: MotionValue<number>;
  card3Alpha: MotionValue<number>;
}

/** Encapsulates all scroll-driven animation logic for the How It Works timeline. */
export function useTimelineScroll(): TimelineScrollValues {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // Central laser line — pauses at each node before continuing
  const lineHeight = useTransform(
    smoothProgress,
    [0, 0.15, 0.28, 0.45, 0.58, 0.75, 1],
    ["0%", "12%", "12%", "45%", "45%", "88%", "100%"]
  );

  // Step 1 reveals — branch draws slowly, then card fades in
  const branch1Path = useTransform(smoothProgress, [0.15, 0.29], [0, 1]);
  const card1Alpha = useTransform(smoothProgress, [0.29, 0.38], [0, 1]);

  // Step 2 reveals
  const branch2Path = useTransform(smoothProgress, [0.45, 0.59], [0, 1]);
  const card2Alpha = useTransform(smoothProgress, [0.59, 0.68], [0, 1]);

  // Step 3 reveals
  const branch3Path = useTransform(smoothProgress, [0.75, 0.89], [0, 1]);
  const card3Alpha = useTransform(smoothProgress, [0.89, 0.98], [0, 1]);

  return {
    containerRef,
    lineHeight,
    branch1Path,
    card1Alpha,
    branch2Path,
    card2Alpha,
    branch3Path,
    card3Alpha,
  };
}
