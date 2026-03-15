import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useField } from '@tanstack/react-form';
import { Step1View } from '@/components/templates/Step1View';
import {
  trackPageView,
  trackOnboardingStarted,
  trackOnboardingStepViewed,
  trackOnboardingStepCompleted
} from '@/lib/analytics';

const pronounsOptions = [
  { value: '', label: 'Select your preferred pronouns' },
  { value: 'he/him', label: 'He/Him' },
  { value: 'she/her', label: 'She/Her' },
  { value: 'they/them', label: 'They/Them' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  { value: 'other', label: 'Other' },
];

export const Step1: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('Onboarding Step 1', '/onboarding/step/1');
    trackOnboardingStarted();
    trackOnboardingStepViewed(1, 'about_yourself');
  }, []);

  const form = useForm({
    defaultValues: {
      fullName: '',
      pronouns: '',
    },
    onSubmit: async ({ value }) => {
      trackOnboardingStepCompleted(1, 'about_yourself', {
        has_full_name: !!value.fullName,
        has_pronouns: !!value.pronouns,
      });

      localStorage.setItem('onboarding_step1', JSON.stringify(value));
      navigate('/onboarding/step/2');
    },
  });

  const fullNameField = useField({
    form,
    name: 'fullName',
    validators: {
      onChange: ({ value }) => {
        if (!value) return 'Full name is required';
        if (value.length < 2) return 'Full name must be at least 2 characters';
        return undefined;
      },
    },
  });

  const pronounsField = useField({ form, name: 'pronouns' });

  return (
    <Step1View
      fullName={fullNameField.state.value}
      fullNameError={fullNameField.state.meta.errors?.[0]}
      pronouns={pronounsField.state.value}
      pronounsOptions={pronounsOptions}
      onFullNameChange={(value) => fullNameField.handleChange(value)}
      onFullNameBlur={() => fullNameField.handleBlur()}
      onPronounsChange={(value) => pronounsField.handleChange(value)}
      onNext={() => form.handleSubmit()}
    />
  );
};
