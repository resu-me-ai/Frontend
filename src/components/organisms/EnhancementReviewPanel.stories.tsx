import type { Meta, StoryObj } from '@storybook/react';
import { EnhancementReviewPanel } from './EnhancementReviewPanel';
import {
  mockDimensionScores,
  mockBulletReviews,
  mockOriginalScore,
  mockEnhancedScore,
} from '@/mocks/enhancement-review.mock';

const meta = {
  title: 'Organisms/EnhancementReviewPanel',
  component: EnhancementReviewPanel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[500px] h-[800px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EnhancementReviewPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    originalScore: mockOriginalScore,
    enhancedScore: mockEnhancedScore,
    dimensionScores: mockDimensionScores,
    bulletReviews: mockBulletReviews,
    onApply: () => alert('Apply Changes clicked'),
  },
};

export const FewBullets: Story = {
  args: {
    originalScore: 5.8,
    enhancedScore: 7.5,
    dimensionScores: mockDimensionScores.slice(0, 3),
    bulletReviews: mockBulletReviews.slice(0, 2),
    onApply: () => alert('Apply Changes clicked'),
  },
};
