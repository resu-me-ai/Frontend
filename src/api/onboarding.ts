// Onboarding API endpoints
import { apiClient } from './client';
import type { OnboardingFormData } from '../types';

export const onboardingApi = {
  submitOnboarding: async (data: OnboardingFormData) => {
    return apiClient.request('/onboarding/web/complete', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

