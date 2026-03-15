import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';

export interface StickyFooterCTAProps {
  /** Scroll percentage (0-100) before showing */
  showAfterScroll?: number;
  /** CTA text */
  ctaText?: string;
  /** Message text */
  message?: string;
  /** Callback when CTA is clicked */
  onCtaClick?: () => void;
  /** Callback when dismissed */
  onDismiss?: () => void;
}

export const StickyFooterCTA: React.FC<StickyFooterCTAProps> = ({
  showAfterScroll = 30,
  ctaText = 'Get Started',
  message = 'Ready to optimize your resume? Start your free analysis.',
  onCtaClick,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPercent = (window.scrollY / scrollHeight) * 100;

      if (scrollPercent >= showAfterScroll && !dismissed) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll, dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    onDismiss?.();
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium flex-1 min-w-0 truncate">
              {message}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="secondary"
                size="sm"
                onClick={onCtaClick}
              >
                {ctaText}
              </Button>
              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
