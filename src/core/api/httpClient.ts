/**
 * DRILL 8: HTTP Client
 *
 * Centralized place for all API communication.
 *
 * TODO:
 * 1. Create httpClient object with methods: get, post, put, delete
 * 2. Set base URL (for now, use a mock/jsonplaceholder API or your backend)
 * 3. Handle errors: throw or return error state
 * 4. Each method accepts URL and optional body, returns Promise<T>
 *
 * BONUS:
 * - Add default headers (e.g., Content-Type: application/json)
 * - Add timeout handling
 * - Add logging for debugging
 */

type RequestConfig = {
  headers?: Record<string, string>
  timeout?: number
}

const BASE_URL = 'https://api.example.com' // TODO: Replace with your API

export const httpClient = {
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    // Your code here
    throw new Error('Not implemented')
  },

  async post<T>(url: string, body?: unknown, config?: RequestConfig): Promise<T> {
    // Your code here
    throw new Error('Not implemented')
  },

  async put<T>(url: string, body?: unknown, config?: RequestConfig): Promise<T> {
    // Your code here
    throw new Error('Not implemented')
  },

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    // Your code here
    throw new Error('Not implemented')
  },
}
