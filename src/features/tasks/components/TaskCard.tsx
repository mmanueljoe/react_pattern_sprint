/**
 * DRILL #2: TaskCard Component ✓ (Completed)
 *
 * Display a single task with buttons for actions.
 *
 * What you learned:
 * - Component props and callbacks
 * - Conditional rendering
 * - Tailwind CSS styling
 *
 * ---
 *
 * DRILL #5: Local State Management (Update this component)
 *
 * Update TaskCard to work with App state management.
 *
 * Tasks:
 * 1. Update Props to accept:
 *    - task: Task
 *    - onDelete: (id: string) => void (use string, not number)
 *    - onEdit: (task: Task) => void (pass full task, not just ID)
 *    - onComplete?: (id: string) => void
 * 2. Update button handlers to call these callbacks
 * 3. The edit button should pass the full task object
 * 4. Update ID type from number to string (tasks use string IDs)
 *
 * Hints:
 * - Type IDs consistently (string not number)
 * - Pass data needed by parent (task object for edit, just ID for delete)
 * - Keep component "dumb" - it shouldn't know how to manage state
 */

import type { Task } from "@/features/tasks/types";

type Props = {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export function TaskCard({ task, onComplete, onDelete, onEdit }: Readonly<Props>) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white border border-gray-200 rounded shadow">
      <p className={task.completed ? "line-through opacity-50" : ""}>
        {task.title}
      </p>
        {task.description && (
            <p className="text-sm text-gray-600">{task.description}</p>
        )}
      <div className="flex gap-2 ">
        <button onClick={() => onEdit(task.id)}>🖊</button>
        <button onClick={() => onDelete(task.id)}>❌</button>
        <button onClick={() => onComplete(task.id)}>✅</button>
      </div>
    </div>
  );
}
