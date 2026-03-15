import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ResumeHeader } from './ResumeHeader';

const meta = {
  title: 'Molecules/ResumeHeader',
  component: ResumeHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResumeHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Decorator simulating the resume document content area (816px - 80px padding) */
const docWidth = [(Story: React.FC) => <div style={{ width: 736 }}><Story /></div>] as const;

export const Default: Story = {
  args: {
    overview: {
      full_name: 'RALPH BAUTISTA',
      contact_line: 'Toronto, ON | (416) 555-0123 | ralph@email.com | linkedin.com/in/ralphb',
      parsed_contact: {
        location: 'Toronto, ON',
        phone: '(416) 555-0123',
        email: 'ralph@email.com',
        linkedin_url: 'linkedin.com/in/ralphb',
      },
    },
  },
  decorators: [...docWidth],
};

export const FallbackContactLine: Story = {
  args: {
    overview: {
      full_name: 'JANE DOE',
      contact_line: 'New York, NY | (212) 555-0456 | jane@email.com',
      parsed_contact: {},
    },
  },
  decorators: [...docWidth],
};
