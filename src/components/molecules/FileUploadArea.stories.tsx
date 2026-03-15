import type { Meta, StoryObj } from '@storybook/react';
import { FileUploadArea } from './FileUploadArea';

const meta = {
  title: 'Molecules/FileUploadArea',
  component: FileUploadArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted file types',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
  },
} satisfies Meta<typeof FileUploadArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFileSelect: (file) => {
      console.log('File selected:', file.name);
    },
  },
};

export const WithCustomAccept: Story = {
  args: {
    accept: '.pdf',
    onFileSelect: (file) => {
      console.log('File selected:', file.name);
    },
  },
};

export const WithCustomMaxSize: Story = {
  args: {
    maxSize: 10 * 1024 * 1024, // 10MB
    onFileSelect: (file) => {
      console.log('File selected:', file.name);
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const handleFileSelect = (file: File) => {
      alert(`File selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
    };

    return (
      <div className="w-[600px]">
        <FileUploadArea onFileSelect={handleFileSelect} />
      </div>
    );
  },
};
