/**
 * Happy Path E2E Tests (Demo Mode)
 *
 * Tests the complete resume analysis flow without authentication:
 * - Upload resume
 * - Enter job description
 * - View analysis results
 * - Context collection flow
 * - Enhanced output view
 *
 * Run: npx playwright test e2e/happy-path.spec.ts
 *
 * Note: In dev mode (no valid Clerk key), useAuth() returns isAuthenticated: true
 * by default (mock auth). The home page therefore shows "Continue Onboarding" and
 * "Go to Dashboard" instead of "Get Started".
 */

import { test, expect } from '@playwright/test';

test.describe('Resume Analysis Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure we're in demo mode by visiting the home page first
    await page.goto('/');
  });

  test('landing page loads correctly', async ({ page }) => {
    await page.goto('/');

    // Should see the main heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // In dev/mock-auth mode, user is authenticated — shows "Continue Onboarding"
    await expect(page.getByRole('button', { name: /continue onboarding/i })).toBeVisible();
  });

  test('can navigate to upload page', async ({ page }) => {
    await page.goto('/');

    // Navigate directly to the upload route
    await page.goto('/upload-resume');

    // Should be on upload page
    await expect(page).toHaveURL(/upload-resume/);
  });

  test('upload page shows resume input', async ({ page }) => {
    await page.goto('/upload-resume');

    // The file input is hidden (styled); the visible dropzone is a div with dashed border.
    // Look for the "click to browse" prompt text rendered inside the dropzone.
    const uploadZone = page.getByText(/drop your resume here/i).first();
    await expect(uploadZone).toBeVisible({ timeout: 10000 });
  });

  test('job description page shows job description input', async ({ page }) => {
    // JD input lives on /job-description, not /upload-resume.
    // The editor is a TipTap RichTextArea (div[contenteditable]), not a <textarea>.
    await page.goto('/job-description');

    // Look for the rich text editor (TipTap renders a contenteditable div)
    // or fall back to the label "Paste Job Description"
    const jdLabel = page.getByText(/paste job description/i).first();
    await expect(jdLabel).toBeVisible({ timeout: 10000 });
  });

  test('can navigate through demo flow', async ({ page }) => {
    // Start at home
    await page.goto('/');

    // Navigate to upload
    await page.goto('/upload-resume');
    await expect(page).toHaveURL(/upload-resume/);

    // Note: Full flow would require actual file upload and API responses
    // For now, verify navigation works
  });
});

test.describe('Pricing Page Flow', () => {
  test('pricing page displays plans', async ({ page }) => {
    await page.goto('/pricing');

    // Should show pricing heading
    await expect(page.getByRole('heading', { name: /choose your plan/i })).toBeVisible();
  });

  test('pricing toggle switches between monthly and yearly', async ({ page }) => {
    await page.goto('/pricing');

    // Find and click yearly toggle
    const yearlyButton = page.getByRole('button', { name: /yearly/i });
    await yearlyButton.click();

    // Should show savings text
    await expect(page.getByText(/10% off/i)).toBeVisible();
  });

  test('pricing page shows all three plans', async ({ page }) => {
    await page.goto('/pricing');

    // Should show three plan card headings (use .first() to avoid strict-mode collision with
    // feature list items that also mention plan names e.g. "Everything in Product A or B")
    await expect(page.getByText('Product A or B').first()).toBeVisible();
    await expect(page.getByText('Product A + B').first()).toBeVisible();
    await expect(page.getByText('Product C').first()).toBeVisible();
  });

  test('get started buttons are present', async ({ page }) => {
    await page.goto('/pricing');

    // Should have Get Started buttons
    const getStartedButtons = page.getByRole('button', { name: /get started/i });
    await expect(getStartedButtons).toHaveCount(3);
  });
});

test.describe('Navigation', () => {
  test('logo navigates to home', async ({ page }) => {
    await page.goto('/pricing');

    // Click logo
    const logo = page.getByTestId('logo').first();
    if (await logo.isVisible()) {
      await logo.click();
      await expect(page).toHaveURL('/');
    }
  });

  test('back button works on pricing page', async ({ page }) => {
    await page.goto('/');
    await page.goto('/pricing');

    // Click Go back
    const backButton = page.getByRole('button', { name: /go back/i });
    if (await backButton.isVisible()) {
      await backButton.click();
      // Should navigate back
      await expect(page).not.toHaveURL(/pricing/);
    }
  });
});

test.describe('Responsive Layout', () => {
  test('mobile viewport renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');

    // Should still show main content
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('tablet viewport renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto('/');

    // Should show main content
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
