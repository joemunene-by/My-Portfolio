import { useState, useEffect } from "react"
import { Menu, X, Ghost } from "lucide-react"
import { navLinks } from "@/data"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg-dark/95 backdrop-blur-md border-b border-border-color" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2 group">
            <Ghost className="w-6 h-6 text-primary group-hover:animate-pulse-glow" />
            <span className="font-mono text-lg font-bold text-gradient">Ghost</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-sm text-text-muted hover:text-primary transition-colors duration-200"
              >
                <span className="text-primary">0{navLinks.indexOf(link) + 1}.</span> {link.name}
              </a>
            ))}
            <a
              href="https://github.com/joemunene-by"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-primary text-primary font-mono text-sm rounded hover:bg-primary/10 transition-all duration-200"
            >
              GitHub
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-bg-card border-t border-border-color animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block font-mono text-sm text-text-muted hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-primary">0{navLinks.indexOf(link) + 1}.</span> {link.name}
              </a>
            ))}
            <a
              href="https://github.com/joemunene-by"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-4 py-2 border border-primary text-primary font-mono text-sm rounded hover:bg-primary/10 transition-all"
              onClick={() => setIsOpen(false)}
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
