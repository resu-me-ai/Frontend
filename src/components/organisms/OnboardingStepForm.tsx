import React from 'react';
import { ProgressIndicator } from '@/components/molecules/ProgressIndicator';
import { NavigationButtons } from '@/components/molecules/NavigationButtons';

export interface OnboardingStepFormProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  onNext: () => void;
  onBack?: () => void;
  children: React.ReactNode;
  nextDisabled?: boolean;
  className?: string;
}

export const OnboardingStepForm: React.FC<OnboardingStepFormProps> = ({
  currentStep,
  totalSteps,
  title,
  subtitle,
  onNext,
  onBack,
  children,
  nextDisabled = false,
  className = '',
}) => {
  return (
    <div
      className={`
        bg-white border border-border-gray rounded-2xl
        w-[687px]
        ${className}
      `}
    >
      <div className="px-12 py-12 flex flex-col gap-8">
        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          className="px-1"
        />

        {/* Title and Subtitle */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.48px] text-[#333333]">
            {title}
          </h2>
          <p className="text-base font-normal leading-[1.4] text-text-secondary">
            {subtitle}
          </p>
        </div>

        {/* Form Content */}
        <div className="flex flex-col gap-6">
          {children}
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons
          onNext={onNext}
          onBack={onBack}
          showBack={!!onBack}
          nextDisabled={nextDisabled}
        />
      </div>
    </div>
  );
};

