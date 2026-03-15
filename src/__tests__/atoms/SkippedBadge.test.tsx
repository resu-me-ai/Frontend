import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkippedBadge } from '@/components/atoms/SkippedBadge';

describe('SkippedBadge', () => {
  it('renders count text and icon when count > 0', () => {
    render(<SkippedBadge count={2} onClick={() => {}} />);
    expect(screen.getByText('2 Skipped')).toBeInTheDocument();
    // Should render an SVG icon
    expect(screen.getByText('2 Skipped').closest('button')?.querySelector('svg')).toBeTruthy();
  });

  it('renders nothing when count === 0', () => {
    const { container } = render(<SkippedBadge count={0} onClick={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<SkippedBadge count={1} onClick={onClick} />);

    await user.click(screen.getByText('1 Skipped'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('displays correct count for multiple skipped', () => {
    render(<SkippedBadge count={5} onClick={() => {}} />);
    expect(screen.getByText('5 Skipped')).toBeInTheDocument();
  });
});
