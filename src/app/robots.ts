import type { MetadataRoute } from "next"

/**
 * Auto-generated /robots.txt. Mirrors the metadata.robots block in
 * layout.tsx (allow everything, point Googlebot at the sitemap). If
 * you ever need to block a path, add a `disallow` entry.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-portfolio-peach-eta-42.vercel.app"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
