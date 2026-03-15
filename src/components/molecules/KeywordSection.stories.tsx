import type { Meta, StoryObj } from '@storybook/react';
import { KeywordSection } from './KeywordSection';

const meta = {
  title: 'Molecules/KeywordSection',
  component: KeywordSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KeywordSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Keywords Present',
    count: 18,
    keywords: ['User Experience', 'Figma', 'Prototyping', 'User Research', 'Wireframing'],
    variant: 'present',
  },
};

export const Present: Story = {
  args: {
    title: 'Keywords Present',
    count: 18,
    keywords: ['User Experience', 'Figma', 'Prototyping', 'User Research', 'Wireframing'],
    variant: 'present',
  },
};

export const Missing: Story = {
  args: {
    title: 'Keywords Missing',
    count: 7,
    keywords: ['WCAG', 'Accessibility', 'Design Systems', 'A/B Testing', 'Analytics'],
    variant: 'missing',
  },
};

export const FullExample: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-6 w-[500px]">
      <KeywordSection
        title="Keywords Present"
        count={18}
        keywords={[
          'User Experience',
          'Figma',
          'Prototyping',
          'User Research',
          'Wireframing',
          'Design Thinking',
          'Agile',
          'Collaboration',
        ]}
        variant="present"
      />
      <KeywordSection
        title="Keywords Missing"
        count={7}
        keywords={['WCAG', 'Accessibility', 'Design Systems', 'A/B Testing', 'Analytics']}
        variant="missing"
      />
    </div>
  ),
};
