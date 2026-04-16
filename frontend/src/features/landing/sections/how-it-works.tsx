"use client";

import { motion, useTransform } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { RobotIcon } from "@hugeicons/core-free-icons";
import { GlassCard } from "@/shared/components/ui/glass-card";
import { useTimelineScroll } from "@/features/landing/hooks/use-timeline-scroll";
import { TimelineNode } from "@/features/landing/components/timeline-node";
import { TimelineStepCard } from "@/features/landing/components/timeline-step-card";
import { TIMELINE_STEPS } from "@/features/landing/data";

export function ScienceOfFlow() {
  const {
    containerRef,
    lineHeight,
    branch1Path,
    card1Alpha,
    branch2Path,
    card2Alpha,
    branch3Path,
    card3Alpha,
  } = useTimelineScroll();

  const [step1, step2, step3] = TIMELINE_STEPS;

  return (
    <section
      ref={containerRef}
      className="relative z-10 mx-auto w-full max-w-6xl px-6 py-48 sm:px-12"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        className="mb-24 flex flex-col items-center space-y-4 text-center"
      >
        <div className="mb-2 rounded-full border border-border/10 bg-background dark:bg-muted/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md">
          System Architecture
        </div>
        <h2 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text font-heading text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
          The Science of Flow
        </h2>
        <p className="max-w-2xl font-sans text-lg text-muted-foreground">
          How CogniBeat orchestrates your brainwave synchronization using advanced multi-agent AI.
        </p>
      </motion.div>

      <div className="relative w-full">
        {/* Central spine */}
        <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-border/20 md:left-1/2 md:-ml-px" />

        {/* Glowing laser */}
        <motion.div
          className="absolute left-12 top-0 z-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-primary via-secondary to-tertiary shadow-[0_0_15px_color-mix(in_srgb,var(--color-primary)_50%,transparent)] md:left-1/2 md:-ml-[1.5px]"
          style={{ height: lineHeight }}
        />

        <div className="space-y-48 md:space-y-64">
          {/* ── Step 1: Define Context ── */}
          <div className="group relative flex flex-col md:grid md:grid-cols-[1fr_160px_1fr] md:items-center">
            <motion.div
              style={{ opacity: card1Alpha, x: useTransform(card1Alpha, [0, 1], [-20, 0]) }}
              className="z-10 pl-24 md:pl-0 md:text-right"
            >
              <h3 className="mb-4 font-heading text-3xl font-bold text-foreground">
                1. {step1.title}
              </h3>
              <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                {step1.description}{" "}
                <strong className="font-medium text-foreground">{step1.highlight}</strong> to map
                your specific cognitive requirements.
              </p>
            </motion.div>

            <TimelineNode
              icon={step1.icon}
              colorVar={step1.colorVar}
              borderClass={step1.borderClass}
              textClass={step1.textClass}
              strokeClass={step1.strokeClass}
              branchPath={branch1Path}
              side={step1.side}
              branchSvgD={step1.branchSvgD}
            />

            <TimelineStepCard alpha={card1Alpha} side="left">
              <GlassCard className="p-8 transition-colors hover:border-border/60 dark:border-primary/20 dark:hover:border-primary/40">
                <div className="mb-4 flex items-center gap-2 font-mono text-sm text-primary/70">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  {"Context_Payload.json"}
                </div>
                <code className="block rounded-xl border border-border/10 bg-muted/30 p-4 font-mono text-base text-muted-foreground">
                  <span className="text-secondary">{"{"}</span>
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-primary">&quot;task&quot;</span>:{" "}
                  <span className="text-foreground">&quot;React Debugging&quot;</span>,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-primary">&quot;focus_level&quot;</span>
                  : <span className="text-foreground">&quot;Deep&quot;</span>,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-primary">&quot;duration_min&quot;</span>
                  : <span className="text-foreground">90</span>
                  <br />
                  <span className="text-secondary">{"}"}</span>
                </code>
              </GlassCard>
            </TimelineStepCard>
          </div>

          {/* ── Step 2: Agents Synthesize ── */}
          <div className="group relative flex flex-col md:grid md:grid-cols-[1fr_160px_1fr] md:items-center">
            <motion.div
              style={{ opacity: card2Alpha, x: useTransform(card2Alpha, [0, 1], [20, 0]) }}
              className="z-10 pl-24 md:pl-12 md:text-left md:order-last"
            >
              <h3 className="mb-4 font-heading text-3xl font-bold text-foreground">
                2. {step2.title}
              </h3>
              <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                <strong className="font-medium text-foreground">{step2.highlight}</strong>{" "}
                {step2.description}
              </p>
            </motion.div>

            <TimelineNode
              icon={step2.icon}
              colorVar={step2.colorVar}
              borderClass={step2.borderClass}
              textClass={step2.textClass}
              strokeClass={step2.strokeClass}
              branchPath={branch2Path}
              side={step2.side}
              branchSvgD={step2.branchSvgD}
            />

            <TimelineStepCard alpha={card2Alpha} side="right">
              <GlassCard className="p-8 transition-colors hover:border-border/60 dark:border-secondary/20 dark:hover:border-secondary/40">
                <div className="mb-4 flex items-center gap-2 font-mono text-sm text-secondary/70">
                  <HugeiconsIcon icon={RobotIcon} size={16} />
                  LangGraph Swarm Active
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-secondary/20 bg-secondary/10 p-3">
                    <span className="text-sm font-medium text-foreground">Acoustic Engine</span>
                    <span className="font-mono text-xs text-secondary">Generating...</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/10 p-3">
                    <span className="text-sm font-medium text-foreground">Binaural Entrainment</span>
                    <span className="font-mono text-xs text-primary">40Hz Gamma</span>
                  </div>
                </div>
              </GlassCard>
            </TimelineStepCard>
          </div>

          {/* ── Step 3: Deep Focus ── */}
          <div className="group relative flex flex-col md:grid md:grid-cols-[1fr_160px_1fr] md:items-center">
            <motion.div
              style={{ opacity: card3Alpha, x: useTransform(card3Alpha, [0, 1], [-20, 0]) }}
              className="z-10 pl-24 md:pl-0 md:text-right"
            >
              <h3 className="mb-4 font-heading text-3xl font-bold text-foreground">
                3. {step3.title}
              </h3>
              <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                {step3.description}{" "}
                <strong className="font-medium text-foreground">{step3.highlight}</strong> for
                historical insights.
              </p>
            </motion.div>

            <TimelineNode
              icon={step3.icon}
              colorVar={step3.colorVar}
              borderClass={step3.borderClass}
              textClass={step3.textClass}
              strokeClass={step3.strokeClass}
              branchPath={branch3Path}
              side={step3.side}
              branchSvgD={step3.branchSvgD}
            />

            <TimelineStepCard alpha={card3Alpha} side="left">
              <GlassCard className="flex flex-col items-start gap-6 p-8 transition-colors hover:border-border/60 dark:border-tertiary/20 dark:hover:border-tertiary/40 md:flex-row md:items-center md:justify-between md:gap-0">
                <div>
                  <div className="mb-2 font-mono text-sm uppercase tracking-wider text-muted-foreground">
                    Current Session
                  </div>
                  <div className="font-heading text-5xl font-bold tracking-tight text-foreground">
                    01:45:
                    <span className="text-tertiary">22</span>
                  </div>
                </div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-tertiary/30 bg-tertiary/10">
                  <div className="absolute inset-0 animate-ping rounded-full border border-tertiary opacity-20" />
                  <div className="h-6 w-6 rounded-sm bg-tertiary shadow-[0_0_15px_color-mix(in_srgb,var(--color-tertiary)_80%,transparent)]" />
                </div>
              </GlassCard>
            </TimelineStepCard>
          </div>
        </div>
      </div>
    </section>
  );
}
