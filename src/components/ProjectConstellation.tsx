"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { projects } from "@/data"
import RevealText from "./RevealText"

type Node = {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  r: number
  name: string
  language?: string
  featured: boolean
  topics: string[]
}

type Edge = { a: number; b: number; weight: number }

const W = 900
const H = 520

function buildGraph(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = projects.map((p, i) => {
    const angle = (i / projects.length) * Math.PI * 2
    return {
      id: p.name,
      x: W / 2 + Math.cos(angle) * 200,
      y: H / 2 + Math.sin(angle) * 160,
      vx: 0,
      vy: 0,
      r: p.featured ? 10 : 6,
      name: p.name,
      language: p.language !== "N/A" ? p.language : undefined,
      featured: !!p.featured,
      topics: p.topics,
    }
  })

  const edges: Edge[] = []
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const shared = projects[i].topics.filter((t) => projects[j].topics.includes(t))
      const sameLang =
        projects[i].language &&
        projects[i].language === projects[j].language &&
        projects[i].language !== "N/A"
      const weight = shared.length + (sameLang ? 1 : 0)
      if (weight > 0) edges.push({ a: i, b: j, weight })
    }
  }
  return { nodes, edges }
}

function simulate(nodes: Node[], edges: Edge[], iters = 400) {
  const centerX = W / 2
  const centerY = H / 2

  for (let step = 0; step < iters; step++) {
    const alpha = 1 - step / iters

    // Repulsion between all nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]
        const b = nodes[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist2 = dx * dx + dy * dy + 0.01
        const force = 3200 / dist2
        const fx = (dx / Math.sqrt(dist2)) * force
        const fy = (dy / Math.sqrt(dist2)) * force
        a.vx += fx
        a.vy += fy
        b.vx -= fx
        b.vy -= fy
      }
    }

    // Spring along edges
    for (const e of edges) {
      const a = nodes[e.a]
      const b = nodes[e.b]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.01
      const target = 120 - Math.min(60, e.weight * 15)
      const f = (dist - target) * 0.02 * e.weight
      const fx = (dx / dist) * f
      const fy = (dy / dist) * f
      a.vx += fx
      a.vy += fy
      b.vx -= fx
      b.vy -= fy
    }

    // Centering + damping
    for (const n of nodes) {
      n.vx += (centerX - n.x) * 0.004
      n.vy += (centerY - n.y) * 0.004
      n.vx *= 0.7
      n.vy *= 0.7
      n.x += n.vx * alpha
      n.y += n.vy * alpha
      n.x = Math.max(40, Math.min(W - 40, n.x))
      n.y = Math.max(40, Math.min(H - 40, n.y))
    }
  }
  return nodes
}

export default function ProjectConstellation() {
  const [hovered, setHovered] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const graph = useMemo(() => {
    const g = buildGraph()
    simulate(g.nodes, g.edges)
    return g
  }, [])

  const hoveredNode = graph.nodes.find((n) => n.id === hovered)
  const connectedTo = useMemo(() => {
    if (!hoveredNode) return new Set<string>()
    const idx = graph.nodes.findIndex((n) => n.id === hoveredNode.id)
    const set = new Set<string>()
    for (const e of graph.edges) {
      if (e.a === idx) set.add(graph.nodes[e.b].id)
      if (e.b === idx) set.add(graph.nodes[e.a].id)
    }
    return set
  }, [hoveredNode, graph])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHovered(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (!svgRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.dispatchEvent(
            new CustomEvent("achievement", { detail: "constellation" }),
          )
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(svgRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <section id="constellation" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="font-mono text-primary text-sm mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            / Project Graph
          </p>
          <RevealText
            as="h2"
            text="The Constellation"
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          />
          <p className="text-text-muted max-w-2xl">
            Every repo, plotted. Lines connect projects that share topics or a
            primary language — a live map of how the work relates. Hover a
            node to trace its neighbors; click to open.
          </p>
        </div>

        <div className="relative rounded-2xl border border-border-color bg-bg-card/30 backdrop-blur-sm overflow-hidden">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto block"
            onMouseLeave={() => setHovered(null)}
          >
            {/* Edges */}
            <g>
              {graph.edges.map((e, i) => {
                const a = graph.nodes[e.a]
                const b = graph.nodes[e.b]
                const active =
                  hovered && (a.id === hovered || b.id === hovered)
                const dim = hovered && !active
                return (
                  <motion.line
                    key={i}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="rgb(var(--primary))"
                    strokeOpacity={active ? 0.6 : dim ? 0.04 : 0.12}
                    strokeWidth={active ? 1.2 : 0.6}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.004 }}
                  />
                )
              })}
            </g>

            {/* Nodes */}
            <g>
              {graph.nodes.map((n, i) => {
                const active = n.id === hovered
                const related = connectedTo.has(n.id)
                const dim = hovered && !active && !related
                return (
                  <motion.g
                    key={n.id}
                    onMouseEnter={() => setHovered(n.id)}
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent("project:open", { detail: n.name }),
                      )
                    }
                    style={{ cursor: "pointer" }}
                    data-cursor="hover"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + i * 0.02,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                  >
                    {n.featured && (
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={n.r + 8}
                        fill="rgb(var(--primary))"
                        opacity={active ? 0.18 : 0.08}
                      />
                    )}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.r}
                      fill={
                        n.featured
                          ? "rgb(var(--primary))"
                          : "rgb(var(--accent) / 0.8)"
                      }
                      stroke="rgb(255 255 255 / 0.3)"
                      strokeWidth={1}
                      opacity={dim ? 0.25 : 1}
                    />
                    <text
                      x={n.x}
                      y={n.y - n.r - 8}
                      textAnchor="middle"
                      fill="white"
                      fontSize={active || related ? 11 : 9}
                      opacity={dim ? 0.2 : active ? 1 : 0.75}
                      className="font-mono pointer-events-none select-none"
                    >
                      {n.name.length > 22 ? n.name.slice(0, 20) + "…" : n.name}
                    </text>
                  </motion.g>
                )
              })}
            </g>
          </svg>

          {/* Hover detail panel */}
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-4 bottom-4 max-w-xs bg-bg-dark/90 backdrop-blur-xl border border-border-color rounded-xl p-4"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
                {hoveredNode.featured ? "Featured" : "Repo"}
              </div>
              <div className="font-bold text-white mb-1">{hoveredNode.name}</div>
              {hoveredNode.language && (
                <div className="font-mono text-[11px] text-text-muted mb-2">
                  {hoveredNode.language}
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {hoveredNode.topics.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 font-mono text-[10px] rounded bg-primary/10 text-primary border border-primary/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-3 font-mono text-[10px] text-text-muted/60">
                click to open • {connectedTo.size} related
              </div>
            </motion.div>
          )}

          {/* Legend */}
          <div className="absolute top-4 right-4 flex items-center gap-4 font-mono text-[10px] text-text-muted bg-bg-dark/60 backdrop-blur-md rounded-lg px-3 py-2 border border-border-color">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              featured
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent/80" />
              other
            </span>
            <span>{graph.edges.length} links</span>
          </div>
        </div>
      </div>
    </section>
  )
}
