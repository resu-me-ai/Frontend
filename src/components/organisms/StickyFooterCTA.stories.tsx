import type { Meta, StoryObj } from '@storybook/react';
import { StickyFooterCTA } from './StickyFooterCTA';

const meta = {
  title: 'Organisms/StickyFooterCTA',
  component: StickyFooterCTA,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    showAfterScroll: {
      control: 'number',
      description: 'Scroll percentage to trigger visibility',
    },
    ctaText: {
      control: 'text',
      description: 'Button text',
    },
    message: {
      control: 'text',
      description: 'Banner message text',
    },
  },
} satisfies Meta<typeof StickyFooterCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showAfterScroll: 0, // instant for demo
  },
  render: (args) => (
    <div className="h-[200px] relative">
      <StickyFooterCTA {...args} />
    </div>
  ),
};

export const CustomMessage: Story = {
  args: {
    showAfterScroll: 0,
    message: 'Your resume could score 20% higher. Try our AI analysis.',
    ctaText: 'Analyze Now',
  },
  render: (args) => (
    <div className="h-[200px] relative">
      <StickyFooterCTA {...args} />
    </div>
  ),
};
