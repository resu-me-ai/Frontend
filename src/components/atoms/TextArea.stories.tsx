import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta = {
  title: 'Atoms/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    hint: {
      control: 'text',
      description: 'Hint text below the textarea',
    },
    rows: {
      control: { type: 'number', min: 3, max: 20, step: 1 },
      description: 'Number of rows',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description here...',
    rows: 4,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Job Description',
    placeholder: 'Copy and paste the complete job description here...',
    hint: 'Include job title, company name, job description requirements, responsibilities, and qualifications for best results.',
    rows: 10,
  },
};

export const WithError: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description here...',
    error: 'This field is required',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Description',
    placeholder: 'This field is disabled',
    disabled: true,
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Description',
    defaultValue: 'This is some pre-filled text in the textarea component.',
    rows: 4,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[600px]">
      <TextArea placeholder="Default textarea" rows={4} />
      <TextArea label="With Label" placeholder="Textarea with label" rows={4} />
      <TextArea
        label="With Hint"
        placeholder="Textarea with hint"
        hint="This is helpful hint text"
        rows={4}
      />
      <TextArea
        label="With Error"
        placeholder="Textarea with error"
        error="This field has an error"
        rows={4}
      />
      <TextArea
        label="Disabled"
        placeholder="Disabled textarea"
        disabled
        rows={4}
      />
    </div>
  ),
};
