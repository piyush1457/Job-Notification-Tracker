import type { Job } from '../types/job'

interface ViewJobModalProps {
  job: Job | null
  onClose: () => void
}

export function ViewJobModal({ job, onClose }: ViewJobModalProps) {
  if (!job) return null

  return (
    <div className="kn-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="kn-modal" onClick={(e) => e.stopPropagation()}>
        <div className="kn-modal-header">
          <h2 className="kn-modal-title">{job.title}</h2>
          <span className="kn-modal-company">{job.company}</span>
          <button
            type="button"
            className="kn-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="kn-modal-body">
          <p className="kn-modal-description">{job.description}</p>
          <div className="kn-modal-skills">
            <span className="kn-modal-skills-label">Skills:</span>
            <div className="kn-modal-skills-list">
              {job.skills.map((s) => (
                <span key={s} className="kn-skill-tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
