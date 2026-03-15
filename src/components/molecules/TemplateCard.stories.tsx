import type { Meta, StoryObj } from '@storybook/react';
import { TemplateCard } from './TemplateCard';

const meta = {
  title: 'Molecules/TemplateCard',
  component: TemplateCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof TemplateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'Classic' },
  decorators: [(Story) => <div className="w-[131px]"><Story /></div>],
};

export const Selected: Story = {
  args: { name: 'Modern', selected: true },
  decorators: [(Story) => <div className="w-[131px]"><Story /></div>],
};

export const Grid: Story = {
  args: {} as never,
  render: () => (
    <div className="grid grid-cols-2 gap-2 w-[271px]">
      <TemplateCard name="Classic" selected />
      <TemplateCard name="Modern" />
      <TemplateCard name="Executive" />
      <TemplateCard name="Creative" />
    </div>
  ),
  parameters: { layout: 'padded' },
};
