import type { Job } from '../types/job'
import { getMatchScoreBadgeClass } from '../utils/matchScore'

interface JobCardProps {
  job: Job
  isSaved: boolean
  matchScore?: number | null
  onView: () => void
  onSave: () => void
}

function formatPosted(days: number): string {
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

export function JobCard({ job, isSaved, matchScore, onView, onSave }: JobCardProps) {
  const scoreBadgeClass =
    matchScore != null ? getMatchScoreBadgeClass(matchScore) : ''

  return (
    <article className="kn-job-card">
      <div className="kn-job-card-header">
        <h3 className="kn-job-card-title">{job.title}</h3>
        <div className="kn-job-card-badges">
          {matchScore != null && (
            <span className={`kn-match-badge ${scoreBadgeClass}`}>
              {matchScore}% match
            </span>
          )}
          <span className={`kn-job-card-source kn-job-source--${job.source.toLowerCase()}`}>
            {job.source}
          </span>
        </div>
      </div>
      <p className="kn-job-card-company">{job.company}</p>
      <div className="kn-job-card-meta">
        <span>{job.location}</span>
        <span className="kn-job-card-sep">·</span>
        <span>{job.mode}</span>
        <span className="kn-job-card-sep">·</span>
        <span>{job.experience}</span>
      </div>
      <p className="kn-job-card-salary">{job.salaryRange}</p>
      <p className="kn-job-card-posted">{formatPosted(job.postedDaysAgo)}</p>
      <div className="kn-job-card-actions">
        <button type="button" className="kn-btn kn-btn-secondary" onClick={onView}>
          View
        </button>
        <button
          type="button"
          className={`kn-btn kn-btn-secondary ${isSaved ? 'kn-btn-saved' : ''}`}
          onClick={onSave}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="kn-btn kn-btn-primary"
        >
          Apply
        </a>
      </div>
    </article>
  )
}
