"use client"

import { useState } from "react"
import { projects } from "@/data"
import { ExternalLink, Github, Star, Folder, ArrowUpRight } from "lucide-react"

const categories = [
  { key: "all", label: "All Projects" },
  { key: "cybersecurity", label: "Cybersecurity" },
  { key: "ai-ml", label: "AI & ML" },
  { key: "web-apps", label: "Web Apps" },
  { key: "tools", label: "Tools" },
]

const langColors: Record<string, string> = {
  Python: "bg-blue-500",
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  HTML: "bg-orange-500",
  Shell: "bg-green-600",
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  const featured = filtered.filter((p) => p.featured)
  const others = filtered.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="font-mono text-primary text-sm mb-2">03. My Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-white">Featured Projects</span>
            <span className="text-border-color ml-2">/</span>
          </h2>
          <p className="text-text-muted max-w-2xl">
            A curated selection of projects spanning cybersecurity, AI, web development, and automation tools.
            Each project reflects real-world problem solving and technical depth.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 font-mono text-sm rounded-full transition-all duration-200 ${
                activeCategory === cat.key
                  ? "bg-primary text-bg-dark font-semibold"
                  : "bg-bg-card text-text-muted border border-border-color hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="space-y-6 mb-12">
            {featured.map((project, i) => (
              <div
                key={project.name}
                className="group bg-bg-card border border-border-color rounded-xl p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 glow-box-hover"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Folder className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                    </div>

                    <p className="text-text-muted mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.topics.slice(0, 5).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-primary/5 text-primary font-mono text-xs rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-text-muted">
                      {project.language && project.language !== "N/A" && (
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${langColors[project.language] || "bg-gray-500"}`} />
                          <span className="font-mono text-xs">{project.language}</span>
                        </div>
                      )}
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="font-mono text-xs">{project.stars}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-text-muted hover:text-primary transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-text-muted hover:text-primary transition-colors"
                      title="View Source"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {others.length > 0 && (
          <>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-primary" />
              More Projects
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((project) => (
                <div
                  key={project.name}
                  className="group bg-bg-card border border-border-color rounded-lg p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Folder className="w-8 h-8 text-primary" />
                    <div className="flex items-center gap-2">
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-muted hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-primary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <h4 className="text-base font-semibold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {project.name}
                  </h4>

                  <p className="text-text-muted text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    {project.language && project.language !== "N/A" && (
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${langColors[project.language] || "bg-gray-500"}`} />
                        <span className="font-mono">{project.language}</span>
                      </div>
                    )}
                    {project.stars > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="font-mono">{project.stars}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
