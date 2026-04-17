"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function CommandHint() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("cmdk-hint-dismissed")
    if (stored) return
    const show = setTimeout(() => setVisible(true), 2500)
    const hide = setTimeout(() => setVisible(false), 12000)
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        setVisible(false)
        setDismissed(true)
        localStorage.setItem("cmdk-hint-dismissed", "1")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    setDismissed(true)
    localStorage.setItem("cmdk-hint-dismissed", "1")
  }

  if (dismissed) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed bottom-5 left-5 z-[40] hidden md:flex items-center gap-3 bg-bg-card/80 backdrop-blur-xl border border-border-color rounded-xl px-4 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
          data-cursor="hover"
        >
          <span className="font-mono text-xs text-text-muted">Press</span>
          <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded border border-border-color text-white">
            ⌘
          </kbd>
          <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded border border-border-color text-white">
            K
          </kbd>
          <span className="font-mono text-xs text-text-muted">to search</span>
          <button
            onClick={dismiss}
            aria-label="dismiss"
            className="ml-2 text-text-muted/60 hover:text-white transition-colors font-mono text-xs"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
