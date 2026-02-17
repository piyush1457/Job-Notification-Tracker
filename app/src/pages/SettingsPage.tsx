import { usePreferences } from '../hooks/usePreferences'
import { jobs } from '../data/jobs'
import type { JobMode, Preferences } from '../types/preferences'

const LOCATIONS = [...new Set(jobs.map((j) => j.location))].sort()
const MODES: JobMode[] = ['Remote', 'Hybrid', 'Onsite']
const EXPERIENCE_LEVELS = ['Fresher', '0-1', '1-3', '3-5'] as const

export function SettingsPage() {
  const { preferences, updatePreferences } = usePreferences()

  const toggleLocation = (loc: string) => {
    const next = preferences.preferredLocations.includes(loc)
      ? preferences.preferredLocations.filter((l) => l !== loc)
      : [...preferences.preferredLocations, loc]
    updatePreferences({ preferredLocations: next })
  }

  const toggleMode = (mode: JobMode) => {
    const next = preferences.preferredMode.includes(mode)
      ? preferences.preferredMode.filter((m) => m !== mode)
      : [...preferences.preferredMode, mode]
    updatePreferences({ preferredMode: next })
  }

  return (
    <section className="kn-settings-page">
      <h1>Settings</h1>
      <p className="kn-placeholder-subtext" style={{ marginBottom: 'var(--kn-space-lg)' }}>
        Configure your job preferences. Your choices power intelligent matching on the Dashboard.
      </p>

      <div className="kn-settings-form">
        <div className="kn-form-field">
          <label className="kn-form-label">Role keywords</label>
          <input
            className="kn-input"
            type="text"
            placeholder="e.g. React, Frontend, SDE (comma-separated)"
            value={preferences.roleKeywords}
            onChange={(e) => updatePreferences({ roleKeywords: e.target.value })}
          />
        </div>

        <div className="kn-form-field">
          <label className="kn-form-label">Preferred locations</label>
          <div className="kn-form-multiselect">
            {LOCATIONS.map((loc) => (
              <label key={loc} className="kn-form-check">
                <input
                  type="checkbox"
                  checked={preferences.preferredLocations.includes(loc)}
                  onChange={() => toggleLocation(loc)}
                />
                <span>{loc}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="kn-form-field">
          <label className="kn-form-label">Preferred mode</label>
          <div className="kn-form-check-group">
            {MODES.map((m) => (
              <label key={m} className="kn-form-check">
                <input
                  type="checkbox"
                  checked={preferences.preferredMode.includes(m)}
                  onChange={() => toggleMode(m)}
                />
                <span>{m}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="kn-form-field">
          <label className="kn-form-label">Experience level</label>
          <select
            className="kn-input kn-select"
            value={preferences.experienceLevel}
            onChange={(e) =>
              updatePreferences({
                experienceLevel: e.target.value as Preferences['experienceLevel'],
              })
            }
          >
            {EXPERIENCE_LEVELS.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        <div className="kn-form-field">
          <label className="kn-form-label">Skills</label>
          <input
            className="kn-input"
            type="text"
            placeholder="e.g. React, Python, SQL (comma-separated)"
            value={preferences.skills}
            onChange={(e) => updatePreferences({ skills: e.target.value })}
          />
        </div>

        <div className="kn-form-field">
          <label className="kn-form-label">
            Minimum match score: {preferences.minMatchScore}
          </label>
          <input
            type="range"
            className="kn-slider"
            min={0}
            max={100}
            value={preferences.minMatchScore}
            onChange={(e) =>
              updatePreferences({ minMatchScore: Number(e.target.value) })
            }
          />
        </div>
      </div>
    </section>
  )
}
