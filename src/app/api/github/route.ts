import { NextResponse } from "next/server"

const GITHUB_USERNAME = "joemunene-by"

export async function GET() {
  try {
    // Fetch all public repos
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!reposRes.ok) {
      throw new Error(`GitHub API returned ${reposRes.status}`)
    }

    const repos = await reposRes.json()
    const totalRepos = repos.length

    // Count total stars
    const totalStars = repos.reduce(
      (acc: number, repo: any) => acc + (repo.stargazers_count || 0),
      0
    )

    // Get language breakdown
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

    // Count total commits using the search API (accurate across all repos)
    let totalCommits = 0
    const commitSearchRes = await fetch(
      `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`,
      {
        headers: {
          Accept: "application/vnd.github.cloak-preview+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
      }
    )
    if (commitSearchRes.ok) {
      const commitData = await commitSearchRes.json()
      totalCommits = commitData.total_count || 0
    }

    // Count healthy repos (repos updated in the last year or not archived)
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    const healthyRepos = repos.filter(
      (repo: any) =>
        !repo.archived && new Date(repo.pushed_at) > oneYearAgo
    ).length

    // Estimate lines of code from repo sizes (rough: 1KB ≈ 25 lines)
    const totalSizeKB = repos.reduce(
      (acc: number, repo: any) => acc + (repo.size || 0),
      0
    )
    const estimatedLOC = Math.round(totalSizeKB * 25)
    const formattedLOC =
      estimatedLOC >= 1000
        ? `${Math.round(estimatedLOC / 1000).toLocaleString()}K+`
        : estimatedLOC.toLocaleString()

    return NextResponse.json({
      totalRepos,
      totalCommits,
      linesOfCode: formattedLOC,
      healthyRepos,
      totalStars,
      languages,
    })
  } catch (error) {
    console.error("GitHub API error:", error)
    // Return fallback data so the site never breaks
    return NextResponse.json({
      totalRepos: 34,
      totalCommits: 280,
      linesOfCode: "140K+",
      healthyRepos: 34,
      totalStars: 6,
      languages: ["Python", "TypeScript", "JavaScript", "Shell", "HTML"],
    })
  }
}
