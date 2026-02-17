import { useState, useCallback } from 'react'
import { jobs } from '../data/jobs'
import { usePreferences } from '../hooks/usePreferences'
import {
  getTodayKey,
  generateDigest,
  loadDigest,
  saveDigest,
  formatDigestPlainText,
  getMailtoUrl,
  type DigestJob,
} from '../utils/digest'
import { getMatchScoreBadgeClass } from '../utils/matchScore'

function formatDate(dateKey: string): string {
  const [y, m, d] = dateKey.split('-')
  const date = new Date(Number(y), Number(m) - 1, Number(d))
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function DigestPage() {
  const { preferences, hasPreferences } = usePreferences()
  const dateKey = getTodayKey()

  const [digest, setDigest] = useState<DigestJob[] | null>(() =>
    loadDigest(dateKey)
  )

  const handleGenerate = useCallback(() => {
    const existing = loadDigest(dateKey)
    if (existing && existing.length > 0) {
      setDigest(existing)
      return
    }

    const generated = generateDigest(jobs, preferences)
    if (generated.length > 0) {
      saveDigest(dateKey, generated)
    }
    setDigest(generated)
  }, [dateKey, preferences])

  const handleCopy = useCallback(() => {
    if (!digest || digest.length === 0) return
    const text = formatDigestPlainText(digest, dateKey)
    navigator.clipboard.writeText(text)
  }, [digest, dateKey])

  const handleEmailDraft = useCallback(() => {
    if (!digest || digest.length === 0) return
    window.location.href = getMailtoUrl(digest, dateKey)
  }, [digest, dateKey])

  if (!hasPreferences) {
    return (
      <section className="kn-digest-page">
        <h1>Digest</h1>
        <div className="kn-digest-block">
          <p className="kn-digest-block-message">
            Set preferences to generate a personalized digest.
          </p>
        </div>
      </section>
    )
  }

  const showEmptyMatches =
    digest !== null && digest.length === 0

  return (
    <section className="kn-digest-page">
      <h1>Digest</h1>

      <p className="kn-digest-demo-note">
        Demo Mode: Daily 9AM trigger simulated manually.
      </p>

      <div className="kn-digest-actions">
        <button
          type="button"
          className="kn-btn kn-btn-primary"
          onClick={handleGenerate}
        >
          Generate Today&apos;s 9AM Digest (Simulated)
        </button>
      </div>

      {showEmptyMatches && (
        <div className="kn-digest-card">
          <p className="kn-empty-state-message">
            No matching roles today. Check again tomorrow.
          </p>
        </div>
      )}

      {digest !== null && digest.length > 0 && (
        <div className="kn-digest-card">
          <header className="kn-digest-header">
            <h2 className="kn-digest-title">
              Top 10 Jobs For You — 9AM Digest
            </h2>
            <p className="kn-digest-date">{formatDate(dateKey)}</p>
          </header>

          <ul className="kn-digest-list">
            {digest.map((d, i) => (
              <li key={d.job.id} className="kn-digest-item">
                <div className="kn-digest-item-main">
                  <span className="kn-digest-item-num">{i + 1}.</span>
                  <div>
                    <span className="kn-digest-item-title">{d.job.title}</span>
                    <span className="kn-digest-item-company">
                      {d.job.company}
                    </span>
                  </div>
                </div>
                <div className="kn-digest-item-meta">
                  <span>{d.job.location}</span>
                  <span>·</span>
                  <span>{d.job.experience}</span>
                  <span className={`kn-match-badge ${getMatchScoreBadgeClass(d.matchScore)}`}>
                    {d.matchScore}% match
                  </span>
                </div>
                <a
                  href={d.job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kn-btn kn-btn-primary kn-digest-apply"
                >
                  Apply
                </a>
              </li>
            ))}
          </ul>

          <footer className="kn-digest-footer">
            This digest was generated based on your preferences.
          </footer>

          <div className="kn-digest-card-actions">
            <button
              type="button"
              className="kn-btn kn-btn-secondary"
              onClick={handleCopy}
            >
              Copy Digest to Clipboard
            </button>
            <button
              type="button"
              className="kn-btn kn-btn-secondary"
              onClick={handleEmailDraft}
            >
              Create Email Draft
            </button>
          </div>
        </div>
      )}

      {digest === null && (
        <div className="kn-digest-card kn-digest-card--empty">
          <p className="kn-empty-state-message">
            Click &quot;Generate Today&apos;s 9AM Digest&quot; to build your
            personalized list.
          </p>
        </div>
      )}
    </section>
  )
}
