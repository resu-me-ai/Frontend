import type { Meta, StoryObj } from '@storybook/react';
import { BulletVersionCard } from './BulletVersionCard';

const meta = {
  title: 'Molecules/BulletVersionCard',
  component: BulletVersionCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BulletVersionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectedBest: Story = {
  args: {
    version: 1,
    text: 'Directed $25M product portfolio spanning 3 sports-streaming verticals, driving 8M MAU and achieving 200% revenue growth through strategic feature prioritization.',
    score: 9.2,
    selected: true,
    isBest: true,
    onSelect: () => {},
  },
};

export const Unselected: Story = {
  args: {
    version: 2,
    text: 'Led strategic management of $25M sports-streaming product portfolio, growing monthly active users to 8M while optimizing engagement metrics.',
    score: 8.4,
    selected: false,
    isBest: false,
    onSelect: () => {},
  },
};

export const SelectedNotBest: Story = {
  args: {
    version: 2,
    text: 'Managed executive-level brand partnerships and directed product development of sports streaming applications across web, mobile, and connected device platforms.',
    score: 7.6,
    selected: true,
    isBest: false,
    onSelect: () => {},
  },
};
