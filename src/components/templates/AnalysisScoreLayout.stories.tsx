import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AnalysisScoreLayout } from './AnalysisScoreLayout';

const meta = {
  title: 'Templates/AnalysisScoreLayout',
  component: AnalysisScoreLayout,
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
} satisfies Meta<typeof AnalysisScoreLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
          <p className="text-gray-500 mt-1">Your resume has been analyzed against the job description.</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Overall Match</p>
            <p className="text-4xl font-bold text-primary">78%</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Skills Match</p>
            <p className="text-4xl font-bold text-green-600">85%</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Experience Match</p>
            <p className="text-4xl font-bold text-amber-500">70%</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Gap Analysis</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-sm text-gray-700">Missing: Kubernetes experience</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-sm text-gray-700">Missing: CI/CD pipeline management</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-sm text-gray-700">Partial: Data analytics (mentioned but not detailed)</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const MinimalContent: Story = {
  args: {
    children: (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#3A56FF" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing your resume...</h2>
        <p className="text-gray-500 text-sm max-w-sm">
          Our AI is comparing your resume against the job description. This usually takes a few seconds.
        </p>
      </div>
    ),
  },
};
