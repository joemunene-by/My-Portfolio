"use client"

import { useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"

interface Props {
  text: string
  className?: string
  wordClassName?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  delay?: number
  stagger?: number
  once?: boolean
}

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
}

export default function RevealText({
  text,
  className = "",
  wordClassName = "",
  as = "h2",
  delay = 0,
  stagger = 0.05,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: "-80px" })
  const words = text.split(" ")

  const Tag = motion[as] as typeof motion.div

  return (
    <Tag
      ref={ref}
      variants={container(delay, stagger)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.25em" }}
        >
          <motion.span
            variants={word}
            className={`inline-block ${wordClassName}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
