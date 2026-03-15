import React, { useEffect } from 'react';
import { SignIn } from '@clerk/clerk-react';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { trackPageView, trackSigninStarted } from '@/lib/analytics';

export const SignInPage: React.FC = () => {
  useEffect(() => {
    trackPageView('Sign In', '/sign-in');
    trackSigninStarted();
  }, []);

  return (
    <AuthLayout>
      <SignIn
        appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'shadow-none border-0 w-full',
            headerTitle: 'text-2xl font-semibold text-gray-900',
            headerSubtitle: 'text-gray-600',
            socialButtonsBlockButton: 'border-gray-300 hover:border-gray-400',
            formButtonPrimary: 'bg-gray-900 hover:bg-gray-800',
            formFieldInput: 'border-gray-300 focus:ring-gray-900 focus:border-gray-900',
            footerActionLink: 'text-gray-900 hover:text-gray-700',
          },
        }}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl="/onboarding/step/1"
      />
    </AuthLayout>
  );
};

