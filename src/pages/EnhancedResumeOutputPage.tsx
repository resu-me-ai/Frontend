import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApiBase } from '@/lib/api';

interface ScoreDimensions {
  overall: number;
  skills: number;
  experience: number;
  qualifications: number;
  keywords: number;
}

interface RubricScoreDimensions {
  overall: number;
  competency: number;
  pattern: number;
  qualifications: number;
  keywords: number;
}

export interface RescoreResult {
  original: ScoreDimensions;
  enhanced: ScoreDimensions;
  deltas: ScoreDimensions;
  improved: boolean;
  rubric_original?: RubricScoreDimensions;
  gap_resolution?: {
    total_gaps: number;
    resolved_gaps: number;
  };
}

interface FinalizeResult {
  status: string;
  bulletCount: number;
  enhancedCount: number;
}

type Stage = 'finalizing' | 'rescoring' | 'done' | 'error';

export const EnhancedResumeOutputPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [stage, setStage] = useState<Stage>('finalizing');
  const [error, setError] = useState<string | null>(null);
  const [finalizeData, setFinalizeData] = useState<FinalizeResult | null>(null);
  const [rescoreData, setRescoreData] = useState<RescoreResult | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const run = async () => {
      try {
        // Step 1: Finalize
        setStage('finalizing');
        const finalizeRes = await fetch(`${getApiBase()}/pipeline/${sessionId}/finalize`, {
          method: 'POST',
        });
        if (!finalizeRes.ok) {
          throw new Error(await finalizeRes.text());
        }
        const fData: FinalizeResult = await finalizeRes.json();
        setFinalizeData(fData);

        // Step 2: Rescore
        setStage('rescoring');
        const rescoreRes = await fetch(`${getApiBase()}/pipeline/${sessionId}/rescore`);
        if (!rescoreRes.ok) {
          throw new Error(await rescoreRes.text());
        }
        const rData: RescoreResult = await rescoreRes.json();
        setRescoreData(rData);

        setStage('done');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setStage('error');
      }
    };

    run();
  }, [sessionId]);

  const handleDownload = async () => {
    const res = await fetch(`${getApiBase()}/pipeline/${sessionId}/download`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enhanced_resume.docx';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (stage === 'finalizing') {
    return (
      <main data-testid="enhanced-resume-loading" className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto" />
            <div className="h-40 bg-gray-200 rounded" />
          </div>
          <p className="mt-6 text-gray-500">Building your enhanced resume...</p>
        </div>
      </main>
    );
  }

  if (stage === 'rescoring') {
    return (
      <main data-testid="enhanced-resume-loading" className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto" />
            <div className="h-40 bg-gray-200 rounded" />
          </div>
          <p className="mt-6 text-gray-500">Calculating your new score...</p>
        </div>
      </main>
    );
  }

  if (stage === 'error') {
    return (
      <main data-testid="enhanced-resume-error" className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    );
  }

  const dimensions: (keyof ScoreDimensions)[] = ['skills', 'experience', 'qualifications', 'keywords'];

  return (
    <main data-testid="enhanced-resume-page" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Enhanced Resume</h1>
        {finalizeData && (
          <p className="text-gray-600 mb-8">
            {finalizeData.enhancedCount} of {finalizeData.bulletCount} bullets enhanced
          </p>
        )}

        {/* Score comparison cards */}
        {rescoreData && (
          <>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-4xl font-bold text-gray-800">{rescoreData.original.overall}</div>
                <div className="text-sm text-gray-500 mt-1">Original Score</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-4xl font-bold text-green-600">{rescoreData.enhanced.overall}</div>
                <div className="text-sm text-gray-500 mt-1">Enhanced Score</div>
                {rescoreData.deltas.overall !== 0 && (
                  <div className={`text-sm font-medium mt-1 ${rescoreData.deltas.overall >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {rescoreData.deltas.overall >= 0 ? '+' : ''}{rescoreData.deltas.overall}
                  </div>
                )}
              </div>
            </div>

            {/* Dimension breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Score Breakdown</h2>
              <div className="space-y-3">
                {dimensions.map((dim) => (
                  <div key={dim} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{dim}</span>
                    <span className="text-gray-800">
                      {rescoreData.original[dim]} → {rescoreData.enhanced[dim]}{' '}
                      <span className={rescoreData.deltas[dim] >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ({rescoreData.deltas[dim] >= 0 ? '+' : ''}{rescoreData.deltas[dim]})
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Rubric baseline scores (when rubric scoring ran) */}
        {rescoreData?.rubric_original && (
          <div data-testid="rubric-baseline-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Rubric Baseline (Pre-Enhancement)</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-700">{rescoreData.rubric_original.overall}</div>
                <div className="text-xs text-gray-500 mt-1">Rubric Overall</div>
              </div>
              <div className="space-y-2">
                {(['competency', 'pattern', 'qualifications', 'keywords'] as const).map((dim) => (
                  <div key={dim} className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm capitalize">{dim}</span>
                    <span className="text-gray-800 text-sm font-medium">{rescoreData.rubric_original![dim]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Download button */}
        <button
          onClick={handleDownload}
          className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Download Enhanced Resume (DOCX)
        </button>
      </div>
    </main>
  );
};
