import React from 'react';
import { OnboardingLayout } from '@/components/templates/OnboardingLayout';
import { OnboardingStepForm } from '@/components/organisms/OnboardingStepForm';
import { FormDropdown } from '@/components/molecules/FormDropdown';
import { FormInput } from '@/components/molecules/FormInput';

export interface Step3ViewProps {
  currentStep?: number;
  totalSteps?: number;
  title?: string;
  subtitle?: string;
  salaryExpectations: string;
  salaryOptions: Array<{ value: string; label: string }>;
  salaryError?: string;
  equityPreference: string;
  equityOptions: Array<{ value: string; label: string }>;
  workLocation: string;
  workLocationOptions: Array<{ value: string; label: string }>;
  teamSize: string;
  teamSizeOptions: Array<{ value: string; label: string }>;
  companyStage: string;
  companyStageError?: string;
  onSalaryChange: (value: string) => void;
  onEquityChange: (value: string) => void;
  onWorkLocationChange: (value: string) => void;
  onTeamSizeChange: (value: string) => void;
  onCompanyStageChange: (value: string) => void;
  onNext: () => void;
  onBack?: () => void;
}

export const Step3View: React.FC<Step3ViewProps> = ({
  currentStep = 3,
  totalSteps = 4,
  title = 'Tell us about yourself',
  subtitle = 'Your professional story is ready to be built.',
  salaryExpectations,
  salaryOptions,
  salaryError,
  equityPreference,
  equityOptions,
  workLocation,
  workLocationOptions,
  teamSize,
  teamSizeOptions,
  companyStage,
  companyStageError,
  onSalaryChange,
  onEquityChange,
  onWorkLocationChange,
  onTeamSizeChange,
  onCompanyStageChange,
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
          <div className="grid grid-cols-2 gap-8">
            <FormDropdown
              id="salaryExpectations"
              label="Salary Expectations"
              options={salaryOptions}
              value={salaryExpectations}
              onChange={onSalaryChange}
              error={salaryError}
            />

            <FormDropdown
              id="equityPreference"
              label="Equity vs Salary Preference"
              options={equityOptions}
              value={equityPreference}
              onChange={onEquityChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <FormDropdown
              id="workLocation"
              label="Work Location Preference"
              options={workLocationOptions}
              value={workLocation}
              onChange={onWorkLocationChange}
            />

            <FormDropdown
              id="teamSize"
              label="Ideal Team Size"
              options={teamSizeOptions}
              value={teamSize}
              onChange={onTeamSizeChange}
            />
          </div>

          <FormInput
            id="companyStage"
            label="Preferred Company Stage"
            placeholder="Pre-seed stage, growth stage, expansion stage..."
            value={companyStage}
            onChange={(e) => onCompanyStageChange(e.target.value)}
            error={companyStageError}
          />
        </OnboardingStepForm>
      </form>
    </OnboardingLayout>
  );
};
