import { useState } from 'react'
import { jobs } from '../data/jobs'
import { JobCard } from '../components/JobCard'
import { ViewJobModal } from '../components/ViewJobModal'
import { useSavedJobs } from '../hooks/useSavedJobs'
import type { Job } from '../types/job'

export function SavedPage() {
  const { savedIds, isSaved, toggleSave } = useSavedJobs()
  const [viewJob, setViewJob] = useState<Job | null>(null)

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id))

  return (
    <section className="kn-saved-page">
      <h1>Saved</h1>
      {savedJobs.length > 0 ? (
        <div className="kn-job-grid">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onView={() => setViewJob(job)}
              onSave={() => toggleSave(job.id)}
            />
          ))}
        </div>
      ) : (
        <div className="kn-empty-state kn-empty-state--premium">
          <p className="kn-empty-state-message">
            No saved jobs yet. Save jobs from the Dashboard to see them here.
          </p>
        </div>
      )}
      <ViewJobModal job={viewJob} onClose={() => setViewJob(null)} />
    </section>
  )
}
