import type { Meta, StoryObj } from '@storybook/react';
import { MissingSkillItem } from './MissingSkillItem';

const meta = {
  title: 'Molecules/MissingSkillItem',
  component: MissingSkillItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MissingSkillItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Design System Documentation',
    priority: 'critical',
  },
};

export const Critical: Story = {
  args: {
    name: 'Design System Documentation',
    priority: 'critical',
  },
};

export const Important: Story = {
  args: {
    name: 'Accessibility (WCAG) Standards',
    priority: 'important',
  },
};

export const NiceToHave: Story = {
  args: {
    name: 'Sketch Software',
    priority: 'nice-to-have',
  },
};

export const List: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-3 w-[500px]">
      <MissingSkillItem name="Design System Documentation" priority="critical" />
      <MissingSkillItem name="Accessibility (WCAG) Standards" priority="important" />
      <MissingSkillItem name="Data-Driven Design Decisions" priority="important" />
      <MissingSkillItem name="Sketch Software" priority="nice-to-have" />
      <MissingSkillItem name="HTML/CSS Knowledge" priority="nice-to-have" />
    </div>
  ),
};
