"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicked, setClicked] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 180, mass: 0.4 })
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 180, mass: 0.4 })

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    setEnabled(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      const el = e.target as HTMLElement | null
      const interactive =
        !!el &&
        !!el.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
        )
      setHovering(interactive)
    }
    const down = () => setClicked(true)
    const up = () => setClicked(false)

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    document.documentElement.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
      document.documentElement.style.cursor = ""
    }
  }, [enabled, cursorX, cursorY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: clicked ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 1.8 : clicked ? 0.8 : 1,
          opacity: hovering ? 0.9 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  )
}
