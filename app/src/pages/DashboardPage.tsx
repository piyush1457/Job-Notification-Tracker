import { useState, useMemo } from 'react'
import { jobs } from '../data/jobs'
import { JobCard } from '../components/JobCard'
import { ViewJobModal } from '../components/ViewJobModal'
import { FilterBar, type SortOption } from '../components/FilterBar'
import { useSavedJobs } from '../hooks/useSavedJobs'
import type { Job } from '../types/job'

function filterAndSort(
  jobsList: Job[],
  keyword: string,
  location: string,
  mode: string,
  experience: string,
  source: string,
  sort: SortOption
): Job[] {
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

  if (sort === 'Latest') {
    result = [...result].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
  } else if (sort === 'Oldest') {
    result = [...result].sort((a, b) => b.postedDaysAgo - a.postedDaysAgo)
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
  const [viewJob, setViewJob] = useState<Job | null>(null)

  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('All')
  const [mode, setMode] = useState('All')
  const [experience, setExperience] = useState('All')
  const [source, setSource] = useState('All')
  const [sort, setSort] = useState<SortOption>('Latest')

  const filteredJobs = useMemo(
    () =>
      filterAndSort(jobs, keyword, location, mode, experience, source, sort),
    [keyword, location, mode, experience, source, sort]
  )

  return (
    <section className="kn-dashboard-page">
      <h1>Dashboard</h1>
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
            onView={() => setViewJob(job)}
            onSave={() => toggleSave(job.id)}
          />
        ))}
      </div>
      {filteredJobs.length === 0 && (
        <div className="kn-empty-state kn-empty-state--premium">
          <p className="kn-empty-state-message">No jobs match your filters.</p>
        </div>
      )}
      <ViewJobModal job={viewJob} onClose={() => setViewJob(null)} />
    </section>
  )
}
