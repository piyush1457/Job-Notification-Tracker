import { useState, useEffect, useCallback } from 'react'
import type { Preferences } from '../types/preferences'
import { DEFAULT_PREFERENCES } from '../types/preferences'

const STORAGE_KEY = 'jobTrackerPreferences'

function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PREFERENCES
    const parsed = JSON.parse(raw)
    return {
      roleKeywords: parsed.roleKeywords ?? DEFAULT_PREFERENCES.roleKeywords,
      preferredLocations: Array.isArray(parsed.preferredLocations)
        ? parsed.preferredLocations
        : DEFAULT_PREFERENCES.preferredLocations,
      preferredMode: Array.isArray(parsed.preferredMode)
        ? parsed.preferredMode
        : DEFAULT_PREFERENCES.preferredMode,
      experienceLevel: parsed.experienceLevel ?? DEFAULT_PREFERENCES.experienceLevel,
      skills: parsed.skills ?? DEFAULT_PREFERENCES.skills,
      minMatchScore:
        typeof parsed.minMatchScore === 'number'
          ? Math.max(0, Math.min(100, parsed.minMatchScore))
          : DEFAULT_PREFERENCES.minMatchScore,
    }
  } catch {
    return DEFAULT_PREFERENCES
  }
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(loadPreferences)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  }, [preferences])

  const updatePreferences = useCallback((updates: Partial<Preferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }))
  }, [])

  const hasPreferences = Boolean(
    preferences.roleKeywords.trim() ||
      preferences.preferredLocations.length > 0 ||
      preferences.preferredMode.length > 0 ||
      preferences.skills.trim()
  )

  return { preferences, updatePreferences, hasPreferences }
}
