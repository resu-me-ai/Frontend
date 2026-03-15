import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AnalysisInProgressPage } from './AnalysisInProgressPage';

const meta = {
  title: 'MVP Flow/3 - Analyzing/AnalysisInProgressPage',
  component: AnalysisInProgressPage,
  parameters: {
    layout: 'fullscreen',
    chromatic: { delay: 500 },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/analyzing']}>
        <Routes>
          <Route path="/analyzing" element={<Story />} />
          <Route path="/analysis-score/:id" element={<div>Analysis Score Page</div>} />
          <Route path="/analysis-score" element={<div>Analysis Score Page</div>} />
          <Route path="/job-description" element={<div>Job Description Page</div>} />
          <Route path="/upload-resume" element={<div>Upload Resume Page</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof AnalysisInProgressPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      localStorage.setItem('job_description_data', JSON.stringify({
        jobTitle: 'Senior Product Manager',
        companyName: 'Google',
        jobDescription: 'Lead product strategy for AI features...',
      }));
      localStorage.setItem('resume_data', JSON.stringify({
        uploadedFileName: 'resume.pdf',
      }));
      return <Story />;
    },
  ],
};

export const ErrorState: Story = {
  decorators: [
    (Story) => {
      localStorage.removeItem('job_description_data');
      localStorage.removeItem('resume_data');
      return <Story />;
    },
  ],
};
