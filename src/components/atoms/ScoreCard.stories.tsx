import type { Meta, StoryObj } from '@storybook/react';
import { ScoreCard } from './ScoreCard';

const meta = {
  title: 'Atoms/ScoreCard',
  component: ScoreCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['skills-match', 'experience', 'qualifications', 'keywords'],
      description: 'Icon to display',
    },
    iconBgColor: {
      control: 'color',
      description: 'Background color for icon circle',
    },
    score: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Score percentage',
    },
    title: {
      control: 'text',
      description: 'Card title',
    },
    description: {
      control: 'text',
      description: 'Card description',
    },
  },
} satisfies Meta<typeof ScoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'skills-match',
    iconBgColor: '#dcfce7',
    score: 85,
    title: 'Skills Match',
    description: 'Strong alignment with required skills',
  },
};

export const SkillsMatch: Story = {
  args: {
    icon: 'skills-match',
    iconBgColor: '#dcfce7',
    score: 85,
    title: 'Skills Match',
    description: 'Strong alignment with required skills',
  },
};

export const Experience: Story = {
  args: {
    icon: 'experience',
    iconBgColor: '#dbeafe',
    score: 72,
    title: 'Experience',
    description: 'Good experience alignment',
  },
};

export const Qualifications: Story = {
  args: {
    icon: 'qualifications',
    iconBgColor: '#fef9c3',
    score: 68,
    title: 'Qualifications',
    description: 'Meets most requirements',
  },
};

export const Keywords: Story = {
  args: {
    icon: 'keywords',
    iconBgColor: '#f3e8ff',
    score: 80,
    title: 'Keywords',
    description: 'Strong keyword presence',
  },
};
