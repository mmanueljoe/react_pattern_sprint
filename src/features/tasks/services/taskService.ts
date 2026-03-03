/**
 * DRILL 1: Service Layer
 *
 * Create stub methods that will be called from components.
 * Don't implement real HTTP yet—just return mock data or Promise<void>.
 *
 * TODO:
 * 1. Import types from '../types'
 * 2. Create taskService object with methods:
 *    - fetchAll(): Promise<Task[]>
 *    - create(data: CreateTaskDTO): Promise<Task>
 *    - update(id: string, data: UpdateTaskDTO): Promise<Task>
 *    - delete(id: string): Promise<void>
 * 3. For now, return mock data or empty Promise
 */

import type { Task, CreateTaskDTO, UpdateTaskDTO } from '../types'

export const taskService = {
  async fetchAll(): Promise<Task[]> {
    // TODO: Implement
    throw new Error('Not implemented')
  },

  async create(data: CreateTaskDTO): Promise<Task> {
    // TODO: Implement
    throw new Error('Not implemented')
  },

  async update(id: string, data: UpdateTaskDTO): Promise<Task> {
    // TODO: Implement
    throw new Error('Not implemented')
  },

  async delete(id: string): Promise<void> {
    // TODO: Implement
    throw new Error('Not implemented')
  },
}
