import { useState, useMemo } from 'react'
import { jobs } from '../data/jobs'
import { JobCard } from '../components/JobCard'
import { ViewJobModal } from '../components/ViewJobModal'
import { FilterBar, type SortOption } from '../components/FilterBar'
import { useSavedJobs } from '../hooks/useSavedJobs'
import { usePreferences } from '../hooks/usePreferences'
import { useJobStatus, type JobStatus } from '../hooks/useJobStatus'
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
  statusFilter: string,
  source: string,
  sort: SortOption,
  showOnlyMatches: boolean,
  minMatchScore: number,
  getStatus: (id: string) => JobStatus
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
  if (statusFilter !== 'All') {
    result = result.filter((j) => getStatus(j.id) === statusFilter)
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
  const { getStatus, updateStatus, getAllStatus } = useJobStatus()
  const [viewJob, setViewJob] = useState<Job | null>(null)
  const [showOnlyMatches, setShowOnlyMatches] = useState(false)

  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('All')
  const [mode, setMode] = useState('All')
  const [experience, setExperience] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
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

  // Force re-render when statuses change by depending on getAllStatus() result or length
  // Since getAllStatus returns a ref-like object, we might need to depend on a version or just the object itself if it changes ref.
  // But useJobStatus updates state, so this component will re-render.
  // We pass getStatus to the filter function.
  const allStatuses = getAllStatus() // Dependency for useMemo

  const filteredJobs = useMemo(
    () =>
      filterAndSort(
        jobsWithScore,
        keyword,
        location,
        mode,
        experience,
        statusFilter,
        source,
        sort,
        showOnlyMatches,
        preferences.minMatchScore,
        getStatus
      ),
    [
      jobsWithScore,
      keyword,
      location,
      mode,
      experience,
      statusFilter,
      source,
      sort,
      showOnlyMatches,
      preferences.minMatchScore,
      allStatuses, // Depend on status map to re-filter when status changes
      getStatus
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
        status={statusFilter}
        onStatusChange={setStatusFilter}
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
            status={getStatus(job.id)}
            onView={() => setViewJob(job)}
            onSave={() => toggleSave(job.id)}
            onStatusChange={(s) => updateStatus(job.id, s, job.title)}
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
