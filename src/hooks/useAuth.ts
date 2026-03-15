const BYPASS_AUTH = import.meta.env.VITE_BYPASS_AUTH === 'true';
const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isValidKey = CLERK_KEY && !CLERK_KEY.includes('placeholder');

// Mock user for bypass mode
const mockUser = {
  id: 'test-user-001',
  firstName: 'Test',
  lastName: 'User',
  fullName: 'Test User',
  primaryEmailAddress: { emailAddress: 'test@example.com' },
};

const mockAuthResult = {
  isAuthenticated: true,
  isLoading: false,
  user: mockUser,
  userId: 'test-user-001',
  sessionId: 'test-session-001',
  signOut: async () => console.log('[Mock Auth] Sign out'),
};

export const useAuth = () => {
  // Always return mock in bypass mode or with invalid key
  if (BYPASS_AUTH || !isValidKey) {
    return mockAuthResult;
  }

  // This branch only runs with valid Clerk key
  // Import dynamically to avoid errors when Clerk isn't configured
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useAuth: useClerkAuth, useUser } = require('@clerk/clerk-react');
    const { isLoaded, userId, sessionId, signOut } = useClerkAuth();
    const { user, isLoaded: userLoaded } = useUser();

    return {
      isAuthenticated: !!userId,
      isLoading: !isLoaded || !userLoaded,
      user,
      userId,
      sessionId,
      signOut,
    };
  } catch {
    // Clerk not available — silently fall back to mock auth
    return mockAuthResult;
  }
};
