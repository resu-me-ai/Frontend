import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Logo } from '@/components/atoms/Logo';

type BillingInterval = 'monthly' | 'yearly';

const PLANS = [
  {
    id: 'product-a-or-b',
    name: 'Product A or B',
    monthlyPrice: 'XX',
    yearlyPrice: 'XX',
    features: [
      'AI-Powered Resumes',
      'Career Narrative Extraction',
      'Job Matching Intelligence',
      'Human-In-The-Loop Workflow',
    ],
  },
  {
    id: 'product-a-plus-b',
    name: 'Product A + B',
    monthlyPrice: 'XX',
    yearlyPrice: 'XX',
    features: [
      'Everything in Product A or B',
      'Interview Prep & Practice',
      'Application Tracking & Optimization',
    ],
  },
  {
    id: 'product-c',
    name: 'Product C',
    monthlyPrice: 'XX-XXX',
    yearlyPrice: 'XX-XXX',
    features: [
      'Everything in Product A + B',
      'Unlimited Workspaces',
      'Meeting Prep, Email Automation, Your Second Brain',
      '500-2,500 Specialized Agent Credits',
    ],
  },
];

const CheckIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Mock version of PricingPage for Storybook.
 * The real page uses useAuth from @clerk/clerk-react and useCheckout.
 */
const MockPricingPage: React.FC<{
  isSignedIn?: boolean;
  showError?: boolean;
}> = ({ isSignedIn = false, showError = false }) => {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('monthly');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Logo size={60} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start building your perfect resume with AI-powered tools
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingInterval === 'monthly'
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingInterval === 'yearly'
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                10% off
              </span>
            </button>
          </div>
        </div>

        {showError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center max-w-md mx-auto">
            Something went wrong. Please try again.
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {plan.name}
              </h3>

              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-900">
                  ${billingInterval === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-gray-500 ml-2">per month</span>
                {billingInterval === 'yearly' && (
                  <div className="text-sm text-green-600 mt-1">
                    Billed annually (10% savings)
                  </div>
                )}
              </div>

              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-900 mb-4">Features:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckIcon />
                      <span className="ml-3 text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                size="lg"
                className="w-full bg-blue-900 hover:bg-blue-900/90"
                onClick={() => console.log(`Selected plan: ${plan.name}, billing: ${billingInterval}`)}
              >
                {isSignedIn ? 'Get Started' : 'Sign Up to Get Started'}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-gray-500 hover:text-gray-700 text-sm">
            &#8592; Go back
          </button>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Pages/PricingPage',
  component: MockPricingPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/pricing']}>
        <Routes>
          <Route path="/pricing" element={<Story />} />
          <Route path="/sign-up" element={<div>Sign Up Page</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof MockPricingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default: visitor (not signed in) viewing pricing plans with monthly billing.
 */
export const Default: Story = {
  args: {
    isSignedIn: false,
  },
};

/**
 * Authenticated: signed-in user viewing pricing plans.
 */
export const Authenticated: Story = {
  args: {
    isSignedIn: true,
  },
};

/**
 * Error state: checkout error displayed above the pricing cards.
 */
export const WithError: Story = {
  args: {
    isSignedIn: true,
    showError: true,
  },
};
