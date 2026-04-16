"use client";

import { useState, useCallback, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

import {
  FocusHelm,
  HeroCta,
  HeroHeadline,
  FloatingMusicIcons,
  InfiniteCanvas,
} from "@/features/landing/components";
import { AudioIndicator } from "@/features/landing/components/audio-indicator";
import { spatialAudio } from "@/features/landing/lib/spatial-audio";
import { FOCUS_HELM_THEMES, DEFAULT_FOCUS_HELM_THEME, type FocusHelmTheme } from "@/features/landing/lib/focus-helm-theme";

const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };

/** Hero section orchestrator — composes all hero layers into a cohesive landing section. */
export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isParallaxEnabled, setIsParallaxEnabled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeTheme, setActiveTheme] = useState<FocusHelmTheme>(DEFAULT_FOCUS_HELM_THEME);
  const [isWaveActive, setIsWaveActive] = useState(false);

  const shouldAnimateWave = isInputFocused || isWaveActive || isHovering;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateParallaxCapability = () => setIsParallaxEnabled(mediaQuery.matches);

    updateParallaxCapability();
    mediaQuery.addEventListener("change", updateParallaxCapability);
    return () => mediaQuery.removeEventListener("change", updateParallaxCapability);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!isParallaxEnabled) return;
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) * 2 - 1);
      mouseY.set((clientY / innerHeight) * 2 - 1);
    },
    [isParallaxEnabled, mouseX, mouseY]
  );

  const handlePointerLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleFocusChange = useCallback((focused: boolean) => {
    setIsInputFocused(focused);
  }, []);

  const handleInteractionHover = useCallback((active: boolean) => {
    setIsHovering(active);
    if (active) spatialAudio?.play();
  }, []);

  const handleTagSelect = useCallback((theme: FocusHelmTheme) => {
    const config = FOCUS_HELM_THEMES[theme];
    setInputValue(config.inputText);
    setActiveTheme(theme);
    setIsWaveActive(true);
    setTimeout(() => setIsWaveActive(false), 1000);
  }, []);

  return (
    <section
      className="relative z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4"
      onPointerMove={handleMouseMove}
      onPointerLeave={handlePointerLeave}
      suppressHydrationWarning
    >
      <InfiniteCanvas />
      <FloatingMusicIcons />

      {/* Interactive FocusHelm (Orbs + Brain) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-20" suppressHydrationWarning>
        <div
          onMouseEnter={() => handleInteractionHover(true)}
          onMouseLeave={() => handleInteractionHover(false)}
        >
          <FocusHelm
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
            isActive={shouldAnimateWave}
            theme={activeTheme}
          />
        </div>
      </div>

      {/* Main UI Content */}
      <AudioIndicator />
      <div className="relative z-30 mx-auto max-w-4xl text-center" suppressHydrationWarning>
        <div
          onMouseEnter={() => handleInteractionHover(true)}
          onMouseLeave={() => handleInteractionHover(false)}
        >
          <HeroHeadline />
        </div>
        <HeroCta
          inputValue={inputValue}
          onInputChange={setInputValue}
          onFocusChange={handleFocusChange}
          activeTheme={activeTheme}
          onTagSelect={handleTagSelect}
        />
      </div>
    </section>
  );
}
