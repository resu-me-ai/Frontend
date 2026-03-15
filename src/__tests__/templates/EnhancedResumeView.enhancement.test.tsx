/**
 * TDD Tests for BulletEnhancementPanel inside EnhancedResumeView
 *
 * Story 10 (#459): Render Phase 1b enhancement data in EnhancedResumeOutputPage
 *
 * Tests:
 * - test_renders_enhanced_bullets_from_parsed_resume
 * - test_falls_back_when_no_enhancements
 *
 * RED → GREEN → REFACTOR
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EnhancedResumeView } from '@/components/templates/EnhancedResumeView';
import type { EnhancementMap, ResumeDocumentData } from '@/types/resume';

// Minimal mocks for heavy sub-components
vi.mock('@/components/organisms/AppHeader', () => ({
  AppHeader: () => <header data-testid="app-header" />,
}));

vi.mock('@/components/organisms/ResumeDocument', () => ({
  ResumeDocument: () => <div data-testid="resume-document" />,
}));

// ------ shared fixture helpers -----------------------------------------------

const makeResumeData = (
  enhancements?: EnhancementMap,
): ResumeDocumentData => ({
  resume_overview: {
    full_name: 'Test User',
    contact_line: 'test@example.com',
    parsed_contact: {},
  },
  resume_sections: [],
  _enhancements: enhancements,
});

const baseProps = {
  isLoadingResume: false,
  stage: 'done' as const,
  error: null,
  enhancedCount: 2,
  bulletCount: 5,
  rescoreData: null,
  onDownload: vi.fn(),
  onDownloadPdf: vi.fn(),
};

// ---------------------------------------------------------------------------
// test_renders_enhanced_bullets_from_parsed_resume
// ---------------------------------------------------------------------------
describe('test_renders_enhanced_bullets_from_parsed_resume', () => {
  it('renders before/after comparison cards when _enhancements is present and non-empty', () => {
    const enhancements: EnhancementMap = {
      'role_0_bullet_0': {
        original: 'Managed a team of 5 engineers.',
        enhanced: 'Led cross-functional team of 5 engineers, delivering 3 features on time.',
        score_before: 60,
        score_after: 82,
      },
      'role_0_bullet_1': {
        original: 'Worked on product roadmap.',
        enhanced: 'Owned quarterly product roadmap for $5M revenue product line.',
      },
    };

    render(
      <EnhancedResumeView
        {...baseProps}
        resumeData={makeResumeData(enhancements)}
      />,
    );

    // Should render the enhancement list container
    expect(screen.getByTestId('bullet-enhancement-list')).toBeInTheDocument();

    // Should NOT show the fallback
    expect(screen.queryByTestId('no-enhancements-fallback')).not.toBeInTheDocument();

    // First bullet — before/after text
    expect(screen.getByText('Managed a team of 5 engineers.')).toBeInTheDocument();
    expect(
      screen.getByText('Led cross-functional team of 5 engineers, delivering 3 features on time.'),
    ).toBeInTheDocument();

    // Second bullet — before/after text
    expect(screen.getByText('Worked on product roadmap.')).toBeInTheDocument();
    expect(
      screen.getByText('Owned quarterly product roadmap for $5M revenue product line.'),
    ).toBeInTheDocument();

    // Labels
    expect(screen.getAllByText('Before').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('After').length).toBeGreaterThanOrEqual(2);

    // Score display for the first bullet
    expect(screen.getByText('Score: 60')).toBeInTheDocument();
    expect(screen.getByText('Score: 82')).toBeInTheDocument();
  });

  it('renders one comparison card per enhancement entry', () => {
    const enhancements: EnhancementMap = {
      'bullet_a': { original: 'Old A', enhanced: 'New A' },
      'bullet_b': { original: 'Old B', enhanced: 'New B' },
      'bullet_c': { original: 'Old C', enhanced: 'New C' },
    };

    render(
      <EnhancedResumeView
        {...baseProps}
        resumeData={makeResumeData(enhancements)}
      />,
    );

    // Three comparison cards, one per entry
    expect(screen.getAllByText('Before')).toHaveLength(3);
    expect(screen.getAllByText('After')).toHaveLength(3);

    expect(screen.getByTestId('bullet-comparison-bullet_a')).toBeInTheDocument();
    expect(screen.getByTestId('bullet-comparison-bullet_b')).toBeInTheDocument();
    expect(screen.getByTestId('bullet-comparison-bullet_c')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// test_falls_back_when_no_enhancements
// ---------------------------------------------------------------------------
describe('test_falls_back_when_no_enhancements', () => {
  it('shows fallback message when _enhancements is undefined', () => {
    render(
      <EnhancedResumeView
        {...baseProps}
        resumeData={makeResumeData(undefined)}
      />,
    );

    expect(screen.getByTestId('no-enhancements-fallback')).toBeInTheDocument();
    expect(screen.getByText('No enhancements available')).toBeInTheDocument();
    expect(screen.queryByTestId('bullet-enhancement-list')).not.toBeInTheDocument();
  });

  it('shows fallback message when _enhancements is an empty object', () => {
    render(
      <EnhancedResumeView
        {...baseProps}
        resumeData={makeResumeData({})}
      />,
    );

    expect(screen.getByTestId('no-enhancements-fallback')).toBeInTheDocument();
    expect(screen.getByText('No enhancements available')).toBeInTheDocument();
    expect(screen.queryByTestId('bullet-enhancement-list')).not.toBeInTheDocument();
  });

  it('does not crash when resumeData is null (no session data yet)', () => {
    // Should render without throwing even when resumeData is null
    expect(() =>
      render(
        <EnhancedResumeView
          {...baseProps}
          resumeData={null}
        />,
      ),
    ).not.toThrow();

    // Fallback is shown
    expect(screen.getByTestId('no-enhancements-fallback')).toBeInTheDocument();
  });

  it('does not crash when stage is not done (enhancements never rendered)', () => {
    // In processing/error states, the enhancement panel is not rendered at all
    expect(() =>
      render(
        <EnhancedResumeView
          {...baseProps}
          stage="finalizing"
          resumeData={null}
        />,
      ),
    ).not.toThrow();

    // Enhancement panel is NOT rendered in processing state
    expect(screen.queryByTestId('no-enhancements-fallback')).not.toBeInTheDocument();
    expect(screen.queryByTestId('bullet-enhancement-list')).not.toBeInTheDocument();
  });
});
