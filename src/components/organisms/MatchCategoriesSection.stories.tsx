import type { Meta, StoryObj } from '@storybook/react';
import { MatchCategoriesSection } from './MatchCategoriesSection';

const meta = {
  title: 'Organisms/MatchCategoriesSection',
  component: MatchCategoriesSection,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof MatchCategoriesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: {
      skills: { score: 85, description: 'Strong alignment with required skills' },
      experience: { score: 82, description: 'Strong experience alignment' },
      qualifications: { score: 90, description: 'Exceeds most requirements' },
      keywords: { score: 88, description: 'Excellent keyword presence' },
    },
  },
};

export const StrongMatch: Story = {
  args: {
    categories: {
      skills: { score: 85, description: 'Strong alignment with required skills' },
      experience: { score: 82, description: 'Strong experience alignment' },
      qualifications: { score: 90, description: 'Exceeds most requirements' },
      keywords: { score: 88, description: 'Excellent keyword presence' },
    },
  },
};

export const MixedMatch: Story = {
  args: {
    categories: {
      skills: { score: 85, description: 'Strong alignment with required skills' },
      experience: { score: 72, description: 'Good experience alignment' },
      qualifications: { score: 68, description: 'Meets most requirements' },
      keywords: { score: 80, description: 'Strong keyword presence' },
    },
  },
};

export const WeakMatch: Story = {
  args: {
    categories: {
      skills: { score: 45, description: 'Needs improvement in skills' },
      experience: { score: 38, description: 'Needs improvement in experience' },
      qualifications: { score: 52, description: 'Needs improvement in qualifications' },
      keywords: { score: 40, description: 'Needs improvement in keywords' },
    },
  },
};
