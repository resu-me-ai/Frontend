import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'The visual style of the card',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Simple card content',
  },
};

export const WithHeader: Story = {
  args: {} as never,
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Resume Analysis</CardTitle>
        <CardDescription>Your resume match score breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-body">Overall match: 78%</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  args: {} as never,
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Upload Complete</CardTitle>
        <CardDescription>Your resume has been processed.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-body">3 areas identified for improvement.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">View Analysis</Button>
      </CardFooter>
    </Card>
  ),
};

export const AllVariants: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Card variant="default"><p className="text-sm">Default (border + shadow)</p></Card>
      <Card variant="outlined"><p className="text-sm">Outlined (border only)</p></Card>
      <Card variant="elevated"><p className="text-sm">Elevated (shadow only)</p></Card>
    </div>
  ),
};
