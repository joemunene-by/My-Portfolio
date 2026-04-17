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
