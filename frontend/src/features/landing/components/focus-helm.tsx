"use client";

import { motion, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import { GlowingOrb } from "./motion-orbs";
import { SentientWaveform } from "./sentient-waveform";
import { FOCUS_HELM_THEMES, type FocusHelmTheme } from "@/features/landing/lib/focus-helm-theme";

interface FocusHelmProps {
  /** Normalized mouse X position (-1 to 1), smoothed via spring */
  mouseX?: MotionValue<number>;
  /** Normalized mouse Y position (-1 to 1), smoothed via spring */
  mouseY?: MotionValue<number>;
  /** Whether the input is focused (triggers waveform speed boost) */
  isActive?: boolean;
  /** Theme for dynamic color morphing */
  theme?: FocusHelmTheme;
}

/**
 * FocusHelm — Iconic visual metaphor for context-aware audio
 * 
 * Combines a volumetric sphere "wearing" glass headphones with a dynamic
 * waveform slicing horizontally between the earcups.
 * 
 * Z-INDEX LAYERING:
 * - Layer 1 (z-0):  Ambient aura glow (inside GlowingOrb)
 * - Layer 2 (z-10): Glass sphere / sentient audio brain
 * - Layer 3 (z-20): Waveform slicing through center
 * - Layer 4 (z-30): Headphone structure (headband + earcups) - STATIC, no breathing
 * 
 * GEOMETRY (600x600 container):
 * - Arc: widened shoulder curve from (100,250) to (500,250), peak near y=10
 * - Earcups: 72px wide, 150px tall, at left/right-[110px], top-[210px]
 * - Arc endpoints stay fixed; earcups sit slightly inside those endpoints
 * 
 * INTERACTIVITY:
 * - Orb rotates ±8° based on mouse position (depth illusion)
 * - Headphones shift ±4px in OPPOSITE direction (layered parallax)
 * - Waveform stays fixed as anchor point
 * 
 * Now supports dynamic themes for color morphing on context tag selection.
 */
export function FocusHelm({ mouseX, mouseY, isActive = false, theme = "coding" }: FocusHelmProps) {
  const colors = FOCUS_HELM_THEMES[theme];
  
  // Dynamic gradient ID to avoid conflicts
  const helmGradientId = `helm-gradient-${theme}`;
  
  // ─── Fallback for SSR/mobile (no mouse events) ────────────────────────────
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const mx = mouseX ?? fallbackX;
  const my = mouseY ?? fallbackY;

  // ─── Shared Helm Transform: Orb + headphones move together ────────────────
  const orbShiftX = useTransform(mx, [-1, 1], [-30, 30]);
  const orbShiftY = useTransform(my, [-1, 1], [-25, 25]);

  return (
    <div 
      className="absolute top-[34%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center w-[600px] h-[600px]"
      aria-hidden="true"
    >
      {/* Responsive global scaling: increased mobile visibility */}
      <div className="absolute inset-0 origin-center scale-[0.85] sm:scale-[0.90] md:scale-[0.96] lg:scale-[1.04]">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              x: orbShiftX,
              y: orbShiftY,
            }}
          >
            <GlowingOrb theme={theme} />

            {/* LAYER 4: The Headphone Structure (z-30) */}
            <div className="absolute inset-0 z-30 pointer-events-none">
            
            {/* The Headband — endpoints connect inside earpads, then widen upward */}
            <svg 
              key={`helm-svg-${theme}`}
              viewBox="0 0 600 600" 
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id={helmGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={colors.primary} stopOpacity="0.7" />
                  <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={colors.primary} stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <path 
                d="M 126,252 C 122,216 138,182 168,158 C 212,122 255,108 300,108 C 345,108 388,122 432,158 C 462,182 478,216 474,252"
                fill="transparent" 
                stroke={`url(#${helmGradientId})`} 
                strokeWidth="4"
                strokeLinecap="round"
                style={{ 
                  filter: `drop-shadow(0 0 8px ${colors.primary}4D)`,
                  transition: "filter 0.6s ease-out",
                }}
              />
            </svg>

            {/* Left Earcup — thick glass pill (inside arc endpoints) */}
            <motion.div 
              key={`left-earcup-${theme}`}
              animate={{
                boxShadow: [
                  `inset -6px -6px 16px ${colors.primary}33, inset 3px 3px 10px ${colors.secondary}1A, 0 0 12px ${colors.primary}14`,
                  `inset -4px -4px 12px ${colors.primary}1A, inset 2px 2px 6px ${colors.secondary}0D, 0 0 8px ${colors.primary}0A`,
                  `inset -6px -6px 16px ${colors.primary}33, inset 3px 3px 10px ${colors.secondary}1A, 0 0 12px ${colors.primary}14`,
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[110px] top-[210px] w-[72px] h-[150px] rounded-[36px] border border-white/20 dark:border-white/10 bg-gradient-to-br from-white/20 to-white/0 dark:from-white/10 dark:to-transparent backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] ring-1 ring-black/5 dark:ring-white/5 z-30"
            />

            {/* Right Earcup — mirrored */}
            <motion.div 
              key={`right-earcup-${theme}`}
              animate={{
                boxShadow: [
                  `inset 6px -6px 16px ${colors.primary}33, inset -3px 3px 10px ${colors.secondary}1A, 0 0 12px ${colors.primary}14`,
                  `inset 4px -4px 12px ${colors.primary}1A, inset -2px 2px 6px ${colors.secondary}0D, 0 0 8px ${colors.primary}0A`,
                  `inset 6px -6px 16px ${colors.primary}33, inset -3px 3px 10px ${colors.secondary}1A, 0 0 12px ${colors.primary}14`,
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-[110px] top-[210px] w-[72px] h-[150px] rounded-[36px] border border-white/20 dark:border-white/10 bg-gradient-to-br from-white/20 to-white/0 dark:from-white/10 dark:to-transparent backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] ring-1 ring-black/5 dark:ring-white/5 z-30"
            />
            </div>
          </motion.div>
        </div>

        {/* LAYER 3: The Integrated Waveform (z-20) — Fixed anchor */}
        <SentientWaveform isActive={isActive} theme={theme} />
      </div>
    </div>
  );
}
