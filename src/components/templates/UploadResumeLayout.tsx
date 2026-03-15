import React from 'react';
import { AppHeader } from '@/components/organisms/AppHeader';

export interface UploadResumeLayoutProps {
  children: React.ReactNode;
}

export const UploadResumeLayout: React.FC<UploadResumeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-gray flex flex-col">
      <AppHeader />
      <div className="flex-1 flex justify-center pt-[25px] pb-16 px-4">
        <div className="w-full max-w-[1024px]">
          {children}
        </div>
      </div>
    </div>
  );
};
