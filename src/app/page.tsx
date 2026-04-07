import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import ParticleBackground from "@/components/ParticleBackground"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}
