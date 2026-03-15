import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { Button } from '@/components/atoms/Button';
import { Logo } from '@/components/atoms/Logo';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-progress-active flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-4xl">
        <div className="flex justify-center mb-8">
          <Logo size={80} />
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-6">
          Your Resume, <span className="text-black">Smarter Every Time</span>
        </h1>
        
        <p className="text-2xl text-white mb-12 font-medium tracking-tight">
          "Building meaningful experiences together."
        </p>

        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <>
              <Button
                size="lg"
                onClick={() => navigate('/onboarding/step/1')}
                className="text-lg px-8"
              >
                Continue Onboarding
              </Button>
              <Button
                variant="back"
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="text-lg px-8 bg-white text-primary hover:bg-gray-100"
              >
                Go to Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button
                size="lg"
                onClick={() => navigate('/sign-up')}
                className="text-lg px-8 bg-white text-primary hover:bg-gray-100"
              >
                Get Started
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/sign-in')}
                className="text-lg px-8"
              >
                Sign In
              </Button>
            </>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Content</h3>
            <p className="text-white/80">
              Our advanced AI analyzes job descriptions and optimizes your resume content.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Analytics</h3>
            <p className="text-white/80">
              Track your resume performance and get actionable insights.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">ATS Optimization</h3>
            <p className="text-white/80">
              Ensure your resume passes through Applicant Tracking Systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

