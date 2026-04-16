"use client";

import { motion } from "framer-motion";
import { FOCUS_HELM_THEMES, type FocusHelmTheme } from "@/features/landing/lib/focus-helm-theme";

interface GlowingOrbProps {
  theme?: FocusHelmTheme;
  className?: string;
  delay?: number;
}

/**
 * Layer 1 — True 3D Volumetric Orb using CSS Glass Marble Technique
 * 
 * Creates a physical 3D sphere illusion using:
 * - AMBIENT GLOW: Large blurred layer for background light
 * - GLASS SHELL: overflow-hidden container with static inset shadows
 * - SPINNING PLASMA: Internal swirling energy clipped by the shell
 * 
 * The key insight: Static directional lighting (via box-shadow) + spinning
 * internal content = glass marble with swirling plasma inside.
 * 
 * Now supports dynamic themes for color morphing on context tag selection.
 */
export function GlowingOrb({ theme = "coding", className = "", delay = 0 }: GlowingOrbProps) {
  const colors = FOCUS_HELM_THEMES[theme];
  
  // Dynamic aura gradient for ambient light
  const auraGradient = `conic-gradient(from 0deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`;

  // Plasma gradient with transparent gaps for shadow effect
  const plasmaGradient = `conic-gradient(from 90deg, transparent 0%, ${colors.primary}CC 30%, ${colors.secondary}99 70%, transparent 100%)`;

  // Box shadow: static directional lighting
  // - Dark inner shadow (bottom-right) = 3D depth
  // - Bright inner shadow (top-left) = specular highlight
  // - External glow = light emission
  const glassShellShadow = `
    inset -30px -30px 60px rgba(11, 15, 25, 0.9), 
    inset 20px 20px 50px ${colors.primary}66,
    0 0 40px ${colors.primary}33
  `;

  return (
    <div 
      className={`absolute inset-0 z-0 pointer-events-none flex items-center justify-center ${className}`}
    >  
      {/* LAYER 1: Ambient Glow (soft light on background) */}
      <motion.div
        key={`aura-${theme}`}
        animate={{
          rotate: [360, 0], // Counter-clockwise
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay },
        }}
        className="absolute w-full h-full opacity-40 blur-[100px] rounded-full transition-all duration-600"
        style={{ background: auraGradient }}
      />

      {/* LAYER 2: Glass Shell (3D volumetric container with static lighting) */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95], // Subtle breathing
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay }}
        className="absolute w-[300px] h-[300px] md:w-[330px] md:h-[330px] rounded-full overflow-hidden z-10 transition-shadow duration-600 border border-border/10 backdrop-blur-md"
        style={{
          boxShadow: glassShellShadow,
        }}
      >
        {/* LAYER 3: Spinning Plasma (internal swirling energy) */}
        <motion.div
          key={`plasma-${theme}`}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          // 150% size + offset so conic center isn't dead center
          className="absolute w-[150%] h-[150%] -top-1/4 -left-1/4 opacity-80 blur-[20px] transition-all duration-600"
          style={{ background: plasmaGradient }}
        />
      </motion.div>
      
    </div>
  );
}

// Default export for backward compatibility
export function MotionOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <GlowingOrb theme="coding" />
    </div>
  );
}
