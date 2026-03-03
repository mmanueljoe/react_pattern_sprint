/**
 * DRILL 7: useLocalStorage Hook
 *
 * Persist state to localStorage automatically.
 *
 * TODO:
 * 1. Generic hook: useLocalStorage<T>(key: string, initialValue: T)
 * 2. Return [value, setValue] like useState
 * 3. On mount: read from localStorage, parse JSON, use as initial state
 * 4. On state change: automatically save to localStorage
 * 5. Error handling: if localStorage data is invalid JSON, use initialValue
 *
 * HINT:
 * - Use useEffect to sync state → localStorage
 * - Use useState to manage the state
 * - Try/catch around JSON.parse in case data is corrupted
 *
 * BONUS:
 * - Add useEffect cleanup to remove listener on unmount (if using storage event)
 */

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  // Your code here
  const [value, setValue] = useState<T>(initialValue)

  // Your code here: useEffect to sync to localStorage

  return [value, setValue]
}
