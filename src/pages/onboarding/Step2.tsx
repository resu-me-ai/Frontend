import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useField } from '@tanstack/react-form';
import { Step2View } from '@/components/templates/Step2View';
import { trackOnboardingStepViewed, trackOnboardingStepCompleted } from '@/lib/analytics';
import { getApiBase } from '@/lib/api';

const FALLBACK_ROLE_OPTIONS = [
  'Marketing',
  'HR',
  'Legal',
  'Product',
  'Design',
  'Creative Production',
  'Engineering',
  'Customer Service',
  'Operations',
  'Finance',
  'IT',
  'Support',
  'Manufacturing',
  'Sales',
  'Account Management',
  'Other / Personal',
];

interface RoleInfo {
  label: string;
  canonical: string;
  supported: boolean;
}

export const Step2: React.FC = () => {
  const navigate = useNavigate();
  const [roleOptions, setRoleOptions] = useState<string[]>(FALLBACK_ROLE_OPTIONS);
  const [supportedRoles, setSupportedRoles] = useState<Set<string> | undefined>(undefined);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    trackOnboardingStepViewed(2, 'role_and_title');
  }, []);

  // Fetch available roles from backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${getApiBase()}/pipeline/roles`);
        if (!response.ok) return; // Fall back to hardcoded list
        const data: { roles: RoleInfo[] } = await response.json();
        setRoleOptions(data.roles.map((r) => r.label));
        setSupportedRoles(new Set(data.roles.filter((r) => r.supported).map((r) => r.label)));
      } catch {
        // API unavailable — keep hardcoded fallback, all roles shown as supported
      }
    };
    fetchRoles();
  }, []);

  const form = useForm({
    defaultValues: {
      role: null as string | null,
      jobTitle: '',
    },
    onSubmit: async ({ value }) => {
      setSessionError(null);

      trackOnboardingStepCompleted(2, 'role_and_title', {
        role_selected: value.role,
        has_job_title: !!value.jobTitle,
      });
      localStorage.setItem('onboarding_step2', JSON.stringify(value));
      setSessionError(null);

      // Read user name from Step 1 to pass to pipeline session
      const step1 = JSON.parse(localStorage.getItem('onboarding_step1') || '{}');

      // Create pipeline session with V0.0 config
      try {
        const response = await fetch(`${getApiBase()}/pipeline/role`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role: value.role || '',
            jobTitle: value.jobTitle,
            fullName: step1.fullName || '',
          }),
        });

        if (!response.ok) throw new Error('Failed to create session');

        const { sessionId } = await response.json();
        localStorage.setItem('pipeline_session_id', sessionId);
      } catch (error) {
        console.error('Failed to create pipeline session:', error);
        setSessionError('Unable to connect to the server. Please check your connection and try again.');
        return;
      }

      navigate('/onboarding/step/3');
    },
  });

  const handleBack = () => {
    navigate('/onboarding/step/1');
  };

  const roleField = useField({ form, name: 'role' });
  const jobTitleField = useField({ form, name: 'jobTitle' });

  return (
    <Step2View
      currentStep={2}
      totalSteps={4}
      roleOptions={roleOptions}
      supportedRoles={supportedRoles}
      selectedRole={roleField.state.value}
      jobTitle={jobTitleField.state.value}
      jobTitleError={jobTitleField.state.meta.errors?.[0]}
      sessionError={sessionError}
      onRoleChange={(role) => roleField.handleChange(role)}
      onJobTitleChange={(value) => jobTitleField.handleChange(value)}
      onJobTitleBlur={() => jobTitleField.handleBlur()}
      onNext={() => form.handleSubmit()}
      onBack={handleBack}
    />
  );
};
