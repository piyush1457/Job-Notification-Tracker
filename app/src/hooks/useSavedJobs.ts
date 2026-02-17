import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'job-notification-tracker-saved'

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds))
  }, [savedIds])

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  )

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  return { savedIds, isSaved, toggleSave }
}
