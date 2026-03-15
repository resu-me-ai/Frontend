import type { Meta, StoryObj } from '@storybook/react';
import { UploadResumeSection } from './UploadResumeSection';
import { fn } from 'storybook/test';

const meta = {
  title: 'Organisms/UploadResumeSection',
  component: UploadResumeSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showCheckmark: {
      control: 'boolean',
      description: 'Whether to show the checkmark indicator on the section header',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    onFileUpload: fn(),
    onFileRemove: fn(),
    onResumeSelect: fn(),
  },
} satisfies Meta<typeof UploadResumeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedFile: null,
    existingResumes: [],
    showCheckmark: false,
  },
};

export const WithExistingResumes: Story = {
  args: {
    selectedFile: null,
    existingResumes: [
      {
        id: 'resume-1',
        fileName: 'Ralph_Bautista_Resume_2024.pdf',
        lastUpdated: 'Updated 2 days ago',
        fileType: 'pdf',
      },
      {
        id: 'resume-2',
        fileName: 'Resume_TechRole_v3.docx',
        lastUpdated: 'Updated 1 week ago',
        fileType: 'word',
      },
      {
        id: 'resume-3',
        fileName: 'Custom_Resume_Draft.pdf',
        lastUpdated: 'Updated 3 weeks ago',
        fileType: 'pdf',
      },
    ],
    showCheckmark: false,
  },
};

export const WithCheckmark: Story = {
  args: {
    selectedFile: null,
    existingResumes: [],
    showCheckmark: true,
  },
};

export const WithSelectedFile: Story = {
  args: {
    selectedFile: new File([''], 'My_Resume_Final.pdf', { type: 'application/pdf' }),
    existingResumes: [],
    showCheckmark: false,
  },
};

export const CompleteState: Story = {
  args: {
    selectedFile: new File([''], 'Resume_2024.pdf', { type: 'application/pdf' }),
    existingResumes: [
      {
        id: 'resume-1',
        fileName: 'Previous_Resume.pdf',
        lastUpdated: 'Updated 1 month ago',
        fileType: 'pdf',
      },
    ],
    showCheckmark: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    selectedFile: null,
    existingResumes: [],
    showCheckmark: false,
    className: 'max-w-lg mx-auto',
  },
};
