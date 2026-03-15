import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OnboardingHeader } from '@/components/organisms/OnboardingHeader';
import { ContextProcessingLoadingView } from '@/components/templates/ContextProcessingLoadingView';
import { finalizePipeline } from '@/api/pipeline';

/**
 * Loading page shown between Context Collection and Enhancement Review.
 * Calls POST /finalize, shows animated progress, then redirects.
 */
export const GeneratingPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [progress, setProgress] = useState(10);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const abort = new AbortController();

    // Animate progress bar while finalize runs
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) return prev; // Cap at 88 until finalize completes
        // Slow logarithmic growth: fast at start, slow approaching cap
        return prev + Math.max(1, Math.round((90 - prev) * 0.08));
      });
    }, 800);

    const run = async () => {
      try {
        await finalizePipeline(sessionId, abort.signal);
        if (abort.signal.aborted) return;

        setProgress(100);
        // Brief pause at 100% before redirect so user sees completion
        setTimeout(() => {
          if (!abort.signal.aborted) {
            navigate(`/enhancement-review/${sessionId}`, { replace: true });
          }
        }, 600);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        clearInterval(progressInterval);
        setError(err instanceof Error ? err.message : 'Resume generation failed');
      }
    };

    run();

    return () => {
      abort.abort();
      clearInterval(progressInterval);
    };
  }, [sessionId, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-bg-muted flex flex-col">
        <OnboardingHeader showAuthButtons={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <p className="text-red-600 text-sm">{error}</p>
            <button
              type="button"
              onClick={() => {
                setError(null);
                setProgress(10);
                // Re-trigger by navigating to self
                navigate(`/generating/${sessionId}`, { replace: true });
                window.location.reload();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-action-primary rounded-lg hover:bg-action-primary-hover transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-muted flex flex-col">
      <OnboardingHeader showAuthButtons={false} />
      <div className="flex-1">
        <ContextProcessingLoadingView progress={progress} />
      </div>
    </div>
  );
};
