import type { MetadataRoute } from "next"

/**
 * Auto-generated sitemap.xml at /sitemap.xml. Next.js 15 reads this
 * file as a build-time route. Submit the URL once to Google Search
 * Console and once to Bing Webmaster Tools — re-submitting on every
 * deploy is unnecessary; Googlebot rechecks it on its own schedule.
 *
 * Add a new entry to `routes` whenever you ship a new top-level page.
 * The lastModified stamp is regenerated on every build, which gives
 * Googlebot a cheap signal that the page has new content.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-portfolio-peach-eta-42.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes: Array<{ path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }> = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/resume", priority: 0.9, changeFrequency: "monthly" },
    { path: "/dashboard", priority: 0.7, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  ]
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
