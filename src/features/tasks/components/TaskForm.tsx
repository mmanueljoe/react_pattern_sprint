/**
 * DRILL 4: TaskForm Component
 *
 * Form to create/edit tasks.
 *
 * TODO:
 * 1. Create Props type with onSubmit callback
 * 2. Use useState for inputs: title, description
 * 3. Handle form submission:
 *    - Validate inputs (at least title is required)
 *    - Call onSubmit with { title, description }
 *    - Clear form after submission
 * 4. Add input fields for title and description
 * 5. Style with Tailwind CSS
 *
 * BONUS:
 * - Accept optional initialTask prop to prefill form (for editing)
 * - Disable submit button while submitting
 */

import { useState } from 'react'
import type { CreateTaskDTO, Task } from '../types'

type Props = {
  // Your code here
}

export function TaskForm({ }: Props) {
  // Your code here

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Your code here
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Your code here */}
    </form>
  )
}
