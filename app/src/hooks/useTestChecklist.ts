import { useState, useEffect } from 'react'

export interface TestItem {
    id: string
    label: string
    tooltip?: string
}

export const TEST_ITEMS: TestItem[] = [
    { id: 'pref-persist', label: 'Preferences persist after refresh', tooltip: 'Reload the page and check if language/location preferences remain.' },
    { id: 'match-score', label: 'Match score calculates correctly', tooltip: 'Check if job match scores align with set preferences.' },
    { id: 'match-toggle', label: '"Show only matches" toggle works', tooltip: 'Toggle the switch and ensure low-scoring jobs disappear.' },
    { id: 'save-persist', label: 'Save job persists after refresh', tooltip: 'Save a job, reload, and ensure it is still saved.' },
    { id: 'apply-tab', label: 'Apply opens in new tab', tooltip: 'Clicking Apply should open a new browser tab.' },
    { id: 'status-persist', label: 'Status update persists after refresh', tooltip: 'Change a job status, reload, and verify persistence.' },
    { id: 'status-filter', label: 'Status filter works correctly', tooltip: 'Filter by "Applied" or "Rejected" and verify results.' },
    { id: 'digest-top10', label: 'Digest generates top 10 by score', tooltip: 'Check the /digest page for high-scoring recommendations.' },
    { id: 'digest-persist', label: 'Digest persists for the day', tooltip: 'Reloading /digest should show the same jobs for the Current Day.' },
    { id: 'no-console-errors', label: 'No console errors on main pages', tooltip: 'Check browser DevTools console for red errors.' },
]

const STORAGE_KEY = 'job-tracker-test-checklist'

export function useTestChecklist() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            return stored ? JSON.parse(stored) : {}
        } catch {
            return {}
        }
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems))
    }, [checkedItems])

    const toggleCheck = (id: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const resetChecklist = () => {
        setCheckedItems({})
    }

    const checkedCount = Object.values(checkedItems).filter(Boolean).length
    const totalCount = TEST_ITEMS.length
    const isComplete = checkedCount === totalCount

    return {
        testItems: TEST_ITEMS,
        checkedItems,
        toggleCheck,
        resetChecklist,
        checkedCount,
        totalCount,
        isComplete,
    }
}
