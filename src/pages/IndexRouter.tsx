import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

/**
 * Smart Router Component
 *
 * Implements the single entry point architecture from MARKETING_USER_FLOW_STRATEGY.md
 *
 * Behavior:
 * - Loading: Shows nothing (Clerk initializing)
 * - Signed In: Redirect to /dashboard
 * - Not Signed In: Redirect to /sign-up (THE entry point)
 *
 * This eliminates the cognitive load of choosing "Sign In" vs "Sign Up"
 * and optimizes the funnel for new user acquisition.
 */
export const IndexRouter: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show nothing while Clerk initializes (prevents flash)
  if (!isLoaded) {
    return null;
  }

  // Signed in → Dashboard (returning user with active session)
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  // Not signed in → Sign Up (optimized entry point)
  // Smart email detection on /sign-up will handle returning users
  return <Navigate to="/sign-up" replace />;
};
