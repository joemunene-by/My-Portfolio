"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Keyboard, X } from "lucide-react"

type Row = { keys: string[]; label: string }
type Group = { title: string; rows: Row[] }

const groups: Group[] = [
  {
    title: "Navigation",
    rows: [
      { keys: ["⌘", "K"], label: "Open command palette" },
      { keys: ["Ctrl", "`"], label: "Toggle terminal" },
      { keys: ["?"], label: "Show this cheatsheet" },
      { keys: ["Esc"], label: "Close overlay / modal" },
    ],
  },
  {
    title: "Command Palette",
    rows: [
      { keys: ["↑"], label: "Previous item" },
      { keys: ["↓"], label: "Next item" },
      { keys: ["↵"], label: "Activate" },
    ],
  },
  {
    title: "Terminal",
    rows: [
      { keys: ["↑"], label: "Previous command" },
      { keys: ["↓"], label: "Next command" },
      { keys: ["Tab"], label: "Autocomplete" },
      { keys: ["help"], label: "List all commands" },
    ],
  },
  {
    title: "Power Tools",
    rows: [
      { keys: ["⌘", "Shift", "T"], label: "Trophy room" },
      { keys: ["⌘", "Shift", "P"], label: "Perf monitor" },
    ],
  },
  {
    title: "Secrets",
    rows: [
      { keys: ["↑↑↓↓←→←→", "B", "A"], label: "Something fun" },
    ],
  },
]

export default function ShortcutCheatsheet() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9991] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-bg-dark/75 backdrop-blur-md"
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
                <Keyboard className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-white">Keyboard Shortcuts</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 grid sm:grid-cols-2 gap-5">
              {groups.map((g) => (
                <div key={g.title}>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted/80 mb-2">
                    {g.title}
                  </div>
                  <div className="space-y-2">
                    {g.rows.map((r, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="text-text-muted">{r.label}</span>
                        <span className="flex items-center gap-1">
                          {r.keys.map((k, j) => (
                            <kbd
                              key={j}
                              className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border-color text-white bg-bg-dark/60 whitespace-nowrap"
                            >
                              {k}
                            </kbd>
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border-color px-5 py-3 font-mono text-[11px] text-text-muted flex items-center justify-between">
              <span>press{" "}
                <kbd className="px-1.5 py-0.5 rounded border border-border-color">?</kbd>{" "}
                anytime to toggle
              </span>
              <span>ghost/portfolio</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
