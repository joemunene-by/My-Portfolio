import { NextResponse } from "next/server"

const GITHUB_USERNAME = "joemunene-by"

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface UpstreamResponse {
  total: Record<string, number>
  contributions: ContributionDay[]
}

/**
 * Returns the user's real GitHub contribution graph for the last 365 days.
 *
 * Source: https://github-contributions-api.jogruber.de — a public proxy
 * that scrapes the contribution SVG from github.com/<user> and returns
 * a normalised {date, count, level} array. Doesn't need a GitHub token.
 *
 * Cached for 1 hour via Next.js fetch revalidation so the route doesn't
 * hammer the upstream on every request.
 */
export async function GET() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) {
      return NextResponse.json(
        { error: `upstream returned ${res.status}` },
        { status: 502 },
      )
    }
    const data = (await res.json()) as UpstreamResponse
    const contributions = Array.isArray(data.contributions)
      ? data.contributions
      : []
    const totalLastYear =
      typeof data.total?.lastYear === "number" ? data.total.lastYear : 0
    return NextResponse.json({
      contributions,
      total: totalLastYear,
      username: GITHUB_USERNAME,
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "fetch failed" },
      { status: 500 },
    )
  }
}
