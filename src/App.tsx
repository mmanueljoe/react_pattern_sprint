/**
 * DRILL #4: App Integration
 *
 * Wire TaskList and TaskForm components together with proper layout.
 *
 * Tasks:
 * 1. Import TaskList and TaskForm from '@/features/tasks'
 * 2. Create a layout structure:
 *    - Header with page title "Task Manager"
 *    - Main content area with TaskForm and TaskList
 *    - Consider: Form on left/top, List on right/bottom
 * 3. Make layout responsive using Tailwind:
 *    - Mobile (stacked): Form above List
 *    - Desktop (md+): Form left, List right
 * 4. Add basic styling for visual hierarchy
 * 5. Ensure both components render without errors
 *
 * Acceptance Criteria:
 * - Both TaskList and TaskForm render in App
 * - Layout is responsive (check at 640px and 1024px breakpoints)
 * - No TypeScript errors
 * - `pnpm build` succeeds
 * - No console errors or warnings
 *
 * Hints:
 * - Use Tailwind flex, grid, or gap for spacing
 * - Use md: prefix for desktop breakpoints
 * - Header might be: flex justify-between items-center for spacing
 * - Layout: flex flex-col md:flex-row for responsive stacking
 */

import { TaskList, TaskForm } from '@/features/tasks'

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Add New Task</h2>
              <TaskForm onSubmit={() => {}} />
            </div>
          </div>

          {/* List Section */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Tasks</h2>
              <TaskList 
                tasks={[]}
                onComplete={() => {}}
                onDelete={() => {}}
                onEdit={() => {}}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
