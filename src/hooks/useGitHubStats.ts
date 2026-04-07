"use client"

import { useState, useEffect } from "react"
import { stats as fallbackStats } from "@/data"

export interface GitHubStats {
  totalRepos: number
  totalCommits: number
  linesOfCode: string
  healthyRepos: number
  totalStars: number
  languages: string[]
}

export function useGitHubStats() {
  const [stats, setStats] = useState<GitHubStats>({
    totalRepos: fallbackStats.totalRepos,
    totalCommits: fallbackStats.totalCommits,
    linesOfCode: fallbackStats.linesOfCode,
    healthyRepos: fallbackStats.healthyRepos,
    totalStars: 2,
    languages: fallbackStats.languages,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { stats, loading }
}
