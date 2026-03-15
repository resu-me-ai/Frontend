import React from 'react';
import { ClerkProvider as BaseClerkProvider } from '@clerk/clerk-react';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const BYPASS_AUTH = import.meta.env.VITE_BYPASS_AUTH === 'true';

// Allow bypass in development mode
const isValidKey = CLERK_PUBLISHABLE_KEY && !CLERK_PUBLISHABLE_KEY.includes('placeholder');

export interface ClerkProviderProps {
  children: React.ReactNode;
}

export const ClerkProvider: React.FC<ClerkProviderProps> = ({ children }) => {
  // Bypass Clerk if auth is disabled or key is invalid in dev mode
  if (BYPASS_AUTH || !isValidKey) {
    return <>{children}</>;
  }

  return (
    <BaseClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      {children}
    </BaseClerkProvider>
  );
};
