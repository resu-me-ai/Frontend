/**
 * Auth Analytics Tests - Mixpanel Lexicon Compliance (RES-533)
 *
 * Tests the auth page analytics tracking for lexicon compliance:
 * - signup_started: uses `signup_method` (not `method`)
 * - signin_started: uses `signin_method` (not `method`)
 * - oauth_cta_clicked: distinct from cta_clicked (app vs marketing domain)
 *
 * Schema: workspaces/resume/e2e_analytics/phase6/MIXPANEL_LEXICON.json
 *
 * NOTE: These tests are aspirational (TDD). The lexicon-compliant function
 * signatures (trackSignupStarted(method, source), trackSigninStarted(method, source),
 * trackOAuthCtaClicked(provider, page, destination)) have not been implemented yet.
 * All tests are marked as .todo until the implementation matches the lexicon spec.
 *
 * @see https://linear.app/resu-me-ai/issue/RES-533/analytics-implementation-misaligned-with-mixpanel-lexicon
 */

import { describe, it } from 'vitest';

describe('Auth Analytics - Lexicon Compliance (RES-533)', () => {
  describe('signup_started - Lexicon Schema Compliance', () => {
    it.todo('should use signup_method property (not method)');
    it.todo('should NOT include deprecated "method" property');
    it.todo('should include all required lexicon properties');
    it.todo('should support all OAuth providers as signup_method');
  });

  describe('signin_started - New Event (RES-533 Addition)', () => {
    it.todo('should fire signin_started event (not just signup_started for sign-in)');
    it.todo('should use signin_method property (symmetric with signup_method)');
    it.todo('should include all required lexicon properties');
    it.todo('should NOT include deprecated "method" property');
  });

  describe('oauth_cta_clicked - Domain-Specific Event (RES-533)', () => {
    it.todo('should fire oauth_cta_clicked (not cta_clicked) for app domain');
    it.todo('should include oauth_provider property');
    it.todo('should include page property (sign_up or sign_in)');
    it.todo('should include destination property');
    it.todo('should NOT use cta_name pattern from cta_clicked');
  });

  describe('Property Naming Consistency', () => {
    it.todo('signup events should use signup_ prefix');
    it.todo('signin events should use signin_ prefix');
  });

  describe('UTM Parameter Pass-Through', () => {
    it.todo('should include UTM parameters in signup_started');
    it.todo('should include UTM parameters in signin_started');
  });
});
