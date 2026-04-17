"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Props {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  as?: "div" | "span"
}

export default function MagneticLink({
  children,
  className = "",
  strength = 0.35,
  radius = 120,
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.3 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist > radius) {
      x.set(0)
      y.set(0)
      return
    }
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const MotionTag = as === "span" ? motion.span : motion.div

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement & HTMLSpanElement>}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: as === "span" ? "inline-block" : undefined }}
      className={className}
      data-cursor="hover"
    >
      {children}
    </MotionTag>
  )
}
