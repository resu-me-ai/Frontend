import type React from 'react';

export interface StatusIndicatorProps {
  icon: React.ReactNode;
  label: string;
  variant?: 'default' | 'success' | 'info';
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  icon,
  label,
  variant = 'default',
  className = '',
}) => {
  const variantClasses = {
    default: 'text-gray-500',
    success: 'text-green-600',
    info: 'text-blue-600',
  };

  return (
    <span className={`flex items-center gap-1.5 text-xs ${variantClasses[variant]} ${className}`}>
      {icon}
      {label}
    </span>
  );
};
