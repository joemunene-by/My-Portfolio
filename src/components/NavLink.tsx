"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Props {
  href: string
  children: ReactNode
  className?: string
  index?: number
}

export default function NavLink({ href, children, className = "", index }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist > 80) {
      x.set(0)
      y.set(0)
      return
    }
    x.set(dx * 0.25)
    y.set(dy * 0.25)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      data-cursor="hover"
      className={`group relative font-mono text-sm text-text-muted hover:text-primary transition-colors duration-200 ${className}`}
    >
      {typeof index === "number" && (
        <span className="text-primary">0{index + 1}.</span>
      )}{" "}
      <span className="relative inline-block overflow-hidden align-bottom">
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute left-0 top-full inline-block text-primary transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
      </span>
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </motion.a>
  )
}
