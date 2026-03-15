import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useCheckout } from '@/hooks/useCheckout';
import { Button } from '@/components/atoms/Button';
import { Logo } from '@/components/atoms/Logo';
import { trackPricingInteraction, trackCheckout } from '@/lib/analytics';

type BillingInterval = 'monthly' | 'yearly';

const PLANS = [
  {
    id: 'product-a-or-b',
    name: 'Product A or B',
    monthlyPrice: 'XX',
    yearlyPrice: 'XX', // 10% off applied
    priceId: {
      monthly: import.meta.env.VITE_STRIPE_PRICE_MONTHLY || 'price_placeholder_monthly_1',
      yearly: import.meta.env.VITE_STRIPE_PRICE_YEARLY || 'price_placeholder_yearly_1',
    },
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
    yearlyPrice: 'XX', // 10% off applied
    priceId: {
      monthly: import.meta.env.VITE_STRIPE_PRICE_KIT_MONTHLY || 'price_placeholder_monthly_2',
      yearly: import.meta.env.VITE_STRIPE_PRICE_KIT_YEARLY || 'price_placeholder_yearly_2',
    },
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
    yearlyPrice: 'XX-XXX', // 10% off applied
    priceId: {
      monthly: import.meta.env.VITE_STRIPE_PRICE_WORKSPACE_MONTHLY || 'price_placeholder_monthly_3',
      yearly: import.meta.env.VITE_STRIPE_PRICE_WORKSPACE_YEARLY || 'price_placeholder_yearly_3',
    },
    features: [
      'Everything in Product A + B',
      'Unlimited Workspaces',
      'Meeting Prep, Email Automation, Your Second Brain',
      '500-2,500 Specialized Agent Credits',
    ],
  },
];

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { checkout, isLoading, error } = useCheckout();
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('monthly');

  // Track page view on mount
  useEffect(() => {
    trackPricingInteraction('page_viewed', {
      billing_interval: billingInterval,
      is_signed_in: isSignedIn,
    });
  }, []);

  const handleBillingToggle = (interval: BillingInterval) => {
    setBillingInterval(interval);
    trackPricingInteraction('billing_toggled', {
      from: billingInterval,
      to: interval,
    });
  };

  const handleCheckout = async (plan: typeof PLANS[0]) => {
    // Track plan selection
    trackPricingInteraction('plan_selected', {
      plan_id: plan.id,
      plan_name: plan.name,
      billing_interval: billingInterval,
      price: billingInterval === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice,
    });

    if (!isSignedIn) {
      navigate('/sign-up');
      return;
    }

    // Track checkout started
    trackCheckout('started', {
      plan_id: plan.id,
      plan_name: plan.name,
      billing_interval: billingInterval,
    });

    const priceId = plan.priceId[billingInterval];
    await checkout(priceId);
  };

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
              onClick={() => handleBillingToggle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingInterval === 'monthly'
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleBillingToggle('yearly')}
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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center max-w-md mx-auto">
            {error}
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow"
            >
              {/* Plan Name */}
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {plan.name}
              </h3>

              {/* Price */}
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

              {/* Features */}
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

              {/* CTA Button */}
              <Button
                size="lg"
                className="w-full bg-blue-900 hover:bg-blue-900/90"
                onClick={() => handleCheckout(plan)}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Go back
          </button>
        </div>
      </div>
    </div>
  );
};

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
