/**
 * Shared API utilities.
 */

/**
 * Primary API base — FastAPI AI service (pipeline, analysis, questions, enhance, crucible).
 * Set VITE_API_BASE_URL to override (e.g. in Docker: http://localhost:8000/api/v1).
 */
export function getApiBase(): string {
  return import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1';
}

/**
 * Backend API base — NestJS service (jobs CRUD, resumes, subscriptions, auth).
 * Set VITE_BACKEND_URL to override (e.g. in Docker: http://localhost:3000/api/v1).
 */
export function getBackendBase(): string {
  return import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000/api/v1';
}
