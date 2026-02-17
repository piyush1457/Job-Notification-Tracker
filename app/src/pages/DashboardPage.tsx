import { useState, useMemo } from 'react'
import { jobs } from '../data/jobs'
import { JobCard } from '../components/JobCard'
import { ViewJobModal } from '../components/ViewJobModal'
import { FilterBar, type SortOption } from '../components/FilterBar'
import { useSavedJobs } from '../hooks/useSavedJobs'
import { usePreferences } from '../hooks/usePreferences'
import { computeMatchScore } from '../utils/matchScore'
import type { Job } from '../types/job'

interface JobWithScore extends Job {
  matchScore: number
}

function filterAndSort(
  jobsList: JobWithScore[],
  keyword: string,
  location: string,
  mode: string,
  experience: string,
  source: string,
  sort: SortOption,
  showOnlyMatches: boolean,
  minMatchScore: number
): JobWithScore[] {
  let result = jobsList

  if (keyword.trim()) {
    const k = keyword.toLowerCase()
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(k) || j.company.toLowerCase().includes(k)
    )
  }
  if (location !== 'All') {
    result = result.filter((j) => j.location === location)
  }
  if (mode !== 'All') {
    result = result.filter((j) => j.mode === mode)
  }
  if (experience !== 'All') {
    result = result.filter((j) => j.experience === experience)
  }
  if (source !== 'All') {
    result = result.filter((j) => j.source === source)
  }
  if (showOnlyMatches) {
    result = result.filter((j) => j.matchScore >= minMatchScore)
  }

  if (sort === 'Latest') {
    result = [...result].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
  } else if (sort === 'Oldest') {
    result = [...result].sort((a, b) => b.postedDaysAgo - a.postedDaysAgo)
  } else if (sort === 'Match Score') {
    result = [...result].sort((a, b) => b.matchScore - a.matchScore)
  } else if (sort === 'Salary High') {
    result = [...result].sort((a, b) => {
      const numA = parseInt(/\d+/.exec(a.salaryRange)?.[0] ?? '0', 10)
      const numB = parseInt(/\d+/.exec(b.salaryRange)?.[0] ?? '0', 10)
      return numB - numA
    })
  } else if (sort === 'Salary Low') {
    result = [...result].sort((a, b) => {
      const numA = parseInt(/\d+/.exec(a.salaryRange)?.[0] ?? '0', 10)
      const numB = parseInt(/\d+/.exec(b.salaryRange)?.[0] ?? '0', 10)
      return numA - numB
    })
  }

  return result
}

export function DashboardPage() {
  const { isSaved, toggleSave } = useSavedJobs()
  const { preferences } = usePreferences()
  const [viewJob, setViewJob] = useState<Job | null>(null)
  const [showOnlyMatches, setShowOnlyMatches] = useState(false)

  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('All')
  const [mode, setMode] = useState('All')
  const [experience, setExperience] = useState('All')
  const [source, setSource] = useState('All')
  const [sort, setSort] = useState<SortOption>('Latest')

  const jobsWithScore = useMemo(
    () =>
      jobs.map((job) => ({
        ...job,
        matchScore: computeMatchScore(job, preferences),
      })),
    [preferences]
  )

  const filteredJobs = useMemo(
    () =>
      filterAndSort(
        jobsWithScore,
        keyword,
        location,
        mode,
        experience,
        source,
        sort,
        showOnlyMatches,
        preferences.minMatchScore
      ),
    [
      jobsWithScore,
      keyword,
      location,
      mode,
      experience,
      source,
      sort,
      showOnlyMatches,
      preferences.minMatchScore,
    ]
  )

  const hasPreferences = Boolean(
    preferences.roleKeywords.trim() ||
      preferences.preferredLocations.length > 0 ||
      preferences.preferredMode.length > 0 ||
      preferences.skills.trim()
  )

  return (
    <section className="kn-dashboard-page">
      <h1>Dashboard</h1>

      {!hasPreferences && (
        <div className="kn-preferences-banner">
          <p>Set your preferences to activate intelligent matching.</p>
        </div>
      )}

      <div className="kn-dashboard-toggles">
        <label className="kn-toggle">
          <input
            type="checkbox"
            checked={showOnlyMatches}
            onChange={(e) => setShowOnlyMatches(e.target.checked)}
          />
          <span>Show only jobs above my threshold</span>
        </label>
      </div>

      <FilterBar
        jobs={jobs}
        keyword={keyword}
        onKeywordChange={setKeyword}
        location={location}
        onLocationChange={setLocation}
        mode={mode}
        onModeChange={setMode}
        experience={experience}
        onExperienceChange={setExperience}
        source={source}
        onSourceChange={setSource}
        sort={sort}
        onSortChange={setSort}
      />

      <div className="kn-job-grid">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={isSaved(job.id)}
            matchScore={hasPreferences ? job.matchScore : null}
            onView={() => setViewJob(job)}
            onSave={() => toggleSave(job.id)}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="kn-empty-state kn-empty-state--premium">
          <p className="kn-empty-state-message">
            No roles match your criteria. Adjust filters or lower threshold.
          </p>
        </div>
      )}

      <ViewJobModal job={viewJob} onClose={() => setViewJob(null)} />
    </section>
  )
}
