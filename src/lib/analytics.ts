/**
 * Unified Analytics Wrapper
 * Fires events to BOTH Mixpanel and PostHog for cross-platform analytics
 */

import mixpanel from 'mixpanel-browser';
import posthog from 'posthog-js';

// Configuration — reads from env vars; comment out in .env to disable
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN || '';
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY || '';
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

// Cross-subdomain tracking configuration for .resu-me.ai
const COOKIE_DOMAIN = '.resu-me.ai';

let isInitialized = false;
let sdksLoaded = false; // true only if Mixpanel/PostHog SDKs were actually init'd

// Check if analytics should be bypassed
const BYPASS_AUTH = import.meta.env.VITE_BYPASS_AUTH === 'true';

/**
 * Initialize both Mixpanel and PostHog analytics
 * Should be called once at app startup (e.g., in main.tsx or App.tsx)
 */
export function initAnalytics(): void {
  if (isInitialized) {
    console.warn('[Analytics] Already initialized, skipping...');
    return;
  }

  // Skip initialization in bypass mode or when keys are not configured
  if (BYPASS_AUTH || (!MIXPANEL_TOKEN && !POSTHOG_KEY)) {
    isInitialized = true; // Mark as initialized — all track calls become no-ops
    return;
  }

  // Guard: don't init SDKs with empty keys
  if (!MIXPANEL_TOKEN || !POSTHOG_KEY) {
    isInitialized = true;
    return;
  }

  // Skip initialization in development/test environments if needed
  const isDevelopment = import.meta.env.DEV;

  try {
    // Initialize Mixpanel
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: isDevelopment,
      track_pageview: false, // We'll handle this manually
      persistence: 'localStorage',
      // Cross-subdomain tracking
      cookie_domain: COOKIE_DOMAIN,
      cross_subdomain_cookie: true,
      secure_cookie: true,
      // Disable automatic tracking for privacy compliance
      disable_notifications: true,
      disable_persistence: false,
    });

    // Initialize PostHog
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      // Cross-subdomain tracking
      cross_subdomain_cookie: true,
      persistence: 'localStorage+cookie',
      // Session recording (optional - can be disabled)
      autocapture: !isDevelopment,
      capture_pageview: false, // We'll handle this manually
      // Debug mode in development
      loaded: (posthog) => {
        if (isDevelopment) {
          posthog.debug();
        }
      },
    });

    isInitialized = true;
    sdksLoaded = true;
  } catch (error) {
    console.error('[Analytics] Failed to initialize:', error);
  }
}

/**
 * Track an event to both Mixpanel and PostHog
 * @param eventName - Name of the event
 * @param properties - Optional event properties
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  if (!isInitialized) {
    console.warn('[Analytics] Not initialized. Call initAnalytics() first.');
    return;
  }

  const enrichedProperties = {
    ...properties,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
  };

  if (!sdksLoaded) return;

  try {
    mixpanel.track(eventName, enrichedProperties);
    posthog.capture(eventName, enrichedProperties);
  } catch (error) {
    console.error('[Analytics] Failed to track event:', error);
  }
}

/**
 * Identify a user across both platforms
 * @param userId - Unique user identifier
 * @param traits - Optional user traits/properties
 */
export function identifyUser(
  userId: string,
  traits?: Record<string, unknown>
): void {
  if (!isInitialized) {
    console.warn('[Analytics] Not initialized. Call initAnalytics() first.');
    return;
  }

  if (!sdksLoaded) return;

  try {
    mixpanel.identify(userId);
    if (traits) mixpanel.people.set(traits);
    posthog.identify(userId, traits);
  } catch (error) {
    console.error('[Analytics] Failed to identify user:', error);
  }
}

/**
 * Reset user identity (for logout)
 * Clears user data from both platforms
 */
export function resetUser(): void {
  if (!isInitialized) {
    console.warn('[Analytics] Not initialized. Call initAnalytics() first.');
    return;
  }

  if (!sdksLoaded) return;

  try {
    mixpanel.reset();
    posthog.reset();
  } catch (error) {
    console.error('[Analytics] Failed to reset user:', error);
  }
}

/**
 * Reset analytics state (alias for resetUser, used by tests)
 */
export function resetAnalytics(): void {
  resetUser();
}

/**
 * Track a page view
 * @param pageName - Optional page name (defaults to current path)
 * @param properties - Optional additional properties
 */
export function trackPageView(
  pageName?: string,
  properties?: string | Record<string, unknown>
): void {
  if (!isInitialized) {
    console.warn('[Analytics] Not initialized. Call initAnalytics() first.');
    return;
  }

  const page = pageName || (typeof window !== 'undefined' ? window.location.pathname : 'unknown');

  const propsObj = typeof properties === 'string' ? { page_path: properties } : properties;

  const pageProperties = {
    ...propsObj,
    page_name: page,
    page_url: typeof window !== 'undefined' ? window.location.href : undefined,
    page_title: typeof document !== 'undefined' ? document.title : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
  };

  if (!sdksLoaded) return;

  try {
    mixpanel.track('$pageview', pageProperties);
    posthog.capture('$pageview', pageProperties);
  } catch (error) {
    console.error('[Analytics] Failed to track page view:', error);
  }
}

/**
 * Set user properties (super properties that persist across events)
 * @param properties - Properties to set
 */
export function setUserProperties(properties: Record<string, unknown>): void {
  if (!isInitialized) {
    console.warn('[Analytics] Not initialized. Call initAnalytics() first.');
    return;
  }

  if (!sdksLoaded) return;

  try {
    mixpanel.register(properties);
    mixpanel.people.set(properties);
    posthog.setPersonProperties(properties);
  } catch (error) {
    console.error('[Analytics] Failed to set user properties:', error);
  }
}

/**
 * Get the current distinct ID (for debugging/linking)
 */
export function getDistinctId(): { mixpanel?: string; posthog?: string } {
  if (!isInitialized) {
    return {};
  }

  return {
    mixpanel: mixpanel.get_distinct_id?.(),
    posthog: posthog.get_distinct_id?.(),
  };
}

/**
 * Alias for identifyUser (for compatibility)
 */
export function identify(userId: string, traits?: Record<string, unknown>): void {
  identifyUser(userId, traits);
}

/**
 * Track signup started event
 */
export function trackSignupStarted(): void {
  trackEvent('signup_started');
}

/**
 * Track signin started event
 */
export function trackSigninStarted(): void {
  trackEvent('signin_started');
}

/**
 * Track onboarding started event
 */
export function trackOnboardingStarted(): void {
  trackEvent('onboarding_started');
}

/**
 * Track onboarding step viewed
 */
export function trackOnboardingStepViewed(step: number, stepName: string): void {
  trackEvent('onboarding_step_viewed', {
    step,
    step_name: stepName,
  });
}

/**
 * Track onboarding step completed
 */
export function trackOnboardingStepCompleted(
  step: number,
  stepName: string,
  data?: Record<string, unknown>
): void {
  trackEvent('onboarding_step_completed', {
    step,
    step_name: stepName,
    ...data,
  });
}

/**
 * Track onboarding completed
 */
export function trackOnboardingCompleted(totalSteps: number, durationMs?: number): void {
  trackEvent('onboarding_completed', {
    total_steps: totalSteps,
    ...(durationMs != null && { duration_ms: durationMs }),
  });
}

/**
 * Track onboarding abandoned
 */
export function trackOnboardingAbandoned(lastStep: number, stepName: string): void {
  trackEvent('onboarding_abandoned', {
    last_step: lastStep,
    step_name: stepName,
  });
}

/**
 * Track checkout events (started, completed, etc.)
 */
export function trackCheckout(action: string, properties?: Record<string, unknown>): void {
  trackEvent(`checkout_${action}`, properties);
}

/**
 * Track pricing page interactions
 */
export function trackPricingInteraction(action: string, properties?: Record<string, unknown>): void {
  trackEvent(`pricing_${action}`, properties);
}

// --- RES-533: Auth analytics (lexicon-compliant) ---

/**
 * Track OAuth CTA click (app domain - distinct from marketing cta_clicked)
 */
export function trackOAuthCtaClicked(
  provider: string,
  page: string,
  destination?: string
): void {
  trackEvent('oauth_cta_clicked', {
    oauth_provider: provider,
    page,
    ...(destination && { destination }),
  });
}

/**
 * Track generic CTA click
 */
export function trackCTAClick(
  ctaName: string,
  ctaLocation: string,
  properties?: Record<string, unknown>
): void {
  trackEvent('cta_clicked', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    ...properties,
  });
}

/**
 * Track onboarding step (generic - delegates to trackOnboardingStepViewed)
 */
export function trackOnboardingStep(step: number, stepName: string): void {
  trackOnboardingStepViewed(step, stepName);
}

/**
 * Track onboarding complete (alias for trackOnboardingCompleted)
 */
export function trackOnboardingComplete(totalSteps: number, durationMs?: number): void {
  trackOnboardingCompleted(totalSteps, durationMs);
}

// --- RES-540: Pricing page events ---

export type PlanType = 'free' | 'pro' | 'premium' | 'enterprise';
export type BillingCycle = 'monthly' | 'yearly';

/**
 * Track plan selected on pricing page
 */
export function trackPlanSelected(
  planType: PlanType,
  billingCycle: BillingCycle,
  properties?: Record<string, unknown>
): void {
  trackEvent('plan_selected', {
    plan_type: planType,
    billing_cycle: billingCycle,
    ...properties,
  });
}

/**
 * Track billing cycle toggle on pricing page
 */
export function trackBillingCycleToggled(
  fromCycle: BillingCycle,
  toCycle: BillingCycle,
  priceDifference?: number
): void {
  trackEvent('billing_cycle_toggled', {
    from_cycle: fromCycle,
    to_cycle: toCycle,
    ...(priceDifference != null && { price_difference: priceDifference }),
  });
}

/**
 * Track checkout started
 */
export function trackCheckoutStarted(
  planType: PlanType,
  billingCycle: BillingCycle,
  stripeSessionId?: string
): void {
  trackEvent('checkout_started', {
    plan_type: planType,
    billing_cycle: billingCycle,
    ...(stripeSessionId && { stripe_session_id: stripeSessionId }),
  });
}

// --- RES-543: File upload events ---

export type UploadMethod = 'drag_and_drop' | 'file_picker' | 'paste';
export type FileType = 'resume' | 'jd';

/**
 * Track file uploaded
 */
export function trackFileUploaded(
  fileType: FileType,
  uploadMethod: UploadMethod,
  isReplacement?: boolean
): void {
  trackEvent('file_uploaded', {
    file_type: fileType,
    upload_method: uploadMethod,
    ...(isReplacement != null && { is_replacement: isReplacement }),
  });
}

/**
 * Track analysis started
 */
export function trackAnalysisStarted(sessionId: string): void {
  trackEvent('analysis_started', {
    session_id: sessionId,
  });
}

/**
 * Track analysis completed
 */
export function trackAnalysisCompleted(
  sessionId: string,
  properties?: Record<string, unknown>
): void {
  trackEvent('analysis_completed', {
    session_id: sessionId,
    ...properties,
  });
}

// --- RES-544: Report events ---

export type SectionName =
  | 'overall_score'
  | 'skills_match'
  | 'experience_match'
  | 'qualifications'
  | 'keywords'
  | 'gap_analysis'
  | 'enhanced_bullets'
  | 'interview_prep';

/**
 * Track section viewed in report
 */
export function trackSectionViewed(
  sectionName: SectionName,
  properties?: Record<string, unknown>
): void {
  trackEvent('section_viewed', {
    section_name: sectionName,
    ...properties,
  });
}

/**
 * Track paywall viewed
 */
export function trackPaywallViewed(
  triggerPoint: string,
  properties?: Record<string, unknown>
): void {
  trackEvent('paywall_viewed', {
    trigger_point: triggerPoint,
    ...properties,
  });
}
