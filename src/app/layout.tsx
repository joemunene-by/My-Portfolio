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

// The canonical site URL. Set NEXT_PUBLIC_SITE_URL in Vercel once you
// point a real domain (joemunene.dev / .com) at the deployment — every
// piece of metadata + the sitemap reads from this single source.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-portfolio-peach-eta-42.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Joe Munene | Full-Stack Developer & Cybersecurity Researcher",
    template: "%s | Joe Munene",
  },
  description:
    "Joe Munene — software engineer building secure systems, full-stack apps, and applied AI. Portfolio of cybersecurity tools, agent shells, and LLM work.",
  keywords: [
    "Joe Munene",
    "Joe Munene portfolio",
    "Joe Munene developer",
    "Joe Munene Kenya",
    "Full-Stack Developer",
    "Cybersecurity",
    "AI Engineer",
    "Moi University",
    "GhostLM",
    "joe agent shell",
  ],
  authors: [{ name: "Joe Munene", url: SITE_URL }],
  creator: "Joe Munene",
  publisher: "Joe Munene",
  applicationName: "Joe Munene Portfolio",
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/joe-munene.jpg",
  },
  openGraph: {
    title: "Joe Munene | Developer & Security Researcher",
    description:
      "Software engineer building secure systems, agent shells, and applied LLMs. Featured: GhostLM, joe, ghostloop, ChartSentinel.",
    type: "profile",
    url: SITE_URL,
    siteName: "Joe Munene",
    locale: "en_US",
    images: [
      {
        url: "/joe-munene.jpg",
        width: 1200,
        height: 630,
        alt: "Joe Munene — Full-Stack Developer & Cybersecurity Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joe Munene | Developer & Security Researcher",
    description:
      "Software engineer building secure systems, agent shells, and applied LLMs.",
    images: ["/joe-munene.jpg"],
    creator: "@joemunene", // safe to leave even if the handle isn't claimed yet
  },
  verification: {
    // Fill these once you add the property in Google Search Console
    // and Bing Webmaster Tools. They surface as <meta> verification tags.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

/**
 * Schema.org Person JSON-LD. The single highest-leverage SEO add for
 * personal-name queries: tells Google "this site IS Joe Munene", lists
 * `sameAs` profiles so the knowledge graph stitches identities, and is
 * what unlocks the right-side knowledge panel when it kicks in.
 *
 * Edit `sameAs` to add / remove social profiles. Keep the URL list
 * tight — Google weighs accuracy over volume.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joe Munene",
  alternateName: "Joe",
  url: SITE_URL,
  image: `${SITE_URL}/joe-munene.jpg`,
  jobTitle: "Full-Stack Developer & Cybersecurity Researcher",
  description:
    "Software engineer building secure systems, agent shells, and applied LLMs. Creator of GhostLM, joe (local-first agent shell), ghostloop, and ChartSentinel.",
  knowsAbout: [
    "Software Engineering",
    "Cybersecurity",
    "Large Language Models",
    "Full-Stack Development",
    "Agent Architectures",
    "Penetration Testing",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Moi University",
  },
  sameAs: [
    "https://github.com/joemunene-by",
    // Add LinkedIn, X / Twitter, Hugging Face, dev.to as you publish them.
    // "https://www.linkedin.com/in/joe-munene/",
    // "https://x.com/joemunene",
    // "https://huggingface.co/Ghostgim",
  ],
}

/**
 * WebSite schema. Pairs with Person so the knowledge graph treats the
 * site as your canonical web presence.
 */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Joe Munene",
  url: SITE_URL,
  description: "Joe Munene's personal portfolio.",
  author: { "@type": "Person", name: "Joe Munene" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Person + WebSite JSON-LD: see metadata block above for why
            this is a bigger SEO lever than the meta tags themselves. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
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
