import { NextResponse } from "next/server"

const GITHUB_USERNAME = "joemunene-by"

// Average bytes per line of source. GitHub's languages API reports
// source bytes per language with vendored/generated/docs files already
// excluded by linguist, so dividing by a realistic per-line size gives a
// far more honest line count than the old repo.size heuristic (which
// counted the whole git object store — history, images, lockfiles).
const BYTES_PER_LINE = 50

// Return a full-digit, rounded figure (e.g. "120,000+") so the strip and
// stat cards that parse the digits render it consistently.
function formatLOC(loc: number): string {
  if (loc >= 1000) return `${(Math.round(loc / 1000) * 1000).toLocaleString()}+`
  return loc.toLocaleString()
}

export async function GET() {
  const headers = {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  }

  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`,
      { headers, next: { revalidate: 3600 } },
    )
    if (!reposRes.ok) {
      throw new Error(`GitHub API returned ${reposRes.status}`)
    }
    const repos = await reposRes.json()
    const totalRepos = repos.length

    const totalStars = repos.reduce(
      (acc: number, repo: { stargazers_count?: number }) =>
        acc + (repo.stargazers_count || 0),
      0,
    )

    // Top languages by repo count.
    const langCounts: Record<string, number> = {}
    for (const repo of repos) {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
      }
    }
    const languages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang]) => lang)

    // Total commits via the search API.
    let totalCommits = 0
    const commitSearchRes = await fetch(
      `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`,
      { headers: { ...headers, Accept: "application/vnd.github.cloak-preview+json" } },
    )
    if (commitSearchRes.ok) {
      const commitData = await commitSearchRes.json()
      totalCommits = commitData.total_count || 0
    }

    // Healthy repos: not archived and pushed within the last year.
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    const healthyRepos = repos.filter(
      (repo: { archived?: boolean; pushed_at: string }) =>
        !repo.archived && new Date(repo.pushed_at) > oneYearAgo,
    ).length

    // Accurate lines of code: sum the per-language source bytes across
    // every repo (linguist already drops vendored/generated files), then
    // divide by an average line size. Per-repo language stats are cached
    // for a day so this is one batch of calls per day, not per request.
    let totalCodeBytes = 0
    await Promise.all(
      repos.map(async (repo: { languages_url: string }) => {
        try {
          const r = await fetch(repo.languages_url, {
            headers,
            next: { revalidate: 86400 },
          })
          if (!r.ok) return
          const langs = (await r.json()) as Record<string, number>
          for (const bytes of Object.values(langs)) {
            totalCodeBytes += Number(bytes) || 0
          }
        } catch {
          /* skip repos whose language stats fail to load */
        }
      }),
    )
    const estimatedLOC = Math.round(totalCodeBytes / BYTES_PER_LINE)
    const linesOfCode = estimatedLOC > 0 ? formatLOC(estimatedLOC) : "100,000+"

    return NextResponse.json({
      totalRepos,
      totalCommits,
      linesOfCode,
      healthyRepos,
      totalStars,
      languages,
    })
  } catch (error) {
    console.error("GitHub API error:", error)
    // Fallback so the site never breaks. Numbers kept conservative.
    return NextResponse.json({
      totalRepos: 36,
      totalCommits: 380,
      linesOfCode: "100,000+",
      healthyRepos: 36,
      totalStars: 2,
      languages: ["Python", "TypeScript", "JavaScript", "Rust", "Shell"],
    })
  }
}
