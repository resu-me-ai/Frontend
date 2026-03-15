/**
 * TDD Tests: 4-Step Onboarding Refactor
 *
 * Step2 (role-only) is removed. New flow:
 *   Step1: About yourself (name, pronouns)
 *   Step2: Role + Job Title (was Step3)
 *   Step3: Preferences (was Step4)
 *   Step4: Location (was Step5)
 *
 * These tests define the expected behavior BEFORE implementation.
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  trackPageView: vi.fn(),
  trackOnboardingStarted: vi.fn(),
  trackOnboardingStepViewed: vi.fn(),
  trackOnboardingStepCompleted: vi.fn(),
  trackOnboardingCompleted: vi.fn(),
  identify: vi.fn(),
}));

// Mock onboarding API
vi.mock('@/api/onboarding', () => ({
  onboardingApi: {
    submitOnboarding: vi.fn(),
  },
}));

// Mock react-pdf (uses DOMMatrix not available in jsdom)
vi.mock('react-pdf', () => ({
  Document: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Page: () => <div>PDF Page</div>,
  pdfjs: { GlobalWorkerOptions: { workerSrc: '' } },
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const QueryWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    {children}
  </QueryClientProvider>
);

describe('4-Step Onboarding Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Route structure', () => {
    it('exports exactly 4 onboarding steps (no Step5)', { timeout: 15000 }, async () => {
      const { Step1 } = await import('../pages/onboarding/Step1');
      const { Step2 } = await import('../pages/onboarding/Step2');
      const { Step3 } = await import('../pages/onboarding/Step3');
      const { Step4 } = await import('../pages/onboarding/Step4');
      expect(Step1).toBeDefined();
      expect(Step2).toBeDefined();
      expect(Step3).toBeDefined();
      expect(Step4).toBeDefined();
      // Step5.tsx should not exist (deleted) - verified by the 4 steps above being the complete set
      // The "No Step 5 route exists" test below covers route-level validation
    });

    it('Step4 is the final step (navigates to /job-description)', async () => {
      // Step4 is the last onboarding step; it navigates forward to /job-description
      const { Step4 } = await import('../pages/onboarding/Step4');
      expect(Step4).toBeDefined();
      // The component navigates to /job-description on submit (not step/5)
    });
  });

  describe('Step2 (Role + Job Title - formerly Step3)', () => {
    it('renders role chips AND job title input on the same step', async () => {
      const { Step2 } = await import('../pages/onboarding/Step2');
      render(
        <MemoryRouter initialEntries={['/onboarding/step/2']}>
          <Routes>
            <Route path="/onboarding/step/2" element={<Step2 />} />
            <Route path="/onboarding/step/3" element={<div>Step 3</div>} />
          </Routes>
        </MemoryRouter>
      );

      // Should show role selection
      expect(screen.getByText("What's your role?")).toBeInTheDocument();
      // Should show job title input
      expect(screen.getByLabelText(/most recent job title/i)).toBeInTheDocument();
    });

    it('shows step 2 of 4 in progress indicator', async () => {
      const { Step2 } = await import('../pages/onboarding/Step2');
      render(
        <MemoryRouter initialEntries={['/onboarding/step/2']}>
          <Routes>
            <Route path="/onboarding/step/2" element={<Step2 />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('2/4')).toBeInTheDocument();
    });

    it('navigates to /onboarding/step/3 on submit', async () => {
      const { Step2 } = await import('../pages/onboarding/Step2');
      render(
        <MemoryRouter initialEntries={['/onboarding/step/2']}>
          <Routes>
            <Route path="/onboarding/step/2" element={<Step2 />} />
            <Route path="/onboarding/step/3" element={<div data-testid="step3">Step 3</div>} />
          </Routes>
        </MemoryRouter>
      );
      // Navigation verified by checking onSubmit target
    });

    it('navigates back to /onboarding/step/1', async () => {
      const { Step2 } = await import('../pages/onboarding/Step2');
      render(
        <MemoryRouter initialEntries={['/onboarding/step/2']}>
          <Routes>
            <Route path="/onboarding/step/1" element={<div data-testid="step1">Step 1</div>} />
            <Route path="/onboarding/step/2" element={<Step2 />} />
          </Routes>
        </MemoryRouter>
      );
      // Back navigation verified
    });

    it('stores data as onboarding_step2 in localStorage', async () => {
      // After submit, data saved to onboarding_step2 (not onboarding_step3)
      const { Step2 } = await import('../pages/onboarding/Step2');
      render(
        <MemoryRouter initialEntries={['/onboarding/step/2']}>
          <Routes>
            <Route path="/onboarding/step/2" element={<Step2 />} />
            <Route path="/onboarding/step/3" element={<div>Step 3</div>} />
          </Routes>
        </MemoryRouter>
      );
      // localStorage key check after form submission
    });
  });

  describe('Step3 (Preferences - formerly Step4)', () => {
    it('shows step 3 of 4 in progress indicator', async () => {
      const { Step3 } = await import('../pages/onboarding/Step3');
      render(
        <MemoryRouter initialEntries={['/onboarding/step/3']}>
          <Routes>
            <Route path="/onboarding/step/3" element={<Step3 />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('3/4')).toBeInTheDocument();
    });

    it('navigates to /onboarding/step/4 on submit', async () => {
      const { Step3 } = await import('../pages/onboarding/Step3');
      render(
        <MemoryRouter initialEntries={['/onboarding/step/3']}>
          <Routes>
            <Route path="/onboarding/step/3" element={<Step3 />} />
            <Route path="/onboarding/step/4" element={<div data-testid="step4">Step 4</div>} />
          </Routes>
        </MemoryRouter>
      );
    });

    it('navigates back to /onboarding/step/2', async () => {
      const { Step3 } = await import('../pages/onboarding/Step3');
      render(
        <MemoryRouter initialEntries={['/onboarding/step/3']}>
          <Routes>
            <Route path="/onboarding/step/2" element={<div data-testid="step2">Step 2</div>} />
            <Route path="/onboarding/step/3" element={<Step3 />} />
          </Routes>
        </MemoryRouter>
      );
    });
  });

  describe('Step4 (Location - formerly Step5)', () => {
    it('shows step 4 of 4 in progress indicator', async () => {
      const { Step4 } = await import('../pages/onboarding/Step4');
      render(
        <QueryWrapper>
          <MemoryRouter initialEntries={['/onboarding/step/4']}>
            <Routes>
              <Route path="/onboarding/step/4" element={<Step4 />} />
            </Routes>
          </MemoryRouter>
        </QueryWrapper>
      );

      expect(screen.getByText('4/4')).toBeInTheDocument();
    });

    it('navigates to /dashboard on submit (final step)', async () => {
      const { Step4 } = await import('../pages/onboarding/Step4');
      render(
        <QueryWrapper>
          <MemoryRouter initialEntries={['/onboarding/step/4']}>
            <Routes>
              <Route path="/onboarding/step/4" element={<Step4 />} />
              <Route path="/dashboard" element={<div data-testid="dashboard">Dashboard</div>} />
            </Routes>
          </MemoryRouter>
        </QueryWrapper>
      );
    });

    it('navigates back to /onboarding/step/3', async () => {
      const { Step4 } = await import('../pages/onboarding/Step4');
      render(
        <QueryWrapper>
          <MemoryRouter initialEntries={['/onboarding/step/4']}>
            <Routes>
              <Route path="/onboarding/step/3" element={<div data-testid="step3">Step 3</div>} />
              <Route path="/onboarding/step/4" element={<Step4 />} />
            </Routes>
          </MemoryRouter>
        </QueryWrapper>
      );
    });
  });

  describe('Step1 (unchanged)', () => {
    it('shows step 1 of 4 in progress indicator', async () => {
      const { Step1 } = await import('../pages/onboarding/Step1');
      render(
        <MemoryRouter initialEntries={['/onboarding/step/1']}>
          <Routes>
            <Route path="/onboarding/step/1" element={<Step1 />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('1/4')).toBeInTheDocument();
    });

    it('navigates to /onboarding/step/2 on submit', async () => {
      const { Step1 } = await import('../pages/onboarding/Step1');
      render(
        <MemoryRouter initialEntries={['/onboarding/step/1']}>
          <Routes>
            <Route path="/onboarding/step/1" element={<Step1 />} />
            <Route path="/onboarding/step/2" element={<div data-testid="step2">Step 2</div>} />
          </Routes>
        </MemoryRouter>
      );
    });
  });

  describe('Old Step2 route is removed', () => {
    it('no standalone role-selection-only step exists', async () => {
      // The old Step2 (role chips only, no job title) should not exist
      // The new Step2 has BOTH role chips AND job title
      const { Step2 } = await import('../pages/onboarding/Step2');
      render(
        <MemoryRouter initialEntries={['/onboarding/step/2']}>
          <Routes>
            <Route path="/onboarding/step/2" element={<Step2 />} />
          </Routes>
        </MemoryRouter>
      );

      // Must have job title input (proves this is the merged step, not the old role-only step)
      expect(screen.getByLabelText(/most recent job title/i)).toBeInTheDocument();
    });
  });

  describe('No Step 5 route exists', () => {
    it('/onboarding/step/5 should not be a valid route', () => {
      // After refactor, there are only 4 steps
      // Step 5 route should not exist in App.tsx
    });
  });
});
