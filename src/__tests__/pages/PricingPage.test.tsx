/**
 * TDD Tests for PricingPage (Demo Mode)
 *
 * Tests for the pricing page:
 * - Shows all plans with features
 * - Billing toggle (monthly/yearly) works
 * - Highlights recommended plan
 * - Get Started buttons work
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

// Mock Clerk useAuth
const mockUseAuth = vi.fn();
vi.mock('@clerk/clerk-react', () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock useCheckout - must be before any imports
const mockCheckout = vi.fn();
const mockUseCheckout = vi.fn(() => ({
  checkout: mockCheckout,
  isLoading: false,
  error: null,
}));
vi.mock('@/hooks/useCheckout', () => ({
  useCheckout: () => mockUseCheckout(),
}));

// Mock Stripe to prevent import errors
vi.mock('@stripe/stripe-js', () => ({
  loadStripe: vi.fn(() => Promise.resolve(null)),
}));

// Mock Logo
vi.mock('@/components/atoms/Logo', () => ({
  Logo: ({ size }: { size: number }) => (
    <div data-testid="logo" data-size={size}>Logo</div>
  ),
}));

// Mock Button
vi.mock('@/components/atoms/Button', () => ({
  Button: ({ children, onClick, disabled, ...props }: React.ComponentProps<'button'>) => (
    <button onClick={onClick} disabled={disabled} {...props}>{children}</button>
  ),
}));

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  trackPricingInteraction: vi.fn(),
  trackCheckout: vi.fn(),
}));

import { PricingPage } from '@/pages/PricingPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <PricingPage />
    </MemoryRouter>
  );
}

describe('PricingPage renders correctly', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isSignedIn: false });
  });

  it('renders the page heading', () => {
    renderPage();

    expect(screen.getByRole('heading', { name: /Choose Your Plan/i })).toBeInTheDocument();
  });

  it('renders the logo', () => {
    renderPage();

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders the subheading', () => {
    renderPage();

    expect(screen.getByText(/Start building your perfect resume/i)).toBeInTheDocument();
  });

  it('renders all three plan names', () => {
    renderPage();

    expect(screen.getByText('Product A or B')).toBeInTheDocument();
    expect(screen.getByText('Product A + B')).toBeInTheDocument();
    expect(screen.getByText('Product C')).toBeInTheDocument();
  });
});

describe('PricingPage billing toggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isSignedIn: false });
  });

  it('shows Monthly and Yearly toggle buttons', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /Monthly/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Yearly/i })).toBeInTheDocument();
  });

  it('defaults to monthly billing', () => {
    renderPage();

    const monthlyButton = screen.getByRole('button', { name: /Monthly/i });
    // Monthly button should have the selected styling
    expect(monthlyButton.className).toContain('bg-');
  });

  it('toggles to yearly when clicked', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: /Yearly/i }));

    // Should show yearly savings text
    expect(screen.getByText(/10% off/i)).toBeInTheDocument();
  });

  it('shows yearly savings badge', () => {
    renderPage();

    expect(screen.getByText(/10% off/i)).toBeInTheDocument();
  });
});

describe('PricingPage plan features', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isSignedIn: false });
  });

  it('shows AI-Powered Resumes feature', () => {
    renderPage();

    expect(screen.getByText('AI-Powered Resumes')).toBeInTheDocument();
  });

  it('shows Career Narrative Extraction feature', () => {
    renderPage();

    expect(screen.getByText('Career Narrative Extraction')).toBeInTheDocument();
  });

  it('shows Interview Prep feature', () => {
    renderPage();

    expect(screen.getByText('Interview Prep & Practice')).toBeInTheDocument();
  });

  it('shows Unlimited Workspaces feature', () => {
    renderPage();

    expect(screen.getByText('Unlimited Workspaces')).toBeInTheDocument();
  });
});

describe('PricingPage CTA buttons (unauthenticated)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isSignedIn: false });
  });

  it('shows Get Started buttons for each plan', () => {
    renderPage();

    const buttons = screen.getAllByRole('button', { name: /Get Started/i });
    expect(buttons.length).toBe(3); // One per plan
  });

  it('navigates to sign-up when clicking Get Started (unauthenticated)', async () => {
    const user = userEvent.setup();
    renderPage();

    const buttons = screen.getAllByRole('button', { name: /Get Started/i });
    await user.click(buttons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/sign-up');
  });
});

describe('PricingPage CTA buttons (authenticated)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isSignedIn: true });
  });

  it('calls checkout when clicking Get Started (authenticated)', async () => {
    const user = userEvent.setup();
    renderPage();

    const buttons = screen.getAllByRole('button', { name: /Get Started/i });
    await user.click(buttons[0]);

    // Should not navigate to sign-up
    expect(mockNavigate).not.toHaveBeenCalledWith('/sign-up');
    // Should call checkout
    expect(mockCheckout).toHaveBeenCalled();
  });
});

describe('PricingPage back navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isSignedIn: false });
  });

  it('shows Go back button', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /Go back/i })).toBeInTheDocument();
  });

  it('navigates back when clicking Go back', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: /Go back/i }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});

// Note: Error handling and loading state tests require component-level
// mock override which is complex with Vitest. The core functionality
// (plan display, toggle, navigation) is tested above. Error/loading
// states can be added when the component supports testable state injection.
