"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MusicNote01Icon,
  Brain01Icon,
  HeadphonesIcon,
  ZapIcon,
  MusicNote02Icon,
  Task01Icon
} from "@hugeicons/core-free-icons";
import { FOCUS_HELM_THEMES } from "@/features/landing/lib/focus-helm-theme";

const RELEVANT_ICONS = [
  MusicNote01Icon,
  Brain01Icon,
  HeadphonesIcon,
  ZapIcon,
  MusicNote02Icon,
  Task01Icon
];

interface FloatingIconValue {
  startX: number;
  startY: number;
  duration: number;
  color: string;
  delay: number;
}

const positions = [
  { x: 12, y: 15 }, { x: 28, y: 38 }, { x: 12, y: 62 }, { x: 28, y: 85 },
  { x: 88, y: 15 }, { x: 72, y: 38 }, { x: 88, y: 62 }, { x: 72, y: 85 },
];

/**
 * Layer 0.5 — Brand-Relevant Floating Icons
 * 
 * Symmetrically balanced layout with 8 total icons.
 * Hydration-safe implementation using deferred effect.
 */
export function FloatingMusicIcons() {
  const [isMounted, setIsMounted] = useState(false);
  const [randomValues, setRandomValues] = useState<FloatingIconValue[]>([]);

  useEffect(() => {
    const themes = Object.values(FOCUS_HELM_THEMES);
    const generated = positions.map((pos) => ({
      startX: pos.x + (Math.random() * 8 - 4),
      startY: pos.y + (Math.random() * 10 - 5),
      duration: 20 + Math.random() * 10,
      color: themes[Math.floor(Math.random() * themes.length)].primary,
      delay: Math.random() * 5,
    }));

    // Using requestAnimationFrame to defer the state update.
    // This satisfies strict React lint rules regarding 'synchronous setState in effects'
    // and correctly separates the hydration cycle from the initial render.
    const handle = requestAnimationFrame(() => {
      setRandomValues(generated);
      setIsMounted(true);
    });

    return () => cancelAnimationFrame(handle);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-40">
      {positions.map((_, i) => {
        const val = randomValues[i];
        if (!val) return null;

        return (
          <motion.div
            key={i}
            initial={{
              left: `${val.startX}%`,
              top: `${val.startY}%`,
              opacity: 0.1,
              scale: 0.4,
              rotate: 0
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.25, 0.1],
              scale: [0.4, 0.5, 0.4],
              rotate: [0, 25, -25, 0],
            }}
            transition={{
              duration: val.duration,
              repeat: Infinity,
              delay: val.delay,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute select-none"
            style={{
              filter: `drop-shadow(0 0 10px ${val.color}22)`
            }}
          >
            <HugeiconsIcon
              icon={RELEVANT_ICONS[i % RELEVANT_ICONS.length]}
              size={90}
              strokeWidth={1}
              style={{ color: val.color }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
