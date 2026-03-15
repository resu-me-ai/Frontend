import React from 'react';
import { OnboardingLayout } from '@/components/templates/OnboardingLayout';
import { OnboardingStepForm } from '@/components/organisms/OnboardingStepForm';
import { Chip } from '@/components/atoms/Chip';
import { Icon } from '@/components/atoms/Icon';
import { Dropdown } from '@/components/atoms/Dropdown';
import type { DropdownOption } from '@/components/atoms/Dropdown';

export interface Step4ViewProps {
  currentStep?: number;
  totalSteps?: number;
  title?: string;
  subtitle?: string;
  locationOptions: string[];
  selectedLocations: string[];
  locationsError?: string;
  isSubmitting?: boolean;
  onLocationToggle: (location: string) => void;
  onNext: () => void;
  onBack?: () => void;
  locationDropdownOptions?: DropdownOption[];
  selectedLocationFilter?: string;
  onLocationFilterChange?: (value: string) => void;
}

export const Step4View: React.FC<Step4ViewProps> = ({
  currentStep = 4,
  totalSteps = 4,
  title = 'Tell us about yourself',
  subtitle = 'Your professional story is ready to be built.',
  locationOptions,
  selectedLocations,
  locationsError,
  isSubmitting = false,
  onLocationToggle,
  onNext,
  onBack,
  locationDropdownOptions,
  selectedLocationFilter,
  onLocationFilterChange,
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
          nextDisabled={isSubmitting}
        >
          <div>
            <label className="block text-base font-semibold text-text-primary mb-4">
              Which locations are you open to working?
            </label>

            {locationDropdownOptions && locationDropdownOptions.length > 0 && (
              <div className="mb-4">
                <Dropdown
                  options={locationDropdownOptions}
                  value={selectedLocationFilter}
                  onChange={onLocationFilterChange}
                  leadingIcon={<Icon name="map-pin" size={16} />}
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {locationOptions.map((location) => (
                <Chip
                  key={location}
                  label={location}
                  selected={selectedLocations.includes(location)}
                  onClick={() => onLocationToggle(location)}
                />
              ))}
            </div>
            {locationsError && (
              <p className="mt-2 text-sm text-red-500">{locationsError}</p>
            )}
          </div>
        </OnboardingStepForm>
      </form>
    </OnboardingLayout>
  );
};
