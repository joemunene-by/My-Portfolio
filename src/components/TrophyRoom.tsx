"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Trophy,
  X,
  Lock,
  Palette,
  Terminal,
  Network,
  Keyboard,
  Sparkles,
  Bot,
  Check,
} from "lucide-react"

type Entry = {
  id: string
  title: string
  description: string
  hint: string
  icon: React.ReactNode
}

const ENTRIES: Entry[] = [
  {
    id: "palette",
    title: "Color Theorist",
    description: "Changed the accent theme",
    hint: "Look for the palette button",
    icon: <Palette className="w-4 h-4" />,
  },
  {
    id: "terminal",
    title: "Script Kiddie",
    description: "Opened the terminal",
    hint: "Ctrl + `",
    icon: <Terminal className="w-4 h-4" />,
  },
  {
    id: "cmdk",
    title: "Power User",
    description: "Opened the command palette",
    hint: "⌘ + K",
    icon: <Keyboard className="w-4 h-4" />,
  },
  {
    id: "constellation",
    title: "Star Navigator",
    description: "Explored the project constellation",
    hint: "Scroll past the Projects section",
    icon: <Network className="w-4 h-4" />,
  },
  {
    id: "konami",
    title: "Secret Agent",
    description: "Found the Konami code",
    hint: "Old-school cheat code",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: "cheatsheet",
    title: "RTFM",
    description: "Opened the shortcut cheatsheet",
    hint: "Press ?",
    icon: <Keyboard className="w-4 h-4" />,
  },
  {
    id: "chat",
    title: "Conversationalist",
    description: "Talked to Ghost",
    hint: "Bottom-left chat bubble",
    icon: <Bot className="w-4 h-4" />,
  },
]

const STORAGE_KEY = "portfolio-achievements"

export default function TrophyRoom() {
  const [open, setOpen] = useState(false)
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())

  const refresh = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
      setUnlocked(new Set(saved))
    } catch {
      setUnlocked(new Set())
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    const onToggle = () => {
      refresh()
      setOpen((v) => !v)
    }
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return
      if (e.key.toLowerCase() === "t" && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault()
        refresh()
        setOpen((v) => !v)
      } else if (e.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("trophy:toggle", onToggle)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("trophy:toggle", onToggle)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUnlocked(new Set())
  }

  const totalPct = Math.round((unlocked.size / ENTRIES.length) * 100)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9990] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-bg-dark/80 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="relative w-full max-w-2xl bg-bg-card/90 backdrop-blur-2xl border border-border-color rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-color">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-white">Trophy Room</span>
                <span className="font-mono text-[10px] text-text-muted/80 uppercase tracking-widest ml-2">
                  {unlocked.size} / {ENTRIES.length} · {totalPct}%
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress */}
            <div className="px-5 pt-4">
              <div className="h-1.5 rounded-full bg-bg-dark/80 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-accent to-accent-warm"
                  initial={{ width: 0 }}
                  animate={{ width: `${totalPct}%` }}
                  transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                />
              </div>
            </div>

            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ENTRIES.map((e, i) => {
                const isUnlocked = unlocked.has(e.id)
                return (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className={`relative p-3 rounded-xl border transition-colors ${
                      isUnlocked
                        ? "border-primary/40 bg-primary/5"
                        : "border-border-color bg-bg-dark/40"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${
                        isUnlocked
                          ? "bg-primary/15 text-primary border border-primary/30"
                          : "bg-bg-dark/60 text-text-muted/50 border border-border-color"
                      }`}
                    >
                      {isUnlocked ? e.icon : <Lock className="w-4 h-4" />}
                    </div>
                    <div
                      className={`font-bold text-sm mb-0.5 ${
                        isUnlocked ? "text-white" : "text-text-muted/80"
                      }`}
                    >
                      {isUnlocked ? e.title : "???"}
                    </div>
                    <div className="text-[11px] text-text-muted/70 leading-snug">
                      {isUnlocked ? e.description : e.hint}
                    </div>
                    {isUnlocked && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-bg-dark" />
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </div>

            <div className="flex items-center justify-between border-t border-border-color px-5 py-3 font-mono text-[11px] text-text-muted">
              <span className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded border border-border-color">⌘</kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-border-color">Shift</kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-border-color">T</kbd>
                toggle
              </span>
              <button
                onClick={reset}
                className="text-text-muted/60 hover:text-red-400 transition-colors"
              >
                reset progress
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
