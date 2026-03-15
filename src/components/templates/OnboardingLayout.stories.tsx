import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { OnboardingLayout } from './OnboardingLayout';

const meta = {
  title: 'Templates/OnboardingLayout',
  component: OnboardingLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof OnboardingLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Resu-ME AI
        </h2>
        <p className="text-gray-600 mb-6">
          This is a mock content block to demonstrate the OnboardingLayout template.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
          Get Started
        </button>
      </div>
    ),
  },
};

export const WithFormContent: Story = {
  args: {
    children: (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Tell us about yourself
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="john@example.com"
            />
          </div>
          <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
            Continue
          </button>
        </div>
      </div>
    ),
  },
};

export const WithMinimalContent: Story = {
  args: {
    children: (
      <div className="bg-white rounded-xl shadow-lg p-12 max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📄</span>
        </div>
        <p className="text-gray-600">Loading your experience...</p>
      </div>
    ),
  },
};
