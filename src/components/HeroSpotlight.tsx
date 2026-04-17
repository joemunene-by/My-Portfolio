"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.5 })

  const bg = useTransform([sx, sy] as never, ([x, y]: number[]) =>
    `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, rgba(108,156,255,0.12), transparent 55%)`,
  )

  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mx.set((e.clientX - rect.left) / rect.width)
      my.set((e.clientY - rect.top) / rect.height)
    }
    el.addEventListener("mousemove", move)
    return () => el.removeEventListener("mousemove", move)
  }, [mx, my])

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{ background: bg }}
    />
  )
}
