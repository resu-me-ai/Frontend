import React from 'react';

export type BadgeVariant = 'strong' | 'moderate' | 'critical' | 'important' | 'nice-to-have' | 'low-priority';

export interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children, className = '' }) => {
  const variantStyles = {
    strong: 'bg-success-subtle text-success',
    moderate: 'bg-info-subtle text-action-primary',
    critical: 'bg-error-subtle text-error-strong',
    important: 'bg-orange-100 text-warning',
    'nice-to-have': 'bg-amber-300 text-amber-700',
    'low-priority': 'bg-info-subtle text-blue-700',
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded text-xs font-semibold uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
