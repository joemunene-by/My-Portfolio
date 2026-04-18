"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type Ripple = { id: number; x: number; y: number; color: string }

export default function ThemeRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const counter = useRef(0)

  useEffect(() => {
    const onTheme = (e: Event) => {
      const detail = (e as CustomEvent<{ x?: number; y?: number; color?: string }>).detail || {}
      const x = detail.x ?? window.innerWidth / 2
      const y = detail.y ?? window.innerHeight / 2
      const color =
        detail.color ||
        getComputedStyle(document.documentElement)
          .getPropertyValue("--primary")
          .trim() ||
        "108 156 255"
      const id = ++counter.current
      setRipples((rs) => [...rs, { id, x, y, color }])
      setTimeout(() => {
        setRipples((rs) => rs.filter((r) => r.id !== id))
      }, 900)
    }
    window.addEventListener("theme:ripple", onTheme)
    return () => window.removeEventListener("theme:ripple", onTheme)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden">
      <AnimatePresence>
        {ripples.map((r) => {
          const maxR = Math.hypot(window.innerWidth, window.innerHeight) * 1.1
          const rgb = r.color.replace(/ /g, ", ")
          return (
            <motion.span
              key={r.id}
              initial={{
                width: 0,
                height: 0,
                opacity: 0.55,
                x: r.x,
                y: r.y,
              }}
              animate={{
                width: maxR * 2,
                height: maxR * 2,
                opacity: 0,
                x: r.x - maxR,
                y: r.y - maxR,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(${rgb}, 0.55) 0%, rgba(${rgb}, 0.25) 40%, rgba(${rgb}, 0) 70%)`,
                mixBlendMode: "screen",
              }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
