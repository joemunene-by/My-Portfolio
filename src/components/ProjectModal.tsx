"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ExternalLink, Github, Star, Globe } from "lucide-react"
import { projects } from "@/data"

type Project = (typeof projects)[number]

export default function ProjectModal() {
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const open = (e: Event) => {
      const name = (e as CustomEvent<string>).detail
      const p = projects.find((x) => x.name === name)
      if (p) setProject(p)
    }
    const close = () => setProject(null)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProject(null)
    }
    window.addEventListener("project:open", open)
    window.addEventListener("project:close", close)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("project:open", open)
      window.removeEventListener("project:close", close)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[9993] flex items-start justify-center overflow-y-auto px-4 py-10 sm:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-bg-dark/80 backdrop-blur-md"
            onClick={() => setProject(null)}
          />
          <motion.div
            className="relative w-full max-w-3xl bg-bg-card/95 backdrop-blur-2xl border border-border-color rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-3 border-b border-border-color bg-bg-dark/60">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
                  {project.category?.replace("-", " ") ?? "Project"}
                </span>
              </div>
              <button
                onClick={() => setProject(null)}
                className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {project.name}
              </h2>
              <p className="text-text-muted leading-relaxed mb-6">
                {project.description}
              </p>

              {project.homepage && (
                <div className="mb-6 rounded-xl overflow-hidden border border-border-color bg-bg-dark aspect-video relative">
                  <iframe
                    src={project.homepage}
                    className="w-full h-full"
                    title={`${project.name} live preview`}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-bg-dark/80 backdrop-blur-sm rounded font-mono text-[10px] text-white/70 uppercase tracking-widest">
                    Live Preview
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {project.topics.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 font-mono text-[11px] rounded-full bg-primary/10 text-primary border border-primary/15"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
                {project.language && project.language !== "N/A" && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-mono text-xs">{project.language}</span>
                  </div>
                )}
                {project.stars > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="font-mono text-xs">{project.stars}</span>
                  </div>
                )}
                {project.featured && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent-warm">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-border-color">
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-bg-dark font-mono text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    Open Live Site
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 text-white border border-white/15 font-mono text-sm rounded-lg hover:bg-white/10 transition-all"
                >
                  <Github className="w-4 h-4" />
                  Source on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
