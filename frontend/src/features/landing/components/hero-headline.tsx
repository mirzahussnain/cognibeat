"use client";

import { motion } from "framer-motion";
import { fadeUp, heroContainerVariants, wordVariants } from "@/shared/utils/animations";
import { HEADLINE_LINE1, HEADLINE_LINE2, HEADLINE_LINE3, SUBHEADLINE } from "@/features/landing/data";

export function HeroHeadline() {
  return (
    <>
      <motion.h1
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6 mt-4 font-heading text-5xl font-bold leading-[1.1] tracking-tight md:text-8xl"
        aria-label={`${HEADLINE_LINE1} ${HEADLINE_LINE2} ${HEADLINE_LINE3}`}
      >
        <motion.span
          variants={wordVariants}
          className="block text-foreground text-opacity-90"
        >
          {HEADLINE_LINE1}
        </motion.span>

        <motion.span variants={wordVariants} className="block">
          <motion.span
            className="inline-block font-accent italic text-primary"
            style={{ textShadow: "0 0 20px color-mix(in srgb, var(--color-primary) 40%, transparent)" }}
          >
            {HEADLINE_LINE2.split("").map((char, index) => (
              <motion.span
                key={index}
                animate={{ y: [0, -18, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                  delay: index * 0.08,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </motion.span>

        <motion.span
          variants={wordVariants}
          className="block text-foreground text-opacity-90"
        >
          {HEADLINE_LINE3}
        </motion.span>
      </motion.h1>

      <motion.p
        {...fadeUp(0.8)}
        className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl"
      >
        {SUBHEADLINE}
      </motion.p>
    </>
  );
}
