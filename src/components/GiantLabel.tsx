"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface Props {
  text: string
  align?: "left" | "right"
  className?: string
}

export default function GiantLabel({ text, align = "left", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    align === "left" ? ["-10%", "10%"] : ["10%", "-10%"],
  )
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        style={{ x, opacity }}
        className={`absolute top-1/2 -translate-y-1/2 font-bold font-sans text-[18vw] leading-none tracking-tighter whitespace-nowrap select-none ${
          align === "left" ? "left-0" : "right-0"
        }`}
      >
        <span
          className="text-transparent"
          style={{
            WebkitTextStroke: "1px rgba(108,156,255,0.08)",
          }}
        >
          {text}
        </span>
      </motion.div>
    </div>
  )
}
