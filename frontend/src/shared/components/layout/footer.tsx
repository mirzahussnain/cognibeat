"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Heart } from "@hugeicons/core-free-icons";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo + Text */}
          <Link href="/" className="flex items-center gap-2" aria-label="CogniBeat home">
            <Logo className="h-6 w-auto" />
            <span className="text-sm font-medium text-muted-foreground">CogniBeat</span>
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
          </div>

          {/* Tag */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built for the UK Tech Community</span>
            <HugeiconsIcon icon={Heart} size={16} className="text-secondary" />
          </div>
        </div>
      </div>
    </footer>
  );
}
