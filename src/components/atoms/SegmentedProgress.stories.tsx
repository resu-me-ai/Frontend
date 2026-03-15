import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedProgress } from '@/components/atoms/SegmentedProgress';

const meta = {
  title: 'Atoms/SegmentedProgress',
  component: SegmentedProgress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    totalSteps: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Total number of steps in the progress bar',
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Current step (1-indexed)',
    },
  },
} satisfies Meta<typeof SegmentedProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalSteps: 5,
    currentStep: 1,
  },
};

export const Step1of5: Story = {
  args: {
    totalSteps: 5,
    currentStep: 1,
  },
};

export const Step3of5: Story = {
  args: {
    totalSteps: 5,
    currentStep: 3,
  },
};

export const Step5of5: Story = {
  args: {
    totalSteps: 5,
    currentStep: 5,
  },
};

export const Step2of7: Story = {
  args: {
    totalSteps: 7,
    currentStep: 2,
  },
};
