import type { IconSvgElement } from "@hugeicons/react";
import { TargetIcon, RobotIcon, PulseIcon } from "@hugeicons/core-free-icons";

export interface TimelineStep {
  id: number;
  title: string;
  description: string;
  highlight: string;
  icon: IconSvgElement;
  colorVar: string;
  borderClass: string;
  textClass: string;
  strokeClass: string;
  side: "left" | "right";
  branchSvgD: string;
}

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 1,
    title: "Define Context",
    description: "Our Context Engine analyzes your objective using",
    highlight: "LangChain RAG",
    icon: TargetIcon,
    colorVar: "--color-primary",
    borderClass: "border-primary",
    textClass: "text-primary",
    strokeClass: "stroke-primary/40",
    side: "left",
    branchSvgD: "M0,120 L0,104 C20,50 60,50 80,104",
  },
  {
    id: 2,
    title: "Agents Synthesize",
    description: "orchestrates a multi-agent swarm to generate a continuous auditory environment perfectly tuned for your task.",
    highlight: "LangGraph",
    icon: RobotIcon,
    colorVar: "--color-secondary",
    borderClass: "border-secondary",
    textClass: "text-secondary",
    strokeClass: "stroke-secondary/40",
    side: "right",
    branchSvgD: "M80,120 L80,104 C60,50 20,50 0,104",
  },
  {
    id: 3,
    title: "Deep Focus",
    description: "Enter the flow state. Your session analytics and optimal frequencies are persisted to",
    highlight: "PostgreSQL",
    icon: PulseIcon,
    colorVar: "--color-tertiary",
    borderClass: "border-tertiary",
    textClass: "text-tertiary",
    strokeClass: "stroke-tertiary/40",
    side: "left",
    branchSvgD: "M0,120 L0,104 C20,50 60,50 80,104",
  },
];
