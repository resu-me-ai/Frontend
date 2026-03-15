import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ResumeProvider } from '@/contexts/ResumeContext';
import { UploadResumePage } from './UploadResumePage';

const meta = {
  title: 'MVP Flow/2 - Upload Resume/UploadResumePage',
  component: UploadResumePage,
  parameters: { layout: 'fullscreen' },
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

export const Default: Story = {};
