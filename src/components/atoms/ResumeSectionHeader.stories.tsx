import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ResumeSectionHeader } from './ResumeSectionHeader';

/** Decorator simulating the resume document content area (816px - 80px padding) */
const docWidth = [(Story: React.FC) => <div style={{ width: 736 }}><Story /></div>] as const;

const meta = {
  title: 'Atoms/ResumeSectionHeader',
  component: ResumeSectionHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section heading text',
    },
  },
} satisfies Meta<typeof ResumeSectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Summary: Story = {
  args: { title: 'PROFESSIONAL SUMMARY' },
  decorators: [...docWidth],
};

export const Experience: Story = {
  args: { title: 'CAREER EXPERIENCE & ACHIEVEMENTS' },
  decorators: [...docWidth],
};

export const EarlyExperience: Story = {
  args: { title: 'EARLY WORK EXPERIENCES (2006-2012)' },
  decorators: [...docWidth],
};
