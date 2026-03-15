/**
 * Onboarding Session ID Helper (RES-536)
 *
 * Generates and persists a unique session ID for the onboarding flow.
 * Used to correlate all analytics events within a single onboarding session.
 */

const SESSION_STORAGE_KEY = 'onboarding_session_id';

/**
 * Generate a new onboarding session ID.
 * Format: onb_{timestamp}_{random}
 */
function generateSessionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `onb_${timestamp}_${random}`;
}

/**
 * Get or create the onboarding session ID.
 * Persists in sessionStorage so it's consistent across the session
 * but resets when the browser tab is closed.
 */
export function getOnboardingSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) {
      return existing;
    }
  } catch {
    // sessionStorage not available (SSR, privacy mode)
  }

  const newId = generateSessionId();

  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, newId);
  } catch {
    // sessionStorage not available
  }

  return newId;
}

/**
 * Clear the onboarding session ID (e.g., on completion or abandon).
 */
export function clearOnboardingSessionId(): void {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // sessionStorage not available
  }
}
