import type { ReactNode } from "react";
import type { FocusHelmTheme } from "@/features/landing/lib/focus-helm-theme";

// ─── Hero CTA Types ─────────────────────────────────────────────────────────

export interface HeroCtaProps {
  /** Controlled input value */
  inputValue?: string;
  /** Callback fired when input value changes */
  onInputChange?: (value: string) => void;
  /** Callback fired when input focus state changes (for waveform reactivity) */
  onFocusChange?: (focused: boolean) => void;
  /** Currently active theme */
  activeTheme?: FocusHelmTheme;
  /** Callback fired when a context tag is selected */
  onTagSelect?: (theme: FocusHelmTheme) => void;
}

export interface QuickSelectSuggestionsProps {
  activeTheme: FocusHelmTheme;
  onSelect: (theme: FocusHelmTheme) => void;
  onFocusChange?: (focused: boolean) => void;
}

// ─── Tech Stack Marquee Types ───────────────────────────────────────────────

export interface TechStackItem {
  name: string;
  icon: ReactNode;
}

// ─── Quick Select Tag Types ─────────────────────────────────────────────────

export interface QuickSelectTag {
  label: string;
  theme: FocusHelmTheme;
}
