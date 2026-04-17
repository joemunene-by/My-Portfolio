"use client"

import { motion } from "framer-motion"

interface Props {
  items: string[]
  speed?: number
  className?: string
}

export default function Marquee({ items, speed = 40, className = "" }: Props) {
  const loop = [...items, ...items, ...items]

  return (
    <div
      className={`relative overflow-hidden border-y border-border-color bg-bg-card/30 backdrop-blur-sm py-5 ${className}`}
      aria-hidden
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap font-mono text-sm sm:text-base text-text-muted"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="uppercase tracking-[0.2em]">{item}</span>
            <span className="text-primary text-xl leading-none">●</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
