import type { Meta, StoryObj } from '@storybook/react';
import { FileDropzone } from './FileDropzone';

const meta = {
  title: 'Molecules/FileDropzone',
  component: FileDropzone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    supportedFormats: {
      control: 'object',
      description: 'Array of supported file format labels',
    },
    maxSizeMB: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Maximum file size in MB',
    },
    isUploading: {
      control: 'boolean',
      description: 'Whether a file is currently uploading',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', minHeight: '150px' }} className="bg-white rounded-lg shadow p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FileDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

const noOp = () => {};

export const Default: Story = {
  args: {
    onFilesSelected: noOp,
  },
};

export const CustomFormats: Story = {
  args: {
    onFilesSelected: noOp,
    supportedFormats: ['PDF', 'DOCX'],
    maxSizeMB: 10,
  },
};

export const Uploading: Story = {
  args: {
    onFilesSelected: noOp,
    isUploading: true,
  },
};

export const WithSelectedFile: Story = {
  args: {
    onFilesSelected: noOp,
    selectedFile: new File(['resume content'], 'Ralph_Resume_2025.pdf', {
      type: 'application/pdf',
    }),
  },
};
