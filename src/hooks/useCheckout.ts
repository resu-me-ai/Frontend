/**
 * useCheckout Hook
 *
 * Handles Stripe Checkout session creation and redirects.
 * Uses the Backend /checkout/create-session endpoint.
 */

import { useState, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';

interface UseCheckoutReturn {
  checkout: (priceId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useCheckout(): UseCheckoutReturn {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = useCallback(async (priceId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Not authenticated');
      }

      // Checkout is a NestJS/Stripe endpoint — use backend URL, not FastAPI
      const apiBaseUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000/api/v1';

      const response = await fetch(`${apiBaseUrl}/checkout/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create checkout session');
      }

      const { url } = await response.json();

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      setError(err.message || 'Checkout failed');
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  return { checkout, isLoading, error };
}

export default useCheckout;
