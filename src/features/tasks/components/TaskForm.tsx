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
