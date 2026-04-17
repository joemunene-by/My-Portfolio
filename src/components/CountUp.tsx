"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface Props {
  end: number | string
  /**
   * Duration in seconds (legacy) or milliseconds — values >= 50 are
   * treated as milliseconds.
   */
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  /** Optional custom formatter for the animated value. */
  display?: (value: number) => string
}

export default function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  display,
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  const numericEnd =
    typeof end === "string" ? parseInt(end.replace(/[^0-9]/g, "")) : end

  useEffect(() => {
    if (!isInView || !numericEnd) return

    const durationSec = duration >= 50 ? duration / 1000 : duration
    let start = 0
    const step = Math.max(1, Math.ceil(numericEnd / (durationSec * 60)))
    const timer = setInterval(() => {
      start += step
      if (start >= numericEnd) {
        setCount(numericEnd)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [isInView, numericEnd, duration])

  const formatted = display
    ? display(count)
    : typeof end === "string" && end.includes("K")
      ? `${Math.round(count / 1000)}K+`
      : count.toLocaleString()

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
