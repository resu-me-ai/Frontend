import React from 'react';

export interface MessageTimestampProps {
  time: string;
  className?: string;
}

export const MessageTimestamp: React.FC<MessageTimestampProps> = ({
  time,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs text-text-muted ${className}`}
      aria-label={`Sent at ${time}`}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      {time}
    </span>
  );
};
