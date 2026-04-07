import { Github, Mail, Terminal } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-32 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-mono text-primary text-sm mb-4">04. What&apos;s Next?</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Get In Touch
        </h2>
        <p className="text-text-muted text-lg mb-12 leading-relaxed">
          I&apos;m always open to discussing new projects, cybersecurity research collaborations,
          or opportunities to contribute to your team. Whether you have a question or just want
          to say hello, my inbox is always open.
        </p>

        <a
          href="mailto:joemunene984@gmail.com"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-bg-dark font-mono font-semibold rounded hover:bg-primary-dark transition-all duration-200 glow-box"
        >
          <Mail className="w-5 h-5" />
          Say Hello
        </a>

        <div className="mt-16 pt-12 border-t border-border-color">
          <div className="flex items-center justify-center gap-6 mb-8">
            <a
              href="https://github.com/joemunene-by"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-text-muted hover:text-primary hover:-translate-y-1 transition-all duration-200"
              title="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:joemunene984@gmail.com"
              className="p-3 text-text-muted hover:text-primary hover:-translate-y-1 transition-all duration-200"
              title="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="font-mono text-xs text-text-muted flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span>Designed & built by Joe Munene</span>
          </div>
          <div className="font-mono text-xs text-text-muted/50 mt-2">
            Powered by Next.js & Tailwind CSS
          </div>
        </div>
      </div>
    </section>
  )
}
