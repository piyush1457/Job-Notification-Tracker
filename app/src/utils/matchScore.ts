import type { Job } from '../types/job'
import type { Preferences } from '../types/preferences'

/**
 * Compute match score for a job against user preferences.
 * Rules (cap at 100):
 * +25 if any roleKeyword in job.title (case-insensitive)
 * +15 if any roleKeyword in job.description
 * +15 if job.location in preferredLocations
 * +10 if job.mode in preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if overlap between job.skills and user.skills
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 */
export function computeMatchScore(job: Job, prefs: Preferences): number {
  let score = 0

  const roleKeywords = prefs.roleKeywords
    .split(',')
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean)

  const userSkills = prefs.skills
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)

  if (roleKeywords.length > 0) {
    const titleLower = job.title.toLowerCase()
    if (roleKeywords.some((kw) => titleLower.includes(kw))) {
      score += 25
    }
    const descLower = job.description.toLowerCase()
    if (roleKeywords.some((kw) => descLower.includes(kw))) {
      score += 15
    }
  }

  if (
    prefs.preferredLocations.length > 0 &&
    prefs.preferredLocations.includes(job.location)
  ) {
    score += 15
  }

  if (
    prefs.preferredMode.length > 0 &&
    prefs.preferredMode.includes(job.mode)
  ) {
    score += 10
  }

  if (prefs.experienceLevel === job.experience) {
    score += 10
  }

  if (userSkills.length > 0) {
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase())
    const hasOverlap = userSkills.some((us) =>
      jobSkillsLower.some((js) => js === us || js.includes(us) || us.includes(js))
    )
    if (hasOverlap) {
      score += 15
    }
  }

  if (job.postedDaysAgo <= 2) {
    score += 5
  }

  if (job.source === 'LinkedIn') {
    score += 5
  }

  return Math.min(100, score)
}

export function getMatchScoreBadgeClass(score: number): string {
  if (score >= 80) return 'kn-match-badge--high'
  if (score >= 60) return 'kn-match-badge--medium'
  if (score >= 40) return 'kn-match-badge--neutral'
  return 'kn-match-badge--low'
}
