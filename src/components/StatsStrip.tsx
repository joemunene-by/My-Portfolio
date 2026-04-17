"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useGitHubStats } from "@/hooks/useGitHubStats"
import CountUp from "./CountUp"

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const { stats } = useGitHubStats()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const xLeft = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
  const xRight = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

  const items: { value: number; display?: (n: number) => string; label: string }[] = [
    { value: stats.totalRepos, label: "Public Repos" },
    { value: stats.totalCommits, display: (n) => `${n}+`, label: "Total Commits" },
    {
      value: Number(String(stats.linesOfCode).replace(/[^\d]/g, "")) || 0,
      display: (n) =>
        n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K+` : `${n}`,
      label: "Lines of Code",
    },
    { value: stats.languages.length, label: "Languages" },
  ]

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
          {items.map((s, i) => (
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
                <span className="text-gradient">
                  <CountUp end={s.value} duration={1800} display={s.display} />
                </span>
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
