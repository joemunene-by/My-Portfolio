import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"

export const metadata: Metadata = {
  title: "Joe Munene | Full-Stack Developer & Cybersecurity Researcher",
  description: "Software engineer focused on secure systems, full-stack development, and applied cybersecurity. Building tools that hack, think, and automate.",
  keywords: ["Joe Munene", "Full-Stack Developer", "Cybersecurity", "AI Engineer", "Moi University"],
  authors: [{ name: "Joe Munene" }],
  openGraph: {
    title: "Joe Munene | Developer & Security Researcher",
    description: "Building tools that hack, think, and automate.",
    type: "website",
    url: "https://my-portfolio-peach-eta-42.vercel.app",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
