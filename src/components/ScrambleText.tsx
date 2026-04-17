"use client"

import { useEffect, useRef, useState } from "react"

const CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

interface Props {
  text: string
  className?: string
  as?: "span" | "h1" | "h2" | "h3" | "div"
  duration?: number
  scrambleOnHover?: boolean
  delay?: number
}

export default function ScrambleText({
  text,
  className = "",
  as = "span",
  duration = 1400,
  scrambleOnHover = true,
  delay = 200,
}: Props) {
  const [output, setOutput] = useState(text)
  const rafRef = useRef<number>(0)
  const startedRef = useRef(false)

  const scramble = (finalText: string, ms: number) => {
    cancelAnimationFrame(rafRef.current)
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms)
      let out = ""
      for (let i = 0; i < finalText.length; i++) {
        const ch = finalText[i]
        if (ch === " ") {
          out += " "
          continue
        }
        const revealAt = (i / finalText.length) * 0.8
        if (p > revealAt) {
          out += ch
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setOutput(out)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else setOutput(finalText)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    const id = setTimeout(() => scramble(text, duration), delay)
    return () => {
      clearTimeout(id)
      cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onEnter = () => {
    if (scrambleOnHover) scramble(text, 600)
  }

  const Tag = as as keyof React.JSX.IntrinsicElements

  return (
    <Tag
      className={className}
      onMouseEnter={onEnter}
      data-cursor="hover"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {output}
    </Tag>
  )
}
