import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout } from './AuthLayout';

const meta = {
  title: 'Templates/AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-500 mb-8">Sign in to your account to continue</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium">
            Sign In
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center mt-6">
          Don&apos;t have an account?{' '}
          <span className="text-primary font-medium cursor-pointer">Sign up</span>
        </p>
      </div>
    ),
  },
};

export const SignUp: Story = {
  args: {
    children: (
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create account</h1>
        <p className="text-gray-500 mb-8">Get started with Resu-ME AI</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Create a password"
            />
          </div>
          <button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium">
            Create Account
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{' '}
          <span className="text-primary font-medium cursor-pointer">Sign in</span>
        </p>
      </div>
    ),
  },
};
