import type { Meta, StoryObj } from '@storybook/react';
import { HowIWork } from './HowIWork';

const meta = {
  title: 'Organisms/HowIWork',
  component: HowIWork,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  },
} satisfies Meta<typeof HowIWork>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: [
      {
        number: 1,
        title: 'Discovery',
        description: 'We start with a deep-dive into your product, users, and business goals to understand the problem space.',
      },
      {
        number: 2,
        title: 'Strategy',
        description: 'I develop a clear roadmap with prioritized deliverables, timelines, and success metrics.',
      },
      {
        number: 3,
        title: 'Execution',
        description: 'I ship iteratively with weekly demos, incorporating feedback at each stage to stay aligned.',
      },
      {
        number: 4,
        title: 'Handoff',
        description: 'Clean documentation, component libraries, and knowledge transfer to set your team up for success.',
      },
    ],
  },
};

export const FourSteps: Story = {
  args: {
    steps: [
      {
        number: 1,
        title: 'Discovery',
        description: 'We start with a deep-dive into your product, users, and business goals to understand the problem space.',
      },
      {
        number: 2,
        title: 'Strategy',
        description: 'I develop a clear roadmap with prioritized deliverables, timelines, and success metrics.',
      },
      {
        number: 3,
        title: 'Execution',
        description: 'I ship iteratively with weekly demos, incorporating feedback at each stage to stay aligned.',
      },
      {
        number: 4,
        title: 'Handoff',
        description: 'Clean documentation, component libraries, and knowledge transfer to set your team up for success.',
      },
    ],
  },
};

export const ThreeSteps: Story = {
  args: {
    title: 'My Process',
    steps: [
      {
        number: 1,
        title: 'Understand',
        description: 'I immerse myself in your domain, interviewing stakeholders and analyzing existing data to identify opportunities.',
      },
      {
        number: 2,
        title: 'Build',
        description: 'Rapid prototyping and iterative development with continuous validation against user needs.',
      },
      {
        number: 3,
        title: 'Measure',
        description: 'Deploy, instrument, and analyze outcomes to ensure we hit the defined success criteria.',
      },
    ],
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Engagement Model',
    steps: [
      {
        number: 1,
        title: 'Kickoff Call',
        description: 'A 30-minute introductory call to align on scope, timeline, and expectations for the engagement.',
      },
      {
        number: 2,
        title: 'Sprint Planning',
        description: 'Break the project into 1-2 week sprints with clear deliverables and check-in points.',
      },
      {
        number: 3,
        title: 'Async Updates',
        description: 'Daily Loom recordings and Slack updates so you always know the current status.',
      },
      {
        number: 4,
        title: 'Final Delivery',
        description: 'Polished deliverables with documentation, source files, and a recorded walkthrough.',
      },
    ],
  },
};
