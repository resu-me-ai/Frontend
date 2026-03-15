import type { Meta, StoryObj } from '@storybook/react';
import { AnalysisStepItem } from './AnalysisStepItem';

const meta = {
  title: 'Molecules/AnalysisStepItem',
  component: AnalysisStepItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    stepNumber: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Step number to display',
    },
    title: {
      control: 'text',
      description: 'Step title',
    },
    description: {
      control: 'text',
      description: 'Step description',
    },
  },
} satisfies Meta<typeof AnalysisStepItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stepNumber: 1,
    title: 'AI-Powered Analysis',
    description: 'Our system identifies keywords, skills, and experience matches between your resume and the job requirements.',
  },
};

export const Step1: Story = {
  args: {
    stepNumber: 1,
    title: 'AI-Powered Analysis',
    description: 'Our system identifies keywords, skills, and experience matches between your resume and the job requirements.',
  },
};

export const Step2: Story = {
  args: {
    stepNumber: 2,
    title: 'Generate Report',
    description: 'We compile a detailed report with an overall match score, strengths, and areas for improvement.',
  },
};

export const Step3: Story = {
  args: {
    stepNumber: 3,
    title: 'Notification',
    description: "You'll be automatically redirected to your results page once the analysis is complete. Feel free to stay on this page.",
  },
};

export const AllSteps: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-6 w-[500px]">
      <AnalysisStepItem
        stepNumber={1}
        title="AI-Powered Analysis"
        description="Our system identifies keywords, skills, and experience matches between your resume and the job requirements."
      />
      <AnalysisStepItem
        stepNumber={2}
        title="Generate Report"
        description="We compile a detailed report with an overall match score, strengths, and areas for improvement."
      />
      <AnalysisStepItem
        stepNumber={3}
        title="Notification"
        description="You'll be automatically redirected to your results page once the analysis is complete. Feel free to stay on this page."
      />
    </div>
  ),
};
