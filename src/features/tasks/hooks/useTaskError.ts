/**
 * DRILL 9: Error Handling Hook
 *
 * Centralize error state management for tasks feature.
 *
 * TODO:
 * 1. Create hook that returns { error: string | null, setError, clearError }
 * 2. Use useState to manage error state
 * 3. Implement clearError to reset error to null
 * 4. Optional: Auto-clear error after 5 seconds
 *
 * USAGE:
 * const { error, setError, clearError } = useTaskError()
 *
 * try {
 *   await taskService.create(...)
 * } catch (err) {
 *   setError(err.message)
 * }
 */

import { useState } from 'react'

export function useTaskError() {
  const [error, setError] = useState<string | null>(null)

  // Your code here

  return {
    error,
    setError,
    clearError: () => setError(null),
  }
}
