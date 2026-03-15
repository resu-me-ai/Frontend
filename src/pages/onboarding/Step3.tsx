import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useField } from '@tanstack/react-form';
import { Step3View } from '@/components/templates/Step3View';
import { trackPageView, trackOnboardingStepViewed, trackOnboardingStepCompleted } from '@/lib/analytics';

const salaryOptions = [
  { value: '', label: 'Select range' },
  { value: '40-60k', label: '$40,000 - $60,000' },
  { value: '60-80k', label: '$60,000 - $80,000' },
  { value: '80-100k', label: '$80,000 - $100,000' },
  { value: '100-120k', label: '$100,000 - $120,000' },
  { value: '120-140k', label: '$120,000 - $140,000' },
  { value: '140-160k', label: '$140,000 - $160,000' },
  { value: '160k+', label: '$160,000+' },
];

const equityOptions = [
  { value: '', label: 'Select preference' },
  { value: 'salary-focused', label: 'Salary Focused' },
  { value: 'combined', label: 'Combined' },
  { value: 'equity-focused', label: 'Equity Focused' },
];

const workLocationOptions = [
  { value: '', label: 'Select preference' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid-2-3', label: 'Hybrid (2-3 days in office)' },
  { value: 'hybrid-4', label: 'Hybrid (4 days in office)' },
  { value: 'office', label: 'In Office' },
];

const teamSizeOptions = [
  { value: '', label: 'Select team size' },
  { value: 'solo', label: 'Solo (1-2 people)' },
  { value: 'small', label: 'Small team (3-5 people)' },
  { value: 'medium', label: 'Medium team (6-10 people)' },
  { value: 'large', label: 'Large team (11-20 people)' },
  { value: 'enterprise', label: 'Enterprise (20+ people)' },
];

export const Step3: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('Onboarding Step 3', '/onboarding/step/3');
    trackOnboardingStepViewed(3, 'preferences');
  }, []);

  const form = useForm({
    defaultValues: {
      salaryExpectations: '',
      equityPreference: '',
      workLocation: '',
      teamSize: '',
      companyStage: '',
    },
    onSubmit: async ({ value }) => {
      trackOnboardingStepCompleted(3, 'preferences', {
        has_salary: !!value.salaryExpectations,
        has_equity_pref: !!value.equityPreference,
        has_work_location: !!value.workLocation,
        has_team_size: !!value.teamSize,
      });
      localStorage.setItem('onboarding_step3', JSON.stringify(value));
      navigate('/onboarding/step/4');
    },
  });

  const handleBack = () => {
    navigate('/onboarding/step/2');
  };

  const salaryField = useField({ form, name: 'salaryExpectations' });
  const equityField = useField({ form, name: 'equityPreference' });
  const workLocationField = useField({ form, name: 'workLocation' });
  const teamSizeField = useField({ form, name: 'teamSize' });
  const companyStageField = useField({ form, name: 'companyStage' });

  return (
    <Step3View
      currentStep={3}
      totalSteps={4}
      salaryExpectations={salaryField.state.value}
      salaryOptions={salaryOptions}
      equityPreference={equityField.state.value}
      equityOptions={equityOptions}
      workLocation={workLocationField.state.value}
      workLocationOptions={workLocationOptions}
      teamSize={teamSizeField.state.value}
      teamSizeOptions={teamSizeOptions}
      companyStage={companyStageField.state.value}
      onSalaryChange={(value) => salaryField.handleChange(value)}
      onEquityChange={(value) => equityField.handleChange(value)}
      onWorkLocationChange={(value) => workLocationField.handleChange(value)}
      onTeamSizeChange={(value) => teamSizeField.handleChange(value)}
      onCompanyStageChange={(value) => companyStageField.handleChange(value)}
      onNext={() => form.handleSubmit()}
      onBack={handleBack}
    />
  );
};
