# Project Structure - Production Grade React + TypeScript

This document explains how this project is organized and the patterns we follow for maintainability and scalability.

---

## Directory Layout

```
react_pattern_sprint/
├── src/
│   ├── core/                  # Core infrastructure (tooling, config, API)
│   │   ├── api/              # HTTP client, API communication
│   │   └── config/           # App-level configuration (routes, constants)
│   │
│   ├── features/             # Feature-based domain folders
│   │   └── tasks/            # Tasks feature (example)
│   │       ├── components/   # Feature-specific components
│   │       ├── hooks/        # Feature-specific custom hooks
│   │       ├── services/     # API/business logic services
│   │       ├── types/        # Feature-specific types
│   │       ├── utils/        # Feature-specific utilities
│   │       └── index.ts      # Public API exports
│   │
│   ├── shared/               # Reusable across features
│   │   ├── components/       # Shared UI components (Button, Input, etc.)
│   │   ├── hooks/            # Shared custom hooks (useLocalStorage, etc.)
│   │   ├── types/            # Types used across multiple features
│   │   ├── constants/        # Shared constants
│   │   ├── utils/            # Shared utility functions
│   │   └── index.ts          # Public API barrel exports
│   │
│   ├── assets/               # Images, SVGs, static files
│   ├── App.tsx               # Root component
│   ├── main.tsx              # React DOM mount point
│   └── index.css             # Global styles
│
├── public/                   # Static files served as-is
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript solution config (project references)
├── tsconfig.app.json         # TypeScript config for browser code
├── tsconfig.node.json        # TypeScript config for Node/tooling code
├── vite.config.ts            # Vite bundler configuration
├── eslint.config.js          # ESLint rules configuration
├── index.html                # HTML entry point
└── README.md                 # Project documentation
```

---

## Core Principles

### 1. **Feature-Based Organization** (`src/features/`)

Each feature is a **self-contained domain** with its own:
- Components (private to this feature)
- Services (API calls, business logic)
- Hooks (custom React logic)
- Types (specific to this feature)
- Utils (helpers specific to this feature)

**Export public API via `index.ts`** so other features import from `src/features/tasks` not `src/features/tasks/components/TaskCard`.

```typescript
// src/features/tasks/index.ts
export { TaskCard } from './components/TaskCard'
export { useTaskFilter } from './hooks/useTaskFilter'
export { taskService } from './services/taskService'
export type { Task, CreateTaskDTO } from './types'
```

### 2. **Separation of Concerns**

| Layer | Responsibility | Examples |
|-------|-----------------|----------|
| **Components** | Render UI, handle user input | TaskCard, TaskForm, TaskList |
| **Services** | API calls, business logic | taskService.fetchTasks(), taskService.createTask() |
| **Hooks** | Stateful React logic, side effects | useTaskFilter, useTaskForm |
| **Types** | TypeScript definitions | Task, CreateTaskDTO, TaskFilter |
| **Utils** | Pure functions, helpers | isTaskCompleted(), sortByDueDate() |

### 3. **Core Infrastructure** (`src/core/`)

- **api/httpClient.ts**: Centralized HTTP client (handles auth, base URLs, error handling)
- **config/routes.ts**: Route definitions, feature flags, app configuration

### 4. **Shared Code** (`src/shared/`)

Only move code here when it's used by **2+ features** OR it's a foundational component:
- **components/**: UI components everyone uses (Button, Input, Modal)
- **hooks/**: Reusable logic (useLocalStorage, usePagination)
- **types/**: Domain-wide types (User, ErrorResponse)
- **constants/**: Shared constants (API URLs, timeout values)
- **utils/**: General helpers (formatDate, debounce)

---

## File Naming Conventions

- **Components**: PascalCase, `.tsx` extension
  - `TaskCard.tsx`, `TaskForm.tsx`

- **Services**: camelCase, `.ts` extension
  - `taskService.ts`, `authService.ts`

- **Hooks**: camelCase, `use` prefix, `.ts` extension
  - `useTaskFilter.ts`, `useLocalStorage.ts`

- **Types**: Index file in folder
  - `src/features/tasks/types/index.ts` (house all types for tasks)

- **Utils**: camelCase, `.ts` extension
  - `taskHelpers.ts`, `dateHelpers.ts`

---

## Dependency Flow

**Golden Rule**: Dependencies should flow inward, never outward.

```
features/tasks → shared → core (api, config)
features/auth  → shared → core (api, config)

❌ DON'T: shared → features  (shared is reusable, should never depend on features)
❌ DON'T: core → features    (core is foundational, shouldn't know about domains)
```

---

## Example: Adding a New Feature

### Step 1: Create Feature Structure
```
src/features/projects/
├── components/
│   ├── ProjectCard.tsx
│   └── ProjectList.tsx
├── hooks/
│   └── useProjectFilter.ts
├── services/
│   └── projectService.ts
├── types/
│   └── index.ts
├── utils/
│   └── projectHelpers.ts
└── index.ts
```

### Step 2: Define Types
```typescript
// src/features/projects/types/index.ts
export type Project = {
  id: string
  name: string
  description?: string
  createdAt: Date
}

export type CreateProjectDTO = Omit<Project, 'id' | 'createdAt'>
```

### Step 3: Create Service (API Layer)
```typescript
// src/features/projects/services/projectService.ts
import { httpClient } from '@/core/api/httpClient'
import type { Project, CreateProjectDTO } from '../types'

export const projectService = {
  async fetchAll(): Promise<Project[]> {
    return httpClient.get('/projects')
  },

  async create(data: CreateProjectDTO): Promise<Project> {
    return httpClient.post('/projects', data)
  },
}
```

### Step 4: Create Components
```typescript
// src/features/projects/components/ProjectCard.tsx
import type { Project } from '../types'

type Props = {
  project: Project
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onDelete }: Props) {
  return (
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <button onClick={() => onDelete(project.id)}>Delete</button>
    </div>
  )
}
```

### Step 5: Export Public API
```typescript
// src/features/projects/index.ts
export { ProjectCard } from './components/ProjectCard'
export { ProjectList } from './components/ProjectList'
export { projectService } from './services/projectService'
export type { Project, CreateProjectDTO } from './types'
```

### Step 6: Use in App
```typescript
// src/App.tsx
import { ProjectList, projectService } from '@/features/projects'

export function App() {
  // Use the feature through its public API
}
```

---

## TypeScript Configuration

| File | Purpose |
|------|---------|
| `tsconfig.json` | Solution config, references sub-projects |
| `tsconfig.app.json` | Browser code (src/**), includes DOM types, JSX enabled |
| `tsconfig.node.json` | Node code (vite.config.ts, eslint.config.js) |

**Key setting**: `compilerOptions.moduleResolution: "bundler"` — modern, works with Vite and npm packages.

---

## When to Refactor / Reorganize

### Move to `shared/` when:
- Used by 2+ features
- Foundational (doesn't depend on features)
- Unlikely to change with a single feature

### Keep in `features/` when:
- Only one feature uses it
- Tightly coupled to that feature's domain
- Specific to that feature's behavior

### When `core/` needs expansion:
- **Multiple services** → `src/core/services/`
- **Shared state management** → `src/core/state/`
- **Error handling** → `src/core/errors/`

---

## Development Workflow

### Running the App
```bash
pnpm dev     # Start dev server
pnpm build   # Typecheck + bundle
pnpm lint    # Check code quality
```

### Before Pushing Code
1. **Type-check**: `pnpm build` (includes `tsc -b`)
2. **Lint**: `pnpm lint` (ESLint checks)
3. **Manual test**: `pnpm dev` and verify features work

---

## Key Takeaways for Scalability

1. **Features are independent domains** → teams can work in parallel
2. **Shared code is minimal and boring** → reduces coupling
3. **Public APIs via `index.ts`** → internal refactoring won't break imports
4. **Clear dependency flow** → no circular dependencies
5. **TypeScript enforces boundaries** → catches structural mistakes early

This structure scales from 1 person to 50+ developers because:
- New features don't touch existing code
- Shared code is stable and battle-tested
- Code is colocated by domain (easy to navigate)
- Dependencies are explicit and directional
