import type { Meta, StoryObj } from '@storybook/react';
import { PriorityActionsSection } from './PriorityActionsSection';

const meta = {
  title: 'Organisms/PriorityActionsSection',
  component: PriorityActionsSection,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof PriorityActionsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actionItems: [
      {
        number: 1,
        title: 'Add Accessibility Experience',
        description: 'The job description emphasizes WCAG compliance. Add specific examples of accessible design work.',
        priority: 'high',
      },
      {
        number: 2,
        title: 'Quantify Design System Impact',
        description: 'Add metrics showing how your design system improved team efficiency or product consistency.',
        priority: 'medium',
      },
      {
        number: 3,
        title: 'Emphasize Data-Driven Decisions',
        description: 'Include examples of using analytics or user data to inform design decisions.',
        priority: 'medium',
      },
      {
        number: 4,
        title: 'Highlight Stakeholder Collaboration',
        description: 'The role requires working with senior leadership. Showcase relevant experience.',
        priority: 'low',
      },
    ],
  },
};

export const AllHighPriority: Story = {
  args: {
    actionItems: [
      {
        number: 1,
        title: 'Add ML Experience',
        description: 'Machine Learning is listed as a CRITICAL requirement. Highlight any ML-adjacent work.',
        priority: 'high',
      },
      {
        number: 2,
        title: 'Include Cloud Certifications',
        description: 'AWS/GCP certifications are required. Add to qualifications section.',
        priority: 'high',
      },
    ],
  },
};

export const SingleAction: Story = {
  args: {
    actionItems: [
      {
        number: 1,
        title: 'Add quantified achievements',
        description: 'Include specific metrics (revenue impact, time saved, users served) for your top 3 bullet points.',
        priority: 'medium',
      },
    ],
  },
};
