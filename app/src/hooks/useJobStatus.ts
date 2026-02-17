
import { useState, useEffect, useCallback } from 'react'
import { useToast } from '../context/ToastContext'

export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected'

interface JobStatusRecord {
    status: JobStatus
    updatedAt: string
}

const STORAGE_KEY = 'job-notification-tracker-status'

export function useJobStatus() {
    const [statusMap, setStatusMap] = useState<Record<string, JobStatusRecord>>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            return raw ? JSON.parse(raw) : {}
        } catch {
            return {}
        }
    })

    const { showToast } = useToast()

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(statusMap))
    }, [statusMap])

    const getStatus = useCallback(
        (id: string): JobStatus => {
            return statusMap[id]?.status || 'Not Applied'
        },
        [statusMap]
    )

    const updateStatus = useCallback(
        (id: string, newStatus: JobStatus, jobTitle?: string) => {
            setStatusMap((prev) => {
                // If status is same, do nothing
                if (prev[id]?.status === newStatus) return prev

                return {
                    ...prev,
                    [id]: {
                        status: newStatus,
                        updatedAt: new Date().toISOString(),
                    },
                }
            })

            if (jobTitle && newStatus !== 'Not Applied') {
                showToast(`Status updated: ${newStatus}`, newStatus === 'Selected' ? 'success' : newStatus === 'Rejected' ? 'error' : 'info')
            }
        },
        [showToast]
    )

    const getAllStatus = useCallback(() => statusMap, [statusMap])

    return { getStatus, updateStatus, getAllStatus }
}
