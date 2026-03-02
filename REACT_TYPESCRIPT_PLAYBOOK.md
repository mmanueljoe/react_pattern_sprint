# React + TypeScript Playbook (from JavaScript)

This is a “from first principles” guide you can keep in your repo so you stop re-learning (and re-Googling) how modern React + TypeScript projects are wired together.

- **Goal**: reduce confusion, reduce AI dependence, and make “new project setup” repeatable.
- **Scope**: Vite + React + TypeScript + ESLint + Prettier + Git hooks.
- **Style**: plain English, with checklists and official sources.

---

## The big picture (mental model)

A modern React + TS app is usually 4 tools working together:

1) **Vite (bundler/dev server)**
- Runs your app locally (`dev`) and builds it for production (`build`).
- Reads `vite.config.ts`.

2) **TypeScript (type-checker)**
- Checks your code for type mistakes *before* runtime.
- Reads `tsconfig*.json`.
- TypeScript doesn’t “run” your app in the browser; Vite does.

3) **ESLint (code-quality rules)**
- Finds bug patterns and rule violations (React hooks misuse, unsafe patterns, unused vars, etc.).
- Reads `eslint.config.js`.

4) **Prettier (formatter)**
- Makes code consistently formatted (line breaks, quotes, indentation).
- Should **not** compete with ESLint for formatting rules.

Think of it like:

- **Vite builds/runs**
- **TS checks types**
- **ESLint checks rules**
- **Prettier formats**

---

## Your repo right now (what each core file is doing)

This section is tailored to your current repo contents.

### `package.json`

This is the “manifest” for your project:

- **Dependencies**: stuff your app uses at runtime in the browser.
- **Dev dependencies**: tooling you use to build/lint/type-check.
- **Scripts**: the commands you run with `pnpm <script>`.

In your repo:

- `dev`: runs `vite`
- `build`: runs `tsc -b` (build mode using project references) then `vite build`
- `lint`: runs `eslint .`
- `preview`: runs `vite preview`

Rule of thumb:

- If it runs in the browser in production → `dependencies`
- If it’s only a tool (build/lint/test/typecheck) → `devDependencies`

### `vite.config.ts`

This is Vite’s configuration, and it runs in **Node**, not in the browser.

In your repo, it imports:

- `defineConfig` from `vite`
- the React plugin from `@vitejs/plugin-react`
- the Tailwind plugin from `@tailwindcss/vite`

and then exports a config with those plugins enabled.

### `tsconfig.json` (root)

This file is acting as a **solution config**: it doesn’t compile source itself, it just points TypeScript build mode at sub-projects via `references`.

### `tsconfig.app.json`

TypeScript settings for your **browser app code** (`src/**`):

- includes DOM libs
- enables JSX
- includes `vite/client` types (for `import.meta.env`, etc.)

### `tsconfig.node.json`

TypeScript settings for **Node/tooling code**, currently including `vite.config.ts`:

- includes Node types
- uses modern `moduleResolution` suitable for bundlers

### `eslint.config.js`

Your ESLint configuration is using **ESLint flat config** and applies:

- recommended base JS rules
- recommended TypeScript ESLint rules
- React hooks rules
- React refresh rules for Vite projects

---

## The “Cannot find module 'vite' …” error (what it actually means)

When TypeScript shows:

> Cannot find module 'vite' or its corresponding type declarations.

…that’s almost never “your config is wrong”. It means TypeScript can’t resolve the installed package/types for the environment it’s type-checking.

Common causes:

- **Dependencies aren’t installed** yet (no `node_modules`), so `vite` can’t be resolved.
- **Your editor is using a global TypeScript** instead of the repo’s workspace TypeScript.
- **The file is checked by a Node/tooling TS config** (like `tsconfig.node.json`) and the editor can’t see the installed packages because install hasn’t completed yet.

What stops it from recurring:

- Run install right after scaffolding: `pnpm install`
- In VS Code: “TypeScript: Select TypeScript Version…” → **Use Workspace Version**
- Verify with: `pnpm tsc -p tsconfig.node.json`

---

## TypeScript for JavaScript devs (the parts that matter most)

### What TS is trying to do

TypeScript is trying to answer: “What shapes of data can flow here?”

So you catch mistakes like:

- wrong property names
- missing fields
- wrong event types
- mixing `string` vs `number`
- forgetting `undefined`/`null` cases

before you ship.

### The highest-ROI habit: “type the boundaries”

You don’t need to annotate everything. The best payoff is typing **boundaries**:

- API responses (untrusted data)
- component props
- context values
- reducer actions
- shared utilities (functions used in many places)

Inside functions/components, let **inference** work.

### `any` vs `unknown`

- **`any`**: turns off safety (TS stops helping)
- **`unknown`**: “we don’t know yet; you must check before using”

For untrusted inputs (API, `localStorage`, query params), prefer **`unknown`** and narrow/validate.

### `type` vs `interface`

Both are fine. A simple rule:

- Use **`type`** most of the time (unions, function types, helpers).
- Use **`interface`** when you want extension/merging or a “shape others will extend”.

### Unions + narrowing (the secret weapon)

Instead of “optional fields everywhere”, model states explicitly, e.g.:

- Loading | Success | Error

Then UI code becomes harder to break because TS forces you to handle each case.

### `as const` and `satisfies`

- **`as const`**: keeps literal values literal (e.g. `'dark'` stays `'dark'` not `string`)
- **`satisfies`**: checks your object matches a type without widening everything (great for config objects)

---

## React + TypeScript (practical patterns)

### Props typing

Type props once, destructure in parameters:

- Define `type Props = { ... }`
- `function Component({ ... }: Props) { ... }`

### Events

Stop guessing event types:

- `React.ChangeEvent<HTMLInputElement>`
- `React.FormEvent<HTMLFormElement>`
- `React.MouseEvent<HTMLButtonElement>`

### `useState`

- If you initialize with a value, TS infers it: `useState(0)` is `number`.
- If you initialize empty, annotate: `useState<User | null>(null)`.

### `useRef`

- DOM refs: `useRef<HTMLDivElement | null>(null)`
- mutable values: `useRef<number>(0)`

### Context

Type the context value. If it must exist, enforce usage with a custom hook that throws when used outside the provider.

---

## A production-grade “quality” stack (linting + formatting + hooks)

You asked for “supports readability, maintainability, and fewer bugs”.
This is the practical combo that does that **without** turning setup into a second job.

### ESLint (correctness + code smells)

ESLint should focus on:

- correctness rules (bugs, unsafe patterns)
- React rules (especially hooks)
- TypeScript rules (typescript-eslint)

Two levels:

- **Basic (fast)**: doesn’t require type-aware linting.
- **Typed (stricter)**: uses your TS program for deeper checks (slower but catches more).

Rule of thumb:

- Start with **basic**. Add **typed** linting after you’re comfortable.

### Prettier (formatting only)

Prettier should own formatting.

To prevent “ESLint vs Prettier” conflicts:

- use `eslint-config-prettier` so ESLint turns off formatting rules that fight Prettier
- format on save in your editor using Prettier

Avoid mixing responsibilities:

- ESLint = code quality
- Prettier = code style/formatting

### Git hooks (automate quality checks)

Best practice:

- **pre-commit**: run quick checks only on staged files (fast)
  - Prettier + ESLint `--fix` on staged files
- **pre-push**: optionally run heavier checks
  - typecheck and tests

Common tools:

- **Husky**: manages git hooks
- **lint-staged**: runs checks only on staged files

### CI (the real enforcement)

Hooks are convenience. CI is enforcement.

In CI you typically run:

- `pnpm lint`
- `pnpm tsc -b` (or `pnpm build` if that includes typechecking)
- tests (when you add them)

---

## Project structure that stays maintainable

Start simple; scale when you feel pain.

A structure that scales in typical apps:

- `src/`
  - `app/` (app shell, providers, routing, global state)
  - `components/` (reusable UI components)
  - `features/` (domain folders: auth, dashboard, settings)
  - `lib/` (shared utilities: api client, validation, helpers)
  - `types/` (only truly shared types; keep small)
  - `styles/` (global styles)
  - `assets/`

Guidelines:

- Keep code close to where it’s used.
- Don’t create `types/` for everything; keep types near usage unless shared widely.
- Move to “feature folders” when you have real product domains.

---

## “What runs when?” (how configs cooperate)

When you run:

### `pnpm dev`

- Vite starts and reads `vite.config.ts`
- serves `index.html`
- loads `src/main.tsx`, which mounts React

TypeScript during dev:

- your editor’s TS server type-checks as you code
- Vite primarily transpiles and bundles

### `pnpm build`

- TypeScript build mode checks projects referenced by `tsconfig.json`
- then Vite bundles to `dist/`

When you see editor errors:

- TS Server: reads `tsconfig.app.json` for `src/**`, `tsconfig.node.json` for Node config files
- ESLint extension: reads `eslint.config.js`
- Prettier extension: formats on save (if enabled)

---

## Minimal rules of the road (to reduce AI dependence)

1) Install deps first: `pnpm install`
2) Always use workspace TypeScript in the editor.
3) Keep TypeScript strict; don’t “turn it off” to move faster.
4) Avoid `any` (use `unknown` + narrowing/validation for external data).
5) Let Prettier own formatting; let ESLint own correctness.
6) Run typecheck in CI (hooks are not enough).
7) Type your boundaries; let inference do the rest.

---

## Official / verifiable sources

- React: Using TypeScript: `https://react.dev/learn/typescript`
- TypeScript Handbook (Intro): `https://www.typescriptlang.org/docs/handbook/intro`
- TypeScript “The Basics”: `https://www.typescriptlang.org/docs/handbook/2/basic-types.html`
- TSConfig reference (all options): `https://www.typescriptlang.org/tsconfig`
- TypeScript Project References: `https://www.typescriptlang.org/docs/handbook/project-references.html`
- TSConfig `moduleResolution`: `https://www.typescriptlang.org/tsconfig/moduleResolution.html`
- Vite config docs: `https://vite.dev/config`
- ESLint flat config intro: `https://eslint.org/blog/2022/08/new-config-system-part-2/`
- ESLint `defineConfig`/`globalIgnores` helpers (flat config): `https://eslint.org/blog/2025/03/flat-config-extends-define-config-global-ignores`
- typescript-eslint Getting Started: `https://typescript-eslint.io/getting-started`
- Prettier: Integrating with linters: `https://prettier.io/docs/en/next/integrating-with-linters.html`
- eslint-config-prettier README: `https://github.com/prettier/eslint-config-prettier`
- Husky docs: `https://typicode.github.io/husky/`
- lint-staged docs: `https://github.com/lint-staged/lint-staged`

