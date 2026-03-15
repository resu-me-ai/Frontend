import type { Meta, StoryObj } from '@storybook/react';
import { ProgressIndicator } from '@/components/molecules/ProgressIndicator';

const meta = {
  title: 'Molecules/ProgressIndicator',
  component: ProgressIndicator,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'range', min: 1, max: 5, step: 1 },
      description: 'Current active step',
    },
    totalSteps: {
      control: { type: 'range', min: 2, max: 10, step: 1 },
      description: 'Total number of steps',
    },
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentStep: 1,
    totalSteps: 5,
    onSkip: () => alert('Skip clicked'),
  },
};

export const Step1: Story = {
  args: {
    currentStep: 1,
    totalSteps: 5,
    onSkip: () => alert('Skip clicked'),
  },
};

export const Step3: Story = {
  args: {
    currentStep: 3,
    totalSteps: 5,
    onSkip: () => alert('Skip clicked'),
  },
};

export const Step5: Story = {
  args: {
    currentStep: 5,
    totalSteps: 5,
    onSkip: () => alert('Skip clicked'),
  },
};

export const WithoutSkip: Story = {
  args: {
    currentStep: 2,
    totalSteps: 5,
  },
};

export const ThreeSteps: Story = {
  args: {
    currentStep: 2,
    totalSteps: 3,
    onSkip: () => alert('Skip clicked'),
  },
};

export const AllSteps: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Step 1 of 5</h3>
        <ProgressIndicator
          currentStep={1}
          totalSteps={5}
          onSkip={() => alert('Skip clicked')}
        />
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Step 2 of 5</h3>
        <ProgressIndicator
          currentStep={2}
          totalSteps={5}
          onSkip={() => alert('Skip clicked')}
        />
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Step 3 of 5</h3>
        <ProgressIndicator
          currentStep={3}
          totalSteps={5}
          onSkip={() => alert('Skip clicked')}
        />
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Step 4 of 5</h3>
        <ProgressIndicator
          currentStep={4}
          totalSteps={5}
          onSkip={() => alert('Skip clicked')}
        />
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Step 5 of 5 (Complete)</h3>
        <ProgressIndicator
          currentStep={5}
          totalSteps={5}
          onSkip={() => alert('Skip clicked')}
        />
      </div>
    </div>
  ),
};

export const InCard: Story = {
  args: {} as never,
  render: () => (
    <div className="bg-white rounded-2xl border border-gray-200 p-12 w-full max-w-2xl">
      <ProgressIndicator
        currentStep={3}
        totalSteps={5}
        onSkip={() => alert('Skip clicked')}
        className="mb-8"
      />
      <h2 className="text-2xl font-semibold mb-2">Tell us about yourself</h2>
      <p className="text-gray-600">Your professional story is ready to be built.</p>
    </div>
  ),
};

