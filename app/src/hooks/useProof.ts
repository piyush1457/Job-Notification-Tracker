import { useState, useEffect } from 'react'
import { useTestChecklist } from './useTestChecklist'

const STORAGE_KEY = 'job-tracker-proof-links'

export interface ProofLinks {
    lovable: string
    github: string
    deployed: string
}

export type ShipStatus = 'Not Started' | 'In Progress' | 'Shipped'

export function useProof() {
    const { isComplete: isTestsComplete } = useTestChecklist()

    const [links, setLinks] = useState<ProofLinks>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            return stored ? JSON.parse(stored) : { lovable: '', github: '', deployed: '' }
        } catch {
            return { lovable: '', github: '', deployed: '' }
        }
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
    }, [links])

    const updateLink = (key: keyof ProofLinks, value: string) => {
        setLinks((prev) => ({ ...prev, [key]: value }))
    }

    const isValidUrl = (url: string) => {
        try {
            if (!url) return false
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    const areLinksValid =
        isValidUrl(links.lovable) &&
        isValidUrl(links.github) &&
        isValidUrl(links.deployed)

    let status: ShipStatus = 'Not Started'
    if (links.lovable || links.github || links.deployed || isTestsComplete) {
        status = 'In Progress'
    }
    if (areLinksValid && isTestsComplete) {
        status = 'Shipped'
    }

    const copySubmission = () => {
        const text = `
------------------------------------------
Job Notification Tracker — Final Submission

Lovable Project:
${links.lovable}

GitHub Repository:
${links.github}

Live Deployment:
${links.deployed}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
------------------------------------------
`.trim()
        navigator.clipboard.writeText(text)
        return text
    }

    return {
        links,
        updateLink,
        isValidUrl,
        areLinksValid,
        status,
        copySubmission
    }
}
