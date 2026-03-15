import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingStepForm } from './OnboardingStepForm';
import { fn } from 'storybook/test';

const meta = {
  title: 'Organisms/OnboardingStepForm',
  component: OnboardingStepForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    onNext: fn(),
    onBack: fn(),
  },
} satisfies Meta<typeof OnboardingStepForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentStep: 1,
    totalSteps: 4,
    title: 'Tell us about yourself',
    subtitle: 'This information helps us personalize your resume recommendations.',
    children: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="john@example.com"
          />
        </div>
      </div>
    ),
  },
};

export const FirstStep: Story = {
  args: {
    currentStep: 1,
    totalSteps: 4,
    title: 'What is your target role?',
    subtitle: 'Select the position you are applying for.',
    onBack: undefined,
    children: (
      <div className="space-y-3">
        {['Product Manager', 'Software Engineer', 'Data Scientist', 'UX Designer'].map((role) => (
          <button
            key={role}
            className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            {role}
          </button>
        ))}
      </div>
    ),
  },
};

export const MiddleStep: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    title: 'Years of experience',
    subtitle: 'How many years have you worked in your field?',
    children: (
      <div className="space-y-3">
        {['0-2 years', '3-5 years', '6-10 years', '10+ years'].map((range) => (
          <button
            key={range}
            className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            {range}
          </button>
        ))}
      </div>
    ),
  },
};

export const FinalStep: Story = {
  args: {
    currentStep: 4,
    totalSteps: 4,
    title: 'Almost there!',
    subtitle: 'Review your information before we generate your personalized recommendations.',
    children: (
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <p className="text-sm"><span className="font-medium">Role:</span> Product Manager</p>
        <p className="text-sm"><span className="font-medium">Experience:</span> 3-5 years</p>
        <p className="text-sm"><span className="font-medium">Industry:</span> Technology</p>
      </div>
    ),
  },
};

export const WithDisabledNext: Story = {
  args: {
    currentStep: 1,
    totalSteps: 4,
    title: 'Select your industry',
    subtitle: 'Choose the industry that best matches your experience.',
    nextDisabled: true,
    onBack: undefined,
    children: (
      <p className="text-gray-500 text-sm italic">Please select an option to continue</p>
    ),
  },
};
