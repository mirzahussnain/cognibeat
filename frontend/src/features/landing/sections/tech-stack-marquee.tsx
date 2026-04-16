"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiLangchain,
  SiFastapi,
  SiPostgresql
} from "react-icons/si";
import { RiNodeTree } from "react-icons/ri";

const techStack = [
  { name: "Next.js", icon: <SiNextdotjs className="h-6 w-6" /> },
  { name: "React", icon: <SiReact className="h-6 w-6" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="h-6 w-6" /> },
  { name: "Framer Motion", icon: <SiFramer className="h-6 w-6" /> },
  { name: "LangChain", icon: <SiLangchain className="h-6 w-6" /> },
  { name: "LangGraph", icon: <RiNodeTree className="h-6 w-6" /> },
  { name: "FastAPI", icon: <SiFastapi className="h-6 w-6" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="h-6 w-6" /> },
];

const marqueeItems = [...techStack, ...techStack, ...techStack];

/** Infinite scrolling tech stack ribbon. Rendered as a standalone section between Hero and How It Works. */
export function TechStackMarquee() {
  return (
    <div className="relative w-full border-y border-border/20 bg-background/20 py-6 backdrop-blur-sm sm:py-8">
      <div className="flex max-w-screen items-center px-4 sm:px-6">
        <div className="relative z-30 hidden sm:flex shrink-0 items-center justify-center bg-background pr-6">
          <span className=" font-bold tracking-[0.2em] text-muted-foreground/80 uppercase text-[8px]">
            Powered By
          </span>
          <div className="ml-4 h-4 w-px bg-border/40 " />
        </div>

        <div className="relative flex flex-1 items-center overflow-hidden">
          <div className="absolute left-0 top-0 z-20 h-full w-24 bg-linear-to-r from-background via-background/90 to-transparent" />
          <div className="absolute right-0 top-0 z-20 h-full w-24 bg-linear-to-l from-background to-transparent" />

          <motion.div
            className="flex w-max items-center gap-10 pr-10 sm:gap-16 sm:pr-16"
            animate={{ x: [0, "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {marqueeItems.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center gap-3 whitespace-nowrap text-muted-foreground/30 transition-colors duration-300 hover:text-foreground/90"
              >
                <div className="shrink-0">{item.icon}</div>
                <span className="text-[18px] font-medium tracking-tight sm:text-[22px]">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
