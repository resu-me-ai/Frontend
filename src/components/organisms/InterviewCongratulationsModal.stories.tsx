import type { Meta, StoryObj } from '@storybook/react';
import { InterviewCongratulationsModal } from './InterviewCongratulationsModal';

const meta = {
  title: 'Organisms/InterviewCongratulationsModal',
  component: InterviewCongratulationsModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof InterviewCongratulationsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: { isOpen: true },
};

export const Closed: Story = {
  args: { isOpen: false },
};
