import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Atoms/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { id: 'skills', label: 'Skills', content: <p className="text-sm text-gray-600">Skills match analysis content</p> },
      { id: 'experience', label: 'Experience', content: <p className="text-sm text-gray-600">Experience match content</p> },
      { id: 'education', label: 'Education', content: <p className="text-sm text-gray-600">Education match content</p> },
    ],
  },
};

export const WithDefaultTab: Story = {
  args: {
    defaultTab: 'experience',
    tabs: [
      { id: 'overview', label: 'Overview', content: <p className="text-sm">Overview panel</p> },
      { id: 'experience', label: 'Experience', content: <p className="text-sm">Experience panel (default)</p> },
      { id: 'recommendations', label: 'Recommendations', content: <p className="text-sm">Recommendations panel</p> },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    tabs: [
      { id: 'active', label: 'Active', content: <p className="text-sm">Active content</p> },
      { id: 'disabled', label: 'Coming Soon', content: <p className="text-sm">Disabled</p>, disabled: true },
      { id: 'other', label: 'Other', content: <p className="text-sm">Other content</p> },
    ],
  },
};

export const AnalysisTabs: Story = {
  args: {} as never,
  render: () => (
    <div className="w-[400px]">
      <Tabs
        tabs={[
          {
            id: 'match',
            label: 'Match Score',
            content: (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">78%</p>
                <p className="text-sm text-green-600">Overall match score</p>
              </div>
            ),
          },
          {
            id: 'gaps',
            label: 'Gaps',
            content: (
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-orange-700">3 gaps identified</p>
                <ul className="mt-2 text-sm text-orange-600 list-disc pl-4">
                  <li>Missing cloud experience</li>
                  <li>No A/B testing mentioned</li>
                  <li>Quantification needed</li>
                </ul>
              </div>
            ),
          },
          {
            id: 'tips',
            label: 'Tips',
            content: (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">Add specific metrics to your bullet points for a stronger match.</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};
