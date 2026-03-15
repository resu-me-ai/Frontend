import React, { useEffect } from 'react';
import { SignUp } from '@clerk/clerk-react';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { trackPageView, trackSignupStarted } from '@/lib/analytics';

export const SignUpPage: React.FC = () => {
  useEffect(() => {
    trackPageView('Sign Up', '/sign-up');
    trackSignupStarted();
  }, []);

  return (
    <AuthLayout>
      <SignUp
        appearance={{
          elements: {
            rootBox: 'w-full mx-auto',
            card: 'shadow-none border-0 w-full mx-auto',
            headerTitle: 'text-2xl font-semibold text-gray-900',
            headerSubtitle: 'text-gray-600',
            socialButtonsBlockButton: 'border-gray-300 hover:border-gray-400',
            formButtonPrimary: 'bg-gray-900 hover:bg-gray-800',
            formFieldInput: 'border-gray-300 focus:ring-gray-900 focus:border-gray-900',
            footerActionLink: 'text-gray-900 hover:text-gray-700',
          },
          layout: {
            socialButtonsPlacement: 'top',
          },
        }}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/onboarding/step/1"
      />
    </AuthLayout>
  );
};

