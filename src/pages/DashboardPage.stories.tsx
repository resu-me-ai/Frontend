import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { OnboardingHeader } from '@/components/organisms/OnboardingHeader';

/**
 * Mock version of DashboardPage for Storybook.
 * The real page depends on useAuth which requires Clerk context.
 * This mock recreates the layout with static user data.
 */
const MockDashboardPage: React.FC<{
  userName?: string;
  userEmail?: string;
}> = ({
  userName = 'Test User',
  userEmail = 'test@example.com',
}) => {
  return (
    <div className="min-h-screen bg-bg-gray flex flex-col">
      <OnboardingHeader showAuthButtons={false} />

      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome, {userName}!
            </h1>
            <p className="text-text-secondary mb-6">
              You've successfully completed the onboarding process.
            </p>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                What's Next?
              </h2>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&#10003;</span>
                  <span>Create your first AI-powered resume</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&#10003;</span>
                  <span>Optimize your resume for specific job descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&#10003;</span>
                  <span>Track your application performance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Account Information
            </h2>
            <div className="space-y-2 text-text-secondary">
              <p><strong>Email:</strong> {userEmail}</p>
              <p><strong>Name:</strong> {userName}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => console.log('Sign out clicked')}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Pages/DashboardPage',
  component: MockDashboardPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof MockDashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default: authenticated user viewing their dashboard.
 */
export const Default: Story = {
  args: {
    userName: 'Ralph Bautista',
    userEmail: 'ralph@example.com',
  },
};

/**
 * New user with minimal profile data.
 */
export const NewUser: Story = {
  args: {
    userName: 'there',
    userEmail: 'N/A',
  },
};
