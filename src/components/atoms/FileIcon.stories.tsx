import type { Meta, StoryObj } from '@storybook/react';
import { FileIcon } from './FileIcon';

const meta = {
  title: 'Atoms/FileIcon',
  component: FileIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fileType: {
      control: 'select',
      options: ['pdf', 'word', 'pencil'],
      description: 'The type of file icon to display',
    },
    size: {
      control: { type: 'range', min: 16, max: 48, step: 4 },
      description: 'The size of the icon in pixels',
    },
  },
} satisfies Meta<typeof FileIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileType: 'pdf',
    size: 24,
  },
};

export const Pdf: Story = {
  args: {
    fileType: 'pdf',
    size: 24,
  },
};

export const Word: Story = {
  args: {
    fileType: 'word',
    size: 24,
  },
};

export const Pencil: Story = {
  args: {
    fileType: 'pencil',
    size: 24,
  },
};

export const DifferentSizes: Story = {
  args: {} as never,
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <FileIcon fileType="pdf" size={16} />
        <span className="text-xs text-gray-500">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FileIcon fileType="pdf" size={20} />
        <span className="text-xs text-gray-500">20px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FileIcon fileType="pdf" size={24} />
        <span className="text-xs text-gray-500">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FileIcon fileType="pdf" size={32} />
        <span className="text-xs text-gray-500">32px</span>
      </div>
    </div>
  ),
};

export const AllTypes: Story = {
  args: {} as never,
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <FileIcon fileType="pdf" size={32} />
        <span className="text-xs text-gray-500">PDF</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FileIcon fileType="word" size={32} />
        <span className="text-xs text-gray-500">Word</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FileIcon fileType="pencil" size={32} />
        <span className="text-xs text-gray-500">Pencil</span>
      </div>
    </div>
  ),
};
