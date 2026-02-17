import type { Job } from '../types/job'

export type SortOption = 'Latest' | 'Oldest' | 'Match Score' | 'Salary High' | 'Salary Low'

interface FilterBarProps {
  keyword: string
  onKeywordChange: (v: string) => void
  location: string
  onLocationChange: (v: string) => void
  mode: string
  onModeChange: (v: string) => void
  experience: string
  onExperienceChange: (v: string) => void
  source: string
  onSourceChange: (v: string) => void
  sort: SortOption
  onSortChange: (v: SortOption) => void
  jobs: Job[]
}

const MODES = ['All', 'Remote', 'Hybrid', 'Onsite']
const EXPERIENCE = ['All', 'Fresher', '0-1', '1-3', '3-5']
const SOURCES = ['All', 'LinkedIn', 'Naukri', 'Indeed']
const SORT_OPTIONS: SortOption[] = ['Latest', 'Oldest', 'Match Score', 'Salary High', 'Salary Low']

export function FilterBar({
  keyword,
  onKeywordChange,
  location,
  onLocationChange,
  mode,
  onModeChange,
  experience,
  onExperienceChange,
  source,
  onSourceChange,
  sort,
  onSortChange,
  jobs,
}: FilterBarProps) {
  const locations = ['All', ...new Set(jobs.map((j) => j.location).sort())]

  return (
    <div className="kn-filter-bar">
      <input
        type="search"
        className="kn-input kn-filter-search"
        placeholder="Search title or company..."
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
      <select
        className="kn-input kn-filter-select"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
      >
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc === 'All' ? 'Location' : loc}
          </option>
        ))}
      </select>
      <select
        className="kn-input kn-filter-select"
        value={mode}
        onChange={(e) => onModeChange(e.target.value)}
      >
        {MODES.map((m) => (
          <option key={m} value={m}>
            {m === 'All' ? 'Mode' : m}
          </option>
        ))}
      </select>
      <select
        className="kn-input kn-filter-select"
        value={experience}
        onChange={(e) => onExperienceChange(e.target.value)}
      >
        {EXPERIENCE.map((exp) => (
          <option key={exp} value={exp}>
            {exp === 'All' ? 'Experience' : exp}
          </option>
        ))}
      </select>
      <select
        className="kn-input kn-filter-select"
        value={source}
        onChange={(e) => onSourceChange(e.target.value)}
      >
        {SOURCES.map((s) => (
          <option key={s} value={s}>
            {s === 'All' ? 'Source' : s}
          </option>
        ))}
      </select>
      <select
        className="kn-input kn-filter-select"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((s) => (
          <option key={s} value={s}>
            Sort: {s}
          </option>
        ))}
      </select>
    </div>
  )
}
