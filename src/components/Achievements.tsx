"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Trophy, Palette, Terminal, Network, Keyboard, Sparkles, Check } from "lucide-react"

type Achievement = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "palette", title: "Color Theorist", description: "Changed the accent theme", icon: <Palette className="w-4 h-4" /> },
  { id: "terminal", title: "Script Kiddie", description: "Opened the terminal", icon: <Terminal className="w-4 h-4" /> },
  { id: "cmdk", title: "Power User", description: "Opened the command palette", icon: <Keyboard className="w-4 h-4" /> },
  { id: "constellation", title: "Star Navigator", description: "Explored the project constellation", icon: <Network className="w-4 h-4" /> },
  { id: "konami", title: "Secret Agent", description: "Found the Konami code", icon: <Sparkles className="w-4 h-4" /> },
  { id: "cheatsheet", title: "RTFM", description: "Opened the shortcut cheatsheet", icon: <Keyboard className="w-4 h-4" /> },
  { id: "chat", title: "Conversationalist", description: "Talked to Ghost", icon: <Trophy className="w-4 h-4" /> },
]

const STORAGE_KEY = "portfolio-achievements"

export default function Achievements() {
  const [queue, setQueue] = useState<Achievement[]>([])
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
      setUnlocked(new Set(saved))
    } catch {}
  }, [])

  const unlock = useCallback(
    (id: string) => {
      const achievement = ACHIEVEMENTS.find((a) => a.id === id)
      if (!achievement) return
      setUnlocked((prev) => {
        if (prev.has(id)) return prev
        const next = new Set(prev)
        next.add(id)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)))
        } catch {}
        setQueue((q) => [...q, achievement])
        return next
      })
    },
    [],
  )

  useEffect(() => {
    const handlers: [string, (ev: Event) => void][] = [
      ["achievement", (ev) => {
        const id = (ev as CustomEvent<string>).detail
        if (typeof id === "string") unlock(id)
      }],
    ]
    handlers.forEach(([e, h]) => window.addEventListener(e, h))

    // Infer unlocks from existing signals
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") unlock("cmdk")
      if ((e.ctrlKey || e.metaKey) && e.key === "`") unlock("terminal")
      if (e.key === "?" || (e.shiftKey && e.key === "/")) unlock("cheatsheet")
    }
    window.addEventListener("keydown", onKey)

    return () => {
      handlers.forEach(([e, h]) => window.removeEventListener(e, h))
      window.removeEventListener("keydown", onKey)
    }
  }, [unlock])

  // Pop toasts one at a time
  useEffect(() => {
    if (queue.length === 0) return
    const t = setTimeout(() => {
      setQueue((q) => q.slice(1))
    }, 3200)
    return () => clearTimeout(t)
  }, [queue])

  const current = queue[0]
  const totalPct = Math.round((unlocked.size / ACHIEVEMENTS.length) * 100)

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] min-w-[320px] max-w-[90vw]"
        >
          <div className="relative bg-bg-card/90 backdrop-blur-2xl border border-primary/40 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="flex items-center gap-3 p-4">
              <div className="relative w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                {current.icon}
                <motion.span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 350 }}
                >
                  <Check className="w-2.5 h-2.5 text-bg-dark" />
                </motion.span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  Achievement Unlocked
                </div>
                <div className="font-bold text-white text-sm truncate">
                  {current.title}
                </div>
                <div className="text-text-muted text-xs truncate">
                  {current.description}
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                  Progress
                </div>
                <div className="font-bold text-white text-sm tabular-nums">
                  {totalPct}%
                </div>
              </div>
            </div>
            <motion.div
              className="h-0.5 bg-primary origin-left"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3.2, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
