/** Theme configuration for the FocusHelm component and Hero Section. */
export type FocusHelmTheme = "coding" | "writing" | "analysis" | "flow";

export interface FocusHelmThemeConfig {
  label: string;
  emoji: string;
  primary: string;
  secondary: string;
  inputText: string;
}

export const FOCUS_HELM_THEMES: Record<FocusHelmTheme, FocusHelmThemeConfig> = {
  coding: {
    label: "Deep Coding",
    emoji: "\u{1F9E0}",
    primary: "#00E5FF",
    secondary: "#B300FF",
    inputText: "Building a complex algorithm...",
  },
  writing: {
    label: "Creative Writing",
    emoji: "\u270D\uFE0F",
    primary: "#FFB800",
    secondary: "#FF6B9D",
    inputText: "Drafting my next chapter...",
  },
  analysis: {
    label: "Data Analysis",
    emoji: "\u{1F4CA}",
    primary: "#00D9A6",
    secondary: "#00B8D4",
    inputText: "Analyzing quarterly metrics...",
  },
  flow: {
    label: "Focus Flow",
    emoji: "\u{1F3AF}",
    primary: "#6366F1",
    secondary: "#A855F7",
    inputText: "Entering deep focus mode...",
  },
} as const;

export const DEFAULT_FOCUS_HELM_THEME: FocusHelmTheme = "coding";

/** Get theme colors with opacity variants for gradient rendering. */
export function getFocusHelmThemeColors(theme: FocusHelmTheme) {
  const config = FOCUS_HELM_THEMES[theme];
  return {
    primary: config.primary,
    secondary: config.secondary,
    primaryCC: `${config.primary}CC`,
    secondary99: `${config.secondary}99`,
    primary66: `${config.primary}66`,
    primary33: `${config.primary}33`,
  };
}
