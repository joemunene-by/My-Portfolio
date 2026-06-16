import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ProofStrip from "@/components/ProofStrip"
import About from "@/components/About"
import Services from "@/components/Services"
import Experience from "@/components/Experience"
import CurrentlyWorkingOn from "@/components/CurrentlyWorkingOn"
import Projects from "@/components/Projects"
import GitHubGraph from "@/components/GitHubGraph"
import Blog from "@/components/Blog"
import Contact from "@/components/Contact"
import TerminalEasterEgg from "@/components/TerminalEasterEgg"
import HorizontalShowcase from "@/components/HorizontalShowcase"
import StatsStrip from "@/components/StatsStrip"
import CodeShowcase from "@/components/CodeShowcase"
import { projects } from "@/data"

const accents = [
  "bg-linear-to-br from-primary/40 via-accent/30 to-accent-warm/20",
  "bg-linear-to-br from-accent/40 via-primary/30 to-accent-warm/20",
  "bg-linear-to-br from-accent-warm/40 via-accent/30 to-primary/20",
  "bg-linear-to-br from-primary/40 via-accent-warm/25 to-accent/30",
]

const highlightItems = projects
  .filter((p) => p.featured)
  .slice(0, 4)
  .map((p, i) => ({
    name: p.name,
    description: "blurb" in p ? (p.blurb as string) : p.description,
    metric: "metric" in p ? (p.metric as string) : undefined,
    language: p.language && p.language !== "N/A" ? p.language : undefined,
    topics: p.topics,
    url: p.url,
    homepage: p.homepage,
    accent: accents[i % accents.length],
    index: String(i + 1).padStart(2, "0"),
  }))

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ProofStrip />
        <About />
        <StatsStrip />
        <Services />
        <Experience />
        <CurrentlyWorkingOn />
        <HorizontalShowcase items={highlightItems} />
        <CodeShowcase />
        <Projects />
        <GitHubGraph />
        <Blog />
        <Contact />
      </div>
      <TerminalEasterEgg />
    </main>
  )
}
