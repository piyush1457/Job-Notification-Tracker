export type JobMode = 'Remote' | 'Hybrid' | 'Onsite'
export type ExperienceLevel = 'Fresher' | '0-1' | '1-3' | '3-5'

export interface Preferences {
  roleKeywords: string
  preferredLocations: string[]
  preferredMode: JobMode[]
  experienceLevel: ExperienceLevel
  skills: string
  minMatchScore: number
}

export const DEFAULT_PREFERENCES: Preferences = {
  roleKeywords: '',
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: 'Fresher',
  skills: '',
  minMatchScore: 40,
}
