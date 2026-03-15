import React from 'react';
import { OnboardingLayout } from '@/components/templates/OnboardingLayout';
import { OnboardingStepForm } from '@/components/organisms/OnboardingStepForm';
import { RoleChipGroup } from '@/components/molecules/RoleChipGroup';
import { FormInput } from '@/components/molecules/FormInput';
import { Icon } from '@/components/atoms/Icon';

export interface Step2ViewProps {
  currentStep?: number;
  totalSteps?: number;
  title?: string;
  subtitle?: string;
  roleOptions: string[];
  supportedRoles?: Set<string>;
  selectedRole: string | null;
  roleError?: string;
  jobTitle: string;
  jobTitleError?: string;
  onRoleChange: (role: string | null) => void;
  onJobTitleChange: (value: string) => void;
  onJobTitleBlur?: () => void;
  sessionError?: string | null;
  onNext: () => void;
  onBack?: () => void;
}

export const Step2View: React.FC<Step2ViewProps> = ({
  currentStep = 2,
  totalSteps = 4,
  title = 'Tell us about yourself',
  subtitle = 'Your professional story is ready to be built.',
  roleOptions,
  supportedRoles: _supportedRoles,
  selectedRole,
  roleError,
  jobTitle,
  jobTitleError,
  sessionError,
  onRoleChange,
  onJobTitleChange,
  onJobTitleBlur,
  onNext,
  onBack,
}) => {
  return (
    <OnboardingLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onNext();
        }}
      >
        <OnboardingStepForm
          currentStep={currentStep}
          totalSteps={totalSteps}
          title={title}
          subtitle={subtitle}
          onNext={onNext}
          onBack={onBack}
        >
          <div>
            <label className="block text-base font-semibold text-text-primary mb-4">
              What's your role?
            </label>
            <RoleChipGroup
              options={roleOptions}
              selectedRole={selectedRole}
              onChange={onRoleChange}
            />
            {roleError && (
              <p className="mt-2 text-sm text-red-500">{roleError}</p>
            )}
          </div>

          <FormInput
            id="jobTitle"
            label="Most recent job title"
            placeholder="Senior Software Engineer"
            required
            leadingIcon={<Icon name="briefcase" size={20} />}
            value={jobTitle}
            onChange={(e) => onJobTitleChange(e.target.value)}
            onBlur={onJobTitleBlur}
            error={jobTitleError}
          />

          {sessionError && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">
              {sessionError}
            </div>
          )}
        </OnboardingStepForm>
      </form>
    </OnboardingLayout>
  );
};
