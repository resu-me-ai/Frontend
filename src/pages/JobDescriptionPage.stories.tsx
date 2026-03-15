import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { JobDescriptionPage } from './JobDescriptionPage';
import { JobDescriptionView } from '@/components/templates/JobDescriptionView';

const meta = {
  title: 'Pages/JobDescriptionPage',
  component: JobDescriptionPage,
  parameters: {
    layout: 'fullscreen',
    chromatic: { delay: 300 },
  },
  tags: ['autodocs'],
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

/**
 * Default empty state: form is blank, submit button disabled.
 */
export const Default: Story = {};

/**
 * Partially filled: only job title entered, button still disabled
 * because job description is required.
 */
export const PartiallyFilled: Story = {
  render: () => (
    <JobDescriptionView
      jobTitle="Senior Product Manager"
      companyName=""
      jobDescription=""
      error={null}
      isAnalyzeDisabled={true}
      showCheckmark={false}
      onJobTitleChange={(v) => console.log('Job title:', v)}
      onCompanyNameChange={(v) => console.log('Company:', v)}
      onJobDescriptionChange={(v) => console.log('JD:', v)}
      onAnalyze={() => console.log('Analyze clicked')}
    />
  ),
};

/**
 * Form with validation error shown: job title is present but
 * job description is missing, triggering an error message.
 */
export const WithError: Story = {
  render: () => (
    <JobDescriptionView
      jobTitle="Product Manager"
      companyName="Google"
      jobDescription=""
      error="Please enter a job description."
      isAnalyzeDisabled={true}
      showCheckmark={false}
      onJobTitleChange={(v) => console.log('Job title:', v)}
      onCompanyNameChange={(v) => console.log('Company:', v)}
      onJobDescriptionChange={(v) => console.log('JD:', v)}
      onAnalyze={() => console.log('Analyze clicked')}
    />
  ),
};

/**
 * Demo mode: form is fully filled and ready to submit.
 * In demo mode, clicking Analyze stores data in localStorage and navigates.
 */
export const DemoMode: Story = {
  render: () => (
    <JobDescriptionView
      jobTitle="Senior Product Designer"
      companyName="Stripe"
      jobDescription="<p>We are looking for a <strong>Senior Product Designer</strong> to join our team. You will be responsible for designing and shipping high-quality product experiences across our payments platform.</p><p><strong>Requirements:</strong></p><ul><li><strong>5+ years</strong> of experience in product design</li><li>A strong portfolio demonstrating <em>end-to-end design work</em></li><li>Experience collaborating with engineering and product teams</li><li>Proficiency in <strong>Figma</strong> and design systems</li></ul>"
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
