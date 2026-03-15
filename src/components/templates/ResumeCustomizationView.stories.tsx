import type { Meta, StoryObj } from '@storybook/react';
import { ResumeCustomizationView } from './ResumeCustomizationView';
import { mockResumeDocument } from '@/mocks/resume-document.mock';

const meta = {
  title: 'Templates/ResumeCustomizationView',
  component: ResumeCustomizationView,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ResumeCustomizationView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    resumeData: mockResumeDocument,
  },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
};
