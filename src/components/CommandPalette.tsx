"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Search, Command, CornerDownLeft, Github, Mail, FileText, ArrowRight, Trophy, Activity } from "lucide-react"

type Item = {
  id: string
  label: string
  hint?: string
  href?: string
  external?: boolean
  group: "Navigate" | "External" | "Actions" | "Dev"
  icon?: React.ReactNode
  run?: () => void
}

const items: Item[] = [
  { id: "home", label: "Home", href: "#home", group: "Navigate", icon: <ArrowRight className="w-4 h-4" /> },
  { id: "about", label: "About Me", href: "#about", group: "Navigate", icon: <ArrowRight className="w-4 h-4" /> },
  { id: "experience", label: "Experience", href: "#experience", group: "Navigate", icon: <ArrowRight className="w-4 h-4" /> },
  { id: "projects", label: "Projects", href: "#projects", group: "Navigate", icon: <ArrowRight className="w-4 h-4" /> },
  { id: "blog", label: "Blog", href: "#blog", group: "Navigate", icon: <ArrowRight className="w-4 h-4" /> },
  { id: "contact", label: "Contact", href: "#contact", group: "Navigate", icon: <ArrowRight className="w-4 h-4" /> },
  { id: "resume", label: "View Resume", href: "/resume", group: "Actions", icon: <FileText className="w-4 h-4" /> },
  { id: "email", label: "Send Email", hint: "joemunene984@gmail.com", href: "mailto:joemunene984@gmail.com", external: true, group: "Actions", icon: <Mail className="w-4 h-4" /> },
  { id: "github", label: "GitHub Profile", hint: "joemunene-by", href: "https://github.com/joemunene-by", external: true, group: "External", icon: <Github className="w-4 h-4" /> },
  {
    id: "trophies",
    label: "Trophy Room",
    hint: "achievements",
    group: "Dev",
    icon: <Trophy className="w-4 h-4" />,
    run: () => window.dispatchEvent(new CustomEvent("trophy:toggle")),
  },
  {
    id: "perf",
    label: "Performance Monitor",
    hint: "⌘⇧P",
    group: "Dev",
    icon: <Activity className="w-4 h-4" />,
    run: () => {
      const ev = new KeyboardEvent("keydown", {
        key: "p",
        ctrlKey: true,
        shiftKey: true,
        bubbles: true,
      })
      window.dispatchEvent(ev)
    },
  },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery("")
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        it.hint?.toLowerCase().includes(q) ||
        it.group.toLowerCase().includes(q),
    )
  }, [query])

  const groups = useMemo(() => {
    const map = new Map<string, Item[]>()
    filtered.forEach((it) => {
      const arr = map.get(it.group) ?? []
      arr.push(it)
      map.set(it.group, arr)
    })
    return Array.from(map.entries())
  }, [filtered])

  const flatIds = filtered.map((i) => i.id)

  const run = (it: Item) => {
    setOpen(false)
    if (it.run) {
      it.run()
      return
    }
    if (!it.href) return
    if (it.external) {
      window.open(it.href, "_blank", "noopener,noreferrer")
    } else if (it.href.startsWith("#")) {
      document.querySelector(it.href)?.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = it.href
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(flatIds.length - 1, a + 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(0, a - 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const it = filtered[active]
      if (it) run(it)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9990] flex items-start justify-center pt-[18vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-bg-dark/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="relative w-full max-w-xl bg-bg-card/90 backdrop-blur-2xl border border-border-color rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden"
            initial={{ y: -16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-border-color px-4 py-3">
              <Search className="w-4 h-4 text-text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onKeyDown}
                placeholder="Search sections, actions, links..."
                className="flex-1 bg-transparent font-mono text-sm text-white placeholder:text-text-muted outline-none"
              />
              <kbd className="font-mono text-[10px] text-text-muted px-1.5 py-0.5 rounded border border-border-color">
                ESC
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto py-2">
              {groups.length === 0 && (
                <div className="px-4 py-8 text-center text-text-muted font-mono text-sm">
                  No results
                </div>
              )}
              {groups.map(([group, list]) => (
                <div key={group}>
                  <div className="px-4 pt-3 pb-1 font-mono text-[10px] uppercase tracking-widest text-text-muted/70">
                    {group}
                  </div>
                  {list.map((it) => {
                    const idx = flatIds.indexOf(it.id)
                    const isActive = idx === active
                    return (
                      <button
                        key={it.id}
                        onMouseEnter={() => setActive(idx)}
                        onClick={() => run(it)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          isActive ? "bg-primary/10 text-white" : "text-text-muted"
                        }`}
                      >
                        <span className={isActive ? "text-primary" : "text-text-muted"}>
                          {it.icon}
                        </span>
                        <span className="flex-1 font-mono text-sm">{it.label}</span>
                        {it.hint && (
                          <span className="font-mono text-xs text-text-muted/70">
                            {it.hint}
                          </span>
                        )}
                        {isActive && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-primary" />
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-border-color px-4 py-2 font-mono text-[10px] text-text-muted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 rounded border border-border-color">↑</kbd>
                  <kbd className="px-1 rounded border border-border-color">↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 rounded border border-border-color">↵</kbd>
                  select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3" />K to toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
