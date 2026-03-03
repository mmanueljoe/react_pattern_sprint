/**
 * DRILL 2: TaskCard Component
 *
 * Display a single task with buttons for actions.
 *
 * TODO:
 * 1. Create Props type with: task, onComplete, onDelete, onEdit (all callbacks)
 * 2. Display: title, description, completion status
 * 3. Add buttons for: Complete, Edit, Delete
 * 4. Use Tailwind CSS for styling (card layout, spacing, colors)
 * 5. Handle the completed state visually (e.g., strikethrough text if completed)
 */

import type { Task } from "@/features/tasks/types";

type Props = {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export function TaskCard({ task, onComplete, onDelete, onEdit }: Props) {
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
