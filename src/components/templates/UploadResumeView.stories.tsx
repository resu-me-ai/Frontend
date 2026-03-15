import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { UploadResumeView } from './UploadResumeView';

const meta = {
  title: 'Templates/UploadResumeView',
  component: UploadResumeView,
  parameters: {
    layout: 'fullscreen',
    chromatic: { delay: 300 },
  },
  decorators: [(Story: React.ComponentType) => <MemoryRouter><Story /></MemoryRouter>],
  tags: ['autodocs'],
  argTypes: {
    selectedFile: { table: { disable: true } },
    existingResumes: { control: 'object' },
    showCheckmark: { control: 'boolean' },
    error: { control: 'text' },
    isAnalyzeDisabled: { control: 'boolean' },
    isUploading: { control: 'boolean' },
    onFileUpload: { table: { disable: true } },
    onFileRemove: { table: { disable: true } },
    onResumeSelect: { table: { disable: true } },
    onAnalyze: { table: { disable: true } },
  },
} satisfies Meta<typeof UploadResumeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isAnalyzeDisabled: true,
    onFileUpload: (file: File) => console.log('File uploaded:', file.name),
    onFileRemove: () => console.log('File removed'),
    onResumeSelect: (resumeId: string) => console.log('Resume selected:', resumeId),
    onAnalyze: () => console.log('Analyze clicked'),
  },
};

export const WithExistingResumes: Story = {
  args: {
    existingResumes: [
      { id: 'resume-1', fileName: 'Product_Designer_Resume_v3.pdf', lastUpdated: 'Updated 2 days ago', fileType: 'pdf' },
      { id: 'resume-2', fileName: 'UX_Lead_Resume_Final.docx', lastUpdated: 'Updated 5 days ago', fileType: 'word' },
    ],
    isAnalyzeDisabled: true,
    onFileUpload: (file: File) => console.log('File uploaded:', file.name),
    onFileRemove: () => console.log('File removed'),
    onResumeSelect: (resumeId: string) => console.log('Resume selected:', resumeId),
    onAnalyze: () => console.log('Analyze clicked'),
  },
};

export const WithError: Story = {
  args: {
    error: 'Please upload a resume or select an existing resume.',
    isAnalyzeDisabled: true,
    onFileUpload: (file: File) => console.log('File uploaded:', file.name),
    onFileRemove: () => console.log('File removed'),
    onResumeSelect: (resumeId: string) => console.log('Resume selected:', resumeId),
    onAnalyze: () => console.log('Analyze clicked'),
  },
};

/**
 * UploadPending: File selected and validated, API call in flight.
 * Button shows a loading spinner and "Uploading..." text, and is disabled.
 * The checkmark indicates the file passed validation before upload started.
 */
export const UploadPending: Story = {
  args: {
    selectedFile: new File(['resume content'], 'Product_Designer_Resume_v3.pdf', { type: 'application/pdf' }),
    showCheckmark: true,
    isAnalyzeDisabled: false,
    isUploading: true,
    onFileUpload: (file: File) => console.log('File uploaded:', file.name),
    onFileRemove: () => console.log('File removed'),
    onResumeSelect: (resumeId: string) => console.log('Resume selected:', resumeId),
    onAnalyze: () => console.log('Analyze clicked'),
  },
};

/**
 * UploadError: After a failed upload, error message shown below the upload section.
 * File selection is preserved so user can retry without re-selecting.
 * Button is enabled for immediate retry.
 */
export const UploadError: Story = {
  args: {
    selectedFile: new File(['resume content'], 'Product_Designer_Resume_v3.pdf', { type: 'application/pdf' }),
    showCheckmark: true,
    error: 'Failed to upload resume. Please check your connection and try again.',
    isAnalyzeDisabled: false,
    isUploading: false,
    onFileUpload: (file: File) => console.log('File uploaded:', file.name),
    onFileRemove: () => console.log('File removed'),
    onResumeSelect: (resumeId: string) => console.log('Resume selected:', resumeId),
    onAnalyze: () => console.log('Retry analyze clicked'),
  },
};

/**
 * FileSelectedEnabled: File uploaded, checkmark visible, button enabled.
 * Ready to submit state before the user clicks analyze.
 */
export const FileSelectedEnabled: Story = {
  args: {
    selectedFile: new File(['resume content'], 'UX_Lead_Resume_Final.pdf', { type: 'application/pdf' }),
    showCheckmark: true,
    isAnalyzeDisabled: false,
    onFileUpload: (file: File) => console.log('File uploaded:', file.name),
    onFileRemove: () => console.log('File removed'),
    onResumeSelect: (resumeId: string) => console.log('Resume selected:', resumeId),
    onAnalyze: () => console.log('Analyze clicked'),
  },
};

