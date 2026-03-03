/**
 * DRILL 3: TaskList Component
 *
 * Display a list of tasks using TaskCard.
 *
 * TODO:
 * 1. Create Props type with: tasks array and callbacks (onComplete, onDelete, onEdit)
 * 2. Map over tasks and render TaskCard for each
 * 3. Add empty state message when tasks array is empty
 * 4. Pass callbacks down to TaskCard
 */


import { TaskCard } from '@/features/tasks/components/TaskCard'
import type { Task } from '@/features/tasks/types'

type Props = {
  tasks: Task[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export function TaskList({tasks, onComplete, onDelete, onEdit}: Props) {
  
  return (
    <div className='flex flex-col gap-3 p-4'>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard 
           key={task.id}
           task={task}
           onComplete={onComplete}
           onDelete={onDelete}
           onEdit={onEdit}
          />
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  )
}
