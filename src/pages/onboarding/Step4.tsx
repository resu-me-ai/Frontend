import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useField } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Step4View } from '@/components/templates/Step4View';
import { onboardingApi } from '@/api/onboarding';
import type { OnboardingFormData } from '@/types';
import {
  trackPageView,
  trackOnboardingStepViewed,
  trackOnboardingStepCompleted,
  trackOnboardingCompleted,
  identify
} from '@/lib/analytics';

const locationOptions = [
  'New York, NY',
  'San Francisco, CA',
  'Los Angeles, CA',
  'Chicago, IL',
  'Boston, MA',
  'Seattle, WA',
  'Austin, TX',
  'Denver, CO',
  'Remote (US)',
  'Remote (International)',
];

export const Step4: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    trackPageView('Onboarding Step 4', '/onboarding/step/4');
    trackOnboardingStepViewed(4, 'location_preferences');
    startTimeRef.current = Date.now();
  }, []);

  const handleNavigation = () => {
    localStorage.removeItem('onboarding_step1');
    localStorage.removeItem('onboarding_step2');
    localStorage.removeItem('onboarding_step3');
    navigate('/job-description');
  };

  const mutation = useMutation({
    mutationFn: (data: OnboardingFormData) => onboardingApi.submitOnboarding(data),
    onSuccess: () => {
      const durationMs = Date.now() - startTimeRef.current;
      trackOnboardingStepCompleted(4, 'location_preferences');
      trackOnboardingCompleted(4, durationMs);

      const step1 = JSON.parse(localStorage.getItem('onboarding_step1') || '{}');
      if (step1.fullName) {
        identify(step1.fullName, { full_name: step1.fullName });
      }

      localStorage.removeItem('onboarding_step1');
      localStorage.removeItem('onboarding_step2');
      localStorage.removeItem('onboarding_step3');
      navigate('/job-description');
    },
    onError: (error) => {
      console.error('Onboarding submission failed:', error);

      const errorMessage = error instanceof Error ? error.message : String(error);
      const isConnectionError =
        error instanceof TypeError ||
        errorMessage.includes('Failed to fetch') ||
        errorMessage.includes('ERR_CONNECTION_REFUSED') ||
        errorMessage.includes('NetworkError') ||
        errorMessage.includes('fetch');

      if (isConnectionError && import.meta.env.DEV) {
        console.warn('Backend not available, continuing with navigation in development mode');
        handleNavigation();
      } else {
        setIsSubmitting(false);
      }
    },
  });

  const form = useForm({
    defaultValues: {
      locations: [] as string[],
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);

      const step1 = JSON.parse(localStorage.getItem('onboarding_step1') || '{}');
      const step2 = JSON.parse(localStorage.getItem('onboarding_step2') || '{}');
      const step3 = JSON.parse(localStorage.getItem('onboarding_step3') || '{}');

      const completeData: OnboardingFormData = {
        fullName: step1.fullName || '',
        pronouns: step1.pronouns || '',
        roles: step2.role ? [step2.role] : [],
        jobTitle: step2.jobTitle || '',
        salaryExpectations: step3.salaryExpectations || '',
        equityPreference: step3.equityPreference || '',
        workLocation: step3.workLocation || '',
        teamSize: step3.teamSize || '',
        companyStage: step3.companyStage || '',
        locations: value.locations,
      };

      mutation.mutate(completeData);
    },
  });

  const locationsField = useField({ form, name: 'locations' });

  const handleLocationToggle = (location: string) => {
    const current = locationsField.state.value;
    if (current.includes(location)) {
      locationsField.handleChange(current.filter((l: string) => l !== location));
    } else {
      locationsField.handleChange([...current, location]);
    }
  };

  const handleBack = () => {
    navigate('/onboarding/step/3');
  };

  return (
    <Step4View
      currentStep={4}
      totalSteps={4}
      locationOptions={locationOptions}
      selectedLocations={locationsField.state.value}
      isSubmitting={isSubmitting}
      onLocationToggle={handleLocationToggle}
      onNext={() => form.handleSubmit()}
      onBack={handleBack}
    />
  );
};
