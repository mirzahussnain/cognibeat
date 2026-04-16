"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/** Keyboard shortcut easter egg — pressing "F" navigates to /app. */
export function FocusBadge() {
  const router = useRouter();
  const triggered = useRef(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if ((e.key === "f" || e.key === "F") && !e.metaKey && !e.ctrlKey) {
        if (triggered.current) return;
        triggered.current = true;
        router.push("/app");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      triggered.current = false;
    };
  }, [router]);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-background/70 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground backdrop-blur-md select-none transition-colors hover:bg-background/80">
      Press
      <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border/50 bg-card px-1.5 font-mono text-[10px] font-black text-foreground shadow-sm">
        F
      </kbd>
      to Focus
    </span>
  );
}
