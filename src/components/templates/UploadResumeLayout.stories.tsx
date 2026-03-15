import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { UploadResumeLayout } from './UploadResumeLayout';

const meta = {
  title: 'Templates/UploadResumeLayout',
  component: UploadResumeLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof UploadResumeLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-500 mb-6">
          Upload your resume to get started with AI-powered analysis.
        </p>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg">Drag and drop your resume here</p>
          <p className="text-gray-400 text-sm mt-2">PDF, DOCX up to 10MB</p>
        </div>
      </div>
    ),
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume Upload</h2>
          <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">PDF</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Product_Manager_Resume.pdf</p>
              <p className="text-xs text-gray-500">245 KB</p>
            </div>
            <span className="text-green-600 text-sm font-medium">Uploaded</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Previous Resumes</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">PDF</span>
              <span className="text-sm text-gray-700">UX_Designer_Resume_v2.pdf</span>
              <span className="text-xs text-gray-400 ml-auto">3 days ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">DOCX</span>
              <span className="text-sm text-gray-700">Senior_PM_Resume.docx</span>
              <span className="text-xs text-gray-400 ml-auto">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};
