import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResumePreviewPanel } from './ResumePreviewPanel';
import resumeHtml from '@/assets/resume_ralph_real.html?raw';

const meta = {
  title: 'Organisms/ResumePreviewPanel',
  component: ResumePreviewPanel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '700px', width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    resumeHtml: { control: 'text' },
    highlightedBulletId: { control: 'text' },
    highlightedText: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof ResumePreviewPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    resumeHtml,
  },
};

export const WithHighlight: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
  },
};

export const Empty: Story = {
  args: {
    resumeHtml: '',
  },
};
