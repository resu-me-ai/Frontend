import React from 'react';
import { OnboardingHeader } from '@/components/organisms/OnboardingHeader';
import { useAuth } from '@/hooks/useAuth';

export interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-bg-gray flex flex-col">
      <OnboardingHeader showAuthButtons={!isAuthenticated} />
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        {children}
      </div>
    </div>
  );
};

