/**
 * TDD Tests for HomePage (Demo Mode)
 *
 * Tests for the landing page:
 * - Renders main heading and tagline
 * - Shows CTA buttons based on auth state
 * - Feature cards render correctly
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock useAuth
const mockUseAuth = vi.fn();
vi.mock('@/hooks', () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock Logo component
vi.mock('@/components/atoms/Logo', () => ({
  Logo: ({ size }: { size: number }) => (
    <div data-testid="logo" data-size={size}>Logo</div>
  ),
}));

// Mock Button component
vi.mock('@/components/atoms/Button', () => ({
  Button: ({ children, onClick, ...props }: React.ComponentProps<'button'>) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
}));

import { HomePage } from '@/pages/HomePage';

function renderPage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe('HomePage renders correctly', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
  });

  it('renders the main heading', () => {
    renderPage();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Your Resume');
    expect(heading.textContent).toContain('Smarter Every Time');
  });

  it('renders the tagline', () => {
    renderPage();

    expect(screen.getByText(/Building meaningful experiences together/i)).toBeInTheDocument();
  });

  it('renders the logo', () => {
    renderPage();

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders three feature cards', () => {
    renderPage();

    expect(screen.getByText('AI-Powered Content')).toBeInTheDocument();
    expect(screen.getByText('Real-time Analytics')).toBeInTheDocument();
    expect(screen.getByText('ATS Optimization')).toBeInTheDocument();
  });
});

describe('HomePage unauthenticated state', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
  });

  it('shows Get Started button when not authenticated', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });

  it('shows Sign In button when not authenticated', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('Get Started navigates to /sign-up', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: /Get Started/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/sign-up');
  });

  it('Sign In navigates to /sign-in', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: /Sign In/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/sign-in');
  });

  it('does not show Continue Onboarding when not authenticated', () => {
    renderPage();

    expect(screen.queryByRole('button', { name: /Continue Onboarding/i })).not.toBeInTheDocument();
  });
});

describe('HomePage authenticated state', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
  });

  it('shows Continue Onboarding button when authenticated', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /Continue Onboarding/i })).toBeInTheDocument();
  });

  it('shows Go to Dashboard button when authenticated', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /Go to Dashboard/i })).toBeInTheDocument();
  });

  it('Continue Onboarding navigates to /onboarding/step/1', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: /Continue Onboarding/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/onboarding/step/1');
  });

  it('Go to Dashboard navigates to /dashboard', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: /Go to Dashboard/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('does not show Get Started when authenticated', () => {
    renderPage();

    expect(screen.queryByRole('button', { name: /Get Started/i })).not.toBeInTheDocument();
  });
});

describe('HomePage responsive layout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
  });

  it('has centered content container', () => {
    renderPage();

    // Check that main container has centering classes
    const container = screen.getByRole('heading', { level: 1 }).closest('div');
    expect(container).toHaveClass('text-center');
  });
});
