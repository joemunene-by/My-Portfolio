"use client"

import { blogPosts } from "@/data"
import AnimatedSection from "./AnimatedSection"
import { Clock, ArrowRight } from "lucide-react"

export default function Blog() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="font-mono text-primary text-sm mb-2">Thoughts & Writing</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            <span className="text-white">Recent Posts</span>
            <span className="text-border-color ml-2">/</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.1} direction="up">
              <div className="group bg-bg-card border border-border-color rounded-xl p-6 hover:border-primary/40 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
                  <span className="font-mono">{post.date}</span>
                  <span className="text-border-color">|</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-primary/5 text-primary/70 font-mono text-[10px] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-primary text-sm font-mono group-hover:gap-2 transition-all mt-auto">
                  Read more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
