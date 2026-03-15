import type { Meta, StoryObj } from '@storybook/react';
import { KeywordTag } from './KeywordTag';

const meta = {
  title: 'Atoms/KeywordTag',
  component: KeywordTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['present', 'missing'],
      description: 'Keyword tag variant',
    },
    children: {
      control: 'text',
      description: 'Keyword text',
    },
  },
} satisfies Meta<typeof KeywordTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'present',
    children: 'Keyword',
  },
};

export const Present: Story = {
  args: {
    variant: 'present',
    children: 'User Experience',
  },
};

export const Missing: Story = {
  args: {
    variant: 'missing',
    children: 'WCAG',
  },
};

export const ExampleTags: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-wrap gap-2 w-[400px]">
      <KeywordTag variant="present">User Experience</KeywordTag>
      <KeywordTag variant="present">Figma</KeywordTag>
      <KeywordTag variant="present">Prototyping</KeywordTag>
      <KeywordTag variant="missing">WCAG</KeywordTag>
      <KeywordTag variant="missing">Accessibility</KeywordTag>
      <KeywordTag variant="missing">Design Systems</KeywordTag>
    </div>
  ),
};
