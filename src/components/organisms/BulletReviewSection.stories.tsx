import type { Meta, StoryObj } from '@storybook/react';
import { BulletReviewSection } from './BulletReviewSection';
import { mockBulletReviews } from '@/mocks/enhancement-review.mock';

const meta = {
  title: 'Organisms/BulletReviewSection',
  component: BulletReviewSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BulletReviewSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    review: mockBulletReviews[0],
    onSelectVersion: (bulletId, version) =>
      console.log(`Selected version ${version} for bullet ${bulletId}`),
  },
};

export const SecondBullet: Story = {
  args: {
    review: mockBulletReviews[1],
    onSelectVersion: (bulletId, version) =>
      console.log(`Selected version ${version} for bullet ${bulletId}`),
  },
};
