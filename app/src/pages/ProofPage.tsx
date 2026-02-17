
import { useProof } from '../hooks/useProof'
import { CheckCircle, Circle, Copy } from 'lucide-react'

// Simulated steps for display purposes, as per requirement
const STEPS = [
  { id: 1, label: 'Project Initialize', status: 'Completed' },
  { id: 2, label: 'Hero Section Implementation', status: 'Completed' },
  { id: 3, label: 'Feature: Intelligent Match Scoring', status: 'Completed' },
  { id: 4, label: 'Feature: Job Status Tracking', status: 'Completed' },
  { id: 5, label: 'Feature: Daily Digest Simulation', status: 'Completed' },
  { id: 6, label: 'System Verification (Test Checklist)', status: 'Completed' },
  { id: 7, label: 'Deployment Configuration', status: 'Completed' },
  { id: 8, label: 'Final Polish', status: 'Pending' }, // Will complete upon shipping
]

export function ProofPage() {
  const { links, updateLink, status, copySubmission } = useProof()

  const handleCopy = () => {
    copySubmission()
    alert('Submission text copied to clipboard!')
  }

  return (
    <section className="kn-proof-page">
      <h1>Proof & Submission</h1>

      {status === 'Shipped' && (
        <div className="kn-completion-message">
          Project 1 Shipped Successfully.
        </div>
      )}

      {/* Section A: Step Completion Summary */}
      <div className="kn-proof-section">
        <h2>A) Step Completion Summary</h2>
        <div className="kn-step-list">
          {STEPS.map((step) => (
            <div key={step.id} className="kn-step-item">
              <span className="kn-step-name">
                {step.id}. {step.label}
              </span>
              <span
                className={`kn-status-badge ${step.status === 'Completed' || (step.id === 8 && status === 'Shipped')
                  ? 'kn-status-badge--shipped'
                  : 'kn-status-badge--not-started'
                  }`}
              >
                {step.status === 'Completed' || (step.id === 8 && status === 'Shipped') ? (
                  <>
                    <CheckCircle size={14} style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle size={14} style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
                    Pending
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section B: Artifact Collection */}
      <div className="kn-proof-section">
        <h2>B) Artifact Collection</h2>
        <div className="kn-artifact-form">
          <div className="kn-artifact-group">
            <label htmlFor="lovable-link">Lovable Project Link</label>
            <input
              id="lovable-link"
              type="url"
              className="kn-input"
              placeholder="https://lovable.dev/..."
              value={links.lovable}
              onChange={(e) => updateLink('lovable', e.target.value)}
              required
            />
          </div>
          <div className="kn-artifact-group">
            <label htmlFor="github-link">GitHub Repository Link</label>
            <input
              id="github-link"
              type="url"
              className="kn-input"
              placeholder="https://github.com/..."
              value={links.github}
              onChange={(e) => updateLink('github', e.target.value)}
              required
            />
          </div>
          <div className="kn-artifact-group">
            <label htmlFor="deployed-link">Deployed URL</label>
            <input
              id="deployed-link"
              type="url"
              className="kn-input"
              placeholder="https://...vercel.app"
              value={links.deployed}
              onChange={(e) => updateLink('deployed', e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Section C: Validation & Export */}
      <div className="kn-proof-section">
        <h2>C) Final Submission</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <strong>Current Status: </strong>
            <span className={`kn-status-badge ${status === 'Shipped' ? 'kn-status-badge--shipped' : 'kn-status-badge--progress'}`}>
              {status}
            </span>
          </div>
          {status !== 'Shipped' && (
            <span className="kn-text-muted" style={{ fontSize: '0.9rem' }}>
              Requires 3 Links + 10 Passed Tests to Ship
            </span>
          )}
        </div>

        <button
          className="kn-btn kn-btn-primary"
          onClick={handleCopy}
          disabled={status !== 'Shipped'}
          style={{ width: '100%', opacity: status === 'Shipped' ? 1 : 0.6 }}
        >
          <Copy size={18} />
          Copy Final Submission
        </button>
      </div>
    </section>
  )
}
