"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  GitCommit,
  GitPullRequest,
  GitFork,
  Star,
  Radio,
  BookOpen,
  CircleDot,
  Package,
} from "lucide-react"
import RevealText from "./RevealText"

type GHEvent = {
  id: string
  type: string
  created_at: string
  repo?: { name: string }
  payload?: {
    commits?: { sha: string; message: string }[]
    ref?: string
    ref_type?: string
    action?: string
    pull_request?: { title: string; number: number }
    issue?: { title: string; number: number }
    release?: { name?: string; tag_name?: string }
  }
}

type Item = {
  id: string
  kind: string
  title: string
  repo: string
  time: string
  icon: React.ReactNode
  accent: string
}

const iconFor = (type: string): { icon: React.ReactNode; accent: string } => {
  switch (type) {
    case "PushEvent":
      return { icon: <GitCommit className="w-3.5 h-3.5" />, accent: "text-primary" }
    case "PullRequestEvent":
      return { icon: <GitPullRequest className="w-3.5 h-3.5" />, accent: "text-accent" }
    case "ForkEvent":
      return { icon: <GitFork className="w-3.5 h-3.5" />, accent: "text-accent-warm" }
    case "WatchEvent":
      return { icon: <Star className="w-3.5 h-3.5" />, accent: "text-yellow-400" }
    case "IssuesEvent":
      return { icon: <CircleDot className="w-3.5 h-3.5" />, accent: "text-accent" }
    case "CreateEvent":
      return { icon: <Package className="w-3.5 h-3.5" />, accent: "text-primary" }
    case "ReleaseEvent":
      return { icon: <Package className="w-3.5 h-3.5" />, accent: "text-accent-warm" }
    case "PublicEvent":
      return { icon: <BookOpen className="w-3.5 h-3.5" />, accent: "text-primary" }
    default:
      return { icon: <CircleDot className="w-3.5 h-3.5" />, accent: "text-text-muted" }
  }
}

const relTime = (iso: string) => {
  const then = new Date(iso).getTime()
  const diff = (Date.now() - then) / 1000
  if (diff < 60) return `${Math.floor(diff)}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`
  return `${Math.floor(diff / 86400 / 7)}w ago`
}

const titleFor = (e: GHEvent): string => {
  const p = e.payload || {}
  switch (e.type) {
    case "PushEvent":
      return p.commits?.[0]?.message?.split("\n")[0] || `pushed to ${p.ref?.replace("refs/heads/", "")}`
    case "PullRequestEvent":
      return `${p.action} PR #${p.pull_request?.number}: ${p.pull_request?.title}`
    case "ForkEvent":
      return "forked repository"
    case "WatchEvent":
      return "starred this repo"
    case "IssuesEvent":
      return `${p.action} issue #${p.issue?.number}: ${p.issue?.title}`
    case "CreateEvent":
      return `created ${p.ref_type}${p.ref ? ` \`${p.ref}\`` : ""}`
    case "ReleaseEvent":
      return `released ${p.release?.tag_name || p.release?.name}`
    case "PublicEvent":
      return "made repository public"
    default:
      return e.type.replace(/Event$/, "")
  }
}

const SAMPLE: Item[] = [
  {
    id: "f1",
    kind: "PushEvent",
    title: "update training config for phase 2",
    repo: "joemunene-by/GhostLM",
    time: "2h ago",
    icon: <GitCommit className="w-3.5 h-3.5" />,
    accent: "text-primary",
  },
  {
    id: "f2",
    kind: "CreateEvent",
    title: "created branch feat/phase-2-scheduler",
    repo: "joemunene-by/GhostLM",
    time: "6h ago",
    icon: <Package className="w-3.5 h-3.5" />,
    accent: "text-primary",
  },
  {
    id: "f3",
    kind: "PushEvent",
    title: "fix dashboard layout at 2xl",
    repo: "joemunene-by/sentinelpulse",
    time: "1d ago",
    icon: <GitCommit className="w-3.5 h-3.5" />,
    accent: "text-primary",
  },
  {
    id: "f4",
    kind: "PushEvent",
    title: "add rate-limit handling to probe()",
    repo: "joemunene-by/Port-scanner",
    time: "2d ago",
    icon: <GitCommit className="w-3.5 h-3.5" />,
    accent: "text-primary",
  },
  {
    id: "f5",
    kind: "WatchEvent",
    title: "starred this repo",
    repo: "joemunene-by/GhostLM",
    time: "3d ago",
    icon: <Star className="w-3.5 h-3.5" />,
    accent: "text-yellow-400",
  },
]

export default function LiveFeed() {
  const [items, setItems] = useState<Item[]>(SAMPLE)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch("https://api.github.com/users/joemunene-by/events/public?per_page=12", {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: GHEvent[]) => {
        if (!Array.isArray(data) || data.length === 0) return
        const mapped: Item[] = data.slice(0, 10).map((e) => {
          const { icon, accent } = iconFor(e.type)
          return {
            id: e.id,
            kind: e.type,
            title: titleFor(e),
            repo: e.repo?.name || "unknown",
            time: relTime(e.created_at),
            icon,
            accent,
          }
        })
        setItems(mapped)
        setLive(true)
      })
      .catch(() => {
        /* keep sample */
      })
    return () => controller.abort()
  }, [])

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-primary text-sm mb-2 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5" />
              / Activity
            </p>
            <RevealText
              as="h2"
              text="Live from GitHub"
              className="text-3xl sm:text-4xl font-bold text-white"
            />
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span
              className={`w-2 h-2 rounded-full ${
                live ? "bg-green-400" : "bg-yellow-400"
              } animate-pulse`}
            />
            <span className="text-text-muted uppercase tracking-widest">
              {live ? "LIVE" : "CACHED"}
            </span>
          </div>
        </div>

        <div className="relative rounded-2xl border border-border-color bg-bg-card/40 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-bg-card/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-bg-card/80 to-transparent pointer-events-none z-10" />

          <div className="max-h-80 overflow-y-auto p-2 divide-y divide-border-color/50">
            <AnimatePresence initial={false}>
              {items.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`https://github.com/${item.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors group rounded-lg"
                  data-cursor="hover"
                >
                  <span
                    className={`mt-0.5 shrink-0 p-1.5 rounded-md bg-bg-dark/60 border border-border-color ${item.accent}`}
                  >
                    {item.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 justify-between">
                      <span className="font-mono text-[11px] text-text-muted/80 uppercase tracking-widest">
                        {item.kind.replace(/Event$/, "").toLowerCase()}
                      </span>
                      <span className="font-mono text-[10px] text-text-muted/60 tabular-nums shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <div className="text-white text-sm group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </div>
                    <div className="font-mono text-[11px] text-text-muted/70 truncate">
                      {item.repo}
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
