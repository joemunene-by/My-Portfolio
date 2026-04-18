"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Activity,
  Cpu,
  GitBranch,
  Globe,
  Package,
  Star,
  Terminal,
  Wifi,
  Zap,
} from "lucide-react"
import { useGitHubStats } from "@/hooks/useGitHubStats"
import { projects, timeline, stats as siteStats, currentlyWorkingOn } from "@/data"
import RevealText from "@/components/RevealText"
import CountUp from "@/components/CountUp"
import MagneticLink from "@/components/MagneticLink"

type Event = {
  id: string
  type: string
  repo?: { name: string }
  created_at: string
  payload?: {
    commits?: { message: string }[]
    ref?: string
    ref_type?: string
  }
}

export default function DashboardPage() {
  const { stats } = useGitHubStats()
  const [events, setEvents] = useState<Event[]>([])
  const [fetched, setFetched] = useState(false)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    fetch("https://api.github.com/users/joemunene-by/events/public?per_page=20", {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Event[]) => {
        setEvents(Array.isArray(d) ? d : [])
        setFetched(true)
      })
      .catch(() => setFetched(true))
  }, [])

  // Build a 14-day commit heatmap from the push events
  const heatmap = useMemo(() => {
    const days: { date: string; count: number }[] = []
    const today = new Date()
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      days.push({
        date: d.toISOString().split("T")[0],
        count: 0,
      })
    }
    for (const e of events) {
      if (e.type !== "PushEvent") continue
      const d = e.created_at.split("T")[0]
      const hit = days.find((x) => x.date === d)
      if (hit) hit.count += e.payload?.commits?.length || 1
    }
    return days
  }, [events])

  const max = Math.max(1, ...heatmap.map((d) => d.count))
  const recentCommits = events
    .filter((e) => e.type === "PushEvent")
    .slice(0, 5)

  const languageCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of projects) {
      if (!p.language || p.language === "N/A") continue
      map.set(p.language, (map.get(p.language) || 0) + 1)
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1])
  }, [])

  const totalLang = languageCounts.reduce((s, [, v]) => s + v, 0) || 1

  return (
    <main className="min-h-screen relative pb-20">
      {/* Action bar */}
      <div className="sticky top-0 z-50 bg-bg-dark/80 backdrop-blur-xl border-b border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <MagneticLink>
            <Link
              href="/"
              className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-mono text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </MagneticLink>
          <div className="flex items-center gap-3 font-mono text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {fetched ? "LIVE" : "SYNC"}
            </span>
            <span className="tabular-nums hidden sm:inline">
              {now.toLocaleTimeString("en-GB", { hour12: false })}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-6 font-mono text-[11px] text-primary uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          command center
        </div>
        <RevealText
          as="h1"
          text="Portfolio Dashboard"
          className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight"
        />
        <p className="text-text-muted max-w-2xl mb-10">
          A live, at-a-glance readout of the portfolio — GitHub stats, recent
          shipping activity, language split, and what's under construction right
          now.
        </p>

        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Kpi
            icon={<Package className="w-4 h-4" />}
            label="Repos"
            value={<CountUp end={stats.totalRepos} />}
          />
          <Kpi
            icon={<GitBranch className="w-4 h-4" />}
            label="Commits"
            value={<CountUp end={stats.totalCommits} suffix="+" />}
          />
          <Kpi
            icon={<Cpu className="w-4 h-4" />}
            label="Lines of Code"
            value={<CountUp end={stats.linesOfCode} />}
          />
          <Kpi
            icon={<Star className="w-4 h-4" />}
            label="Stars"
            value={<CountUp end={stats.totalStars ?? 0} />}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left column — 2/3 width on lg */}
          <div className="lg:col-span-2 space-y-4">
            {/* Commit heatmap */}
            <Card
              icon={<Activity className="w-3.5 h-3.5" />}
              title="Commit Activity"
              subtitle="last 14 days"
            >
              <div className="flex items-end gap-1.5 h-28">
                {heatmap.map((d) => {
                  const pct = d.count / max
                  return (
                    <div
                      key={d.date}
                      title={`${d.date}: ${d.count} commit${d.count === 1 ? "" : "s"}`}
                      className="flex-1 rounded-md transition-all"
                      style={{
                        background: `rgb(var(--primary) / ${
                          d.count === 0 ? 0.08 : 0.2 + pct * 0.7
                        })`,
                        height: `${Math.max(8, pct * 100)}%`,
                      }}
                    />
                  )
                })}
              </div>
              <div className="flex items-center justify-between mt-3 font-mono text-[10px] text-text-muted/70 uppercase tracking-widest">
                <span>
                  {heatmap[0].date.slice(5)} – {heatmap[heatmap.length - 1].date.slice(5)}
                </span>
                <span>
                  peak: {max} commit{max === 1 ? "" : "s"}
                </span>
              </div>
            </Card>

            {/* Recent commits */}
            <Card
              icon={<GitBranch className="w-3.5 h-3.5" />}
              title="Recent Commits"
              subtitle={fetched ? "github.com · live" : "loading"}
            >
              {recentCommits.length === 0 ? (
                <div className="text-text-muted text-sm font-mono">
                  {fetched ? "no recent commits on file" : "fetching from github..."}
                </div>
              ) : (
                <div className="divide-y divide-border-color/50">
                  {recentCommits.map((e) => (
                    <a
                      key={e.id}
                      href={`https://github.com/${e.repo?.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 block group"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-mono text-[11px] text-primary truncate">
                          {e.repo?.name}
                        </span>
                        <span className="font-mono text-[10px] text-text-muted/60 shrink-0">
                          {relTime(e.created_at, now)}
                        </span>
                      </div>
                      <div className="text-white text-sm group-hover:text-primary transition-colors truncate">
                        {e.payload?.commits?.[0]?.message?.split("\n")[0] ||
                          `pushed to ${e.payload?.ref?.replace("refs/heads/", "") || "branch"}`}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </Card>

            {/* In flight */}
            <Card
              icon={<Zap className="w-3.5 h-3.5" />}
              title="In Flight"
              subtitle="currently building"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-bold text-white text-lg">
                    {currentlyWorkingOn.project}
                  </div>
                  <div className="text-text-muted text-sm">
                    {currentlyWorkingOn.description}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-primary text-xl font-bold tabular-nums">
                    {currentlyWorkingOn.progress}%
                  </div>
                  <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    progress
                  </div>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-bg-dark/80 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary via-accent to-accent-warm"
                  style={{ width: `${currentlyWorkingOn.progress}%` }}
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1">
                {currentlyWorkingOn.milestones.map((m, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 text-[12px] ${
                      m.done ? "text-white" : "text-text-muted/50"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        m.done ? "bg-primary" : "bg-text-muted/30"
                      }`}
                    />
                    {m.label}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right column — 1/3 width */}
          <div className="space-y-4">
            {/* Language split */}
            <Card
              icon={<Globe className="w-3.5 h-3.5" />}
              title="Language Split"
              subtitle="featured + other"
            >
              <div className="space-y-2">
                {languageCounts.map(([lang, count]) => {
                  const pct = Math.round((count / totalLang) * 100)
                  return (
                    <div key={lang}>
                      <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                        <span className="text-white">{lang}</span>
                        <span className="text-text-muted">
                          {count} · {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-bg-dark/80 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* System */}
            <Card
              icon={<Terminal className="w-3.5 h-3.5" />}
              title="System"
              subtitle="runtime info"
            >
              <Row label="Stack" value="Next.js 15 · React 19" />
              <Row label="Theme" value="user-selectable" />
              <Row label="Location" value="Nairobi, KE" />
              <Row label="Timezone" value="EAT · UTC+3" />
              <Row label="Status" value={<span className="text-green-400">open for work</span>} />
            </Card>

            {/* Timeline summary */}
            <Card
              icon={<Wifi className="w-3.5 h-3.5" />}
              title="Timeline Pulse"
              subtitle={`${timeline.length} entries`}
            >
              <div className="space-y-2">
                {timeline.slice(0, 4).map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px]">
                    <span className="font-mono text-primary text-[10px] tabular-nums shrink-0">
                      {t.year}
                    </span>
                    <span className="text-white truncate">{t.title}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick links */}
            <Card
              icon={<Activity className="w-3.5 h-3.5" />}
              title="Quick Links"
              subtitle=""
            >
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Projects", href: "/#projects" },
                  { label: "Experience", href: "/#experience" },
                  { label: "Blog", href: "/#blog" },
                  { label: "Contact", href: "/#contact" },
                  { label: "Resume", href: "/resume" },
                  { label: "GitHub", href: "https://github.com/joemunene-by", external: true },
                ].map((q) => (
                  <a
                    key={q.label}
                    href={q.href}
                    target={q.external ? "_blank" : undefined}
                    rel={q.external ? "noopener noreferrer" : undefined}
                    className="text-center px-3 py-2 bg-bg-dark/60 border border-border-color rounded-lg font-mono text-xs text-white hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {q.label}
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-border-color flex items-center justify-between font-mono text-[11px] text-text-muted/70">
          <span>dashboard · {projects.length} projects tracked · {siteStats.totalRepos} repos</span>
          <span>rendered {now.toLocaleTimeString("en-GB", { hour12: false })}</span>
        </div>
      </div>
    </main>
  )
}

function Kpi({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="bg-bg-card/40 backdrop-blur-sm border border-border-color rounded-xl p-4">
      <div className="flex items-center gap-2 text-text-muted font-mono text-[10px] uppercase tracking-widest">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-2xl sm:text-3xl font-bold text-white tabular-nums">
        {value}
      </div>
    </div>
  )
}

function Card({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section className="bg-bg-card/40 backdrop-blur-sm border border-border-color rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-color bg-bg-dark/40">
        <div className="flex items-center gap-2 font-mono text-[11px] text-white uppercase tracking-widest">
          <span className="text-primary">{icon}</span>
          {title}
        </div>
        {subtitle && (
          <div className="font-mono text-[10px] text-text-muted/70 uppercase tracking-widest">
            {subtitle}
          </div>
        )}
      </div>
      <div className="p-4">{children}</div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-[12px]">
      <span className="font-mono text-text-muted uppercase tracking-widest text-[10px]">
        {label}
      </span>
      <span className="text-white">{value}</span>
    </div>
  )
}

function relTime(iso: string, now: Date) {
  const d = (now.getTime() - new Date(iso).getTime()) / 1000
  if (d < 60) return `${Math.floor(d)}s`
  if (d < 3600) return `${Math.floor(d / 60)}m`
  if (d < 86400) return `${Math.floor(d / 3600)}h`
  return `${Math.floor(d / 86400)}d`
}
