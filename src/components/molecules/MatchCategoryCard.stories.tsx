import type { Meta, StoryObj } from '@storybook/react';
import { MatchCategoryCard } from './MatchCategoryCard';

const meta = {
  title: 'Molecules/MatchCategoryCard',
  component: MatchCategoryCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MatchCategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'skills-match',
    iconBgColor: '#dcfce7',
    score: 85,
    title: 'Skills Match',
    description: 'Strong alignment with required skills',
  },
};

export const SkillsMatch: Story = {
  args: {
    icon: 'skills-match',
    iconBgColor: '#dcfce7',
    score: 85,
    title: 'Skills Match',
    description: 'Strong alignment with required skills',
  },
};

export const Experience: Story = {
  args: {
    icon: 'experience',
    iconBgColor: '#dbeafe',
    score: 72,
    title: 'Experience',
    description: 'Good experience alignment',
  },
};

export const AllCategories: Story = {
  args: {} as never,
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      <MatchCategoryCard
        icon="skills-match"
        iconBgColor="#dcfce7"
        score={85}
        title="Skills Match"
        description="Strong alignment with required skills"
      />
      <MatchCategoryCard
        icon="experience"
        iconBgColor="#dbeafe"
        score={72}
        title="Experience"
        description="Good experience alignment"
      />
      <MatchCategoryCard
        icon="qualifications"
        iconBgColor="#fef9c3"
        score={68}
        title="Qualifications"
        description="Meets most requirements"
      />
      <MatchCategoryCard
        icon="keywords"
        iconBgColor="#f3e8ff"
        score={80}
        title="Keywords"
        description="Strong keyword presence"
      />
    </div>
  ),
};
