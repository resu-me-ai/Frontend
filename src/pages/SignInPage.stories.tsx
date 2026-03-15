import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@/components/templates/AuthLayout';

/**
 * Mock version of SignInPage for Storybook.
 * The real page uses Clerk's <SignIn /> component which requires ClerkProvider.
 * This mock recreates the visual layout with a static form.
 */
const MockSignInPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Sign in to Resume Studio
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Welcome back! Please sign in to continue.
        </p>

        {/* Social buttons */}
        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">Continue with Google</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Email field */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-gray-900 focus:border-gray-900"
              readOnly
            />
          </div>

          <button className="w-full px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium text-sm">
            Continue
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-gray-900 hover:text-gray-700 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

const meta = {
  title: 'Pages/SignInPage',
  component: MockSignInPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/sign-in']}>
        <Routes>
          <Route path="/sign-in" element={<Story />} />
          <Route path="/sign-up" element={<div>Sign Up Page</div>} />
          <Route path="/onboarding/step/1" element={<div>Onboarding Step 1</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof MockSignInPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default sign-in page with feature panel on the left and auth form on the right.
 */
export const Default: Story = {};
