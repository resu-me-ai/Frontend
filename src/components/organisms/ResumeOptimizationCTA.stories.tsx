import type { Meta, StoryObj } from '@storybook/react';
import { ResumeOptimizationCTA } from './ResumeOptimizationCTA';

const meta = {
  title: 'Organisms/ResumeOptimizationCTA',
  component: ResumeOptimizationCTA,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof ResumeOptimizationCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabels: Story = {
  args: {
    title: 'Upgrade Your Resume Now',
    description: 'Get an AI-powered resume rewrite tailored to this specific role.',
    optimizeButtonLabel: 'Start Optimization',
    downloadButtonLabel: 'Export as PDF',
    features: ['Tailored to Role', 'ATS-Optimized', 'Instant Download'],
  },
};
