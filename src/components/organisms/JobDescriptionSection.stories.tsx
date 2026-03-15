import type { Meta, StoryObj } from "@storybook/react";
import { JobDescriptionSection } from "./JobDescriptionSection";

const meta = {
  title: "Organisms/JobDescriptionSection",
  component: JobDescriptionSection,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof JobDescriptionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithValues: Story = {
  args: {
    jobTitle: "Senior Product Manager",
    companyName: "Google",
    jobDescription: `About the job
We are looking for a Senior Product Manager to join our team and lead the development of innovative products that solve real customer problems.

Responsibilities:
- Define product vision and strategy
- Work closely with engineering and design teams
- Conduct user research and analyze market trends
- Prioritize features and manage the product roadmap

Requirements:
- 5+ years of product management experience
- Strong analytical and problem-solving skills
- Excellent communication and leadership abilities
- Experience with agile development methodologies`,
  },
};

export const WithError: Story = {
  args: {
    jobTitle: "Product Manager",
    companyName: "",
    jobDescription: "",
    error: "Please provide a job description to continue",
  },
};

export const Completed: Story = {
  args: {
    jobTitle: "Staff Software Engineer",
    companyName: "Meta",
    jobDescription: `We are seeking a Staff Software Engineer to help build the next generation of social experiences. You will work on systems that serve billions of users worldwide.

Key Responsibilities:
- Design and implement scalable distributed systems
- Mentor junior engineers and contribute to technical strategy
- Drive cross-functional initiatives with product and design teams

Qualifications:
- 8+ years of software engineering experience
- Expertise in system design and architecture
- Track record of delivering high-impact projects`,
    showCheckmark: true,
  },
};

export const PartiallyFilled: Story = {
  args: {
    jobTitle: "Data Scientist",
    companyName: "Netflix",
    jobDescription: "",
  },
};
