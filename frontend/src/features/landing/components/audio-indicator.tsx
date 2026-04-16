"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { spatialAudio } from "../lib/spatial-audio";
import { HugeiconsIcon } from "@hugeicons/react";
import { VolumeHighIcon, VolumeOffIcon } from "@hugeicons/core-free-icons";

/** Spatial audio toggle — positioned bottom-left, pulses when audio is active. */
export function AudioIndicator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(spatialAudio?.isMuted || false);

  useEffect(() => {
    if (!spatialAudio) return;

    const handlePlay = () => setIsPlaying(true);
    const handleStop = () => setIsPlaying(false);
    const handleMuteChange = () => {
      if (spatialAudio) setIsMuted(spatialAudio.isMuted);
    };

    spatialAudio.addEventListener("play", handlePlay);
    spatialAudio.addEventListener("stop", handleStop);
    spatialAudio.addEventListener("muteChange", handleMuteChange);

    return () => {
      spatialAudio?.removeEventListener("play", handlePlay);
      spatialAudio?.removeEventListener("stop", handleStop);
      spatialAudio?.removeEventListener("muteChange", handleMuteChange);
    };
  }, []);

  const handleToggle = () => spatialAudio?.toggleMute();
  const isActive = isPlaying && !isMuted;

  return (
    <div className="absolute bottom-10 max-sm:bottom-2  left-6 sm:bottom-12 sm:left-8 z-50 flex items-center gap-3">
      <motion.button
        onClick={handleToggle}
        className="relative flex h-12 w-12 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-colors hover:bg-background/80"
        aria-label={isMuted ? "Unmute spatial audio" : "Mute spatial audio"}
        animate={{
          boxShadow: isActive
            ? ["0px 0px 0px color-mix(in srgb, var(--color-primary) 0%, transparent)", "0px 0px 15px color-mix(in srgb, var(--color-primary) 40%, transparent)", "0px 0px 0px color-mix(in srgb, var(--color-primary) 0%, transparent)"]
            : "0px 0px 0px color-mix(in srgb, var(--color-primary) 0%, transparent)",
          borderColor: isActive ? "color-mix(in srgb, var(--color-primary) 50%, transparent)" : "color-mix(in srgb, var(--color-border) 50%, transparent)"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={isMuted ? "muted" : "unmuted"}
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex items-center justify-center ${isActive ? "text-primary" : "text-muted-foreground"}`}
          >
            <HugeiconsIcon
              icon={isMuted ? VolumeOffIcon : VolumeHighIcon}
              size={18}
              strokeWidth={1.5}
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <motion.span
        className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground/50 select-none"
        animate={{
          opacity: isActive ? 0.8 : (isMuted ? 0.2 : 0.4),
          color: isActive ? "var(--color-muted-foreground)" : "color-mix(in srgb, var(--color-muted-foreground) 50%, transparent)"
        }}
        transition={{ duration: 0.3 }}
      >
        Spatial Audio {isMuted && "(Off)"}
      </motion.span>
    </div>
  );
}
