import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '@/components/atoms/ProgressBar';

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    totalSteps: {
      control: { type: 'range', min: 2, max: 10, step: 1 },
      description: 'Total number of steps in the progress bar',
    },
    currentStep: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Current active step',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalSteps: 5,
    currentStep: 1,
  },
};

export const Step1Of5: Story = {
  args: {
    totalSteps: 5,
    currentStep: 1,
  },
};

export const Step3Of5: Story = {
  args: {
    totalSteps: 5,
    currentStep: 3,
  },
};

export const Step5Of5: Story = {
  args: {
    totalSteps: 5,
    currentStep: 5,
  },
};

export const ThreeSteps: Story = {
  args: {
    totalSteps: 3,
    currentStep: 2,
  },
};

export const SevenSteps: Story = {
  args: {
    totalSteps: 7,
    currentStep: 4,
  },
};

export const AllProgressStates: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Step 1 of 5</span>
        <ProgressBar totalSteps={5} currentStep={1} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Step 2 of 5</span>
        <ProgressBar totalSteps={5} currentStep={2} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Step 3 of 5</span>
        <ProgressBar totalSteps={5} currentStep={3} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Step 4 of 5</span>
        <ProgressBar totalSteps={5} currentStep={4} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Step 5 of 5 (Complete)</span>
        <ProgressBar totalSteps={5} currentStep={5} />
      </div>
    </div>
  ),
};

