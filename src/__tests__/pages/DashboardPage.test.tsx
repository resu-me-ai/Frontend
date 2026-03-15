/**
 * TDD Tests for DashboardPage (Demo Mode)
 *
 * Tests for the user dashboard:
 * - Shows welcome message with user name
 * - Displays "What's Next?" checklist
 * - Shows account information
 * - Sign out button works
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

// Mock useAuth
const mockSignOut = vi.fn();
const mockUseAuth = vi.fn();
vi.mock('@/hooks', () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock OnboardingHeader
vi.mock('@/components/organisms/OnboardingHeader', () => ({
  OnboardingHeader: () => <div data-testid="onboarding-header">Header</div>,
}));

// Mock Button
vi.mock('@/components/atoms/Button', () => ({
  Button: ({ children, onClick, ...props }: React.ComponentProps<'button'>) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
}));

import { DashboardPage } from '@/pages/DashboardPage';

const mockUser = {
  firstName: 'Ralph',
  fullName: 'Ralph Bautista',
  emailAddresses: [{ emailAddress: 'ralph@test.com' }],
};

function renderPage() {
  return render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>
  );
}

describe('DashboardPage renders correctly', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: mockUser, signOut: mockSignOut });
  });

  it('renders the welcome heading with user name', () => {
    renderPage();

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Welcome, Ralph!/i)).toBeInTheDocument();
  });

  it('renders the onboarding header', () => {
    renderPage();

    expect(screen.getByTestId('onboarding-header')).toBeInTheDocument();
  });

  it('shows completion message', () => {
    renderPage();

    expect(screen.getByText(/successfully completed the onboarding/i)).toBeInTheDocument();
  });
});

describe('DashboardPage "What\'s Next?" section', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: mockUser, signOut: mockSignOut });
  });

  it('renders What\'s Next heading', () => {
    renderPage();

    expect(screen.getByText("What's Next?")).toBeInTheDocument();
  });

  it('shows checklist items', () => {
    renderPage();

    expect(screen.getByText(/Create your first AI-powered resume/i)).toBeInTheDocument();
    expect(screen.getByText(/Optimize your resume for specific job descriptions/i)).toBeInTheDocument();
    expect(screen.getByText(/Track your application performance/i)).toBeInTheDocument();
  });
});

describe('DashboardPage account information', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: mockUser, signOut: mockSignOut });
  });

  it('renders Account Information heading', () => {
    renderPage();

    expect(screen.getByText('Account Information')).toBeInTheDocument();
  });

  it('displays user email', () => {
    renderPage();

    expect(screen.getByText(/ralph@test.com/i)).toBeInTheDocument();
  });

  it('displays user full name', () => {
    renderPage();

    expect(screen.getByText(/Ralph Bautista/i)).toBeInTheDocument();
  });

  it('shows N/A for missing email', () => {
    mockUseAuth.mockReturnValue({
      user: { firstName: 'Test', fullName: null, emailAddresses: [] },
      signOut: mockSignOut,
    });
    renderPage();

    expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
  });
});

describe('DashboardPage sign out', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: mockUser, signOut: mockSignOut });
  });

  it('renders Sign Out button', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /Sign Out/i })).toBeInTheDocument();
  });

  it('calls signOut when clicked', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: /Sign Out/i }));

    expect(mockSignOut).toHaveBeenCalled();
  });
});

describe('DashboardPage handles missing user gracefully', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows "there" when firstName is missing', () => {
    mockUseAuth.mockReturnValue({
      user: { firstName: null },
      signOut: mockSignOut,
    });
    renderPage();

    expect(screen.getByText(/Welcome, there!/i)).toBeInTheDocument();
  });

  it('handles null user', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      signOut: mockSignOut,
    });
    renderPage();

    expect(screen.getByText(/Welcome, there!/i)).toBeInTheDocument();
  });
});
