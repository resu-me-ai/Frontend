# Frontend -- Resu-ME AI

Vite + React 19 + TypeScript + Tailwind CSS v4 single-page application.

## Prerequisites

- Node.js 18+
- pnpm
- Clerk account for auth keys

## Setup

```bash
pnpm install

# Copy env template and fill in values
cp .env.example .env
```

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key |
| `VITE_API_BASE_URL` | No | FastAPI AI pipeline (default `http://localhost:8000`) |
| `VITE_BACKEND_URL` | No | NestJS CRUD backend (default `http://localhost:3000`) |

The app talks to two backends: FastAPI on port 8000 handles the AI analysis pipeline, NestJS on port 3000 handles auth, subscriptions, and CRUD operations.

## Commands

```bash
pnpm run dev              # Dev server (port 5173)
pnpm run build            # Type-check + production build
pnpm test                 # Vitest tests
pnpm run test:watch       # Vitest in watch mode
pnpm run test:coverage    # Coverage report
pnpm run storybook        # Component docs (port 6006)
pnpm exec tsc --noEmit    # Type-check only
pnpm run lint             # ESLint
```

## Testing

```bash
# Unit + component tests (no setup needed)
pnpm test

# Storybook integration tests (requires Playwright — one-time setup)
pnpm exec playwright install chromium
pnpm run test:storybook
```

## Architecture

### Component hierarchy (Atomic Design)

```
atoms/        -- Base elements: Button, Input, Badge, Card, ProgressBar
molecules/    -- Composed elements: ChatBubble, FileDropzone, StatCard
organisms/    -- Sections: AppHeader, ConversationPanel, UploadResumeSection
templates/    -- Page layouts: DashboardView, AnalysisScoreLayout, AuthLayout
pages/        -- Route entry points: HomePage, DashboardPage, PricingPage
```

### Key libraries

| Library | Purpose |
|---------|---------|
| React 19 | UI framework |
| Tailwind CSS v4 | Styling (utility-first, `@theme` tokens) |
| Clerk | Authentication and session management |
| TanStack Query | Server state and caching |
| TanStack Form | Form state and validation |
| React Router v7 | Client-side routing |
| Storybook 10 | Component documentation and visual testing |
| Vitest | Unit and component tests |
| Tiptap | Rich text editing |

### Directory layout

```
src/
  api/            # API clients (client.ts, queryClient.ts)
  assets/         # Static assets, icons, SVGs
  components/     # Atomic design components (see above)
  contexts/       # React context providers
  hooks/          # Custom hooks
  pages/          # Route-level page components
  providers/      # Clerk, Query, and other providers
  types/          # Shared TypeScript types
  utils/          # Utility functions
  App.tsx         # Root component with router
  main.tsx        # Entry point
  index.css       # Global styles and Tailwind config
```

### Dual API routing

`src/api/client.ts` exposes two base URL helpers:

- `getApiBase()` -- Points to FastAPI (`VITE_API_BASE_URL`). Used for all `/pipeline/*` AI analysis requests.
- `getBackendBase()` -- Points to NestJS (`VITE_BACKEND_URL`). Used for auth callbacks, Stripe checkout, job CRUD.

## Storybook

Stories live alongside components (`*.stories.tsx`). Run `pnpm run storybook` to browse at `http://localhost:6006`.

Build a static Storybook site:

```bash
pnpm run build-storybook
```

## Troubleshooting

**Styles not loading:** Clear the Vite cache with `rm -rf node_modules/.vite` and restart the dev server.

**Clerk errors:** Verify `VITE_CLERK_PUBLISHABLE_KEY` is set in `.env` and matches your Clerk dashboard.

**Import path errors:** The `@/` alias is configured in both `vite.config.ts` and `tsconfig.json`. Restart your IDE TypeScript server if it is not resolving.
