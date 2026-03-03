/**
 * DRILL #3: TaskList Component ✓ (Completed)
 *
 * Display a list of tasks using TaskCard.
 *
 * What you learned:
 * - Props composition
 * - Array mapping in JSX
 * - Empty state handling
 *
 * ---
 *
 * DRILL #5: Local State Management (Update this component)
 *
 * Update TaskList to work with App state management.
 *
 * Tasks:
 * 1. Update Props type to accept:
 *    - tasks: Task[]
 *    - onDelete: (id: string) => void
 *    - onEdit: (task: Task) => void
 *    - onComplete?: (id: string) => void
 * 2. Update TaskCard props passed to match new signature:
 *    - Pass onDelete with task.id
 *    - Pass onEdit with full task
 *    - Pass onComplete if defined
 * 3. Keep empty state message
 * 4. Add result counter: "Showing X tasks"
 *
 * Hints:
 * - TaskCard will need the updated callbacks
 * - Use consistent ID types (string)
 * - The component receives state from App, so focus on passing it through correctly
 */


import { TaskCard } from '@/features/tasks/components/TaskCard'
import type { Task } from '@/features/tasks/types'

type Props = {
  tasks: Task[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export function TaskList({tasks, onComplete, onDelete, onEdit}: Readonly<Props>) {
  
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
