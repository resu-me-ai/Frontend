import type { Meta, StoryObj } from '@storybook/react';
import { BulletList } from './BulletList';

const meta = {
  title: 'Atoms/BulletList',
  component: BulletList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BulletList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlainBullets: Story = {
  args: {
    bullets: [
      { bullet_index: 0, text: 'Manage $XXM portfolio of high-profile sports-stream products to serve XM monthly users.' },
      { bullet_index: 1, text: 'Launched & manage e-commerce subscription platform with five cross-functional engineering teams.' },
      { bullet_index: 2, text: 'Hired, developed, and mentored seven high-performing brand managers.' },
    ],
  },
};

export const WithBoldPrefix: Story = {
  args: {
    bullets: [
      { bullet_index: 0, text: 'Education: Bachelor of Commerce (University of X, 20XX, X.XX GPA)' },
      { bullet_index: 1, text: '15 years of XYZ functional experience in high profile B2B/B2C products.' },
    ],
  },
};

export const WithOrangeAchievements: Story = {
  args: {
    bullets: [
      { bullet_index: 0, text: 'Achievements: Built product/engineering organization of 30 personnel; increased revenue by 200%' },
    ],
  },
};
