import type { Job } from '../types/job'
import { getMatchScoreBadgeClass } from '../utils/matchScore'
import { CheckCircle, XCircle, Clock, Check } from 'lucide-react'
import type { JobStatus } from '../hooks/useJobStatus'

interface JobCardProps {
  job: Job
  isSaved: boolean
  matchScore?: number | null
  status?: JobStatus
  onView: () => void
  onSave: () => void
  onStatusChange?: (status: JobStatus) => void
}

export function JobCard({ job, isSaved, matchScore, status = 'Not Applied', onView, onSave, onStatusChange }: JobCardProps) {
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

      {onStatusChange && (
        <div className="kn-status-group">
          <span className="kn-status-label">Status:</span>
          <div className="kn-status-buttons">
            <button
              className={`kn-status-btn ${status === 'Not Applied' ? 'active' : ''}`}
              onClick={() => onStatusChange('Not Applied')}
              title="Not Applied"
            >
              <Clock size={16} />
            </button>
            <button
              className={`kn-status-btn status-applied ${status === 'Applied' ? 'active' : ''}`}
              onClick={() => onStatusChange('Applied')}
              title="Applied"
            >
              <Check size={16} />
            </button>
            <button
              className={`kn-status-btn status-rejected ${status === 'Rejected' ? 'active' : ''}`}
              onClick={() => onStatusChange('Rejected')}
              title="Rejected"
            >
              <XCircle size={16} />
            </button>
            <button
              className={`kn-status-btn status-selected ${status === 'Selected' ? 'active' : ''}`}
              onClick={() => onStatusChange('Selected')}
              title="Selected"
            >
              <CheckCircle size={16} />
            </button>
          </div>
          <span className={`kn-status-text status-${status.toLowerCase().replace(' ', '-')}`}>
            {status}
          </span>
        </div>
      )}

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
