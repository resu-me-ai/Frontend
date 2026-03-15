import React from 'react';
import { AppHeader } from '@/components/organisms/AppHeader';
import { ResumeDocument } from '@/components/organisms/ResumeDocument';
import type { ResumeDocumentData, EnhancementMap } from '@/types/resume';
import type { RescoreResult } from '@/pages/EnhancedResumeOutputPage';

// ---------------------------------------------------------------------------
// BulletEnhancementPanel — Story 10 (#459)
// Renders Phase 1b before/after bullet comparisons from resumeData._enhancements
// ---------------------------------------------------------------------------

interface BulletEnhancementPanelProps {
  enhancements?: EnhancementMap;
}

/**
 * Renders a before/after comparison card for each enhanced bullet.
 * Falls back gracefully when _enhancements is undefined or empty.
 */
const BulletEnhancementPanel: React.FC<BulletEnhancementPanelProps> = ({ enhancements }) => {
  const entries = enhancements ? Object.entries(enhancements) : [];

  if (entries.length === 0) {
    return (
      <p
        className="text-sm text-text-muted text-center py-4"
        data-testid="no-enhancements-fallback"
      >
        No enhancements available
      </p>
    );
  }

  return (
    <div className="space-y-4" data-testid="bullet-enhancement-list">
      <h3 className="text-sm font-semibold text-text-heading mb-2">
        Bullet Enhancements
      </h3>
      {entries.map(([bulletId, entry]) => (
        <div
          key={bulletId}
          className="bullet-comparison rounded-lg border border-border-default overflow-hidden"
          data-testid={`bullet-comparison-${bulletId}`}
        >
          {/* Before */}
          <div className="before bg-red-200 px-4 py-3">
            <span className="label text-xs font-semibold text-red-700 uppercase tracking-wide block mb-1">
              Before
            </span>
            <p className="text-sm text-text-body leading-relaxed">{entry.original}</p>
            {entry.score_before != null && (
              <p className="text-xs text-text-placeholder mt-1">Score: {entry.score_before}</p>
            )}
          </div>

          {/* After */}
          <div className="after enhanced bg-success-light px-4 py-3">
            <span className="label text-xs font-semibold text-green-700 uppercase tracking-wide block mb-1">
              After
            </span>
            <p className="text-sm text-text-heading leading-relaxed font-medium">
              {entry.enhanced}
            </p>
            {entry.score_after != null && (
              <p className="text-xs text-text-placeholder mt-1">Score: {entry.score_after}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------

export interface EnhancedResumeViewProps {
  resumeData: ResumeDocumentData | null;
  isLoadingResume?: boolean;
  stage: 'finalizing' | 'rescoring' | 'done' | 'error';
  error?: string | null;
  enhancedCount?: number;
  bulletCount?: number;
  rescoreData?: RescoreResult | null;
  onDownload: () => void;
  onDownloadPdf?: () => void;
}

export const EnhancedResumeView: React.FC<EnhancedResumeViewProps> = ({
  resumeData,
  isLoadingResume,
  stage,
  error,
  enhancedCount,
  bulletCount,
  rescoreData,
  onDownload,
  onDownloadPdf,
}) => {
  const isProcessing = stage === 'finalizing' || stage === 'rescoring';

  return (
    <div className="min-h-screen bg-bg-surface">
      <AppHeader />
      <div className="max-w-[1280px] mx-auto px-8 py-10">
        {/* Error state */}
        {stage === 'error' && (
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-text-heading mb-4">
              Something went wrong
            </h1>
            <p className="text-text-subtle">{error}</p>
          </div>
        )}

        {/* Processing state */}
        {isProcessing && (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-text-subtle text-lg">
              {stage === 'finalizing'
                ? 'Building your enhanced resume...'
                : 'Calculating your new score...'}
            </p>
          </div>
        )}

        {/* Done state — two-column layout */}
        {stage === 'done' && (
          <>
            {/* Header bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-text-heading">
                  Your Enhanced Resume
                </h1>
                {enhancedCount != null && bulletCount != null && (
                  <p className="text-sm text-text-subtle mt-1">
                    {enhancedCount} of {bulletCount} bullets enhanced
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onDownload}
                  className="bg-gray-900 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Download DOCX
                </button>
                {onDownloadPdf && (
                  <button
                    onClick={onDownloadPdf}
                    className="border border-border-input text-text-body py-2.5 px-6 rounded-lg font-medium hover:bg-bg-muted transition-colors"
                  >
                    Download PDF
                  </button>
                )}
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
              {/* Left rail — resume document */}
              <div>
                {isLoadingResume && (
                  <div className="max-w-[816px] mx-auto bg-white rounded-lg shadow-md p-10 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8" />
                    <div className="space-y-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-4 bg-gray-200 rounded" />
                      ))}
                    </div>
                  </div>
                )}

                {!isLoadingResume && resumeData && (
                  <ResumeDocument data={resumeData} />
                )}

                {!isLoadingResume && !resumeData && (
                  <div className="max-w-[816px] mx-auto bg-white rounded-lg shadow-md p-10 text-center text-text-muted">
                    <p>Resume preview not available.</p>
                    <p className="text-sm mt-2">
                      Use the download button to get your enhanced resume.
                    </p>
                  </div>
                )}
              </div>

              {/* Right rail */}
              <div className="bg-white rounded-lg shadow-md p-8 h-fit">
                {rescoreData ? (
                  <>
                    <h2 className="text-lg font-semibold text-text-heading mb-6">
                      Enhancement Summary
                    </h2>

                    {/* Score comparison */}
                    <div className="flex items-end justify-center gap-6 mb-2">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-text-muted">
                          {rescoreData.original.overall}
                        </p>
                        <p className="text-sm text-text-muted mt-1">Original</p>
                      </div>
                      <span className="text-2xl text-text-placeholder pb-5">&rarr;</span>
                      <div className="text-center">
                        <p className={`text-4xl font-bold ${
                          rescoreData.deltas.overall >= 0 ? 'text-success' : 'text-error'
                        }`}>
                          {rescoreData.enhanced.overall}
                        </p>
                        <p className="text-sm text-text-muted mt-1">Enhanced</p>
                      </div>
                    </div>

                    {/* Delta badge */}
                    <div className="flex justify-center mb-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          rescoreData.deltas.overall >= 0
                            ? 'bg-success-subtle text-success'
                            : 'bg-error-subtle text-error'
                        }`}
                      >
                        {rescoreData.deltas.overall >= 0 ? '+' : ''}
                        {rescoreData.deltas.overall}{' '}
                        {rescoreData.deltas.overall >= 0 ? 'improvement' : 'decline'}
                      </span>
                    </div>

                    {/* Gap resolution */}
                    {rescoreData.gap_resolution && (
                      <>
                        <hr className="border-border-default mb-4" />
                        <p className="text-sm text-text-subtle text-center">
                          {rescoreData.gap_resolution.resolved_gaps} of{' '}
                          {rescoreData.gap_resolution.total_gaps} competency gaps
                          resolved
                        </p>
                      </>
                    )}

                    {/* Enhancement Review — Phase 1b before/after bullet comparisons */}
                    <hr className="border-border-default my-6" />
                    <BulletEnhancementPanel enhancements={resumeData?._enhancements} />
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold text-text-heading mb-3">
                      Enhancement Review
                    </h2>
                    <BulletEnhancementPanel enhancements={resumeData?._enhancements} />
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
