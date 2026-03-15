import React from 'react';

export interface ChatAvatarProps {
  variant: 'ai' | 'user';
  src?: string;
  fallback?: string;
  className?: string;
}

export const ChatAvatar: React.FC<ChatAvatarProps> = ({
  variant,
  src,
  fallback = 'U',
  className = '',
}) => {
  if (variant === 'ai') {
    return (
      <div
        className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-dark to-progress-active ${className}`}
        aria-label="AI Assistant"
      >
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 0L11.5 4.5L16.5 5.5L13 9.5L13.5 14L9 12L4.5 14L5 9.5L1.5 5.5L6.5 4.5L9 0Z"
            fill="white"
          />
        </svg>
      </div>
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt="User avatar"
        className={`flex-shrink-0 w-10 h-10 rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-700 text-sm font-medium ${className}`}
      aria-label="User"
    >
      {fallback}
    </div>
  );
};
