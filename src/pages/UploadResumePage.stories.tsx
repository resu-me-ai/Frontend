import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ResumeProvider } from '@/contexts/ResumeContext';
import { UploadResumeView } from '@/components/templates/UploadResumeView';
import type { ResumeOption } from '@/components/organisms/UploadResumeSection';
import { UploadResumePage } from './UploadResumePage';

// ---------- Mock Data ----------

const mockExistingResumes: ResumeOption[] = [
  { id: 'resume-1', fileName: 'Product_Manager_Resume_v3.pdf', lastUpdated: 'Updated 2 days ago', fileType: 'pdf' },
  { id: 'resume-2', fileName: 'Senior_PM_Resume_Final.docx', lastUpdated: 'Updated 5 days ago', fileType: 'word' },
  { id: 'resume-3', fileName: 'Technical_PM_Resume.pdf', lastUpdated: 'Updated 1 week ago', fileType: 'pdf' },
  { id: 'resume-4', fileName: 'Growth_PM_Resume_2024.docx', lastUpdated: 'Updated 2 weeks ago', fileType: 'word' },
  { id: 'resume-5', fileName: 'Director_Product_Resume.pdf', lastUpdated: 'Updated 3 weeks ago', fileType: 'pdf' },
  { id: 'resume-6', fileName: 'Staff_PM_Resume_Q4.pdf', lastUpdated: 'Updated 1 month ago', fileType: 'pdf' },
];

// ---------- Meta ----------

const meta = {
  title: 'Pages/UploadResumePage',
  component: UploadResumePage,
  parameters: {
    layout: 'fullscreen',
    chromatic: { delay: 300 },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/upload-resume']}>
        <ResumeProvider>
          <Routes>
            <Route path="/upload-resume" element={<Story />} />
            <Route path="/analyzing" element={<div>Analyzing Page</div>} />
          </Routes>
        </ResumeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof UploadResumePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------- Stories ----------

/**
 * Default empty state: no file selected, analyze button disabled.
 */
export const Default: Story = {};

/**
 * FileSelected: A PDF file has been selected/dropped.
 * Shows the filename with file icon, checkmark on the section header,
 * and the Analyze Resume Match button is enabled.
 */
export const FileSelected: Story = {
  render: () => (
    <UploadResumeView
      selectedFile={new File(['resume content for testing purposes'], 'Senior_Product_Manager_Resume.pdf', { type: 'application/pdf' })}
      showCheckmark={true}
      isAnalyzeDisabled={false}
      onFileUpload={(file: File) => console.log('File uploaded:', file.name)}
      onFileRemove={() => console.log('File removed')}
      onResumeSelect={(id: string) => console.log('Resume selected:', id)}
      onAnalyze={() => console.log('Analyze clicked')}
    />
  ),
};

/**
 * ExistingResumeSelected: User selected a previously uploaded resume from the list.
 * The radio button is checked, checkmark is shown, and analyze button is enabled.
 * Note: The UploadResumeSection manages radio selection internally so we show
 * the view with existing resumes available and checkmark enabled.
 */
export const ExistingResumeSelected: Story = {
  render: () => (
    <UploadResumeView
      existingResumes={mockExistingResumes.slice(0, 3)}
      showCheckmark={true}
      isAnalyzeDisabled={false}
      onFileUpload={(file: File) => console.log('File uploaded:', file.name)}
      onFileRemove={() => console.log('File removed')}
      onResumeSelect={(id: string) => console.log('Resume selected:', id)}
      onAnalyze={() => console.log('Analyze clicked')}
    />
  ),
};

/**
 * LargeFileWarning: File exceeds the 5MB size limit.
 * Error message is displayed below the upload section and analyze button remains disabled.
 * In the actual flow, FileUploadArea validates the size internally and shows an error.
 * At the page level, we represent this as an error state on the view.
 */
export const LargeFileWarning: Story = {
  render: () => (
    <UploadResumeView
      error="File size exceeds 5MB limit. Please upload a smaller file."
      isAnalyzeDisabled={true}
      onFileUpload={(file: File) => console.log('File uploaded:', file.name)}
      onFileRemove={() => console.log('File removed')}
      onResumeSelect={(id: string) => console.log('Resume selected:', id)}
      onAnalyze={() => console.log('Analyze clicked')}
    />
  ),
};

/**
 * UnsupportedFormat: A non-PDF/DOCX file was dropped (e.g., .txt, .png).
 * Error message indicates the invalid file type and analyze button stays disabled.
 */
export const UnsupportedFormat: Story = {
  render: () => (
    <UploadResumeView
      error="Invalid file type. Please upload PDF, DOC, or DOCX files only."
      isAnalyzeDisabled={true}
      onFileUpload={(file: File) => console.log('File uploaded:', file.name)}
      onFileRemove={() => console.log('File removed')}
      onResumeSelect={(id: string) => console.log('Resume selected:', id)}
      onAnalyze={() => console.log('Analyze clicked')}
    />
  ),
};

/**
 * MultipleResumesAvailable: Shows the resume list with 6 existing resumes.
 * The OR divider separates the upload area from the selection list.
 * No resume is selected yet, so analyze button is disabled.
 */
export const MultipleResumesAvailable: Story = {
  render: () => (
    <UploadResumeView
      existingResumes={mockExistingResumes}
      isAnalyzeDisabled={true}
      onFileUpload={(file: File) => console.log('File uploaded:', file.name)}
      onFileRemove={() => console.log('File removed')}
      onResumeSelect={(id: string) => console.log('Resume selected:', id)}
      onAnalyze={() => console.log('Analyze clicked')}
    />
  ),
};
