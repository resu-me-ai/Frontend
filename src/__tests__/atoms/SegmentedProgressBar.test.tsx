import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SegmentedProgressBar } from '@/components/atoms/SegmentedProgressBar';

describe('SegmentedProgressBar — skipped segments', () => {
  it('segments in skippedSegments array render with amber bg-amber-400', () => {
    const { container } = render(
      <SegmentedProgressBar current={3} total={5} skippedSegments={[2]} />
    );
    const segments = container.querySelectorAll('[role="progressbar"] > div');
    // Segment index 1 is question 2 (1-indexed)
    expect(segments[1].className).toContain('bg-amber-400');
  });

  it('completed segments still render blue', () => {
    const { container } = render(
      <SegmentedProgressBar current={3} total={5} skippedSegments={[2]} />
    );
    const segments = container.querySelectorAll('[role="progressbar"] > div');
    // Segment 0 (question 1) is completed and not skipped — should be blue
    expect(segments[0].className).toContain('bg-action-primary');
  });

  it('pending segments still render gray', () => {
    const { container } = render(
      <SegmentedProgressBar current={3} total={5} skippedSegments={[2]} />
    );
    const segments = container.querySelectorAll('[role="progressbar"] > div');
    // Segment 3 (question 4) is not completed and not skipped — gray
    expect(segments[3].className).toContain('bg-gray-200');
  });

  it('works correctly when skippedSegments is undefined (backwards compat)', () => {
    const { container } = render(
      <SegmentedProgressBar current={2} total={4} />
    );
    const segments = container.querySelectorAll('[role="progressbar"] > div');
    expect(segments[0].className).toContain('bg-action-primary');
    expect(segments[1].className).toContain('bg-action-primary');
    expect(segments[2].className).toContain('bg-gray-200');
    expect(segments[3].className).toContain('bg-gray-200');
  });
});
