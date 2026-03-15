import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Logo } from '@/components/atoms/Logo';
import { trackCheckout, trackPageView } from '@/lib/analytics';

export const CheckoutSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Track page view
    trackPageView('checkout_success');

    if (sessionId) {
      // Track successful checkout completion (client-side confirmation)
      trackCheckout('completed', {
        session_id: sessionId,
        source: 'stripe_redirect',
      });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Logo size={60} />
        </div>

        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-8">
          Welcome to Resume Studio! Your subscription is now active.
          Let's create your perfect resume.
        </p>

        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>

          <button
            onClick={() => navigate('/onboarding/1-profile')}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            Complete Onboarding First →
          </button>
        </div>

        {sessionId && (
          <p className="mt-6 text-xs text-gray-400">
            Order ID: {sessionId.substring(0, 20)}...
          </p>
        )}
      </div>
    </div>
  );
};
