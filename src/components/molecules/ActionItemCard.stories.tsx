import type { Meta, StoryObj } from '@storybook/react';
import { ActionItemCard } from './ActionItemCard';

const meta = {
  title: 'Molecules/ActionItemCard',
  component: ActionItemCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    number: 1,
    title: 'Add Accessibility Experience',
    description: 'The job description emphasizes WCAG compliance. Add specific examples of accessible design work.',
    priority: 'high',
  },
};

export const HighPriority: Story = {
  args: {
    number: 1,
    title: 'Add Accessibility Experience',
    description: 'The job description emphasizes WCAG compliance. Add specific examples of accessible design work.',
    priority: 'high',
  },
};

export const MediumPriority: Story = {
  args: {
    number: 2,
    title: 'Quantify Design System Impact',
    description: 'Add metrics showing how your design system improved team efficiency or product consistency.',
    priority: 'medium',
  },
};

export const LowPriority: Story = {
  args: {
    number: 4,
    title: 'Highlight Stakeholder Collaboration',
    description: 'The role requires working with senior leadership. Showcase relevant experience.',
    priority: 'low',
  },
};

export const List: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-4 w-[600px]">
      <ActionItemCard
        number={1}
        title="Add Accessibility Experience"
        description="The job description emphasizes WCAG compliance. Add specific examples of accessible design work."
        priority="high"
      />
      <ActionItemCard
        number={2}
        title="Quantify Design System Impact"
        description="Add metrics showing how your design system improved team efficiency or product consistency."
        priority="medium"
      />
      <ActionItemCard
        number={3}
        title="Emphasize Data-Driven Decisions"
        description="Include examples of using analytics or user data to inform design decisions."
        priority="medium"
      />
      <ActionItemCard
        number={4}
        title="Highlight Stakeholder Collaboration"
        description="The role requires working with senior leadership. Showcase relevant experience."
        priority="low"
      />
    </div>
  ),
};
