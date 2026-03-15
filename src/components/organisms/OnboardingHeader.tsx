import React from 'react';
import { Logo } from '@/components/atoms/Logo';
import { Button } from '@/components/atoms/Button';
import { useNavigate } from 'react-router-dom';

export interface OnboardingHeaderProps {
  showAuthButtons?: boolean;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  showAuthButtons = true,
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size={38} />
          <span className="text-[23px] font-semibold text-brand-subtitle tracking-[0.115px] font-epilogue leading-6">
            Resu-ME AI
          </span>
        </div>
        
        {showAuthButtons && (
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={() => navigate('/sign-up')}
              className="h-10 px-6"
            >
              Sign Up
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/sign-in')}
              className="h-10 px-5"
            >
              Log In
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

