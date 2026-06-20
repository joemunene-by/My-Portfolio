import { NextResponse } from "next/server"

const GITHUB_USERNAME = "joemunene-by"

// First-party lines of code. Measured with git ls-files across the source
// (non-fork) repositories, counting tracked source files only (lockfiles,
// minified assets, and binaries excluded), so the figure is defensible and
// does not borrow volume from forked upstreams like pytorch. Refresh by
// re-running the count when a large new repo lands.
const FIRST_PARTY_LOC = "785,000+"

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

    // Lines of code: report the measured first-party source count rather
    // than a per-language byte estimate. The byte estimate counted forked
    // upstreams (pytorch and similar), which inflated the figure and would
    // not survive a reader who checks the sources.
    const linesOfCode = FIRST_PARTY_LOC

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
      totalRepos: 51,
      totalCommits: 1031,
      linesOfCode: FIRST_PARTY_LOC,
      healthyRepos: 51,
      totalStars: 2,
      languages: ["Python", "TypeScript", "JavaScript", "Rust", "Shell"],
    })
  }
}
