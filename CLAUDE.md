# CLAUDE.md — resu-me-frontend

## Repo Overview

This is the standalone repo for the Resu-ME AI frontend (Vite + React + TypeScript + TailwindCSS).

**Source of truth:** `packages/frontend/` in the monorepo (`resu-me-ai/resu-me-ai-mvp`).
This repo is synced from the monorepo via rsync after each feature merge.

**Active development happens in the monorepo.** PRs and commits here are for:
- Hotfixes that need to ship immediately
- CI/CD pipeline artifacts
- External contributor contributions (which get synced back to monorepo)

---

## Claude Code Launch

```bash
cd ~/startup-repos/resu-me-ai-frontend && claude
```

---

## Key Commands

```bash
# Install dependencies
pnpm install

# Dev server (port 5173)
pnpm run dev

# Production build
pnpm run build

# Unit + component tests
pnpm test

# Storybook (component explorer)
pnpm run storybook

# Storybook integration tests (requires Playwright — one-time setup)
pnpm exec playwright install chromium
pnpm run test:storybook
```

---

## Environment Setup

```bash
cp .env.example .env
# Edit .env and fill in at minimum:
# - VITE_CLERK_PUBLISHABLE_KEY (get from Clerk dashboard)
# - VITE_API_BASE_URL (FastAPI service, default: http://localhost:8000/api/v1)
# - VITE_BACKEND_URL (NestJS API, default: http://localhost:3000/api/v1)
# Stripe price IDs are optional for local development
# Set VITE_DEMO_MODE=true to use mock data without a running backend
```

---

## Architecture

```
src/
├── components/      # Reusable UI components
├── pages/           # Route-level page components
├── hooks/           # Custom React hooks (usePipeline, useCheckout, etc.)
├── contexts/        # React context providers
├── stories/         # Storybook stories (colocated with components)
├── lib/             # Utilities, API client
└── types/           # TypeScript type definitions
```

**API routing:**
- `getApiBase()` → FastAPI (port 8000) — AI pipeline calls
- `getBackendBase()` → NestJS (port 3000) — CRUD, auth, billing

---

## Sync from Monorepo

After merging a frontend PR in the monorepo:

```bash
# From monorepo root (~/resu-me-ai-mvp/)
rsync -av --delete \
  packages/frontend/ \
  ~/startup-repos/resu-me-ai-frontend/ \
  --exclude='.git' --exclude='node_modules' --exclude='.vite' --exclude='.env' --exclude='dist'
cd ~/startup-repos/resu-me-ai-frontend
git add -A && git commit -m "sync: import packages/frontend from monorepo ($(date +%Y-%m-%d))"
git push origin main
```

---

## Planning Standards

Before planning any non-trivial task, follow this process:

### 1. Explore First
Launch Explore agents to audit the relevant code before proposing anything. Never guess at file paths, imports, or behavior. Read every relevant file.

### 2. Ask Questions Until Zero Assumptions
Use AskUserQuestion for every decision point. Keep asking until you have no remaining assumptions. Explicitly state your confidence level (%) before calling ExitPlanMode. List any remaining gaps.

### 3. Plan Format
Every plan must follow this structure:

**a. Checklist at top** — "What Gets Done When You Approve This Plan"
- Bulleted deliverables grouped by repo/area
- Written in plain language (what the user gets, not implementation details)

**b. Context** — why this change is being made, what problem it solves

**c. Numbered steps** — specific, executable actions with:
- Exact file paths
- Code snippets or commands where relevant
- Clear before/after for any changed behavior

**d. Critical files table** — path | change type | description

**e. Verification section** — how to confirm each deliverable is complete (commands to run, expected output)

### 4. Execution Strategy
Every plan must include an "Execution Strategy" section specifying:
- How many subagents will run, which run in parallel, and which are sequential
- Why certain agents are independent (no conflicts) vs sequential (dependency)
- Format:
  ```
  Phase 1 (parallel): Agent A — [task], Agent B — [task]
  Phase 2 (after X): Agent C — [task dependent on Phase 1]
  ```
Default: maximize parallelism. Identify dependencies explicitly.

### 5. Confidence Check
Before calling ExitPlanMode, explicitly state: "I am X% confident. Remaining gaps: [list]." If below 90%, do more exploration or ask more questions.
