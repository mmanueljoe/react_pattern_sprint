/**
 * DRILL 5: useTaskFilter Hook
 *
 * Filter tasks by completion status.
 *
 * TODO:
 * 1. Accept array of Task and a filter type: 'all' | 'completed' | 'pending'
 * 2. Return filtered tasks based on filter type
 * 3. Use useMemo to avoid recalculating on every render
 * 4. BONUS: Add sorting by createdAt (newest first)
 */

import { useMemo } from 'react'
import type { Task } from '../types'

type FilterType = 'all' | 'completed' | 'pending'

export function useTaskFilter(tasks: Task[], filter: FilterType): Task[] {
  return useMemo(() => {
    // Your code here
    return tasks
  }, [tasks, filter])
}
