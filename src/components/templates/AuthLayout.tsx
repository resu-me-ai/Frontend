import React from 'react';
import { FeaturePanel } from '@/components/organisms/FeaturePanel';
import type { Feature } from '@/components/organisms/FeaturePanel';

const features: Feature[] = [
  {
    icon: (
      <svg
        width="30"
        height="24"
        viewBox="0 0 30 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 0L18 9L27 12L18 15L15 24L12 15L3 12L12 9L15 0Z" fill="white" />
      </svg>
    ),
    title: 'AI-Powered Content',
    description:
      'Our advanced AI analyzes job descriptions and optimizes your resume content for maximum impact.',
  },
  {
    icon: (
      <svg
        width="30"
        height="24"
        viewBox="0 0 30 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2h26M2 12h26M2 22h26M2 7h26M2 17h26"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Real-time Analytics',
    description:
      'Track your resume performance and get insights on how to improve your application success rate.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 11l3 3L22 4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'ATS Optimization',
    description:
      'Ensure your resume passes through Applicant Tracking Systems with our optimization engine.',
  },
];

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div
      className="h-screen flex flex-row overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, white 50%, #3A56FF 50%)' }}
    >
      {/* Left Panel - Features */}
      <div className="w-1/2 flex-shrink-0 flex overflow-hidden rounded-tr-[80px]">
        <FeaturePanel features={features} className="w-full h-full" />
      </div>

      {/* Right Panel - Auth Form */}
      <div
        className="w-1/2 flex-shrink-0 bg-white flex items-center justify-center rounded-bl-[80px] p-12 overflow-y-auto"
        style={{ backgroundColor: 'white' }}
      >
        <div className=" max-w-md mx-auto">{children}</div>
      </div>
    </div>
  );
};
