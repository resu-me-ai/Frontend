import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom';

/**
 * Mock version of IndexRouter for Storybook.
 * The real component uses useAuth from @clerk/clerk-react which requires ClerkProvider.
 * This mock demonstrates the routing behavior for each auth state.
 */
const MockIndexRouter: React.FC<{
  authState?: 'loading' | 'signed-in' | 'signed-out';
}> = ({ authState = 'signed-out' }) => {
  if (authState === 'loading') {
    return null;
  }

  if (authState === 'signed-in') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/sign-up" replace />;
};

/**
 * Wrapper that shows destination page label to visualize the redirect.
 */
const IndexRouterStory: React.FC<{
  authState?: 'loading' | 'signed-in' | 'signed-out';
}> = ({ authState = 'signed-out' }) => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<MockIndexRouter authState={authState} />} />
        <Route
          path="/dashboard"
          element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">&#8594;</div>
                <h1 className="text-2xl font-bold text-gray-900">Redirected to /dashboard</h1>
                <p className="text-gray-600 mt-2">User is signed in - routed to dashboard</p>
              </div>
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">&#8594;</div>
                <h1 className="text-2xl font-bold text-gray-900">Redirected to /sign-up</h1>
                <p className="text-gray-600 mt-2">User is not signed in - routed to sign up</p>
              </div>
            </div>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

const meta = {
  title: 'Pages/IndexRouter',
  component: IndexRouterStory,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IndexRouterStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    authState: 'loading',
  },
};

/**
 * Loading state: blank screen while Clerk initializes.
 */
export const Loading: Story = {
  args: {
    authState: 'loading',
  },
};

/**
 * Signed in: redirects to /dashboard.
 */
export const SignedIn: Story = {
  args: {
    authState: 'signed-in',
  },
};

/**
 * Signed out: redirects to /sign-up.
 */
export const SignedOut: Story = {
  args: {
    authState: 'signed-out',
  },
};
