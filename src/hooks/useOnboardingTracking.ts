/**
 * React hook for tracking onboarding funnel events
 * Provides methods to track user progress through the onboarding flow
 */

import { useCallback, useRef, useEffect } from 'react';
import { trackEvent, setUserProperties } from '../lib/analytics';

interface OnboardingStepInfo {
  stepNumber: number;
  stepName: string;
}

interface OnboardingTrackingReturn {
  /**
   * Track when onboarding flow starts
   * @param source - Where the user came from (e.g., 'landing_page', 'signup', 'marketing_email')
   */
  trackOnboardingStarted: (source?: string) => void;

  /**
   * Track when a step is completed
   * @param stepInfo - Information about the completed step
   */
  trackStepCompleted: (stepInfo: OnboardingStepInfo) => void;

  /**
   * Track when the entire onboarding is completed
   * @param totalSteps - Total number of steps completed
   */
  trackOnboardingCompleted: (totalSteps: number) => void;

  /**
   * Track when onboarding is abandoned
   * Should be called when user navigates away before completing
   * @param lastStep - The last step the user was on
   */
  trackOnboardingAbandoned: (lastStep: OnboardingStepInfo) => void;

  /**
   * Start timing a step (call when entering a step)
   */
  startStepTimer: () => void;

  /**
   * Get time spent on current step in ms
   */
  getStepTimeMs: () => number;
}

/**
 * Hook for tracking onboarding funnel metrics
 *
 * @example
 * ```tsx
 * const { trackOnboardingStarted, trackStepCompleted, trackOnboardingCompleted } = useOnboardingTracking();
 *
 * // On first render of onboarding
 * useEffect(() => {
 *   trackOnboardingStarted('signup_page');
 * }, []);
 *
 * // On step completion
 * const handleNext = () => {
 *   trackStepCompleted({ stepNumber: 1, stepName: 'personal_info' });
 *   goToNextStep();
 * };
 * ```
 */
export function useOnboardingTracking(): OnboardingTrackingReturn {
  // Track when onboarding started (for total time calculation)
  const onboardingStartTime = useRef<number | null>(null);

  // Track when current step started (for step time calculation)
  const stepStartTime = useRef<number | null>(null);

  // Track if onboarding was started (to prevent duplicate events)
  const hasStarted = useRef(false);

  /**
   * Start timing a step
   */
  const startStepTimer = useCallback(() => {
    stepStartTime.current = Date.now();
  }, []);

  /**
   * Get time spent on current step
   */
  const getStepTimeMs = useCallback((): number => {
    if (!stepStartTime.current) return 0;
    return Date.now() - stepStartTime.current;
  }, []);

  /**
   * Track when onboarding starts
   */
  const trackOnboardingStarted = useCallback((source?: string) => {
    if (hasStarted.current) {
      return; // Prevent duplicate start events
    }

    hasStarted.current = true;
    onboardingStartTime.current = Date.now();
    stepStartTime.current = Date.now();

    trackEvent('onboarding_started', {
      source: source || 'direct',
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    });

    // Set user property for segmentation
    setUserProperties({
      onboarding_started_at: new Date().toISOString(),
      onboarding_source: source || 'direct',
    });
  }, []);

  /**
   * Track when a step is completed
   */
  const trackStepCompleted = useCallback((stepInfo: OnboardingStepInfo) => {
    const timeOnStepMs = getStepTimeMs();

    trackEvent('onboarding_step_completed', {
      step_number: stepInfo.stepNumber,
      step_name: stepInfo.stepName,
      time_on_step_ms: timeOnStepMs,
      time_on_step_seconds: Math.round(timeOnStepMs / 1000),
    });

    // Update user property with highest completed step
    setUserProperties({
      onboarding_last_completed_step: stepInfo.stepNumber,
      onboarding_last_completed_step_name: stepInfo.stepName,
    });

    // Reset step timer for next step
    stepStartTime.current = Date.now();
  }, [getStepTimeMs]);

  /**
   * Track when onboarding is completed
   */
  const trackOnboardingCompleted = useCallback((totalSteps: number) => {
    const totalTimeMs = onboardingStartTime.current
      ? Date.now() - onboardingStartTime.current
      : 0;

    trackEvent('onboarding_completed', {
      total_time_ms: totalTimeMs,
      total_time_seconds: Math.round(totalTimeMs / 1000),
      total_time_minutes: Math.round(totalTimeMs / 60000 * 10) / 10,
      steps_completed: totalSteps,
    });

    // Update user properties for segmentation
    setUserProperties({
      onboarding_completed: true,
      onboarding_completed_at: new Date().toISOString(),
      onboarding_total_time_ms: totalTimeMs,
      onboarding_steps_completed: totalSteps,
    });
  }, []);

  /**
   * Track when onboarding is abandoned
   */
  const trackOnboardingAbandoned = useCallback((lastStep: OnboardingStepInfo) => {
    const timeSpentMs = onboardingStartTime.current
      ? Date.now() - onboardingStartTime.current
      : 0;

    trackEvent('onboarding_abandoned', {
      last_step: lastStep.stepNumber,
      last_step_name: lastStep.stepName,
      time_spent_ms: timeSpentMs,
      time_spent_seconds: Math.round(timeSpentMs / 1000),
    });

    // Update user properties
    setUserProperties({
      onboarding_abandoned: true,
      onboarding_abandoned_at: new Date().toISOString(),
      onboarding_abandoned_step: lastStep.stepNumber,
      onboarding_abandoned_step_name: lastStep.stepName,
    });
  }, []);

  // Cleanup - track abandonment if component unmounts without completion
  useEffect(() => {
    return () => {
      // Note: This cleanup is tricky because we don't have step info here
      // The consuming component should handle calling trackOnboardingAbandoned explicitly
    };
  }, []);

  return {
    trackOnboardingStarted,
    trackStepCompleted,
    trackOnboardingCompleted,
    trackOnboardingAbandoned,
    startStepTimer,
    getStepTimeMs,
  };
}

export default useOnboardingTracking;
