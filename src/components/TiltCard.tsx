"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Props {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}

export default function TiltCard({
  children,
  className = "",
  max = 8,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 200, damping: 20 })
  const sy = useSpring(my, { stiffness: 200, damping: 20 })

  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"])
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY] as never,
              ([x, y]: string[]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(108,156,255,0.18), transparent 55%)`,
            ),
          }}
        />
      )}
    </motion.div>
  )
}
