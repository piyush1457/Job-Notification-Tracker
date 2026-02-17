import type { Job } from '../types/job'
import type { Preferences } from '../types/preferences'
import { computeMatchScore } from './matchScore'

const STORAGE_PREFIX = 'jobTrackerDigest_'

export function getTodayKey(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export interface DigestJob {
  job: Job
  matchScore: number
}

export function generateDigest(
  jobs: Job[],
  preferences: Preferences
): DigestJob[] {
  const withScores = jobs.map((job) => ({
    job,
    matchScore: computeMatchScore(job, preferences),
  }))

  const sorted = [...withScores].sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore
    return a.job.postedDaysAgo - b.job.postedDaysAgo
  })

  return sorted.slice(0, 10)
}

export function loadDigest(dateKey: string): DigestJob[] | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${dateKey}`)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveDigest(dateKey: string, digest: DigestJob[]): void {
  localStorage.setItem(`${STORAGE_PREFIX}${dateKey}`, JSON.stringify(digest))
}

export function formatDigestPlainText(
  digest: DigestJob[],
  dateKey: string
): string {
  const lines: string[] = [
    'Top 10 Jobs For You — 9AM Digest',
    dateKey,
    '',
  ]

  digest.forEach((d, i) => {
    lines.push(`${i + 1}. ${d.job.title}`)
    lines.push(`   Company: ${d.job.company}`)
    lines.push(`   Location: ${d.job.location}`)
    lines.push(`   Experience: ${d.job.experience}`)
    lines.push(`   Match Score: ${d.matchScore}%`)
    lines.push(`   Apply: ${d.job.applyUrl}`)
    lines.push('')
  })

  lines.push('This digest was generated based on your preferences.')

  return lines.join('\n')
}

export function getMailtoUrl(
  digest: DigestJob[],
  dateKey: string
): string {
  const body = encodeURIComponent(
    formatDigestPlainText(digest, dateKey)
  )
  const subject = encodeURIComponent('My 9AM Job Digest')
  return `mailto:?subject=${subject}&body=${body}`
}
