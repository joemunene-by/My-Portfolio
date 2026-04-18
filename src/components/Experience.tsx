"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { timeline } from "@/data"
import AnimatedSection from "./AnimatedSection"
import RevealText from "./RevealText"
import GiantLabel from "./GiantLabel"
import { Briefcase, GraduationCap, Rocket, ChevronDown } from "lucide-react"

const typeConfig = {
  project: { icon: Rocket, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", label: "project" },
  milestone: { icon: Briefcase, color: "text-accent", bg: "bg-accent/10", border: "border-accent/30", label: "milestone" },
  education: { icon: GraduationCap, color: "text-accent-warm", bg: "bg-accent-warm/10", border: "border-accent-warm/30", label: "education" },
}

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 20%"],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="experience" className="py-20 sm:py-32 relative overflow-hidden">
      <GiantLabel text="JOURNEY" align="left" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <p className="font-mono text-primary text-sm mb-2">02. Experience</p>
          <RevealText
            as="h2"
            text="My Journey"
            className="text-3xl sm:text-4xl font-bold mb-16 text-white"
          />
        </AnimatedSection>

        <div className="relative" ref={railRef}>
          {/* Static track */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border-color" />
          {/* Scroll-linked progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 sm:left-8 top-0 w-px bg-gradient-to-b from-primary via-accent to-accent-warm origin-top"
          />

          <div className="space-y-6">
            {timeline.map((item, i) => {
              const config = typeConfig[item.type]
              const Icon = config.icon
              const isOpen = expanded === i

              return (
                <AnimatedSection key={i} delay={i * 0.12} direction="left">
                  <div className="flex gap-6 sm:gap-8 items-start">
                    {/* Dot */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center z-10 relative cursor-pointer`}
                        onClick={() => setExpanded(isOpen ? null : i)}
                        data-cursor="hover"
                      >
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.color}`} />
                        {isOpen && (
                          <motion.span
                            layoutId="exp-ring"
                            className="absolute -inset-1 rounded-xl border-2 border-primary/60"
                          />
                        )}
                      </motion.div>
                    </div>

                    {/* Card */}
                    <motion.button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      data-cursor="hover"
                      whileHover={{ x: 2 }}
                      className={`flex-1 text-left p-4 sm:p-5 rounded-xl border transition-all ${
                        isOpen
                          ? "bg-bg-card border-primary/40 shadow-[0_0_30px_rgb(var(--primary)/0.12)]"
                          : "bg-bg-card/40 border-border-color hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className={`font-mono text-[11px] uppercase tracking-widest ${config.color}`}>
                          {item.year} · {config.label}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-text-muted/70"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-muted/70 font-medium">
                        {item.subtitle}
                      </p>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                          marginTop: isOpen ? 12 : 0,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [0.25, 0.4, 0.25, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-text-muted text-sm leading-relaxed">
                          {item.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-text-muted/70">
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${config.bg}`} />
                          entry {String(i + 1).padStart(2, "0")} / {String(timeline.length).padStart(2, "0")}
                        </div>
                      </motion.div>
                    </motion.button>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
