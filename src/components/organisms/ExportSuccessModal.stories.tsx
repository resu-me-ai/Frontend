import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ExportSuccessModal } from './ExportSuccessModal';

const meta = {
  title: 'Organisms/ExportSuccessModal',
  component: ExportSuccessModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ExportSuccessModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    roleTitle: 'Product Manager',
    companyName: 'TechCorp',
  },
};

export const Closed: Story = {
  args: { isOpen: false, onClose: () => {} },
};
