"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { FocusBadge } from "./focus-badge";
import { fadeUp, fadeInUp } from "@/shared/utils/animations";
import { QUICK_SELECT_TAGS } from "@/features/landing/data";
import type { HeroCtaProps, QuickSelectSuggestionsProps } from "@/features/landing/types";

// ─── Quick Select Tags ────────────────────────────────────────────────────────

function QuickSelectSuggestions({
  activeTheme,
  onSelect,
  onFocusChange
}: QuickSelectSuggestionsProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="z-10 mt-6 flex flex-wrap items-center justify-center gap-2 md:gap-3"
    >
      {QUICK_SELECT_TAGS.map((tag) => {
        const isActive = activeTheme === tag.theme;
        return (
          <button
            key={tag.label}
            onClick={() => {
              onSelect(tag.theme);
              onFocusChange?.(true);
            }}
            className={`flex items-center rounded-full border px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md ${isActive
              ? "border-background bg-background text-foreground"
              : "border-border/30 bg-background/40 text-muted-foreground hover:bg-background/60 hover:text-foreground"
              }`}
          >
            {tag.label}
          </button>
        );
      })}
    </motion.div>
  );
}

// ─── Hero CTA Component ───────────────────────────────────────────────────────

export function HeroCta({
  inputValue = "",
  onInputChange,
  onFocusChange,
  activeTheme = "coding",
  onTagSelect,
}: HeroCtaProps) {
  return (
    <motion.div
      {...fadeUp(1.1)}
      className="z-20 mx-auto flex w-full max-w-md flex-col items-center gap-6 pt-4 sm:max-w-lg md:max-w-xl max-sm:-mt-8"
    >
      <div className="group relative w-full">
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

        {/* Input container - pristine floating pill */}
        <div className="relative flex w-full items-center gap-0 rounded-full border border-border/20 bg-background/60 p-2 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors hover:border-border/40">

          {/* Input field */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange?.(e.target.value)}
            placeholder="What are you focusing on?"
            className="min-w-0 flex-1 border-none bg-transparent px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground sm:px-5 sm:py-3 sm:text-base font-medium"
            onFocus={() => onFocusChange?.(true)}
            onBlur={() => onFocusChange?.(false)}
          />

          {/* CTA Button */}
          <Link href="/dashboard" className="shrink-0 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-primary-foreground shadow-lg transition-all duration-300 sm:px-6 sm:py-3"
            >
              <span className="hidden text-sm font-bold tracking-wide sm:inline">Enter Flow</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={18}
                strokeWidth={2.5}
              />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Layer 5: Quick Select Suggestions — Premium ghost style */}
      <QuickSelectSuggestions
        activeTheme={activeTheme}
        onSelect={onTagSelect ?? (() => { })}
        onFocusChange={onFocusChange}
      />

      <motion.div {...fadeUp(1.4)}>
        <FocusBadge />
      </motion.div>
    </motion.div>
  );
}
