/**
 * DRILL #4: TaskForm Component ✓ (Completed)
 *
 * Form to create/edit tasks.
 *
 * What you learned:
 * - Form state management
 * - Input handling and validation
 * - Conditional rendering for errors
 * - Creating vs editing modes
 *
 * ---
 *
 * DRILL #5: Local State Management (Update this component)
 *
 * Integrate TaskForm with App state management.
 *
 * Tasks:
 * 1. Keep the existing form implementation working
 * 2. Update behavior:
 *    - When initialTask is provided (edit mode), pre-fill form and change button text to "Update"
 *    - When no initialTask (create mode), button says "Add"
 * 3. After successful submit:
 *    - Clear the form only when creating
 *    - When editing, either keep form filled or clear it (check your preference)
 * 4. The form should pass task data to App via onSubmit callback
 * 5. Make sure validation still works correctly
 *
 * Hints:
 * - Use useEffect to populate form when initialTask changes
 * - Button text changes: initialTask ? "Update" : "Add"
 * - Form should reset after creation but not after edit (or clear after edit if you prefer)
 * - Keep all the validation logic you have
 */

import { useState } from 'react'
import type { CreateTaskDTO, Task } from '../types'

type Props = {
  onSubmit: (task: CreateTaskDTO) => void;
  initialTask?: Task;
}

type FormError = {
  title?: string;
}

export function TaskForm({ onSubmit, initialTask }: Readonly<Props>) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [errors, setErrors] = useState<FormError | null>({});


  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();


    // validate input
    if(title.trim() === ''){
      setErrors( { title: 'Title is required'})
    }else {
      setErrors({})

    }

    const newTodo: CreateTaskDTO = {
      title,
      description,
      priority: priority
    }

    onSubmit(newTodo);
    setTitle('');
    setDescription('');

  }

  return (
    <form onSubmit={handleSubmit}>
      <select name="priority" id="priority" value={priority} onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}>
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <label htmlFor='title'>Task Title</label>
      <input
      id='title'
      name='title' 
      type='text'
      placeholder='Enter task title'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className='border p-2 rounded w-full'
      />
      {errors?.title ? <p className='text-red-500'>{errors?.title}</p> : null}
      <label htmlFor='description'>Task Description</label>
      <textarea
      id='description'
      name='description'
      className='border p-2 rounded w-full'
      rows={3} 
      value={description} 
      onChange={(e) => setDescription(e.target.value)}
      placeholder='Add details (optional)'
      >
      </textarea>

      <button type='submit'>
        Add
      </button>
    </form>
  )
}
