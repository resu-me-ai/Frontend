/**
 * TDD Tests for ContextCollectionPage (V3 rewire)
 *
 * - Completion flow: navigates to /enhanced-resume/:sessionId when isComplete
 * - Resume HTML: fetched from API endpoint /pipeline/{sessionId}/resume-html
 * - V3 template: renders ContextCollectionV3View (not V1 ProgressHeader/QuestionCard/InputPanel)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock useContextCollection
const mockUseContextCollection = vi.fn();
vi.mock('@/hooks/useContextCollection', () => ({
  useContextCollection: (...args: unknown[]) => mockUseContextCollection(...args),
}));

// Mock useResumeHtml
const mockUseResumeHtml = vi.fn();
vi.mock('@/hooks/useResumeHtml', () => ({
  useResumeHtml: (...args: unknown[]) => mockUseResumeHtml(...args),
}));

// Mock ContextCollectionV3View — the V3 template used by the rewired page
let capturedV3Props: Record<string, unknown> = {};
vi.mock('@/components/templates/ContextCollectionV3View', () => ({
  ContextCollectionV3View: (props: Record<string, unknown>) => {
    capturedV3Props = props;
    return <div data-testid="context-collection-v3-view" />;
  },
}));

import { ContextCollectionPage } from '@/pages/ContextCollectionPage';

const defaultHookReturn = {
  currentQuestion: {
    id: 'q1',
    bulletId: 'role_0.bullet_0',
    resumeQuote: 'Led product strategy for enterprise SaaS platform',
    mainQuestion: 'Can you tell me more about this?',
  },
  progress: {
    currentQuestion: 1,
    totalQuestions: 3,
    completedQuestions: [],
    resumeData: { name: 'Ralph', email: 'r@test.com', experiences: [] },
  },
  currentBulletId: 'role_0.bullet_0',
  isLoading: false,
  isFetching: false,
  error: null,
  isSubmitting: false,
  isSkipping: false,
  submitError: null,
  isComplete: false,
  questionsReady: true,
  completionPercentage: 0,
  submitAnswer: vi.fn(),
  skipQuestion: vi.fn(),
  refetch: vi.fn(),
};

const mockResumeHtml = '<html><body><li id="role_0.bullet_0">Led product strategy</li></body></html>';

function renderPage(sessionId = 'sess-123') {
  return render(
    <MemoryRouter initialEntries={[`/context-collection/${sessionId}`]}>
      <Routes>
        <Route path="/context-collection/:sessionId" element={<ContextCollectionPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ContextCollectionPage completion flow (#188)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    capturedV3Props = {};
    mockUseContextCollection.mockReturnValue(defaultHookReturn);
    mockUseResumeHtml.mockReturnValue({ resumeHtml: mockResumeHtml, isLoading: false, error: null, refetch: vi.fn() });
  });

  it('does NOT navigate when isComplete is false', () => {
    renderPage();

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(screen.getByTestId('context-collection-page')).toBeInTheDocument();
  });

  it('navigates to /generating/:sessionId when isComplete is true', async () => {
    mockUseContextCollection.mockReturnValue({
      ...defaultHookReturn,
      currentQuestion: null,
      isComplete: true,
      completionPercentage: 100,
      progress: {
        ...defaultHookReturn.progress,
        completedQuestions: [1, 2, 3],
      },
    });

    renderPage('sess-abc-456');

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/generating/sess-abc-456');
    });
  });

  it('passes sessionId from URL params to useContextCollection', () => {
    renderPage('my-session-789');

    expect(mockUseContextCollection).toHaveBeenCalledWith('my-session-789');
  });

  it('does not navigate when loading even if no question', () => {
    mockUseContextCollection.mockReturnValue({
      ...defaultHookReturn,
      currentQuestion: null,
      isLoading: true,
      isComplete: false,
    });

    renderPage();

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

describe('ContextCollectionPage V3 template (#202)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    capturedV3Props = {};
    mockUseContextCollection.mockReturnValue(defaultHookReturn);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ html: mockResumeHtml }),
    }));
  });

  it('renders ContextCollectionV3View (not V1 layout)', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByTestId('context-collection-v3-view')).toBeInTheDocument();
    });
    // V1 components should NOT be present
    expect(screen.queryByTestId('progress-header-component')).not.toBeInTheDocument();
    expect(screen.queryByTestId('question-card')).not.toBeInTheDocument();
    expect(screen.queryByTestId('input-panel')).not.toBeInTheDocument();
  });

  it('passes sessionId to useResumeHtml hook', async () => {
    renderPage('sess-123');

    expect(mockUseResumeHtml).toHaveBeenCalledWith('sess-123');
  });

  it('passes highlightedBulletId from currentQuestion', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByTestId('context-collection-v3-view')).toBeInTheDocument();
    });
    expect(capturedV3Props.highlightedBulletId).toBe('role_0.bullet_0');
  });

  it('passes highlightedText from currentQuestion.resumeQuote', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByTestId('context-collection-v3-view')).toBeInTheDocument();
    });
    expect(capturedV3Props.highlightedText).toBe(
      'Led product strategy for enterprise SaaS platform'
    );
  });

  it('shows spinner when no current question and questions not ready', async () => {
    mockUseContextCollection.mockReturnValue({
      ...defaultHookReturn,
      currentQuestion: null,
      progress: null,
      questionsReady: false,
    });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Generating your personalized questions...')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('context-collection-v3-view')).not.toBeInTheDocument();
  });

  it('shows "No questions available" when questions ready but none exist', async () => {
    mockUseContextCollection.mockReturnValue({
      ...defaultHookReturn,
      currentQuestion: null,
      progress: null,
      questionsReady: true,
    });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('No questions available')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('context-collection-v3-view')).not.toBeInTheDocument();
  });

  it('passes empty string resumeHtml when hook returns empty', async () => {
    mockUseResumeHtml.mockReturnValue({ resumeHtml: '', isLoading: false, error: new Error('Network error'), refetch: vi.fn() });

    renderPage();

    await waitFor(() => {
      expect(screen.getByTestId('context-collection-v3-view')).toBeInTheDocument();
    });
    expect(capturedV3Props.resumeHtml).toBe('');
  });
});
