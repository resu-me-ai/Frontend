/**
 * Onboarding Analytics Hook
 *
 * Encapsulates all onboarding funnel tracking logic.
 * Provides methods to track step views, completions, and overall funnel progress.
 *
 * @see RES-486 - V1.3 Onboarding Analytics - Funnel Tracking
 */
import { useCallback, useRef, useEffect } from 'react';
import {
  trackOnboardingStarted,
  trackOnboardingStepViewed,
  trackOnboardingStepCompleted,
  trackOnboardingCompleted,
  trackOnboardingAbandoned,
  identify,
  initAnalytics,
} from '@/lib/analytics';

export interface StepData {
  [key: string]: unknown;
}

export interface UseOnboardingAnalyticsReturn {
  trackStepViewed: (step: number, stepName: string) => void;
  trackStepCompleted: (step: number, stepName: string, data?: StepData) => void;
  trackOnboardingStart: () => void;
  trackOnboardingComplete: (totalSteps: number) => void;
  trackOnboardingAbandoned: (lastStep: number, stepName: string) => void;
  identifyUser: (userId: string, traits?: Record<string, unknown>) => void;
}

/**
 * Step name mapping for consistent analytics
 */
export const STEP_NAMES: Record<number, string> = {
  1: 'about_yourself',
  2: 'role_selection',
  3: 'job_title',
  4: 'preferences',
  5: 'location_preferences',
};

/**
 * Hook for tracking onboarding analytics
 *
 * @example
 * ```tsx
 * const { trackStepViewed, trackStepCompleted } = useOnboardingAnalytics();
 *
 * useEffect(() => {
 *   trackStepViewed(1, 'about_yourself');
 * }, []);
 *
 * const handleSubmit = (data) => {
 *   trackStepCompleted(1, 'about_yourself', { has_full_name: !!data.fullName });
 *   navigate('/step/2');
 * };
 * ```
 */
export function useOnboardingAnalytics(): UseOnboardingAnalyticsReturn {
  const startTimeRef = useRef<number>(Date.now());

  // Initialize analytics on first hook usage
  useEffect(() => {
    initAnalytics();
  }, []);

  /**
   * Track when a step is viewed
   */
  const trackStepViewed = useCallback((step: number, stepName: string) => {
    trackOnboardingStepViewed(step, stepName);
  }, []);

  /**
   * Track when a step is completed with form data
   */
  const trackStepCompleted = useCallback(
    (step: number, stepName: string, data?: StepData) => {
      trackOnboardingStepCompleted(step, stepName, data);
    },
    []
  );

  /**
   * Track when onboarding flow starts
   */
  const trackOnboardingStart = useCallback(() => {
    startTimeRef.current = Date.now();
    trackOnboardingStarted();
  }, []);

  /**
   * Track when onboarding is completed
   * Automatically calculates duration from start
   */
  const trackOnboardingComplete = useCallback((totalSteps: number) => {
    const durationMs = Date.now() - startTimeRef.current;
    trackOnboardingCompleted(totalSteps, durationMs);
  }, []);

  /**
   * Track when user abandons onboarding
   */
  const handleOnboardingAbandoned = useCallback(
    (lastStep: number, stepName: string) => {
      trackOnboardingAbandoned(lastStep, stepName);
    },
    []
  );

  /**
   * Identify user after authentication
   */
  const identifyUser = useCallback(
    (userId: string, traits?: Record<string, unknown>) => {
      identify(userId, traits);
    },
    []
  );

  return {
    trackStepViewed,
    trackStepCompleted,
    trackOnboardingStart,
    trackOnboardingComplete,
    trackOnboardingAbandoned: handleOnboardingAbandoned,
    identifyUser,
  };
}

export default useOnboardingAnalytics;


