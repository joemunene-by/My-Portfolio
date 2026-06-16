import { NextResponse } from "next/server"

const GITHUB_USERNAME = "joemunene-by"

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

/**
 * Returns the user's real GitHub contribution graph for the last year.
 *
 * Primary source: GitHub's official GraphQL `contributionsCollection`
 * API, used when a GITHUB_TOKEN is configured. This is the reliable,
 * first-party source and is what production should use.
 *
 * Fallback: https://github-contributions-api.jogruber.de — a public
 * proxy that needs no token, used when no token is set or the GraphQL
 * call fails. Both are cached for an hour via fetch revalidation.
 */

const GRAPHQL_LEVELS: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

async function fromGraphQL(token: string) {
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
    next: { revalidate: 3600 },
  })
  if (!res.ok) return null
  const json = await res.json()
  const cal =
    json?.data?.user?.contributionsCollection?.contributionCalendar
  if (!cal?.weeks) return null
  const contributions: ContributionDay[] = cal.weeks.flatMap(
    (w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: GRAPHQL_LEVELS[d.contributionLevel] ?? 0,
      })),
  )
  return { contributions, total: cal.totalContributions as number }
}

async function fromProxy() {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
    { next: { revalidate: 3600 } },
  )
  if (!res.ok) return null
  const data = await res.json()
  const contributions = Array.isArray(data.contributions)
    ? data.contributions
    : []
  if (!contributions.length) return null
  const total =
    typeof data.total?.lastYear === "number" ? data.total.lastYear : 0
  return { contributions, total }
}

export async function GET() {
  try {
    let result = null
    const token = process.env.GITHUB_TOKEN
    if (token) {
      result = await fromGraphQL(token)
    }
    if (!result) {
      result = await fromProxy()
    }
    if (!result) {
      // Both sources failed: return an empty-but-valid payload so the UI
      // degrades gracefully instead of throwing.
      return NextResponse.json({
        contributions: [],
        total: 0,
        username: GITHUB_USERNAME,
        error: "contributions temporarily unavailable",
      })
    }
    return NextResponse.json({
      contributions: result.contributions,
      total: result.total,
      username: GITHUB_USERNAME,
    })
  } catch (err) {
    return NextResponse.json({
      contributions: [],
      total: 0,
      username: GITHUB_USERNAME,
      error: err instanceof Error ? err.message : "fetch failed",
    })
  }
}
