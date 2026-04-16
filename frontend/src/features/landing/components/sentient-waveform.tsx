"use client";

import { motion } from "framer-motion";
import { FOCUS_HELM_THEMES, type FocusHelmTheme } from "@/features/landing/lib/focus-helm-theme";

interface SentientWaveformProps {
  delay?: number;
  /** When true, wave increases oscillation intensity */
  isActive?: boolean;
  /** Theme for dynamic color morphing */
  theme?: FocusHelmTheme;
}

/**
 * Sentient Waveform — Animated oscilloscope-style frequency wave
 * 
 * Creates a glowing audio waveform that slices through the center of the orb,
 * instantly communicating "Generative Audio" to viewers.
 * 
 * BEHAVIOR:
 * - Idle state: Smooth wave with gentle oscillations (low frequency)
 * - Active state: Same smooth wave but with more oscillations (higher frequency)
 * 
 * Now supports dynamic themes for color morphing on context tag selection.
 */
export function SentientWaveform({ delay = 0, isActive = false, theme = "coding" }: SentientWaveformProps) {
  const colors = FOCUS_HELM_THEMES[theme];
  
  // Dynamic gradient ID to avoid conflicts when multiple instances exist
  const gradientId = `wave-gradient-${theme}`;
  // ─── IDLE STATE: Low frequency smooth wave (2 peaks, ±4 from center) ───────
  const idleCalm = "M 0 30 Q 25 30, 50 30 T 100 30";
  const idleFlow = "M 0 30 Q 25 26, 50 34 T 100 30";
  const idleInvert = "M 0 30 Q 25 34, 50 26 T 100 30";

  // ─── ACTIVE STATE: Higher frequency smooth wave (more oscillations, ±7 from center) ───
  // Same single line, but denser wave pattern
  const activeCalm = "M 0 30 Q 8.33 30, 16.66 30 T 33.33 30 T 50 30 T 66.66 30 T 83.33 30 T 100 30";
  const activeFlow = "M 0 30 Q 8.33 23, 16.66 37 T 33.33 23 T 50 37 T 66.66 23 T 83.33 37 T 100 30";
  const activeInvert = "M 0 30 Q 8.33 37, 16.66 23 T 33.33 37 T 50 23 T 66.66 37 T 83.33 23 T 100 30";

  // Select wave patterns based on state
  const pathCalm = isActive ? activeCalm : idleCalm;
  const pathFlow = isActive ? activeFlow : idleFlow;
  const pathInvert = isActive ? activeInvert : idleInvert;

  // Animation timing: faster when active
  const animationDuration = isActive ? 3 : 8;
  const secondaryDuration = animationDuration * 1.25;

  // Force re-mount on state change for immediate transition
  const stateKey = isActive ? "active" : "idle";

  return (
    <motion.div
      key={`wave-shell-${stateKey}`}
      animate={{
        scaleX: [0.95, 1.05, 0.95],
      }}
      transition={{ 
        duration: animationDuration, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay,
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[320px] h-[120px] z-20 pointer-events-none overflow-visible"
      aria-hidden="true"
    >
      <motion.svg
        key={`wave-svg-${theme}`}
        viewBox="0 0 100 60" 
        className="w-full h-full overflow-visible"
        animate={{
          filter: isActive
            ? `drop-shadow(0 0 20px ${colors.primary})`
            : `drop-shadow(0 0 15px ${colors.primary}CC)`,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Layer 1: Thick, blurry background glow of the wave */}
        <motion.path
          key={`wave-glow-${stateKey}`}
          animate={{ d: [pathCalm, pathFlow, pathInvert, pathCalm] }}
          transition={{ duration: animationDuration, repeat: Infinity, ease: "easeInOut" }}
          fill="transparent"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
          className="blur-[6px]"
          style={{ opacity: isActive ? 0.8 : 0.5 }}
        />
        
        {/* Layer 2: Sharp, core laser line */}
        <motion.path
          key={`wave-core-${stateKey}`}
          animate={{ d: [pathCalm, pathInvert, pathFlow, pathCalm] }}
          transition={{ duration: secondaryDuration, repeat: Infinity, ease: "easeInOut" }}
          fill="transparent"
          stroke={`url(#${gradientId})`}
          strokeWidth={isActive ? 2 : 1.6}
          strokeLinecap="round"
        />

        {/* Dynamic gradient with fade at edges */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="85%" stopColor={colors.primary} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
}
