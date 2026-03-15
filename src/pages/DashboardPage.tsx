import React from 'react';
import { useAuth } from '@/hooks';
import { Button } from '@/components/atoms/Button';
import { OnboardingHeader } from '@/components/organisms/OnboardingHeader';

export const DashboardPage: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-bg-gray flex flex-col">
      <OnboardingHeader showAuthButtons={false} />
      
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome, {user?.firstName || 'there'}! 🎉
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
                  <span className="text-primary mt-1">✓</span>
                  <span>Create your first AI-powered resume</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Optimize your resume for specific job descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
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
              <p><strong>Email:</strong> {user?.emailAddresses?.[0]?.emailAddress || 'N/A'}</p>
              <p><strong>Name:</strong> {user?.fullName || 'N/A'}</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => signOut()}
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

