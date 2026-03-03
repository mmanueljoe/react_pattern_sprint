/**
 * Public API for the tasks feature.
 *
 * Other parts of the app import from 'src/features/tasks'
 * not from 'src/features/tasks/components/TaskCard'
 */

export { TaskCard } from './components/TaskCard'
export { TaskList } from './components/TaskList'
export { TaskForm } from './components/TaskForm'
export { useTaskFilter } from './hooks/useTaskFilter'
export { taskService } from './services/taskService'
export type { Task, CreateTaskDTO, UpdateTaskDTO } from './types'
