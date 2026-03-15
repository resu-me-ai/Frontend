/**
 * React hook for tracking Clerk authentication events
 * Provides methods to track sign-up, login, and logout events
 */

import { useCallback, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { trackEvent, identifyUser, resetUser, setUserProperties } from '../lib/analytics';

type AuthMethod = 'email' | 'google' | 'github' | 'linkedin' | 'sso' | 'unknown';

interface AuthTrackingReturn {
  /**
   * Track when a user starts the sign-up process
   * Call this when the sign-up form is displayed
   */
  trackSignupStarted: () => void;

  /**
   * Track when a user completes sign-up
   * @param method - The authentication method used (email, google, github, etc.)
   */
  trackSignupCompleted: (method: AuthMethod) => void;

  /**
   * Track when a user completes login
   * @param method - The authentication method used (email, google, github, etc.)
   */
  trackLoginCompleted: (method: AuthMethod) => void;

  /**
   * Track when a user logs out
   */
  trackLogout: () => void;
}

/**
 * Hook for tracking Clerk authentication events
 *
 * @example
 * ```tsx
 * const { trackSignupStarted, trackSignupCompleted, trackLoginCompleted, trackLogout } = useAuthTracking();
 *
 * // On sign-up page mount
 * useEffect(() => {
 *   trackSignupStarted();
 * }, []);
 *
 * // After successful OAuth signup
 * useEffect(() => {
 *   if (isSignedIn && isNewUser) {
 *     trackSignupCompleted('google');
 *   }
 * }, [isSignedIn]);
 * ```
 */
export function useAuthTracking(): AuthTrackingReturn {
  const { user, isSignedIn } = useUser();

  // Track if we've already identified this user in this session
  const hasIdentified = useRef(false);

  // Track signup start time for conversion metrics
  const signupStartTime = useRef<number | null>(null);

  /**
   * Identify user with analytics platforms when signed in
   */
  useEffect(() => {
    if (isSignedIn && user && !hasIdentified.current) {
      // Identify user with Clerk user ID
      identifyUser(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        first_name: user.firstName,
        last_name: user.lastName,
        full_name: user.fullName,
        image_url: user.imageUrl,
        created_at: user.createdAt?.toISOString(),
        // Track which auth providers they've used
        has_google_account: user.externalAccounts?.some(a => a.provider === 'google'),
        has_github_account: user.externalAccounts?.some(a => a.provider === 'github'),
        email_verified: user.primaryEmailAddress?.verification?.status === 'verified',
      });

      hasIdentified.current = true;
    }
  }, [isSignedIn, user]);

  /**
   * Track when sign-up flow starts
   */
  const trackSignupStarted = useCallback(() => {
    signupStartTime.current = Date.now();

    trackEvent('auth_signup_started', {
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    });
  }, []);

  /**
   * Track when sign-up completes
   */
  const trackSignupCompleted = useCallback((method: AuthMethod) => {
    const timeToSignupMs = signupStartTime.current
      ? Date.now() - signupStartTime.current
      : null;

    trackEvent('auth_signup_completed', {
      method,
      time_to_signup_ms: timeToSignupMs,
      time_to_signup_seconds: timeToSignupMs ? Math.round(timeToSignupMs / 1000) : null,
    });

    // Set user properties for segmentation
    setUserProperties({
      signup_method: method,
      signup_completed_at: new Date().toISOString(),
      is_new_user: true,
    });

    // Reset the timer
    signupStartTime.current = null;
  }, []);

  /**
   * Track when login completes
   */
  const trackLoginCompleted = useCallback((method: AuthMethod) => {
    trackEvent('auth_login_completed', {
      method,
      login_at: new Date().toISOString(),
    });

    // Update last login timestamp
    setUserProperties({
      last_login_method: method,
      last_login_at: new Date().toISOString(),
    });
  }, []);

  /**
   * Track when user logs out
   */
  const trackLogout = useCallback(() => {
    trackEvent('auth_logout', {
      logout_at: new Date().toISOString(),
    });

    // Reset analytics user identity
    resetUser();

    // Reset our tracking state
    hasIdentified.current = false;
  }, []);

  return {
    trackSignupStarted,
    trackSignupCompleted,
    trackLoginCompleted,
    trackLogout,
  };
}

/**
 * Helper function to detect auth method from Clerk user
 * Useful for automatically detecting the method used
 */
export function detectAuthMethod(user: ReturnType<typeof useUser>['user']): AuthMethod {
  if (!user) return 'unknown';

  // Check if signed up via OAuth
  const externalAccounts = user.externalAccounts || [];

  if (externalAccounts.some(a => a.provider === 'google')) {
    return 'google';
  }
  if (externalAccounts.some(a => a.provider === 'github')) {
    return 'github';
  }
  if (externalAccounts.some(a => a.provider === 'linkedin')) {
    return 'linkedin';
  }
  if (externalAccounts.some(a => a.provider === 'oauth_custom')) {
    return 'sso';
  }

  // Default to email if no OAuth providers found
  if (user.primaryEmailAddress) {
    return 'email';
  }

  return 'unknown';
}

export default useAuthTracking;
