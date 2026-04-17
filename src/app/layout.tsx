import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import CustomCursor from "@/components/CustomCursor"
import ScrollProgress from "@/components/ScrollProgress"
import CommandPalette from "@/components/CommandPalette"
import CommandHint from "@/components/CommandHint"
import SectionIndicator from "@/components/SectionIndicator"
import ProjectPreviewCursor from "@/components/ProjectPreviewCursor"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

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
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <ScrollProgress />
        <CustomCursor />
        <CommandPalette />
        <CommandHint />
        <SectionIndicator />
        <ProjectPreviewCursor />
        <div aria-hidden className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
