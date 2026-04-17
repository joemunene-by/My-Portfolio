"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Axis {
  label: string
  value: number
}

interface Props {
  axes: Axis[]
  size?: number
}

export default function SkillsRadar({ axes, size = 340 }: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.38
  const n = axes.length

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2

  const pointFor = (i: number, value: number) => {
    const a = angle(i)
    const r = radius * value
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
  }

  const rings = [0.25, 0.5, 0.75, 1]

  const polygon = axes
    .map((ax, i) => {
      const p = pointFor(i, ax.value)
      return `${p.x},${p.y}`
    })
    .join(" ")

  return (
    <div className="flex justify-center">
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Grid rings */}
        {rings.map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius * r}
            fill="none"
            stroke="rgb(var(--primary) / 0.08)"
            strokeWidth={1}
          />
        ))}

        {/* Spokes */}
        {axes.map((_, i) => {
          const p = pointFor(i, 1)
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="rgb(var(--primary) / 0.12)"
              strokeWidth={1}
            />
          )
        })}

        {/* Data polygon */}
        <motion.polygon
          points={polygon}
          fill="rgb(var(--primary) / 0.15)"
          stroke="rgb(var(--primary))"
          strokeWidth={1.5}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
        />

        {/* Value dots */}
        {axes.map((ax, i) => {
          const p = pointFor(i, ax.value)
          return (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill="rgb(var(--primary))"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
            />
          )
        })}

        {/* Axis labels */}
        {axes.map((ax, i) => {
          const a = angle(i)
          const offset = radius * 1.16
          const x = cx + Math.cos(a) * offset
          const y = cy + Math.sin(a) * offset
          const anchor =
            Math.abs(Math.cos(a)) < 0.3
              ? "middle"
              : Math.cos(a) > 0
                ? "start"
                : "end"
          return (
            <motion.text
              key={i}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="font-mono fill-white"
              style={{ fontSize: 11, letterSpacing: 1 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.9 + i * 0.06, duration: 0.4 }}
            >
              {ax.label.toUpperCase()}
              <tspan
                x={x}
                dy={14}
                className="fill-text-muted"
                style={{ fontSize: 10 }}
              >
                {Math.round(ax.value * 100)}%
              </tspan>
            </motion.text>
          )
        })}
      </svg>
    </div>
  )
}
