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

    // Estimate total commits by summing contributor stats for each repo
    // (GitHub doesn't have a single endpoint for total commits across repos)
    // We'll sample the top repos to estimate
    let totalCommits = 0
    const commitFetches = repos.slice(0, 30).map(async (repo: any) => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/contributors`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              ...(process.env.GITHUB_TOKEN
                ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
                : {}),
            },
          }
        )
        if (res.ok) {
          const contributors = await res.json()
          if (Array.isArray(contributors)) {
            const userContribs = contributors.find(
              (c: any) =>
                c.login?.toLowerCase() === GITHUB_USERNAME.toLowerCase()
            )
            return userContribs?.contributions || 0
          }
        }
        return 0
      } catch {
        return 0
      }
    })

    const commitCounts = await Promise.all(commitFetches)
    totalCommits = commitCounts.reduce((a, b) => a + b, 0)

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
      totalCommits: totalCommits || 217, // fallback if API limits hit
      linesOfCode: formattedLOC,
      healthyRepos,
      totalStars,
      languages,
    })
  } catch (error) {
    console.error("GitHub API error:", error)
    // Return fallback data so the site never breaks
    return NextResponse.json({
      totalRepos: 26,
      totalCommits: 217,
      linesOfCode: "90K+",
      healthyRepos: 26,
      totalStars: 2,
      languages: ["Python", "TypeScript", "JavaScript", "Shell", "HTML"],
    })
  }
}
