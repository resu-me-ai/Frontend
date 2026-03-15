/**
 * Mock data exports and demo mode utilities
 */

export * from './analysis.mock';
export * from './onboarding.mock';
export * from './customization.mock';
export * from './dashboard.mock';
export * from './context-collection.mock';
export * from './enhancement-review.mock';

/**
 * Check if demo mode is enabled
 */
export const isDemoMode = (): boolean => {
  return import.meta.env.VITE_DEMO_MODE === 'true';
};

/**
 * Log demo mode status on startup (dev only)
 */
export const logDemoModeStatus = (): void => {
  if (import.meta.env.DEV) {
    if (isDemoMode()) {
      console.log(
        '%c[DEMO MODE] Frontend running with mock data - no backend required',
        'color: #6366F1; font-weight: bold; font-size: 14px;'
      );
    } else {
      console.log(
        '%c[LIVE MODE] Frontend connecting to backend API',
        'color: #10B981; font-weight: bold;'
      );
    }
  }
};
