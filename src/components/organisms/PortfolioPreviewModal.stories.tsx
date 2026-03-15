import type { Meta, StoryObj } from '@storybook/react';
import { PortfolioPreviewModal } from './PortfolioPreviewModal';

const meta = {
  title: 'Organisms/PortfolioPreviewModal',
  component: PortfolioPreviewModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    embedType: {
      control: 'select',
      options: ['figma', 'pdf', 'video', 'image'],
    },
  },
} satisfies Meta<typeof PortfolioPreviewModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'SaaS Dashboard Redesign',
    description: 'A complete redesign of the analytics dashboard for a B2B SaaS product, improving data visibility and user workflows.',
    embedUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/example',
    embedType: 'figma',
  },
};

export const FigmaEmbed: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'SaaS Dashboard Redesign',
    description: 'A complete redesign of the analytics dashboard for a B2B SaaS product, improving data visibility and user workflows.',
    embedUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/example',
    embedType: 'figma',
  },
};

export const VideoEmbed: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Product Demo Walkthrough',
    description: 'A 3-minute walkthrough of the onboarding flow showing key interaction patterns and micro-animations.',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    embedType: 'video',
  },
};

export const ImagePreview: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Mobile App UI Kit',
    description: 'Comprehensive UI kit with 120+ components designed for fintech mobile applications.',
    embedUrl: 'https://placehold.co/1200x800/e2e8f0/475569?text=Mobile+App+UI+Kit',
    embedType: 'image',
  },
};
