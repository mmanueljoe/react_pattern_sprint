# React Pattern Sprint - Drill Series

This document outlines a structured series of drills to build your understanding of React patterns and TypeScript. Each drill builds progressively on completed work.

**How to use:**
1. Read the drill objective and learning goals
2. Implement the code yourself (don't copy-paste)
3. Run `pnpm dev` and test manually
4. Run `pnpm build` to check TypeScript
5. Run `pnpm lint` to check code quality
6. Commit your work
7. Request review

---

## #4 - App Integration

**Objective**: Connect TaskList and TaskForm to the App component with proper layout

**What you'll learn**:
- Component composition and prop drilling
- Layout patterns in React
- State lifting basics

**Tasks**:
1. Import TaskList and TaskForm into `App.tsx`
2. Create a simple layout (two columns or stacked)
3. Add a page title and header
4. Use Tailwind to create a functional UI layout
5. Make layout responsive (stacked on mobile, side-by-side on desktop)

**Acceptance Criteria**:
- TaskList and TaskForm both render in App
- Layout is responsive
- No TypeScript errors
- App compiles successfully with `pnpm build`

**Files to modify**:
- `src/App.tsx`

**Hints**:
- Consider using Tailwind's `flex`, `grid`, `md:` breakpoints
- Layout might be: Header → Form (left) + List (right)
- Or: Header → Form (top) → List (bottom)

---

## #5 - Local State Management

**Objective**: Manage task data in App and pass via props to child components

**What you'll learn**:
- Lifting state up
- useCallback for event handlers
- Controlled vs uncontrolled components
- Props drilling pattern (before Context)

**Tasks**:
1. In `App.tsx`, create a `tasks` state array using `useState`
2. Create handler functions:
   - `handleAddTask(task: CreateTaskDTO): void`
   - `handleEditTask(id: string, task: Partial<Task>): void`
   - `handleDeleteTask(id: string): void`
3. Pass state and handlers to TaskList and TaskForm as props
4. Update TaskCard to accept an `onDelete` handler
5. Update TaskForm to accept an `onSubmit` handler
6. Make TaskForm work in both "create" and "edit" modes
7. Connect handlers so UI actually adds/edits/deletes tasks

**Acceptance Criteria**:
- Add new task via TaskForm → appears in TaskList immediately
- Delete task via TaskCard button → removed from list
- Edit task opens TaskForm with pre-filled data
- No TypeScript errors
- State updates reflect immediately in UI
- All handlers use `useCallback` to prevent unnecessary re-renders

**Files to modify**:
- `src/App.tsx`
- `src/features/tasks/components/TaskForm.tsx`
- `src/features/tasks/components/TaskCard.tsx`
- `src/features/tasks/components/TaskList.tsx`

**Hints**:
- State shape: `const [tasks, setTasks] = useState<Task[]>([])`
- Generate IDs using `crypto.randomUUID()` for new tasks
- For edit mode, pass the current task to TaskForm and pre-fill fields
- Use `useCallback` with empty dependency array for handlers that don't depend on state (or add deps)

---

## #6 - Custom Hook Pattern

**Objective**: Create a custom hook to manage form state and validation

**What you'll learn**:
- Custom hooks for reusable stateful logic
- Form state management patterns
- Hook composition

**Tasks**:
1. Create `src/features/tasks/hooks/useTaskForm.ts`
2. Extract form logic from TaskForm component into the hook:
   - State for `name`, `description`, `dueDate`
   - `handleChange` function for form inputs
   - `handleSubmit` function that validates and returns task data
   - `reset` function to clear form
   - `setValues` function for edit mode (pre-fill)
3. Return an object: `{ values, handleChange, handleSubmit, reset, setValues, errors }`
4. Add validation:
   - `name` is required and not empty
   - `dueDate` must be in future (if provided)
5. Update TaskForm to use this hook instead of internal state

**Acceptance Criteria**:
- TaskForm works exactly the same as before (no visible changes)
- Form validation exists and shows error messages
- Reset works correctly after submit
- Edit mode pre-fills form fields
- No console warnings or errors
- Hook is reusable (could be used in another component)

**Files to create**:
- `src/features/tasks/hooks/useTaskForm.ts`

**Files to modify**:
- `src/features/tasks/components/TaskForm.tsx`

**Hints**:
- Hook state: `{ name: '', description: '', dueDate: '' }`
- Return both values and helpers from hook
- Validation should return errors object or null
- Remember to export from `src/features/tasks/index.ts`

---

## #7 - Task Filtering & Sorting

**Objective**: Add filter and sort functionality using custom hooks

**What you'll learn**:
- Composing multiple custom hooks
- Derived state patterns
- Filter/search/sort algorithms

**Tasks**:
1. Create `src/features/tasks/hooks/useTaskSort.ts`:
   - Accept tasks array and sort type (name, dueDate, status)
   - Return sorted tasks
2. Enhance `src/features/tasks/hooks/useTaskFilter.ts`:
   - Accept tasks array, search term, and filter type (All, Active, Completed)
   - Return filtered tasks
3. In App.tsx, add UI controls:
   - Search input for filtering by task name
   - Filter dropdown (All, Active, Completed)
   - Sort dropdown (Name, Due Date, Status)
4. Apply filters and sort before passing tasks to TaskList
5. Order of operations: Filter first, then sort

**Acceptance Criteria**:
- Search filters tasks by name in real-time (case-insensitive)
- Filter dropdown changes task display
- Sort dropdown reorders tasks
- Multiple filters work together (search + status filter + sort)
- Works smoothly with ~100 tasks (no performance issues)
- UI shows number of results

**Files to create**:
- `src/features/tasks/hooks/useTaskSort.ts`

**Files to modify**:
- `src/features/tasks/hooks/useTaskFilter.ts`
- `src/App.tsx`

**Hints**:
- For search, use `.name.toLowerCase().includes(searchTerm.toLowerCase())`
- For status filter, map "Completed" to check task.completed status
- For sort, use `.sort()` or `.toSorted()` (JS 2023)
- Consider performance: only filter/sort when inputs change (use useMemo)
- Add a "results" counter: "Showing 5 of 10 tasks"

---

## #8 - Mock API Integration

**Objective**: Replace local state with async API calls using your service layer

**What you'll learn**:
- Async/await patterns
- Service layer usage
- Promise handling in React
- Error states and loading states

**Tasks**:
1. Create `src/core/api/mockData.ts`:
   - Export array of 10 sample Task objects
   - Include various statuses, descriptions, and due dates
2. Update `src/features/tasks/services/taskService.ts` with methods:
   - `fetchTasks(): Promise<Task[]>` - returns mock data after delay
   - `createTask(data: CreateTaskDTO): Promise<Task>` - creates task, returns with ID
   - `updateTask(id: string, data: Partial<Task>): Promise<Task>` - updates task
   - `deleteTask(id: string): Promise<void>` - deletes task
3. In `src/App.tsx`:
   - Use `useEffect` to call `taskService.fetchTasks()` on mount
   - Add `isLoading` state
   - Add `error` state
   - Show loading spinner while fetching
   - Update TaskList to show empty state if no tasks
4. Update create/edit/delete handlers to call service methods

**Acceptance Criteria**:
- Tasks load on component mount with loading spinner
- Create/edit/delete calls the service
- Loading spinner shows while API responds
- Tasks disappear/appear correctly after actions
- No race conditions (rapid clicks don't break state)
- Error handling works (if you simulate an error)

**Files to create**:
- `src/core/api/mockData.ts`

**Files to modify**:
- `src/features/tasks/services/taskService.ts`
- `src/App.tsx`

**Hints**:
- Mock delay: `await new Promise(resolve => setTimeout(resolve, 500))`
- Task ID: use `crypto.randomUUID()` for new tasks
- Always update state optimistically or wait for response
- Handle cleanup in useEffect (return cleanup function)
- Loading state should disable form and show spinner

---

## #9 - Error Handling Pattern

**Objective**: Implement consistent error handling and display

**What you'll learn**:
- Error state management
- Error boundary concepts
- User feedback patterns

**Tasks**:
1. Enhance `src/features/tasks/hooks/useTaskError.ts` to:
   - Store errors in state
   - Clear errors after 5-second timeout
   - Map error types to user-friendly messages
   - Support multiple concurrent errors
2. Create `src/shared/components/ErrorAlert.tsx`:
   - Accepts error message and onDismiss callback
   - Styled to stand out (red background, clear button)
   - Shows error icon
3. Use the hook in App.tsx for:
   - API errors
   - Validation errors
4. Handle different error scenarios:
   - Network error
   - Server error (500)
   - Validation error (400)
   - Not found (404)
5. Display errors in UI (toast/alert/banner)

**Acceptance Criteria**:
- Validation errors show in form (inline or banner)
- API errors show as alert
- Errors auto-clear after 5 seconds or on manual dismiss
- Different error types have different messages
- Loading does not interfere with error display
- Multiple errors can be shown simultaneously

**Files to create**:
- `src/shared/components/ErrorAlert.tsx`

**Files to modify**:
- `src/features/tasks/hooks/useTaskError.ts`
- `src/App.tsx`

**Hints**:
- Error object: `{ type: 'api' | 'validation' | 'network', message: string }`
- Use keys (IDs) to track multiple errors if needed
- setTimeout for auto-clearing
- ErrorAlert should be dismissible

---

## #10 - Loading & Optimistic Updates

**Objective**: Improve UX with loading states and optimistic updates

**What you'll learn**:
- Optimistic UI patterns
- Loading state management
- User experience patterns

**Tasks**:
1. Add `isLoading` state to App.tsx (track which task is loading)
2. Implement optimistic updates:
   - Update local state immediately when user acts
   - Call API in background
   - Rollback if API fails
3. Add loading states:
   - Loading skeleton/spinner for TaskList
   - Disabled form buttons during submission
   - Show which task is being acted on (loading indicator on TaskCard)
4. Disable user interactions while loading to prevent double-clicks
5. Handle rollback on error:
   - If delete fails, put task back in list
   - If create fails, remove from UI and show error

**Acceptance Criteria**:
- UI updates immediately when user adds/edits/deletes (no waiting)
- Loading indicator shows which task is loading
- If API fails, state reverts to previous state
- Form is disabled during submission
- Users cannot accidentally duplicate requests
- Rollback happens smoothly without jarring UI changes

**Files to modify**:
- `src/App.tsx`
- `src/features/tasks/components/TaskCard.tsx`
- `src/features/tasks/components/TaskList.tsx`

**Hints**:
- Store previous state before optimistic update
- Use separate loading state per task: `{ [taskId]: true }`
- Show spinner overlay on individual task cards
- Implement rollback in error catch block

---

## #11 - Shared Component Patterns

**Objective**: Build shared UI components following your structure

**What you'll learn**:
- Component API design
- Composition over configuration
- Component prop patterns

**Tasks**:
1. Enhance `src/shared/components/Button.tsx`:
   - Add variant prop: `primary`, `secondary`, `danger`
   - Add size prop: `sm`, `md`, `lg`
   - Add loading state (disabled + spinner)
   - Support children as button text
2. Create `src/shared/components/Input.tsx`:
   - Support type: `text`, `date`, `textarea`
   - Bind to value/onChange
   - Show label and error message
   - Placeholder support
3. Create `src/shared/components/Card.tsx`:
   - Wrapper component for consistent styling
   - Accepts children and className
4. Create `src/shared/components/Badge.tsx`:
   - Display status (Completed, Pending, Overdue)
   - Color based on status
5. Create `src/shared/components/LoadingSpinner.tsx`:
   - Simple spinner animation
   - Optional text
6. Update feature components to use shared components
7. Update exports in `src/shared/index.ts`

**Acceptance Criteria**:
- All UI uses shared components (no duplicate Tailwind patterns)
- Components accept common props (className, disabled, etc.)
- Components are fully TypeScript typed
- Consistent look and feel across app
- No hardcoded colors (use Tailwind standardized colors)
- Components work with Tailwind classes

**Files to create**:
- `src/shared/components/Input.tsx`
- `src/shared/components/Card.tsx`
- `src/shared/components/Badge.tsx`
- `src/shared/components/LoadingSpinner.tsx`

**Files to modify**:
- `src/shared/components/Button.tsx`
- `src/features/tasks/components/TaskCard.tsx`
- `src/features/tasks/components/TaskForm.tsx`
- `src/features/tasks/components/TaskList.tsx`
- `src/shared/index.ts`

**Hints**:
- Use `React.ComponentProps<'button'>` to extend HTML element props
- Tailwind variants: use `clsx` or `classnames` for conditional classes
- Keep components simple, focused on presentation
- Pass through unused props with `...rest`

---

## #12 - Context & State Management

**Objective**: Extract app state to Context to avoid prop drilling

**What you'll learn**:
- Context API patterns
- Provider patterns
- Separation of concerns

**Tasks**:
1. Create `src/core/context/TaskContext.tsx`:
   - Define TaskContextType with state and handlers
   - Create TaskContext using `createContext`
   - Create TaskProvider component that:
     - Holds task state
     - Exports state and handlers as value
     - Renders children with provider
   - Create custom hook `useTaskContext()` that hooks into context
2. Move all task state and handlers from App.tsx to TaskProvider
3. Update App.tsx to wrap children with TaskProvider
4. Update components to use `useTaskContext()` instead of props:
   - TaskList gets tasks from context (not props)
   - TaskForm calls handler from context (not props)
   - TaskCard calls handler from context (not props)
5. Remove prop drilling from components (they get context directly)

**Acceptance Criteria**:
- No prop drilling (max 1 level deep for non-shared props)
- TypeScript types are correct and exported
- Components can access task state via hook
- State updates work across deep component trees
- Error handling and loading states preserved
- App structure follows provider/consumer pattern

**Files to create**:
- `src/core/context/TaskContext.tsx`

**Files to modify**:
- `src/App.tsx`
- `src/features/tasks/components/TaskList.tsx`
- `src/features/tasks/components/TaskCard.tsx`
- `src/features/tasks/components/TaskForm.tsx`

**Hints**:
- Context type: includes both state (tasks, isLoading) and handlers (add, edit, delete)
- Provider should memoize value to prevent unnecessary re-renders
- Export both context and hook for flexibility
- Keep context focused on one domain (tasks in this case)
- Leave non-task-specific UI state (modals, etc.) in local component state

---

## #13 - TypeScript Patterns

**Objective**: Strengthen TypeScript usage throughout the app

**What you'll learn**:
- Generic types
- Discriminated unions
- Type guards
- Utility types

**Tasks**:
1. Create `src/shared/types/apiResponse.ts`:
   - Define generic `ApiResponse<T, E = Error>` type
   - Define `ApiError` type with error codes and messages
   - Include success flag and metadata
2. Update `src/features/tasks/types/index.ts`:
   - Add `TaskStatus` as discriminated union or enum
   - Add `TaskFilter` type for filter options
   - Use utility types: `Pick`, `Omit`, `Partial`, `Readonly`
   - Add type guards: `isTask()`, `isTaskComplete()`
3. Update service signatures to return `Promise<ApiResponse<T>>`
4. Add type guards in components to validate runtime data
5. Use `const` assertions where appropriate
6. Enable strict mode in tsconfig if not already

**Acceptance Criteria**:
- No `any` types in codebase
- All functions have explicit return types
- Type imports use `import type` keyword
- Props interfaces properly typed
- Generic types used where appropriate
- Type guards for runtime validation
- Strict mode enabled in tsconfig

**Files to create**:
- `src/shared/types/apiResponse.ts`

**Files to modify**:
- `src/features/tasks/types/index.ts`
- `src/features/tasks/services/taskService.ts`
- `tsconfig.app.json` (enable strict mode)

**Hints**:
- TaskStatus: `type TaskStatus = 'pending' | 'completed' | 'overdue'`
- ApiResponse: `{ success: boolean; data?: T; error?: E }`
- Type guard: `function isTask(obj: unknown): obj is Task { ... }`
- Use `Readonly<T>` for immutable types
- Discriminated union: `type Result = { type: 'success'; data: T } | { type: 'error'; error: E }`

---

## #14 - Testing Basics

**Objective**: Write tests for pure functions and utilities

**What you'll learn**:
- Testing utilities and services
- Test structure (arrange, act, assert)
- Mocking

**Tasks**:
1. Install testing dependencies: `pnpm add -D vitest @testing-library/react @testing-library/jest-dom`
2. Set up Vitest in `vite.config.ts`
3. Create test files for `src/features/tasks/utils/taskHelpers.ts`:
   - Test `isTaskCompleted()`
   - Test `isTaskOverdue()`
   - Test `sortByDueDate()`
   - Test any other utility functions
4. Test validation functions with multiple scenarios:
   - Valid input
   - Invalid input
   - Edge cases
5. Write tests with descriptive names
6. Achieve >80% code coverage for utilities

**Acceptance Criteria**:
- All utility functions have tests
- 80%+ code coverage for utilities
- Tests use clear naming (describe what they test)
- Tests follow AAA pattern (Arrange, Act, Assert)
- Tests pass locally with `pnpm test`
- Tests can run in CI/CD

**Files to create**:
- `src/features/tasks/utils/__tests__/taskHelpers.test.ts`
- `vite.config.ts` (update to include Vitest)

**Hints**:
- Test structure: `describe('taskHelpers', () => { it('should...', () => { ... }) })`
- Use `expect()` for assertions
- Test both happy path and edge cases
- Mock data should be realistic but minimal
- Consider edge cases: empty arrays, null values, future/past dates

---

## #15 - Component Testing

**Objective**: Test React components with React Testing Library

**What you'll learn**:
- Component testing patterns
- User event simulation
- Query strategies

**Tasks**:
1. Write tests for TaskCard component:
   - Renders task name, description, due date
   - Delete button is present and clickable
   - Calls `onDelete` handler when delete clicked
   - Completion status displays correctly
2. Write tests for TaskForm component:
   - Form renders input fields
   - Form submission calls `onSubmit` handler
   - Validation prevents empty submissions
   - Edit mode pre-fills fields correctly
3. Write tests for TaskList component:
   - Renders all tasks in list
   - Passes correct props to each TaskCard
   - Shows empty state when no tasks
4. Test error boundary/error display

**Acceptance Criteria**:
- Components have >80% test coverage
- Tests focus on user behavior, not implementation details
- Use `user-event` library for interactions (not fireEvent)
- Test actual clicks, form submissions, not code details
- No snapshot tests (focus on behavior assertions)
- All tests pass
- Can run with `pnpm test`

**Files to create**:
- `src/features/tasks/components/__tests__/TaskCard.test.tsx`
- `src/features/tasks/components/__tests__/TaskForm.test.tsx`
- `src/features/tasks/components/__tests__/TaskList.test.tsx`

**Hints**:
- Use `render()` from @testing-library/react
- Use `screen.getByRole()`, `screen.getByText()` for queries
- Use `userEvent` for interactions: `await user.click(button)`
- Test behavior: "When I click delete, onDelete is called"
- Don't test implementation details like state

---

## Summary

These 12 drills build progressive understanding of React patterns:

- **#4-5**: Component composition and state management
- **#6-7**: Custom hooks and derived state
- **#8-10**: Async patterns, APIs, and UX
- **#11-13**: Advanced patterns (components, context, types)
- **#14-15**: Testing

After completing these, you'll have a solid understanding of production React patterns and be ready to tackle larger projects.

Good luck! 🚀
