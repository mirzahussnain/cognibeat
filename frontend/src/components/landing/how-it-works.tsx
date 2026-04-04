"use client";

import { motion } from "framer-motion";
import {Pencil, Brain, Target} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Define Your Task",
    description: "Input your context and goals. Our intelligent system analyzes your cognitive needs.",
    icon: Pencil,
  },
  {
    number: "02", 
    title: "AI Agents Synthesize",
    description: "LangGraph + RAG orchestrates the perfect auditory environment tailored to you.",
    icon: Brain,
  },
  {
    number: "03",
    title: "Enter Deep Focus",
    description: "Immerse yourself in a flow state with adaptive audio that enhances concentration.",
    icon: Target,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A visual journey through our cognitive enhancement pipeline
          </p>
        </motion.div>

        {/* Process Cards */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector Line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative z-10"
              >
                <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary/50 transition-colors duration-300">
                  {/* Step Number */}
                  <span className="text-primary/60 font-mono text-sm">{step.number}</span>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center my-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold font-heading mb-2">{step.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}