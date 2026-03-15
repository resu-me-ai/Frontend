import type { Meta, StoryObj } from '@storybook/react';
import { ResumeDocument } from './ResumeDocument';
import { mockResumeDocument } from '@/mocks/resume-document.mock';

const meta = {
  title: 'Organisms/ResumeDocument',
  component: ResumeDocument,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'gray', values: [{ name: 'gray', value: '#f9fafb' }] },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResumeDocument>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full-width container — document renders at 816px and centers itself */
export const Default: Story = {
  args: {
    data: mockResumeDocument,
  },
};

/** Narrow container — document scales down to fit, preserving text wrapping */
export const ScaledDown: Story = {
  args: {
    data: mockResumeDocument,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
};
