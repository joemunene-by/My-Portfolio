"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface Stat {
  value: string
  label: string
}

interface Props {
  stats: Stat[]
}

export default function StatsStrip({ stats }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const xLeft = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
  const xRight = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 overflow-hidden border-y border-border-color bg-bg-card/20"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ x: xLeft }}
      >
        <div
          className="font-bold text-[22vw] leading-none whitespace-nowrap text-transparent tracking-tighter"
          style={{ WebkitTextStroke: "1px rgb(var(--primary) / 0.08)" }}
          aria-hidden
        >
          RESULTS · RESULTS
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ x: xRight }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="text-center sm:text-left"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tabular-nums tracking-tighter">
                <span className="text-gradient">{s.value}</span>
              </div>
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-text-muted mt-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
