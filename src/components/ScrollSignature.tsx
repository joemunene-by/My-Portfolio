"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// A loose script-style signature path for "Joe Munene" — stylized, not literal.
// Approximate total path length is used for draw animation.
const PATH =
  "M40 160 C70 30, 130 30, 150 160 M120 160 L160 90 M190 110 C170 170 240 170 220 110 C200 60 170 60 190 110 M260 100 L260 160 M260 120 C280 90 300 90 310 120 M330 160 L330 90 Q340 70 360 110 L360 160 M390 110 C370 170 440 170 420 110 C400 60 370 60 390 110 M470 40 L470 160 M470 100 C490 80 520 100 510 130 C500 160 470 160 470 140 M560 90 L530 160 M530 90 L560 160 M580 160 L580 90 Q595 70 615 115 L615 160 M640 110 C620 170 690 170 670 110 C650 60 620 60 640 110 M730 95 C700 95 690 135 730 135 C770 135 770 95 730 95 M770 160 L770 90 Q785 70 805 115 L805 160 M830 110 C810 170 880 170 860 110 C840 60 810 60 830 110 M900 95 C870 95 860 135 900 135 C940 135 940 95 900 95"

const LENGTH = 2400

export default function ScrollSignature() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Between 10% and 80% of the section's scroll travel, draw the path
  const dashOffset = useTransform(
    scrollYProgress,
    [0.1, 0.8],
    [LENGTH, 0],
  )
  const labelOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1])
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], [1, 2])

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 font-mono text-[11px] text-text-muted uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            signature — draws as you scroll
          </span>
          <span>joe ✦ munene</span>
        </div>

        <svg
          viewBox="0 0 940 220"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient id="sig-stroke" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgb(var(--primary))" />
              <stop offset="55%" stopColor="rgb(var(--accent))" />
              <stop offset="100%" stopColor="rgb(var(--accent-warm))" />
            </linearGradient>
          </defs>

          <motion.path
            d={PATH}
            fill="none"
            stroke="url(#sig-stroke)"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: LENGTH,
              strokeDashoffset: dashOffset,
              strokeWidth: lineWidth,
              filter: "drop-shadow(0 0 12px rgb(var(--primary) / 0.35))",
            }}
          />
        </svg>

        <motion.div
          style={{ opacity: labelOpacity }}
          className="mt-6 flex items-center justify-between font-mono text-xs text-text-muted"
        >
          <span>— signed in pixels</span>
          <span className="text-white">Joe Munene / 2026</span>
        </motion.div>
      </div>
    </section>
  )
}
