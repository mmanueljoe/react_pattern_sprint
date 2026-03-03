# React Pattern Sprint

A structured learning project to build React and TypeScript proficiency through progressive drills. Each drill builds on the previous one, introducing new patterns and concepts.

## 📚 Project Overview

This project is a **Task Manager** application built following the React Pattern Sprint curriculum. The goal is to learn modern React patterns, TypeScript, and best practices through hands-on implementation.

## 🎯 Drills (Learning Modules)

The sprint consists of 15 progressive drills:

### Foundation (Drills #1-3)
- **#1**: Project Setup & Type Definitions
- **#2**: TaskCard Component (individual task display)
- **#3**: TaskList Component (list management)

### Core Patterns (Drills #4-7)
- **#4**: App Integration (layout and component composition)
- **#5**: Local State Management (lifting state up, prop drilling)
- **#6**: Custom Hooks (form state management)
- **#7**: Task Filtering & Sorting (derived state)

### Async & UX (Drills #8-10)
- **#8**: Mock API Integration (async operations)
- **#9**: Error Handling (error states and display)
- **#10**: Loading & Optimistic Updates (UX improvements)

### Advanced Patterns (Drills #11-13)
- **#11**: Shared Component Patterns (reusable UI components)
- **#12**: Context & State Management (avoiding prop drilling)
- **#13**: TypeScript Patterns (advanced typing)

### Testing (Drills #14-15)
- **#14**: Testing Basics (utility and service tests)
- **#15**: Component Testing (React Testing Library)

## 🛠 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool with HMR
- **Tailwind CSS** - Styling
- **pnpm** - Package manager

## 📁 Project Structure

```
src/
├── core/                    # Core application logic
│   ├── api/                # API services and mock data
│   └── context/            # React Context providers
├── features/               # Feature modules
│   └── tasks/             # Task feature
│       ├── components/    # Task UI components
│       ├── hooks/         # Custom hooks
│       ├── services/      # Business logic
│       ├── types/         # TypeScript types
│       └── utils/         # Utility functions
├── shared/                 # Shared resources
│   ├── components/        # Reusable UI components
│   ├── types/            # Shared types
│   └── index.ts          # Barrel exports
└── App.tsx               # Root component
```

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint
```

## 📖 How to Use This Project

1. Read the objective in `DRILLS.md` for the current drill
2. Implement the code according to the tasks and acceptance criteria
3. Test locally with `pnpm dev`
4. Verify TypeScript with `pnpm build`
5. Check code quality with `pnpm lint`
6. Commit your work
7. Move to the next drill

## 🎓 Learning Path

This sprint teaches:
- Component composition and reusability
- State management (props, hooks, Context)
- Custom hooks and hook composition
- Async operations and API integration
- Error handling and UX patterns
- TypeScript advanced patterns
- Testing strategies

## 📝 Current Progress

Track completed drills in `DRILLS.md` - each drill includes completion notes and learning outcomes.
