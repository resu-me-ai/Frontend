import type { Meta, StoryObj } from '@storybook/react';
import { SkillItem } from './SkillItem';

const meta = {
  title: 'Molecules/SkillItem',
  component: SkillItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SkillItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'User Research & Testing',
    strength: 'strong',
  },
};

export const Strong: Story = {
  args: {
    name: 'User Research & Testing',
    strength: 'strong',
  },
};

export const Moderate: Story = {
  args: {
    name: 'Cross-functional Collaboration',
    strength: 'moderate',
  },
};

export const List: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-3 w-[500px]">
      <SkillItem name="User Research & Testing" strength="strong" />
      <SkillItem name="Figma & Design Systems" strength="strong" />
      <SkillItem name="Wireframing & Prototyping" strength="strong" />
      <SkillItem name="Cross-functional Collaboration" strength="moderate" />
      <SkillItem name="Agile Methodologies" strength="moderate" />
    </div>
  ),
};
