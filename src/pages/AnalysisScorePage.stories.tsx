import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AnalysisScorePage } from './AnalysisScorePage';

const meta = {
  title: 'Pages/AnalysisScorePage',
  component: AnalysisScorePage,
  parameters: {
    layout: 'fullscreen',
    chromatic: { delay: 300 },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/analysis-score']}>
        <Routes>
          <Route path="/analysis-score" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof AnalysisScorePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPipelineId: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/analysis-score/demo-12345']}>
        <Routes>
          <Route path="/analysis-score/:analysisId" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
};
