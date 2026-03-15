import React from 'react';

export type KeywordTagVariant = 'present' | 'missing';

export interface KeywordTagProps {
  variant: KeywordTagVariant;
  children: React.ReactNode;
  className?: string;
}

export const KeywordTag: React.FC<KeywordTagProps> = ({ variant, children, className = '' }) => {
  const variantStyles = {
    present: 'bg-success-subtle text-green-700',
    missing: 'bg-error-subtle text-red-700',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
