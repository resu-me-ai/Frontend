/**
 * TDD Tests for CheckoutSuccessPage (Demo Mode)
 *
 * Tests for the checkout success page:
 * - Shows confirmation message
 * - Displays order details when session_id present
 * - Navigation buttons work
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

// Mock Logo
vi.mock('@/components/atoms/Logo', () => ({
  Logo: ({ size }: { size: number }) => (
    <div data-testid="logo" data-size={size}>Logo</div>
  ),
}));

// Mock Button
vi.mock('@/components/atoms/Button', () => ({
  Button: ({ children, onClick, ...props }: React.ComponentProps<'button'>) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
}));

// Mock analytics
const mockTrackCheckout = vi.fn();
const mockTrackPageView = vi.fn();
vi.mock('@/lib/analytics', () => ({
  trackCheckout: (...args: unknown[]) => mockTrackCheckout(...args),
  trackPageView: (...args: unknown[]) => mockTrackPageView(...args),
}));

import { CheckoutSuccessPage } from '@/pages/CheckoutSuccessPage';

function renderPage(route = '/checkout-success') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <CheckoutSuccessPage />
    </MemoryRouter>
  );
}

describe('CheckoutSuccessPage renders correctly', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the success heading', () => {
    renderPage();

    expect(screen.getByRole('heading', { name: /Payment Successful/i })).toBeInTheDocument();
  });

  it('renders the logo', () => {
    renderPage();

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('shows welcome message', () => {
    renderPage();

    expect(screen.getByText(/Welcome to Resume Studio/i)).toBeInTheDocument();
  });

  it('shows subscription active message', () => {
    renderPage();

    expect(screen.getByText(/subscription is now active/i)).toBeInTheDocument();
  });
});

describe('CheckoutSuccessPage navigation buttons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows Go to Dashboard button', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /Go to Dashboard/i })).toBeInTheDocument();
  });

  it('shows Complete Onboarding link', () => {
    renderPage();

    expect(screen.getByText(/Complete Onboarding First/i)).toBeInTheDocument();
  });

  it('navigates to dashboard when clicking Go to Dashboard', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: /Go to Dashboard/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('navigates to onboarding when clicking Complete Onboarding', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText(/Complete Onboarding First/i));

    expect(mockNavigate).toHaveBeenCalledWith('/onboarding/1-profile');
  });
});

describe('CheckoutSuccessPage order details', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows Order ID when session_id is in URL', () => {
    renderPage('/checkout-success?session_id=cs_test_abc123xyz456');

    expect(screen.getByText(/Order ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/cs_test_abc123xyz456/i)).toBeInTheDocument();
  });

  it('does not show Order ID when no session_id', () => {
    renderPage('/checkout-success');

    expect(screen.queryByText(/Order ID:/i)).not.toBeInTheDocument();
  });

  it('truncates long session IDs', () => {
    renderPage('/checkout-success?session_id=cs_test_verylongsessionidthatshouldbetruncat');

    const orderIdText = screen.getByText(/Order ID:/i);
    expect(orderIdText.textContent).toContain('...');
  });
});

describe('CheckoutSuccessPage analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('tracks page view on mount', () => {
    renderPage();

    expect(mockTrackPageView).toHaveBeenCalledWith('checkout_success');
  });

  it('tracks checkout completion when session_id present', () => {
    renderPage('/checkout-success?session_id=cs_test_123');

    expect(mockTrackCheckout).toHaveBeenCalledWith('completed', expect.objectContaining({
      session_id: 'cs_test_123',
      source: 'stripe_redirect',
    }));
  });
});
