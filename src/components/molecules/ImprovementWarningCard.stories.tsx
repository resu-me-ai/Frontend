import type { Meta, StoryObj } from '@storybook/react';
import { ImprovementWarningCard } from './ImprovementWarningCard';

const meta = {
  title: 'Molecules/ImprovementWarningCard',
  component: ImprovementWarningCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'List of improvement area strings to display',
    },
    className: {
      control: 'text',
      description: 'Optional additional CSS class names',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImprovementWarningCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      'Resume lacks quantified achievements in most bullet points',
      'No mention of cross-functional stakeholder management',
      'Missing technical skills required by the job description',
      'Experience section does not highlight leadership responsibilities',
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      'Summary section uses generic filler phrases instead of role-specific language',
    ],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      'Resume lacks quantified achievements in most bullet points',
      'No mention of cross-functional stakeholder management',
      'Missing technical skills required by the job description',
      'Experience section does not highlight leadership responsibilities',
      'Summary uses passive voice instead of strong action verbs',
      'No evidence of data-driven decision making',
      'Gap in employment history not addressed',
      'Skills section missing industry-standard certifications',
    ],
  },
};
