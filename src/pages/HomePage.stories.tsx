import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Logo } from '@/components/atoms/Logo';

/**
 * Mock version of HomePage for Storybook.
 * The real page uses useAuth which may require Clerk context.
 * This mock recreates the layout for both authenticated and unauthenticated states.
 */
const MockHomePage: React.FC<{
  isAuthenticated?: boolean;
}> = ({ isAuthenticated = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-progress-active flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-4xl">
        <div className="flex justify-center mb-8">
          <Logo size={80} />
        </div>

        <h1 className="text-6xl font-bold text-white mb-6">
          Your Resume, <span className="text-black">Smarter Every Time</span>
        </h1>

        <p className="text-2xl text-white mb-12 font-medium tracking-tight">
          "Building meaningful experiences together."
        </p>

        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <>
              <Button
                size="lg"
                onClick={() => console.log('Navigate to onboarding')}
                className="text-lg px-8"
              >
                Continue Onboarding
              </Button>
              <Button
                variant="back"
                size="lg"
                onClick={() => console.log('Navigate to dashboard')}
                className="text-lg px-8 bg-white text-primary hover:bg-gray-100"
              >
                Go to Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button
                size="lg"
                onClick={() => console.log('Navigate to sign-up')}
                className="text-lg px-8 bg-white text-primary hover:bg-gray-100"
              >
                Get Started
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => console.log('Navigate to sign-in')}
                className="text-lg px-8"
              >
                Sign In
              </Button>
            </>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Content</h3>
            <p className="text-white/80">
              Our advanced AI analyzes job descriptions and optimizes your resume content.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Analytics</h3>
            <p className="text-white/80">
              Track your resume performance and get actionable insights.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">ATS Optimization</h3>
            <p className="text-white/80">
              Ensure your resume passes through Applicant Tracking Systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Pages/HomePage',
  component: MockHomePage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Story />} />
          <Route path="/sign-up" element={<div>Sign Up Page</div>} />
          <Route path="/sign-in" element={<div>Sign In Page</div>} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/onboarding/step/1" element={<div>Onboarding Step 1</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof MockHomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Unauthenticated: visitor sees Get Started and Sign In buttons.
 */
export const Default: Story = {
  args: {
    isAuthenticated: false,
  },
};

/**
 * Authenticated: signed-in user sees Continue Onboarding and Go to Dashboard buttons.
 */
export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
  },
};
