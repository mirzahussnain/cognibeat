import type { Variants } from "framer-motion";

// ─── Shared Animation Variants ─────────────────────────────────────────────────
// Extracted from hero-cta, hero-headline, and hero-scroll-indicator
// to enforce DRY principles across all landing page components.

/** Cubic-bezier ease used across all hero entrance animations */
export const EASE_EXPO_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Fade-up factory with configurable delay.
 * Used for staggered entrance animations on hero elements.
 */
export const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE_EXPO_OUT },
  },
});

/** Simple fade-in-up variant (no delay parameter) */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_EXPO_OUT },
  },
};

/** Staggered container for hero headline words */
export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

/** Individual word entrance (blur + slide) */
export const wordVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_EXPO_OUT },
  },
};
