/**
 * Component Test Setup for React Testing Library
 *
 * This file configures the test environment for React component tests.
 * It sets up:
 * - jsdom environment matchers via @testing-library/jest-dom
 * - Common mocks for providers and external dependencies
 * - Global test utilities
 *
 * @see Track B (Frontend V0.5) - Context Collection UI Components
 */

import { vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test to prevent memory leaks
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver for components that need it
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver for lazy loading components
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

// Mock fetch for API calls
global.fetch = vi.fn();

// Mock Clerk
vi.mock('@clerk/clerk-react', () => ({
  useUser: vi.fn(() => ({
    user: {
      id: 'test-user-id',
      firstName: 'Test',
      lastName: 'User',
      fullName: 'Test User',
      primaryEmailAddress: {
        emailAddress: 'test@example.com',
      },
    },
    isSignedIn: true,
    isLoaded: true,
  })),
  useAuth: vi.fn(() => ({
    isSignedIn: true,
    isLoaded: true,
    userId: 'test-user-id',
    getToken: vi.fn().mockResolvedValue('mock-token'),
  })),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
  SignedIn: ({ children }: { children: React.ReactNode }) => children,
  SignedOut: () => null,
}));

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
    useLocation: vi.fn(() => ({
      pathname: '/context-collection',
      search: '',
      hash: '',
      state: null,
    })),
    useParams: vi.fn(() => ({})),
  };
});

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
  identifyUser: vi.fn(),
  initAnalytics: vi.fn(),
  trackPageView: vi.fn(),
  resetUser: vi.fn(),
  setUserProperties: vi.fn(),
  getDistinctId: vi.fn(() => ({ mixpanel: 'test-distinct-id', posthog: 'test-distinct-id' })),
}));

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  (global.fetch as ReturnType<typeof vi.fn>).mockReset();
});
