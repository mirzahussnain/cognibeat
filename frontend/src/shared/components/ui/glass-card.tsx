import { cn } from "@/shared/utils";
import * as React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * GlassCard — Frosted glass panel with theme-aware styling.
 *
 * Light mode: subtle gray tint with visible border for definition.
 * Dark mode: frosted dark glass with faint luminous border.
 */
export function GlassCard({
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl",
        "border border-border/40 dark:border-border/10",
        "bg-white/60 dark:bg-card/30",
        "backdrop-blur-xl",
        "shadow-sm dark:shadow-none",
        "transition-all duration-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
