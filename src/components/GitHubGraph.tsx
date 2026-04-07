"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedSection from "./AnimatedSection"
import { Github } from "lucide-react"

interface DayData {
  date: string
  count: number
  level: number
}

export default function GitHubGraph() {
  const [weeks, setWeeks] = useState<DayData[][]>([])

  useEffect(() => {
    // Generate contribution-style heatmap from recent activity
    // In production, you'd fetch from GitHub's GraphQL API
    const generateGraph = () => {
      const data: DayData[][] = []
      const today = new Date()

      for (let w = 0; w < 52; w++) {
        const week: DayData[] = []
        for (let d = 0; d < 7; d++) {
          const date = new Date(today)
          date.setDate(date.getDate() - (51 - w) * 7 - (6 - d))

          // Simulate activity pattern — heavier recent months
          const monthsAgo = (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)
          const baseChance = Math.max(0.15, 1 - monthsAgo * 0.07)
          const isActive = Math.random() < baseChance
          const count = isActive ? Math.floor(Math.random() * 8) + 1 : 0
          const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4

          week.push({
            date: date.toISOString().split("T")[0],
            count,
            level,
          })
        }
        data.push(week)
      }
      setWeeks(data)
    }

    generateGraph()
  }, [])

  const levelColors = [
    "bg-border-color/40",
    "bg-primary/20",
    "bg-primary/40",
    "bg-primary/65",
    "bg-primary",
  ]

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Calculate month labels based on weeks
  const monthLabels: { label: string; col: number }[] = []
  if (weeks.length > 0) {
    let lastMonth = -1
    weeks.forEach((week, i) => {
      if (week[0]) {
        const month = new Date(week[0].date).getMonth()
        if (month !== lastMonth) {
          monthLabels.push({ label: months[month], col: i })
          lastMonth = month
        }
      }
    })
  }

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-8">
            <Github className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-white">Contribution Activity</h3>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="bg-bg-card border border-border-color rounded-xl p-4 sm:p-6 overflow-x-auto">
            {/* Month labels */}
            <div className="flex gap-[3px] mb-2 ml-8">
              {monthLabels.map((m, i) => (
                <span
                  key={i}
                  className="text-[10px] text-text-muted font-mono"
                  style={{ position: "relative", left: `${m.col * 13}px` }}
                >
                  {i > 0 ? m.label : ""}
                </span>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px]">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-1">
                {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                  <span key={i} className="text-[10px] text-text-muted font-mono h-[11px] leading-[11px]">
                    {d}
                  </span>
                ))}
              </div>

              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <motion.div
                      key={day.date}
                      className={`w-[11px] h-[11px] rounded-sm ${levelColors[day.level]} transition-colors`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: (wi * 7 + di) * 0.0008,
                        duration: 0.2,
                      }}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4 text-[10px] text-text-muted font-mono">
              <span>Less</span>
              {levelColors.map((c, i) => (
                <div key={i} className={`w-[11px] h-[11px] rounded-sm ${c}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
