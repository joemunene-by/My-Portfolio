"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedSection from "./AnimatedSection"
import { Github, AlertCircle } from "lucide-react"

interface DayData {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ContributionsResponse {
  contributions: DayData[]
  total: number
  username: string
  error?: string
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const LEVEL_COLORS = [
  "bg-border-color/40",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/65",
  "bg-primary",
]

// Bucket a flat 365-day array into 53 weeks aligned to a Sunday start.
function bucketIntoWeeks(contributions: DayData[]): DayData[][] {
  if (!contributions.length) return []
  const sorted = [...contributions].sort((a, b) =>
    a.date.localeCompare(b.date),
  )
  const firstDate = new Date(sorted[0].date + "T00:00:00")
  const dayOfWeek = firstDate.getDay() // 0 = Sunday
  const padded: (DayData | null)[] = []
  for (let i = 0; i < dayOfWeek; i++) padded.push(null)
  padded.push(...sorted)
  const weeks: DayData[][] = []
  for (let i = 0; i < padded.length; i += 7) {
    const week = padded
      .slice(i, i + 7)
      .map(
        (d) =>
          d ?? {
            date: "",
            count: 0,
            level: 0 as const,
          },
      )
    weeks.push(week)
  }
  return weeks
}

export default function GitHubGraph() {
  const [weeks, setWeeks] = useState<DayData[][]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [username, setUsername] = useState<string>("joemunene-by")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch("/api/github/contributions")
      .then(async (r) => {
        if (!r.ok) throw new Error(`status ${r.status}`)
        return (await r.json()) as ContributionsResponse
      })
      .then((data) => {
        if (cancelled) return
        if (data.error) {
          setError(data.error)
          setLoading(false)
          return
        }
        setWeeks(bucketIntoWeeks(data.contributions))
        setTotal(data.total)
        setUsername(data.username)
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : "fetch failed")
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Calculate month labels based on the first day of each week.
  const monthLabels: { label: string; col: number }[] = []
  if (weeks.length > 0) {
    let lastMonth = -1
    weeks.forEach((week, i) => {
      const firstDay = week.find((d) => d.date)
      if (firstDay) {
        const month = new Date(firstDay.date + "T00:00:00").getMonth()
        if (month !== lastMonth) {
          monthLabels.push({ label: MONTHS[month], col: i })
          lastMonth = month
        }
      }
    })
  }

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-white">Contribution Activity</h3>
              {total !== null && (
                <span className="text-text-muted text-sm">
                  <span className="text-white font-semibold">{total.toLocaleString()}</span>{" "}
                  contributions in the last year
                </span>
              )}
            </div>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-text-muted hover:text-primary transition-colors"
            >
              @{username} ↗
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="bg-bg-card border border-border-color rounded-xl p-4 sm:p-6 overflow-x-auto">
            {error ? (
              <div className="flex items-center gap-2 text-text-muted text-sm py-8 justify-center">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span>Couldn&apos;t load contributions: {error}</span>
              </div>
            ) : loading ? (
              <div className="flex flex-col gap-3 py-2">
                <div className="h-3 w-32 rounded-sm bg-border-color/60 animate-pulse" />
                <div className="grid grid-cols-53 gap-[3px]">
                  {Array.from({ length: 53 * 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xs bg-border-color/30 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Month labels */}
                <div className="relative h-4 mb-2 ml-8">
                  {monthLabels.slice(1).map((m, i) => (
                    <span
                      key={i}
                      className="absolute text-[10px] text-text-muted font-mono"
                      style={{ left: `${m.col * 14}px` }}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>

                {/* Grid */}
                <div className="flex gap-[3px]">
                  {/* Day labels */}
                  <div className="flex flex-col gap-[3px] mr-1">
                    {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-text-muted font-mono h-[11px] leading-[11px]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((day, di) => (
                        <motion.div
                          key={`${wi}-${di}`}
                          className={`w-[11px] h-[11px] rounded-xs ${LEVEL_COLORS[day.level]} transition-colors`}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: (wi * 7 + di) * 0.0008,
                            duration: 0.2,
                          }}
                          title={
                            day.date
                              ? `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`
                              : ""
                          }
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-4 text-[10px] text-text-muted font-mono">
                  <span>Less</span>
                  {LEVEL_COLORS.map((c, i) => (
                    <div key={i} className={`w-[11px] h-[11px] rounded-xs ${c}`} />
                  ))}
                  <span>More</span>
                </div>
              </>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
