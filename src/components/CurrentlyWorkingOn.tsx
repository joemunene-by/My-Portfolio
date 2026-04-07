"use client"

import { motion } from "framer-motion"
import { currentlyWorkingOn } from "@/data"
import AnimatedSection from "./AnimatedSection"
import { Rocket, Github, CheckCircle, Circle } from "lucide-react"

export default function CurrentlyWorkingOn() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <p className="font-mono text-primary text-sm">Currently Building</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            <span className="text-white">{currentlyWorkingOn.project}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="bg-bg-card border border-border-color rounded-2xl p-6 sm:p-8">
            <p className="text-text-muted leading-relaxed mb-8">
              {currentlyWorkingOn.description}
            </p>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-muted font-mono">Progress</span>
                <span className="text-primary font-mono font-bold">{currentlyWorkingOn.progress}%</span>
              </div>
              <div className="h-2 bg-bg-dark rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${currentlyWorkingOn.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </div>

            {/* Milestones */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {currentlyWorkingOn.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  {m.done ? (
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-text-muted/30 flex-shrink-0" />
                  )}
                  <span className={m.done ? "text-white" : "text-text-muted/50"}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={currentlyWorkingOn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary font-mono text-sm rounded-lg border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all"
            >
              <Github className="w-4 h-4" />
              Follow Progress on GitHub
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
