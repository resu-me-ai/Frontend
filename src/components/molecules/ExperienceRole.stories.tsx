import type { Meta, StoryObj } from '@storybook/react';
import { ExperienceRole } from './ExperienceRole';

const meta = {
  title: 'Molecules/ExperienceRole',
  component: ExperienceRole,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExperienceRole>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Director: Story = {
  args: {
    role: {
      role_index: 0,
      title: 'Director',
      company: 'XYZ Company',
      company_context: 'e-commerce Platform, Baseball Live, Disney Now',
      date_range: 'March 2019-Present',
      achievements_line: 'Built product/engineering organization of 30 personnel; increased revenue by 200% ($XYMM)',
      bullets: [
        { bullet_index: 0, text: 'Manage $XXM portfolio of high-profile sports-stream products to serve XM monthly users of XYZ product.' },
        { bullet_index: 1, text: 'Launched & manage e-commerce subscription platform with five cross-functional engineering teams to build 80+ features.' },
        { bullet_index: 2, text: 'Hired, developed, and mentored seven high-performing brand managers and built a highly collaborative product/engineering organization.' },
      ],
    },
  },
};

export const WithoutContext: Story = {
  args: {
    role: {
      role_index: 3,
      title: 'Startup Founder/CEO',
      company: 'My Startup',
      date_range: 'March 2010-February 2014',
      achievements_line: 'Pivoted start-up from a failing product to an innovative B2C product with a multi-million-dollar exit',
      bullets: [
        { bullet_index: 0, text: 'Launched the world\'s first XYZ platform for e-commerce businesses. Scaled to 15M monthly end users & 1,000+ monthly paid clients.' },
      ],
    },
  },
};

export const NoAchievementsLine: Story = {
  args: {
    role: {
      role_index: 0,
      title: 'Software Engineer',
      company: 'Tech Corp',
      company_context: 'SaaS Platform',
      date_range: 'Jan 2020-Dec 2022',
      bullets: [
        { bullet_index: 0, text: 'Built microservices architecture serving 2M requests/day.' },
        { bullet_index: 1, text: 'Reduced deployment time by 70% through CI/CD pipeline optimization.' },
      ],
    },
  },
};
