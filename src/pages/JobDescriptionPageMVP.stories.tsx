import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { JobDescriptionPage } from './JobDescriptionPage';
import { JobDescriptionView } from '@/components/templates/JobDescriptionView';

const meta = {
  title: 'MVP Flow/1 - Job Description/JobDescriptionPage',
  component: JobDescriptionPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/job-description']}>
        <Routes>
          <Route path="/job-description" element={<Story />} />
          <Route path="/upload-resume" element={<div>Upload Resume Page</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof JobDescriptionPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DemoMode: Story = {
  render: () => (
    <JobDescriptionView
      jobTitle="Senior Product Designer"
      companyName="Stripe"
      jobDescription="<p>We are looking for a <strong>Senior Product Designer</strong> to join our team.</p><ul><li><strong>5+ years</strong> of experience in product design</li><li>Proficiency in <strong>Figma</strong> and design systems</li></ul>"
      error={null}
      isAnalyzeDisabled={false}
      showCheckmark={true}
      onJobTitleChange={(v) => console.log('Job title:', v)}
      onCompanyNameChange={(v) => console.log('Company:', v)}
      onJobDescriptionChange={(v) => console.log('JD:', v)}
      onAnalyze={() => console.log('Analyze clicked')}
    />
  ),
};
