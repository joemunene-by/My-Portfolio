import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import CurrentlyWorkingOn from "@/components/CurrentlyWorkingOn"
import Projects from "@/components/Projects"
import GitHubGraph from "@/components/GitHubGraph"
import Blog from "@/components/Blog"
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact"
import ParticleBackground from "@/components/ParticleBackground"
import Loader from "@/components/Loader"
import TerminalEasterEgg from "@/components/TerminalEasterEgg"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Loader />
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <CurrentlyWorkingOn />
        <Projects />
        <GitHubGraph />
        <Blog />
        <Testimonials />
        <Contact />
      </div>
      <TerminalEasterEgg />
    </main>
  )
}
