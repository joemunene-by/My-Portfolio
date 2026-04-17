import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import CurrentlyWorkingOn from "@/components/CurrentlyWorkingOn"
import Projects from "@/components/Projects"
import GitHubGraph from "@/components/GitHubGraph"
import Blog from "@/components/Blog"
import Contact from "@/components/Contact"
import ParticleBackground from "@/components/ParticleBackground"
import Loader from "@/components/Loader"
import TerminalEasterEgg from "@/components/TerminalEasterEgg"
import Marquee from "@/components/Marquee"
import HorizontalShowcase from "@/components/HorizontalShowcase"
import { projects } from "@/data"

const accents = [
  "bg-gradient-to-br from-primary/40 via-accent/30 to-accent-warm/20",
  "bg-gradient-to-br from-accent/40 via-primary/30 to-accent-warm/20",
  "bg-gradient-to-br from-accent-warm/40 via-accent/30 to-primary/20",
  "bg-gradient-to-br from-primary/40 via-accent-warm/25 to-accent/30",
]

const highlightItems = projects
  .filter((p) => p.featured)
  .slice(0, 4)
  .map((p, i) => ({
    name: p.name,
    description: p.description,
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
      <Loader />
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Marquee
          items={[
            "Available for work",
            "Nairobi · Kenya",
            "Full-Stack Engineering",
            "Cybersecurity Research",
            "AI & ML",
            "Open to collab",
          ]}
        />
        <About />
        <Experience />
        <CurrentlyWorkingOn />
        <HorizontalShowcase items={highlightItems} />
        <Projects />
        <GitHubGraph />
        <Marquee
          items={[
            "Let's build something",
            "Secure by default",
            "Shipping weekly",
            "Based in Nairobi",
            "Remote friendly",
          ]}
          speed={55}
        />
        <Blog />
        <Contact />
      </div>
      <TerminalEasterEgg />
    </main>
  )
}
