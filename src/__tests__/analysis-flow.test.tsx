/**
 * TDD Tests for Analysis Flow (RED PHASE)
 *
 * User Journey:
 * 1. /job-description - User pastes JD
 * 2. /upload-resume - User uploads resume
 * 3. /analyzing - Loading state while API processes
 * 4. /analysis-score - Results displayed
 *
 * NOTE: These tests are aspirational (TDD). They require the `msw` package
 * for API mocking which is not currently installed. All tests are marked
 * as .todo until msw is added as a dev dependency and the analysis flow
 * pages are implemented.
 */

import { describe, it } from 'vitest';

describe('Analysis Flow', () => {
  it.todo('navigates from job-description to upload-resume');
  it.todo('navigates from upload-resume to analyzing');
  it.todo('shows results after analysis completes');
  it.todo('handles API errors gracefully');
});

describe('API Client', () => {
  it.todo('analyzeResume sends correct payload');
  it.todo('analyzeResume includes all required fields in FormData');
});
