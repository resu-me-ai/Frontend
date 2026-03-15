import React from 'react';
import { OnboardingLayout } from '@/components/templates/OnboardingLayout';
import { OnboardingStepForm } from '@/components/organisms/OnboardingStepForm';
import { FormInput } from '@/components/molecules/FormInput';
import { FormDropdown } from '@/components/molecules/FormDropdown';

export interface Step1ViewProps {
  currentStep?: number;
  totalSteps?: number;
  title?: string;
  subtitle?: string;
  fullName: string;
  fullNameError?: string;
  pronouns: string;
  pronounsError?: string;
  pronounsOptions: Array<{ value: string; label: string }>;
  onFullNameChange: (value: string) => void;
  onFullNameBlur?: () => void;
  onPronounsChange: (value: string) => void;
  onNext: () => void;
}

export const Step1View: React.FC<Step1ViewProps> = ({
  currentStep = 1,
  totalSteps = 4,
  title = 'Tell us about yourself',
  subtitle = 'Your professional story is ready to be built.',
  fullName,
  fullNameError,
  pronouns,
  pronounsError,
  pronounsOptions,
  onFullNameChange,
  onFullNameBlur,
  onPronounsChange,
  onNext,
}) => {
  return (
    <OnboardingLayout>
      <OnboardingStepForm
        currentStep={currentStep}
        totalSteps={totalSteps}
        title={title}
        subtitle={subtitle}
        onNext={onNext}
      >
        <FormInput
          id="fullName"
          label="Full Name"
          placeholder="Enter full name"
          required
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          onBlur={onFullNameBlur}
          error={fullNameError}
        />

        <FormDropdown
          id="pronouns"
          label="Pronouns"
          options={pronounsOptions}
          value={pronouns}
          onChange={(value) => onPronounsChange(value)}
          error={pronounsError}
        />
      </OnboardingStepForm>
    </OnboardingLayout>
  );
};
