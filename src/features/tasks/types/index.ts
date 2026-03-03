/**
 * DRILL 1: Types
 *
 * Define the Task type and related DTOs.
 *
 * TODO:
 * 1. Create `Task` type with: id, title, description (optional), completed, createdAt
 * 2. Create `CreateTaskDTO` type (what you send to server to create a task)
 * 3. Create `UpdateTaskDTO` type (for updates)
 */

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  priority?: "high" | "medium" | "low";
}

export type CreateTaskDTO = {
   title: string;
   description?: string;
   priority?: "high" | "medium" | "low";
}

export type UpdateTaskDTO = {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: "high" | "medium" | "low";
}
