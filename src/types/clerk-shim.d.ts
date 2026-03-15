/**
 * Type shim for @clerk/clerk-react exports
 *
 * Works around bundler moduleResolution issues with Clerk's re-exports
 * from @clerk/shared/react. These types augment the module declaration.
 *
 * @see https://github.com/clerk/javascript/issues
 */

import type { FC, ReactNode } from 'react';

declare module '@clerk/clerk-react' {
  // useUser from @clerk/shared/react
  export interface EmailAddressResource {
    emailAddress: string;
    verification: {
      status: 'unverified' | 'verified' | 'transferable' | 'failed' | 'expired';
    } | null;
  }

  export interface ExternalAccountResource {
    provider: string;
    providerUserId: string;
    emailAddress: string;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string;
  }

  export interface UserResource {
    id: string;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    username: string | null;
    primaryEmailAddress: EmailAddressResource | null;
    emailAddresses: EmailAddressResource[];
    externalAccounts: ExternalAccountResource[];
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export function useUser(): {
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
    user: UserResource | null | undefined;
  };

  // useAuth
  export function useAuth(): {
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
    userId: string | null;
    sessionId: string | null;
    orgId: string | null;
    orgRole: string | null;
    getToken: (options?: { template?: string }) => Promise<string | null>;
    signOut: (options?: { redirectUrl?: string }) => Promise<void>;
  };

  // ClerkProvider
  export interface ClerkProviderProps {
    publishableKey: string;
    children: ReactNode;
  }
  export const ClerkProvider: FC<ClerkProviderProps>;

  // SignIn
  export interface SignInProps {
    routing?: 'hash' | 'path' | 'virtual';
    path?: string;
    appearance?: Record<string, unknown>;
    redirectUrl?: string;
    afterSignInUrl?: string;
    afterSignUpUrl?: string;
    signUpUrl?: string;
    fallbackRedirectUrl?: string;
  }
  export const SignIn: FC<SignInProps>;

  // SignUp
  export interface SignUpProps {
    routing?: 'hash' | 'path' | 'virtual';
    path?: string;
    appearance?: Record<string, unknown>;
    redirectUrl?: string;
    afterSignInUrl?: string;
    afterSignUpUrl?: string;
    signInUrl?: string;
    fallbackRedirectUrl?: string;
  }
  export const SignUp: FC<SignUpProps>;

  // Conditional rendering components
  export const SignedIn: FC<{ children: ReactNode }>;
  export const SignedOut: FC<{ children: ReactNode }>;

  // Button components
  export const SignInButton: FC<{ children?: ReactNode; mode?: 'modal' | 'redirect' }>;
  export const SignUpButton: FC<{ children?: ReactNode; mode?: 'modal' | 'redirect' }>;
  export const SignOutButton: FC<{ children?: ReactNode; redirectUrl?: string }>;
  export const UserButton: FC<{ afterSignOutUrl?: string; appearance?: Record<string, unknown> }>;
}
