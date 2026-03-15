import type { Meta, StoryObj } from '@storybook/react';
import { CombinationRow } from './CombinationRow';

const meta = {
  title: 'Molecules/CombinationRow',
  component: CombinationRow,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof CombinationRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interview: Story = {
  args: {
    jobTitle: 'Product Manager',
    company: 'TechCorp',
    matchPercentage: 92,
    status: 'interview',
    lastAnalyzed: 'Today at 2:30 PM',
    resumeVersion: 'Resume v3.2',
    evidenceFiles: 15,
    appliedDate: '1/31/2024',
    interviewDate: '2/9/2024',
  },
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
};

export const Applied: Story = {
  args: {
    jobTitle: 'UX Designer',
    company: 'StartupXYZ',
    matchPercentage: 85,
    status: 'applied',
    lastAnalyzed: 'Yesterday at 10:15 AM',
    resumeVersion: 'Resume v2.1',
    evidenceFiles: 12,
    appliedDate: '2/4/2024',
  },
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
};

export const Draft: Story = {
  args: {
    jobTitle: 'Engineering Lead',
    company: 'InnovateTech',
    matchPercentage: 78,
    status: 'draft',
    lastAnalyzed: 'Feb 25 at 4:00 PM',
    resumeVersion: 'Resume v1.5',
    evidenceFiles: 8,
  },
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
};

export const AllRows: Story = {
  args: {} as never,
  render: () => (
    <div className="max-w-3xl bg-white rounded-[14px] border border-border-default">
      <CombinationRow
        jobTitle="Product Manager" company="TechCorp" matchPercentage={92}
        status="interview" lastAnalyzed="Today at 2:30 PM" resumeVersion="Resume v3.2"
        evidenceFiles={15} appliedDate="1/31/2024" interviewDate="2/9/2024"
      />
      <CombinationRow
        jobTitle="UX Designer" company="StartupXYZ" matchPercentage={85}
        status="applied" lastAnalyzed="Yesterday at 10:15 AM" resumeVersion="Resume v2.1"
        evidenceFiles={12} appliedDate="2/4/2024"
      />
      <CombinationRow
        jobTitle="Engineering Lead" company="InnovateTech" matchPercentage={78}
        status="draft" lastAnalyzed="Feb 25 at 4:00 PM" resumeVersion="Resume v1.5"
        evidenceFiles={8}
      />
    </div>
  ),
};
