import React from 'react';
import { ClerkProvider } from './ClerkProvider';
import { QueryProvider } from './QueryProvider';
import { ResumeProvider } from '@/contexts/ResumeContext';

export interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </QueryProvider>
    </ClerkProvider>
  );
};

export { ClerkProvider, QueryProvider };

