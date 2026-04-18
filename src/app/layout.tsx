import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import CustomCursor from "@/components/CustomCursor"
import ScrollProgress from "@/components/ScrollProgress"
import CommandPalette from "@/components/CommandPalette"
import CommandHint from "@/components/CommandHint"
import SectionIndicator from "@/components/SectionIndicator"
import ProjectPreviewCursor from "@/components/ProjectPreviewCursor"
import AccentPicker from "@/components/AccentPicker"
import ProjectModal from "@/components/ProjectModal"
import PageTransition from "@/components/PageTransition"
import ShaderBackground from "@/components/ShaderBackground"
import ShortcutCheatsheet from "@/components/ShortcutCheatsheet"
import HackerMode from "@/components/HackerMode"
import CursorTrail from "@/components/CursorTrail"
import AskGhost from "@/components/AskGhost"
import Achievements from "@/components/Achievements"
import TrophyRoom from "@/components/TrophyRoom"
import PerfMonitor from "@/components/PerfMonitor"
import OnboardingTour from "@/components/OnboardingTour"
import ThemeRipple from "@/components/ThemeRipple"

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
        <ShaderBackground />
        <CursorTrail />
        <ScrollProgress />
        <CustomCursor />
        <CommandPalette />
        <CommandHint />
        <ShortcutCheatsheet />
        <HackerMode />
        <SectionIndicator />
        <ProjectPreviewCursor />
        <ProjectModal />
        <AccentPicker />
        <AskGhost />
        <Achievements />
        <TrophyRoom />
        <PerfMonitor />
        <ThemeRipple />
        <OnboardingTour />
        <div aria-hidden className="noise-overlay" />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
