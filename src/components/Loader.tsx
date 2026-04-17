"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const COUNT_DURATION = 1400

export default function Loader() {
  const [loading, setLoading] = useState(true)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / COUNT_DURATION)
      setPct(Math.floor(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setLoading(false), 450)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (loading) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [loading])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={false}
          exit={{ opacity: 1 }}
          transition={{ duration: 0 }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-bg-dark border-b border-border-color"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-bg-dark border-t border-border-color"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <motion.div
              className="font-mono text-[10vw] sm:text-[6vw] font-bold text-white tracking-tighter leading-none"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              JOE <span className="text-primary">/</span> MUNENE
            </motion.div>

            <div className="w-[60vw] max-w-md h-px bg-border-color overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                style={{ width: `${pct}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            <div className="flex items-center justify-between w-[60vw] max-w-md font-mono text-xs text-text-muted">
              <span>LOADING</span>
              <span className="tabular-nums">{pct.toString().padStart(3, "0")}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
