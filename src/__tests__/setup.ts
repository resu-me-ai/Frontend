import { vi } from 'vitest';
import '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock global.fetch so tests can use (global.fetch as ReturnType<typeof vi.fn>).mockReset()
global.fetch = vi.fn();

// Mock scrollIntoView which is not implemented in jsdom
Element.prototype.scrollIntoView = vi.fn();

// Mock the analytics module
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
  identifyUser: vi.fn(),
  initAnalytics: vi.fn(),
  trackPageView: vi.fn(),
  resetUser: vi.fn(),
  setUserProperties: vi.fn(),
  getDistinctId: vi.fn(() => ({ mixpanel: 'test-distinct-id', posthog: 'test-distinct-id' })),
  // New lexicon-compliant functions (RES-533)
  trackSignupStarted: vi.fn(),
  trackSigninStarted: vi.fn(),
  trackOAuthCtaClicked: vi.fn(),
  trackCTAClick: vi.fn(),
  trackOnboardingStep: vi.fn(),
  trackOnboardingComplete: vi.fn(),
  trackPricingInteraction: vi.fn(),
  trackCheckout: vi.fn(),
  resetAnalytics: vi.fn(),
  // RES-540: Pricing page events
  trackPlanSelected: vi.fn(),
  trackBillingCycleToggled: vi.fn(),
  trackCheckoutStarted: vi.fn(),
  // RES-543: File upload events
  trackFileUploaded: vi.fn(),
  trackAnalysisStarted: vi.fn(),
  trackAnalysisCompleted: vi.fn(),
  // RES-544: Report events
  trackSectionViewed: vi.fn(),
  trackPaywallViewed: vi.fn(),
  // Onboarding funnel (RES-486)
  trackOnboardingStepViewed: vi.fn(),
  trackOnboardingStepCompleted: vi.fn(),
  trackOnboardingStarted: vi.fn(),
  trackOnboardingCompleted: vi.fn(),
  trackOnboardingAbandoned: vi.fn(),
  identify: vi.fn(),
}));

// Mock mixpanel-browser
vi.mock('mixpanel-browser', () => ({
  default: {
    init: vi.fn(),
    track: vi.fn(),
    identify: vi.fn(),
    alias: vi.fn(),
    reset: vi.fn(),
    register: vi.fn(),
    get_distinct_id: vi.fn(() => 'test-distinct-id'),
    people: {
      set: vi.fn(),
    },
  },
}));

// Mock posthog-js
vi.mock('posthog-js', () => ({
  default: {
    init: vi.fn(),
    capture: vi.fn(),
    identify: vi.fn(),
    alias: vi.fn(),
    reset: vi.fn(),
    register: vi.fn(),
    get_distinct_id: vi.fn(() => 'test-distinct-id'),
    setPersonProperties: vi.fn(),
  },
}));

// Mock Clerk
vi.mock('@clerk/clerk-react', () => ({
  useUser: vi.fn(() => ({
    user: null,
    isSignedIn: false,
  })),
}));

