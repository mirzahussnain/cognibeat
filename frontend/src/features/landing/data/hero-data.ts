import type { QuickSelectTag } from "../types";

export const HEADLINE_LINE1 = "Context-Aware";
export const HEADLINE_LINE2 = "Audio";
export const HEADLINE_LINE3 = "for Deep Work.";
export const SUBHEADLINE =
  "Synchronize your focus with AI-generated ambient soundscapes. No distractions, just pure flow.";

export const QUICK_SELECT_TAGS: readonly QuickSelectTag[] = [
  { label: "DEEP CODING", theme: "coding" },
  { label: "CREATIVE WRITING", theme: "writing" },
  { label: "DATA ANALYSIS", theme: "analysis" },
] as const;
