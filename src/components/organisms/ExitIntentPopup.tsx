import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';

export interface ExitIntentPopupProps {
  /** Delay in ms before exit intent detection starts */
  delay?: number;
  /** Callback when form is submitted */
  onSubmit?: (email: string) => void;
  /** Callback when popup is dismissed */
  onDismiss?: () => void;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Submit button text */
  submitText?: string;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
  delay = 5000,
  onSubmit,
  onDismiss,
  title = 'Before you go...',
  description = 'Get personalized resume tips delivered to your inbox.',
  submitText = 'Send Tips',
}) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    let timeoutId: NodeJS.Timeout;
    let isEnabled = false;

    timeoutId = setTimeout(() => {
      isEnabled = true;
    }, delay);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!isEnabled || hasShown || e.clientY > 50) return;
      setOpen(true);
      setHasShown(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [delay, hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubmit?.(email);
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    onDismiss?.();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-text-placeholder hover:text-text-body transition-colors"
          aria-label="Close dialog"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <h2 className="text-xl font-semibold text-text-heading mb-2">
              {title}
            </h2>
            <p className="text-sm text-text-muted mb-4">
              {description}
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="primary" fullWidth>
                {submitText}
              </Button>
            </form>
            <p className="text-xs text-text-placeholder text-center mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-medium text-text-heading">You're on the list!</p>
            <p className="text-sm text-text-muted mt-1">Check your inbox for tips.</p>
            <Button variant="back" className="mt-4" onClick={handleClose}>
              Continue browsing
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
