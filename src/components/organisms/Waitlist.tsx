import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';

export interface WaitlistProps {
  title?: string;
  description?: string;
  onSubmit?: (email: string) => void;
  className?: string;
}

export const Waitlist: React.FC<WaitlistProps> = ({
  title = 'Join the Waitlist',
  description = 'Be the first to know when new spots open up. No spam, ever.',
  onSubmit,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    onSubmit?.(email);
    setSubmitted(true);
  };

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-lg mx-auto text-center">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-text-heading mb-2">{title}</h2>
            <p className="text-sm text-text-muted mb-6">{description}</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                />
              </div>
              <Button variant="primary" size="md" className="sm:flex-shrink-0">
                Join Waitlist
              </Button>
            </form>
            <p className="text-xs text-text-placeholder mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div className="py-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-1">You're on the list!</h3>
            <p className="text-sm text-text-muted">
              We'll reach out when a spot opens up.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
