import type { Meta, StoryObj } from '@storybook/react';
import { RichTextArea } from './RichTextArea';

const meta = {
  title: 'Atoms/RichTextArea',
  component: RichTextArea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof RichTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Job Description',
    placeholder: 'Paste a job description here — formatting will be preserved...',
    hint: 'Bold, italic, and list formatting from the source is preserved.',
    onChange: (html: string) => console.log('HTML output:', html),
  },
};

export const WithRichContent: Story = {
  args: {
    label: 'Job Description',
    value: '<p><strong>Requirements:</strong></p><ul><li><strong>5+ years</strong> of product management experience</li><li>Experience with <em>A/B testing</em> at scale</li><li>Strong analytical skills</li></ul><p><strong>Nice to have:</strong></p><ul><li>Background in <strong>marketplace</strong> products</li><li>SQL proficiency</li></ul>',
    hint: 'This content was pasted from a job board with formatting preserved.',
    onChange: (html: string) => console.log('HTML output:', html),
  },
};

export const WithError: Story = {
  args: {
    label: 'Job Description',
    placeholder: 'Paste a job description here...',
    error: 'Please enter a job description.',
    onChange: (html: string) => console.log('HTML output:', html),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Job Description',
    value: '<p>This field is <strong>disabled</strong> and cannot be edited.</p>',
    disabled: true,
    onChange: (html: string) => console.log('HTML output:', html),
  },
};
